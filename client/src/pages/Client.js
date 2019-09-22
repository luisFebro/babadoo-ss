import React, { useContext, useState } from "react";
import UserProvider from "../data/contexts/UserProvider";
import _ from "lodash";

const LoginMsg = `
    Faça seu login para favoritos, pedidos e mais!
`;

export default function Profiles() {
    const [selected, setSelected] = useState("All");
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData) ? LoginMsg: "Bem Vindo a Babadoo Online!";
    const options = Object.keys(userData).filter(key => {
        return userData[key] !== null;
    });

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                {text}
            </p>
            <div style={{ marginBottom: 20 }} />
        </div>
    );
}