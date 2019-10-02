import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

export default function Main() {
    const stateData = useState({
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: ""
        });
    const [data, setData] = stateData;
    const responseGoogle = (response) => {
      console.log(response);
      // setData({
      //   isLoggedIn: true,
      //   userID: response.userID,
      //   name: response.name,
      //   email: response.email,
      //   picture: response.picture.data.url,

      // });
    }

    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_SOCIAL_GOOGLE}
                render={renderProps => (
                  <button
                    className="menu-btn"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={{backgroundColor: "#CB4024", border: "none", margin: 5, display: "block" }}
                   >
                       <img
                            src="img/icons/buttonslogin/google.png"
                            alt="ícone de login do google"
                            className="btn-icon"
                        />
                       <span className="btn-txt">Entrar com <strong>Google</strong></span>
                   </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}