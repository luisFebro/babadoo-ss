// clear object in a react state using hooks
// this prevents data to be keep from data and if to reload, user will user them again.
export default function clearForm(objHook, setObj, newAssignedVal = '') {
    const tempForm = objHook;
    for (let key in tempForm) {
        tempForm[key] = newAssignedVal;
    }
    setObj(tempForm);
}