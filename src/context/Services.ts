import {createContext} from "react";
import {Proxy} from "../service/Proxy";

export const Services = createContext<Proxy | undefined>(undefined)
