import React from 'react';
import IconButton from "./IconButton";
import GradientButton from "./GradientButton";
import { dataButtonsLogin } from "../../../data/dataButtonsLogin";

export default function ButtonList() {
    return dataButtonsLogin.map(app => {
        if (app.colors)
            return <GradientButton app={app} key={app.name} />;

        return (
            <IconButton app={app} key={app.name} />
        );
    });
}