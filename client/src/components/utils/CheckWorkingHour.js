import React from 'react';
import { data } from '../../data/dataWorkingHour';
import parse from 'html-react-parser';
import { officialWebsite, whatsapp } from '../../data/dataLinks';

export default function CheckWorkingHour() {
    const checkTodayDay = (weekDays) => {
        let today = "";
        weekDays.forEach((obj, ind) => {
            let date = new Date();
            if(date.getDay() === ind) {
                today = obj.weekDay;
            }
        })
        return today;
    }

    const getHours = (day = checkTodayDay(data)) => {
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
             res = parse(`
                A loja física está aberta!<br />
                Estamos entregando por toda a cidade também.`);
         } else {
            res = parse(`
                Parace que nossa loja física está fechada agora.<br />
                Deixe um recado via <a href=${whatsapp}>Whatsapp</a>...<br />
                Ou faça seu pedido a qualquer hora <a href=${officialWebsite}>por aqui mesmo!</a>`
            );
         }
         return res;
     }

     return (
        <div className="pt-5">
            <span>{checking(getHours[0], getHours[1])}</span>
        </div>
    );
}