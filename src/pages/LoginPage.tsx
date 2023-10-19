import {IonButton, IonImg, IonInput, IonItem, IonList, IonPage} from '@ionic/react';
import './LoginPage.css';
import React, {useContext, useEffect, useRef, useState} from "react";
import {InlineError, InlineMessage} from "../components/InlineMessaging";
import {FooterMessaging} from "../context/FooterMessaging";
import {Services} from "../context/Services";

export interface HasCallback {
    callback: (arg: any | undefined) => any | undefined
}

export const LoginPage: React.FC<HasCallback> = ({callback}) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [message] = useState("");

    const txtUsername = useRef<HTMLIonInputElement | null>(null)
    const txtPassword = useRef<HTMLIonInputElement | null>(null)

    const setFooterMessage = useContext(FooterMessaging);
    useEffect(() => {
        setFooterMessage('Please Login')
        return () => {
        };
    }, [setFooterMessage]);


    const proxy = useContext(Services);

    const handle = async () => {
        const username = txtUsername.current?.value as string
        const password = txtPassword.current?.value as string

        if (username && password) {
            console.debug(`attempting authentication with: ${username} : ${password}`)
            try {
                if (!proxy) return
                const response = await proxy.login(username, password)
                console.debug("Login response: ", response)
                setErrorMessage("");
                callback(true) // set authenticated
            } catch (e: any) {
                setErrorMessage(e.message)
            }
        } else setErrorMessage("Please check the form")
    }

    return (
        <IonPage id="login-page">
            <IonImg id="logo" src="assets/imgs/dealer-pay-logo.svg"/>
            <IonList>
                <IonItem>
                    <IonInput ref={txtUsername} label="Username:" value="t@dp.com"/>
                </IonItem>
                <IonItem>
                    <IonInput ref={txtPassword} label="Password:" type="password" value="a123456A!"/>
                </IonItem>
                <InlineMessage label={message}/>
                <InlineError label={errorMessage}/>
            </IonList>
            <IonButton expand="block" onClick={handle}>Login</IonButton>
            <IonButton fill="clear">Forgot Password</IonButton>
        </IonPage>
    );
};
