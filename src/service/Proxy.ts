import {DPDealer, DPDepartment, DPLoginResponse, DPUser} from "../model/LoginResponse";
import {DPTransaction} from "../model/DPTransaction";

export interface Proxy {
    login: (username: string, password: string) => Promise<DPLoginResponse>
    getUser: () => Promise<DPUser>
    recentTransactions: () => Promise<DPTransaction[]>
    currentDealer: () => Promise<DPDealer>
    currentDepartment: () => Promise<DPDepartment>
}
