import React from 'react';
import { data } from '../../data/dataWorkingHour';

export default function CheckWorkingHour() {
    const checkTodayday = (data) => {
        let today = "";
        data.forEach((obj, ind) => {
            let date = new Date();
            if(date.getDay() === ind) {
                today = obj.weekDay;
            }
        })
        return today;
    }

    const getHours = (day = "Domingo") => {
        let openHour = 0;
        let closeHour = 0;
        data.forEach(obj => {
            if(obj.weekDay === day) {
                openHour = obj.from;
                closeHour = obj.to;
            }
        })
        return [openHour, closeHour];
    }
    const checking = (openHour, closeHour) => {
         const hourNow = new Date().getHours();
         let res = "";
         if (hourNow >= openHour && hourNow <= closeHour) {
             res = `Estamos Abertos!`;
         } else {
            res = 'Parace que nossa loja física está fechada agora. ' +
            'Deixe um recado via Whatsapp. Aproveite nossos Acessórios!'
         }
         return res;
     }

     return (
         <span>{checking(getHours[0], getHours[1])}</span>
    );
}