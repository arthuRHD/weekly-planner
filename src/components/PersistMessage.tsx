import React, { useEffect } from "react";
import RoomMate from "../models/RoomMate";

interface PersistMessageProps {
    saved: boolean;
    isSaved: (saved: boolean) => void;
    roommates: RoomMate[];
}

const PersistMessage: React.FC<PersistMessageProps> = ({ saved, isSaved, roommates }) => {

    useEffect(() => {
        if (!saved && roommates.length > 0) {
            console.log({roommates: roommates});
            
            isSaved(true)
        }
    }, [saved, roommates]);

    return (
        <span style={{color: saved ? "green" : "yellow"}}>{saved ? "sauvegardé" : "pas synchronisé"}</span>
    );

}

export default PersistMessage;