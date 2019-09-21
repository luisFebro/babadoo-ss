import EmailIcon from "img/icons/buttonslogin/email.png";
import GoogleIcon from "img/icons/buttonslogin/google.png";
import FacebookIcon from "img/icons/buttonslogin/facebook.png";
import InstagramIcon from "img/icons/buttonslogin/instagram.png";

export const dataButtonsLogin = [
    {
        img: EmailIcon,
        name: "seu email",
        href: "/",
        alt: "email cliente",
        color: "grey",
        title: "Entrar com seu Email"
    },
    {
        img: GoogleIcon,
        name: "google",
        href: "auth/google",
        alt: "google-icon",
        color: "#CB4024",
        title: "Entrar com Google"
    },
    {
        img: FacebookIcon,
        name: "facebook",
        href: "auth/facebook",
        alt: "facebook-icon",
        color: "#3B5899",
        title: "Entrar com Facebook"
    },
    {
        img: InstagramIcon,
        name: "instagram",
        href: "auth/instagram",
        alt: "instagram-icon",
        colors: {
            leftBot: "#fec564",
            leftTop: "#5258cf",
            rightTop: "#893dc2",
            rightBot: "#d9317a",
            baseCoat:
                "linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)"
        },
        color: "#d9317a",
        title: "Entrar com Instagram"
    }
];
