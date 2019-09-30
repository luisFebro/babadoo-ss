import { data } from '../../data/dataWorkingHour';
import parse from 'html-react-parser';
import { officialWebsite, whatsapp } from '../../data/dataLinks';

const checkTodayDay = (weekDays) => {
    let today = "";
    weekDays.forEach((obj, ind) => {
        let date = new Date();
        if (date.getDay() === ind) {
            today = obj.weekDay;
        }
    })
    return today;
}

const getHours = (day = checkTodayDay(data)) => {
    let openHour = 0;
    let closeHour = 0;
    data.forEach(obj => {
        if (obj.weekDay === day) {
            openHour = obj.from;
            closeHour = obj.to;
        }
    })
    return [openHour, closeHour];
}
const checking = (openHour, closeHour) => {
    const hourNow = new Date().getHours();
    let msg = "";
    let isStoreOpened = true;
    if (hourNow >= openHour && hourNow <= closeHour) {
        msg = parse(`
                A loja física está aberta!<br />
                Estamos entregando por toda a cidade também.`);
    } else {
        msg = parse(`
                Parace que nossa loja física está fechada agora.<br />
                Deixe um recado via <a href=${whatsapp}>Whatsapp</a>...<br />
                Ou faça seu pedido a qualquer hora <a href=${officialWebsite}>por aqui mesmo!</a>`);
        isStoreOpened = false;
    }
    return [msg, isStoreOpened];
}

const dataWorkingHour = checking(getHours[0], getHours[1]);

export { dataWorkingHour };