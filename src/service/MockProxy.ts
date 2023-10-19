import {Proxy} from "./Proxy";
import {DPDealer, DPDepartment, DPLoginResponse, DPUser, LoginResponse, User} from "../model/LoginResponse";
import {v4} from "uuid";
import {DPTransaction} from "../model/DPTransaction";

export class MockProxy implements Proxy {
    login(username: string, password: string): Promise<DPLoginResponse> {
        if (username.length > 3) {
            return Promise.resolve(new LoginResponse(v4(), "t@dp.com", "Ted", "Smith", "", "", "", "", ""))
        }
        return Promise.reject("Something went wrong");
    }

    getUser(): Promise<DPUser> {
        return Promise.resolve(new User("", "", "", "", "", "", []));
    }

    recentTransactions(): Promise<DPTransaction[]> {
        return Promise.resolve([
            new DPTransaction("", 0, 0, 0, 0, "08/17/2023", false, false, false, false, undefined, "Charge", "Accounting", "CHARGED", "", "", "", "", "", ""),
            new DPTransaction("", 0, 0, 0, 0, "08/14/2023", false, false, false, false, undefined, "Voided", "Service", "PREAUTH", "", "", "", "", "", "")]);
    }

    currentDealer(): Promise<DPDealer> {
        return Promise.reject("not implemented");
    }

    currentDepartment(): Promise<DPDepartment> {
        return Promise.reject("not implemented");
    }


}
