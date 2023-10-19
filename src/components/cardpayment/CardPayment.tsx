import React, {useContext, useEffect, useState} from "react";
import {IonContent, IonInput, IonItem, IonList, IonSelect, IonSelectOption} from "@ionic/react";
import {Services} from "../../context/Services";
import {DPDepartment} from "../../model/LoginResponse";
import {FooterMessaging} from "../../context/FooterMessaging";
import './cardpayment.css'

export const CardPayment: React.FC = () => {

    const [error, setError] = useState<string>('')
    const [department, setDepartment] = useState<DPDepartment | undefined>();
    const [departments, setDepartments] = useState<DPDepartment[]>([]);

    const setFooterMessage = useContext(FooterMessaging);
    const proxy = useContext(Services);

    useEffect(() => {
        setFooterMessage("Card Payment")
        return () => {
        };
    });

    useEffect(() => {
        try {
            if (!proxy) return
            proxy.currentDealer().then(dealer => setDepartments(dealer.departments))
            proxy.currentDepartment().then(setDepartment)
        } catch (e) {
            setError(e)
        }
        return () => {
        };
    }, [proxy]);


    return <IonContent>
        <form>
            <IonList>
                <IonItem>
                    <IonSelect label="Department:"
                               placeholder="Please select"
                               value={department && department.departmentId}>
                        {departments.map(department =>
                            <IonSelectOption key={department.departmentId}
                                             value={department.departmentId}>{department.name}</IonSelectOption>)}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonInput label="reference #:"></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput label="amount:"></IonInput>
                </IonItem>
            </IonList>
        </form>
    </IonContent>
}
