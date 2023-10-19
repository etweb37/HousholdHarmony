import React from "react";
import './InlineMessaging.css'

interface Message {
    label: string
}

const InlineMessage: React.FC<Message> = ({label}) => {
    return <>{label && label.length && <p className="message">{label}</p>}</>
}
const InlineError: React.FC<Message> = ({label}) => {
    return <>{label && label.length && <p className="message error">{label}</p>}</>
}

export {InlineError, InlineMessage}
