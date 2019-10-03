import React, { Fragment } from 'react';
import GoogleLogin from 'react-google-login';
import { ProductConsumer } from '../../../../data/contexts/mainContext';
import PropTypes from 'prop-types';

const dataObj = {};

export default function GoogleAuth() {
    const getDataGoogle = (res) => {
        dataObj = {
            isLoggedIn: true,
            userID: res.tokenId,
            name: res.profileObj.familyName, //change to givenName
            email: res.profileObj.email,
            picture: res.profileObj.imageUrl,
        }
        return dataObj;
    }

    const responseGoogle = response => {
        alert(response.profileObj.familyName, response.profileObj.email);
        getDataGoogle(response);

    }

    return (
        <Fragment>
            <ProductConsumer>
                {value => {
                    const { getDataLogin } = value;
                    return(
                        <GoogleLogin
                            clientId={process.env.REACT_APP_SOCIAL_GOOGLE}
                            render={renderProps => (
                              <button
                                className="btn login-btn"
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
                    );
                }}
            </ProductConsumer>
        </Fragment>
    );
}

GoogleAuth.propTypes = {
    getDataLogin: PropTypes.func.isRequired
}

