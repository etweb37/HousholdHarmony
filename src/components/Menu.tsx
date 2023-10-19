import React from "react";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {cardOutline, close, informationCircle, listOutline} from "ionicons/icons";

interface MenuItem {
    name: string,
    page: string,
    icon: string
}

export const PAGES = {
    INFORMATION: "info",
    TRANSACTIONS: "transactions",
    CARD_PAYMENT: "card-payment"
}

const menuItems: MenuItem[] = [
    {
        name: "Profile Information",
        page: PAGES.INFORMATION,
        icon: informationCircle
    },
    {
        name: "Transactions",
        page: PAGES.TRANSACTIONS,
        icon: listOutline
    },
    {
        name: "Card Payment",
        page: PAGES.CARD_PAYMENT,
        icon: cardOutline
    }
]

interface Pager {
    setPage: (page: string) => void
}

export const Menu: React.FC<Pager> = ({setPage}) => {

    const menuRef = React.useRef<HTMLIonMenuElement | null>(null);

    const handlePage = (page: string) => {
        setPage(page)
        menuRef.current?.close()
    }

    return <>
        <IonMenu ref={menuRef} contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Welcome</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {menuItems.map(({name, page, icon}) => {
                        return <IonItem key={name}>
                            <IonButton fill="clear" onClick={() => handlePage(page)}>
                                <IonIcon slot="start" size="large" icon={icon}/>
                                {name}
                            </IonButton>
                        </IonItem>
                    })}
                </IonList>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonMenuToggle>
                        <IonButton fill="clear">
                            <IonIcon icon={close}/>
                        </IonButton>
                    </IonMenuToggle>
                </IonToolbar>
            </IonFooter>
        </IonMenu>
    </>
}
