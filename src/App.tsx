import {
    IonApp,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonIcon,
    IonMenuToggle,
    IonPage,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, {useState} from "react";
import {LoginPage} from "./pages/LoginPage";
import './App.css'
import {InlineMessage} from "./components/InlineMessaging";
import {EntryPage} from "./pages/EntryPage";
import {FooterMessaging} from "./context/FooterMessaging";
import {lockClosed, menuOutline} from "ionicons/icons";
import {Services} from "./context/Services";
import {ApiProxy} from "./service/ApiProxy";
import {Proxy} from "./service/Proxy";
import {DPUser} from "./model/LoginResponse";
import {UserModel, UserState} from "./context/UserModel";
import {Menu} from "./components/Menu";
import {Page} from "./context/Page";

setupIonicReact();

const baseUrl = import.meta.env.VITE_BASE_URL || 'https://mobile-api.dealer-pay.com/api'

const App: React.FC = () => {

    const [authenticated, setAuthenticated] = useState(false)
    const [page, setPage] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<DPUser | undefined>(undefined);
    const [footerMessage, setFooterMessage] = useState("");
    const [services, setServices] = useState<Proxy>(new ApiProxy(baseUrl));
    // const [services, setServices] = useState<Proxy>(new MockProxy());

    const logout = () => {
        setAuthenticated(false)
        setUser(undefined)
        setServices(new ApiProxy(baseUrl))
        console.warn("User has been logged out!")
    }

    return (
        <IonApp className={authenticated ? "authenticated" : "not-authenticated"}>
            <FooterMessaging.Provider value={setFooterMessage}>
                <Services.Provider value={services}>
                    <UserModel.Provider value={new UserState(user, setUser)}>
                        <Page.Provider value={page}>
                            <Menu setPage={setPage}/>
                            <IonPage id="main">
                                <IonContent>
                                    <IonPage>
                                        {authenticated ? <EntryPage/> : <LoginPage callback={setAuthenticated}/>}
                                    </IonPage>
                                </IonContent>
                                <IonFooter>
                                    <IonToolbar>
                                        <InlineMessage label={footerMessage}/>
                                        <IonButtons slot="start">
                                            {authenticated &&
                                                <IonMenuToggle>
                                                    <IonButton>
                                                        <IonIcon icon={menuOutline}/>
                                                    </IonButton>
                                                </IonMenuToggle>
                                            }
                                        </IonButtons>
                                        <IonButtons slot="end">
                                            {authenticated &&
                                                <IonButton onClick={logout}>
                                                    <IonIcon icon={lockClosed}/>
                                                </IonButton>}
                                        </IonButtons>
                                    </IonToolbar>
                                </IonFooter>
                            </IonPage>
                        </Page.Provider>
                    </UserModel.Provider>
                </Services.Provider>
            </FooterMessaging.Provider>
        </IonApp>
    );
};

export default App;
