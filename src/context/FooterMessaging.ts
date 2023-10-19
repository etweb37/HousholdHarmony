import {createContext} from "react";

const FooterMessaging = createContext<(message: string) => void>((message) => {
})

export {FooterMessaging}
