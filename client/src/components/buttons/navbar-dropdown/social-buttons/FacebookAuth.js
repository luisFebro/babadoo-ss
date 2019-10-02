import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default class FacebookAuth extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
    }

    responseFacebook = response => {
        alert(`${response.name} ${response.email}`);
    //     this.useState({
    //         isLoggedIn: true,
    //         userID: response.userID,
    //         name: response.name,
    //         email: response.email,
    //         picture: response.picture.data.url
    //     })
    }

    componentClicked = () => {
        console.log("clicked");
    }

    render() {
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (
                <FacebookLogin
                    appId={process.env.REACT_APP_SOCIAL_FACEBOOK}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    render={renderProps => (
                    <button
                        className="btn login-btn"
                        style={{backgroundColor: "#3B5899", margin: 5, display: "block" }}
                        onClick={renderProps.onClick}
                    >
                        <img
                            src="img/icons/buttonslogin/facebook.png"
                            alt="ícone de login do google"
                            className="btn-icon"
                        />
                        <span className="btn-txt">Entrar com <strong>Facebook</strong></span>
                    </button>
                    )}
                />
            );
        }

        return (
            <div>{fbContent}</div>
        );
    }
}
