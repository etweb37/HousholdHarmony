import {DPCustomer} from "./DPCustomer";

class DPTransaction {
    transactionId: string
    operation?: string
    totalAmount: number
    saleAmount: number
    payShareAmount: number
    charityRoundupAmount: number
    transactionDate: string
    department?: string
    transactionType?: string
    referenceNumber?: string
    cardBrand?: string
    last4?: string
    expDate?: string
    authCode?: string
    success: boolean
    message?: string
    canVoid: boolean
    isVoided: boolean
    isPaymentRequest: boolean
    customer: DPCustomer

    constructor(transactionId: string,
                totalAmount: number,
                saleAmount: number,
                payShareAmount: number,
                charityRoundupAmount: number,
                transactionDate: string,
                success: boolean,
                canVoid: boolean,
                isVoided: boolean,
                isPaymentRequest: boolean,
                customer: DPCustomer,
                transactionType: string,
                department: string,
                operation: string,
                referenceNumber: string,
                cardBrand: string,
                last4: string,
                expDate: string,
                authCode: string,
                message: string) {
        this.transactionId = transactionId;
        this.operation = operation;
        this.totalAmount = totalAmount;
        this.saleAmount = saleAmount;
        this.payShareAmount = payShareAmount;
        this.charityRoundupAmount = charityRoundupAmount;
        this.transactionDate = transactionDate;
        this.department = department;
        this.transactionType = transactionType;
        this.referenceNumber = referenceNumber;
        this.cardBrand = cardBrand;
        this.last4 = last4;
        this.expDate = expDate;
        this.authCode = authCode;
        this.success = success;
        this.message = message;
        this.canVoid = canVoid;
        this.isVoided = isVoided;
        this.isPaymentRequest = isPaymentRequest;
        this.customer = customer;
    }
}

export {DPTransaction};
