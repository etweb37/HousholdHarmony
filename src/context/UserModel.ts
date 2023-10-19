//
// export class DPModel {
//     login?: DPLoginResponse
//     user?: DPUser
//
//     setLogin: (login: DPLoginResponse | undefined) => void
//     setUser: (login: DPUser | undefined) => void
// }
//
import {createContext} from "react";
import {DPUser} from "../model/LoginResponse";

export class UserState {
    user: DPUser | undefined
    setUser: (arg: any | undefined) => any

    constructor(user: DPUser | undefined, setUser: (arg: any | undefined) => any) {
        this.user = user;
        this.setUser = setUser;
    }
}

export const UserModel = createContext<UserState>(new UserState(undefined, () => {
}))

