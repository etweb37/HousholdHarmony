import React, {ReactNode, useContext, useEffect, useState} from "react";
import {IonContent, IonHeader, IonImg, IonPage} from "@ionic/react";
import {FooterMessaging} from "../context/FooterMessaging";
import {Page} from "../context/Page";
import './EntryPage.css'
import {Spinner} from "../components/Spinner";
import {PAGES} from "../components/Menu";
import {Transactions} from "../components/transactions/Transactions";
import {CardPayment} from "../components/cardpayment/CardPayment";
import {Information} from "../components/information/Information";

const EntryPage: React.FC = () => {

    const setFooterMessage = useContext(FooterMessaging);
    const [currentPage, setCurrentPage] = useState<ReactNode>(<Spinner/>);
    const page = useContext(Page);

    useEffect(() => {
        switch (page) {
            case PAGES.TRANSACTIONS:
                setCurrentPage(<Transactions/>)
                break
            case PAGES.CARD_PAYMENT:
                setCurrentPage(<CardPayment/>)
                break
            default:
                setCurrentPage(<Information/>)
        }
        return () => {
        };
    }, [page]);

    useEffect(() => {
        setFooterMessage('Loading User')
        return () => {
        };
    });

    return <>
        <IonPage id="main">
            <IonHeader>
                <IonImg id="logo" src="assets/imgs/dealer-pay-logo.svg"/>
            </IonHeader>
            <IonContent id="container">
                {currentPage}
            </IonContent>
        </IonPage>
    </>
}

export {EntryPage}
