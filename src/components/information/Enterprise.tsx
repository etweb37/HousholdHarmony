import React from "react";
import {DPDealer, DPEnterprise} from "../../model/LoginResponse";
import {IonCard, IonImg, IonItem, IonList, IonTitle} from "@ionic/react";

export const Enterprise: React.FC<DPEnterprise> = ({enterpriseId, name, dealers}) => {
    return <IonCard key={enterpriseId}>
        <IonItem>
            <IonTitle>{name}</IonTitle>
        </IonItem>
        <IonList>
            {dealers?.map(Dealership)}
        </IonList>
    </IonCard>
}

const Dealership: React.FC<DPDealer> = ({dealerId, name}) => {

    const initials = () => {
        const words = name.split(' ')
        if (words.length > 1) {
            return `${words[0]}, ${words[words.length - 1]}`
        }
        return "d, p"
    }
    const avatarUrl = () =>
        `https://ui-avatars.com/api/?name=${initials()}&background=ccc`

    return <IonItem key={dealerId}>
        <IonImg src={avatarUrl()} className="cutout"/>
        {name}
    </IonItem>
}
