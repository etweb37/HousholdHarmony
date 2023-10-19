import {IonCard, IonContent, IonItem, IonList} from "@ionic/react";
import React, {useContext, useEffect, useState} from "react";
import './Transactions.css'
import {Services} from "../../context/Services";
import {DPTransaction} from "../../model/DPTransaction";
import {FooterMessaging} from "../../context/FooterMessaging";

const Transactions: React.FC = () => {

    const setFooterMessage = useContext(FooterMessaging);
    const [transactions, setTransactions] = useState<DPTransaction[] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const proxy = useContext(Services)

    useEffect(() => {
        setFooterMessage("Recent Transactions")

        if (!transactions && !error) {
            proxy?.recentTransactions()
                .then(transactions => {
                    console.log("dp tnxs: ", transactions)
                    setTransactions(transactions)
                    if (transactions.length === 0) setMessage("No recent transactions")
                })
                .catch(reason => {
                    console.log("dp tnx error", reason)
                    setError(JSON.stringify(reason))
                })
        }

        return () => {

        };
    }, [setFooterMessage]);

    return <IonContent>
        {(transactions && transactions.length === 0) &&
            <>{
                transactions.map(transaction =>
                    <IonCard>
                        <section className="transaction">
                            <label>{transaction.operation}</label>
                            <label>{transaction.transactionType}</label>
                            <label>{transaction.transactionDate}</label>
                        </section>
                    </IonCard>)
            }</>}
        {message && <IonList>
            <IonItem>{message}</IonItem>
        </IonList>}
    </IonContent>
}

export {Transactions}
