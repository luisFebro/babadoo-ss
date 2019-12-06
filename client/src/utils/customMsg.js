import { getRandomArray } from './getRandomArray';

const customMsg = (mainSubject, name = "NeedCustomWord") => {
    name = name.cap();
    const data = [
    `Opa, ${mainSubject} com sucesso, ${name}!`,
    `${name}, ${mainSubject} com sucesso!`,
    `${mainSubject} com sucesso!`,
    `${mainSubject}!`,
    `${mainSubject}, ${name}!`,
    `Mais um ${mainSubject}`,

    ];
    const pickedMsg = getRandomArray(data)[0];
    const needThrowErr = pickedMsg.includes('NeedCustomWord');
    if(needThrowErr) throw new Error('It is required a customized string');

    return pickedMsg;
}

export default customMsg;


