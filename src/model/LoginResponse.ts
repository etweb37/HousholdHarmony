interface DPLoginResponse {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    dealerPayBaseUrl?: string,
    gatewayBaseUrl?: string
    jwtToken?: string,
    refreshToken?: string,
    publicKey?: string,
}

interface DPDepartment {
    "departmentId": string,
    "name": string,
    "hasPayShare": boolean,
    "payShareThreshold": number | null,
    "paySharePercentage": number | null,
    "departmentTypeId": string,
    "defaultTransactionTypeId": string,
    "defaultTransactionTypeLabel": string,
    "signatureRequired": boolean
}

interface DPDealer {
    "dealerId": string,
    "enterpriseId": string,
    "name": string,
    "charityRoundupEnabled": boolean,
    "charityName": string | null,
    "logoUrl": string,
    "dmsEnabled": boolean,
    "dmsName": string,
    "departments": DPDepartment[]
}

interface DPEnterprise {
    "enterpriseId": string,
    "name": string,
    "dealers": DPDealer[]
}

interface DPUser {

    "userId": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "groupId": string,
    "groupName": string,
    "enterprises": DPEnterprise[]
}

class User implements DPUser {
    email: string;
    enterprises: DPEnterprise[];
    firstName: string;
    groupId: string;
    groupName: string;
    lastName: string;
    userId: string;

    constructor(
        userId: string,
        email: string,
        firstName: string,
        lastName: string,
        groupId: string,
        groupName: string,
        enterprises: DPEnterprise[]
    ) {
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.groupId = groupId;
        this.groupName = groupName;
        this.enterprises = enterprises;
    }
}

class LoginResponse implements DPLoginResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dealerPayBaseUrl?: string;
    gatewayBaseUrl?: string;
    jwtToken?: string;
    publicKey?: string;
    refreshToken?: string;

    constructor(id: string, email: string, firstName: string, lastName: string, dealerPayBaseUrl: string, gatewayBaseUrl: string, jwtToken: string, publicKey: string, refreshToken: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dealerPayBaseUrl = dealerPayBaseUrl;
        this.gatewayBaseUrl = gatewayBaseUrl;
        this.jwtToken = jwtToken;
        this.publicKey = publicKey;
        this.refreshToken = refreshToken;
    }
}

export type {DPDealer, DPDepartment, DPEnterprise, DPUser, DPLoginResponse}
export {User, LoginResponse}
