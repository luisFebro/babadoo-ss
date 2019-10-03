import { action } from 'easy-peasy';

const dataLoginModel = {
    //State
    userId: "",
    isLoggedIn: false,
    name: "", //change to givenName
    picture: "",
    email: "",
    //

    //Actions
    showMenuLogin: action((state, payload) => {
        console.log(payload);
        state.isId = payload.tokenId;
        state.isLoggedIn = true;
        state.name = payload.profileObj.familyName; //change to givenName
        state.picture = payload.profileObj.imageUrl;
        state.email = payload.profileObj.email;
    }),

    closeMenuLogin: action((state) => {
        let nav = document.querySelector('#mainNav');
        nav.className="animated zoomOut slower sticky"
        setTimeout(() => {
            nav.style.display = 'none';
            state.isLoggedIn = false;
        }, 1500)
    })
}



//Main store
export const reduxModels = {
    dataLogin: dataLoginModel
}