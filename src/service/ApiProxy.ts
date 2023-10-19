import {Proxy} from "./Proxy";
import {CapacitorHttp, HttpResponse} from "@capacitor/core";
import {DPDealer, DPDepartment, DPLoginResponse, DPUser} from "../model/LoginResponse";
import {Device} from '@capacitor/device';
import {DPTransaction} from "../model/DPTransaction";

const HTTP = {
    // base: 'https://mobile-api.dealer-pay.com/api',
    // base: 'http://localhost:8010/proxy/api',
    login: '/v1/Account/Login',
    user: '/v1/User',
    recentTransactions: '/v1/Transaction/Recent-Transactions',
    headersWithToken: (deviceId: string, token?: string) => {
        const headers = Object.assign({"device_token": deviceId}, {
            'accept': 'text/plain',
            'Content-Type': 'application/json'
        })
        if (token) {
            return Object.assign({"Authorization": `Bearer ${token}`}, headers)
        }
        return headers
    }
}

class CachedValue<T> {
    cachedAt: number
    value: T

    constructor(value: T) {
        this.value = value;
        this.cachedAt = new Date().getTime()
    }

    cacheNotExpired(): boolean {
        // cache for 3 min
        return new Date().getTime() - this.cachedAt < 3 * 60 * 60 * 1000
    }
}

export class ApiProxy implements Proxy {

    bearer?: string
    deviceId?: string
    newBaseUrl?: string

    current: Map<string, CachedValue<any>>

    constructor(url: string) {
        this.newBaseUrl = url
        this.bearer = undefined
        this.deviceId = undefined
        this.current = new Map<string, CachedValue<any>>()
    }

    async cacheDeviceID() {
        const id = await Device.getId()
        console.debug("dp received device identifier: ", id)
        this.deviceId = id.identifier
        console.debug("dp cached device identifier: ", this.deviceId)
    }

    async login(username: string, password: string): Promise<DPLoginResponse> {
        try {
            await this.cacheDeviceID()
            const response: HttpResponse = await CapacitorHttp.post({
                url: this.newBaseUrl + HTTP.login,
                headers: HTTP.headersWithToken(this.deviceId!),
                data: {
                    email: username, password
                }
            })
            const loginResponse = response.data
            this.bearer = loginResponse.jwtToken
            this.newBaseUrl = loginResponse.dealerPayBaseUrl + "/api"
            return Promise.resolve(response.data)
        } catch (e) {
            return Promise.reject("Something went wrong")
        }
    }

    async getUser(): Promise<DPUser> {
        // there is a cached user
        const user: CachedValue<DPUser> | undefined = this.current['user']
        if (user && user.cacheNotExpired()) {
            return Promise.resolve(this.current['user'].value)
        }
        return new Promise<DPUser>((resolve, reject) => {
            this.get(HTTP.user)
                .then(response => {
                    const user = response.data
                    // Cache the user and refresh the remaining caches by calling accessors
                    this.current['user'] = new CachedValue(user)
                    this.currentDealer()
                    this.currentDepartment()
                    resolve(user)
                })
                .catch(reject)
        })
    }

    async recentTransactions(): Promise<DPTransaction[]> {
        return new Promise<DPTransaction[]>((resolve, reject) => {
            this.get(HTTP.recentTransactions)
                .then(response => resolve(response.data))
                .catch(reason => reject(reason))
        })
    }

    async get(path: string): Promise<HttpResponse> {
        console.debug("dp getting: ", path)
        try {
            const options = {
                url: this.newBaseUrl + path,
                headers: HTTP.headersWithToken(this.deviceId!, this.bearer!),
            }
            console.debug('dp requesting response:', options)
            const response: HttpResponse = await CapacitorHttp.get(options)
            console.debug('dp received response:', response.data.id)
            return Promise.resolve(response)
        } catch (e) {
            console.warn('dp received error:', e)
            return Promise.reject("Something went wrong")
        }
    }

    async currentDealer(): Promise<DPDealer> {
        // there is a cached dealer
        const dealer = this.current['dealer'] as CachedValue<DPDealer> | undefined
        if (dealer && dealer.cacheNotExpired()) {
            return Promise.resolve(this.current['dealer'].value)
        }
        // there is a cached user, use that if cache is valid
        const cachedUser = this.current['user'] as CachedValue<DPUser> | undefined
        if (cachedUser &&
            cachedUser.cacheNotExpired() &&
            cachedUser.value.enterprises &&
            cachedUser.value.enterprises[0]
            && cachedUser.value.enterprises[0].dealers &&
            cachedUser.value.enterprises[0].dealers[0]) {
            const dealer = cachedUser.value.enterprises[0].dealers[0] as DPDealer
            this.current['dealer'] = new CachedValue(dealer)
            return Promise.resolve(dealer)
        }
        // we have to go get the user to attempt to rebuild the cache
        try {
            const user = await this.getUser()
            if (user.enterprises &&
                user.enterprises[0] &&
                user.enterprises[0].dealers &&
                user.enterprises[0].dealers[0])
                this.current['dealer'] = new CachedValue(user.enterprises[0].dealers[0])
            return Promise.resolve(user.enterprises[0].dealers[0])
        } catch (e) {
            console.error(e)
        }
        return Promise.reject("No dealer found")
    }

    async currentDepartment(): Promise<DPDepartment> {
        const department = this.current['department'] as CachedValue<DPDepartment> | undefined
        if (department && department.cacheNotExpired()) {
            return Promise.resolve(this.current['department'].value)
        }
        const dealer = await this.currentDealer()
        if (dealer.departments && dealer.departments[0]) {
            this.current['department'] = new CachedValue(dealer.departments[0])
            return Promise.resolve(dealer.departments[0])
        }
        return Promise.reject("No department found")
    }

}
