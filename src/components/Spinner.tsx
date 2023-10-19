import React from "react";
import {IonLabel, IonSpinner} from "@ionic/react";

export const Spinner: React.FC = () => {
    return <div className="center half">
        <IonSpinner name="circular" className="center"/>
        <br/>
        <IonLabel>Loading...</IonLabel>
    </div>
}
