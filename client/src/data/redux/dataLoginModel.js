import { action } from 'easy-peasy';

export const dataLoginModel = {
    //State
    userId: "",
    isLoggedIn: false,
    name: "", //change to givenName
    picture: "",
    email: "",
    //

    //Actions
    showMenuBarLogin: action((state, payload) => {
        console.log(payload);
        const socialProvider = payload[1].name;
        payload = payload[0];
        switch (socialProvider) {
            case "google":
                state.isId = payload.tokenId;
                state.isLoggedIn = true;
                state.name = payload.profileObj.familyName; //change to givenName
                state.picture = payload.profileObj.imageUrl;
                state.email = payload.profileObj.email;
                break;
            case "facebook":
                state.isId = payload.accessToken;
                state.isLoggedIn = true;
                state.name = payload.name; //change to givenName
                state.picture = payload.picture.data.url;
                state.email = payload.email;
            default:
                console.log("There is something wrong with the provider")
        }

    }),

    closeMenuLogin: action((state, payload) => {
        let nav = document.querySelector('#mainNav');
        nav.className="animated zoomOut slower sticky"
        state.isLoggedIn = false;
        setTimeout(() => {
            nav.style.display = 'none';
        }, 1500)
    })
}
