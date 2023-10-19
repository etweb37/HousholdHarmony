import React, {useContext, useEffect, useState} from "react";
import {IonAlert, IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonImg, IonItem, IonList} from "@ionic/react";
import {FooterMessaging} from "../../context/FooterMessaging";
import {Services} from "../../context/Services";
import {DPUser} from "../../model/LoginResponse";
import {Enterprise} from "./Enterprise";
import './Information.css'

export const Information: React.FC = () => {

    const setFooterMessage = useContext(FooterMessaging)
    const proxy = useContext(Services)

    const [user, setUser] = useState<DPUser | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)
    const [errorShowing, showError] = useState(false)

    useEffect(() => {
        setFooterMessage("Profile Information")
        return () => {
        };
    });

    useEffect(() => {
        proxy && proxy.getUser()
            .then(setUser)
            .catch(setError)
        return () => {
        };
    }, [proxy]);

    useEffect(() => {
        showError(error !== undefined)
        return () => {
        };
    }, [error]);


    return (
        <IonContent className="information">
            {user &&
                <>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>User profile information</IonCardSubtitle>
                        </IonCardHeader>
                        <IonList>
                            <IonItem><label>First Name</label>&nbsp;&nbsp; {user.firstName}</IonItem>
                            <IonItem><label>Last Name</label>&nbsp;&nbsp; {user.lastName}</IonItem>
                            <IonItem><label>Email</label>&nbsp;&nbsp; {user.email}</IonItem>
                        </IonList>
                        <IonImg className="absolute-right" src="https://ui-avatars.com/api/?name=John+Doe"/>
                    </IonCard>
                    {user?.enterprises?.map(Enterprise)}
                </>
            }
            {<IonAlert
                isOpen={errorShowing}
                header="Oops!"
                subHeader={error ? error.name : ''}
                message={error ? error.message : ''}
                buttons={['OK']}
            ></IonAlert>}

            {/*<UserModel.Consumer>*/}
            {/*    {({user}) => {*/}
            {/*        if (!user) return <></>*/}
            {/*        const {firstName, lastName, email} = user*/}
            {/*        return <><IonCard>*/}
            {/*            <IonCardHeader>*/}
            {/*                <IonCardSubtitle>User profile information</IonCardSubtitle>*/}
            {/*            </IonCardHeader>*/}
            {/*            <IonList>*/}
            {/*                <IonItem><label>First Name</label>&nbsp;&nbsp; {firstName}</IonItem>*/}
            {/*                <IonItem><label>Last Name</label>&nbsp;&nbsp; {lastName}</IonItem>*/}
            {/*                <IonItem><label>Email</label>&nbsp;&nbsp; {email}</IonItem>*/}
            {/*            </IonList>*/}
            {/*            <IonImg className="absolute-right" src="https://ui-avatars.com/api/?name=John+Doe"/>*/}
            {/*        </IonCard>*/}
            {/*            {user?.enterprises?.map(Enterprise)}*/}
            {/*        </>*/}
            {/*    }}*/}
            {/*</UserModel.Consumer>*/}
        </IonContent>
    );
}
