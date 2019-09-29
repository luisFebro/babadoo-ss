import React from 'react';

export default function GetPeriodOfDay() {
    const getGreeting = () => {
        let hourNow = new Date().getHours();
        let name = "";
        let res = "";
        if (hourNow >= 0 && hourNow <= 5) {
            res = `Boa Madrugada!`;
        } else if (hourNow > 5 && hourNow <= 12) {
            res = `Bom Dia!`;
        } else if (hourNow > 12 && hourNow <= 17) {
            res = `Boa Tarde!`;
        } else {
            res = `Boa Noite!`;
        }
        return res;
    }

    return (
        <span>{getGreeting()}</span>
    );
}