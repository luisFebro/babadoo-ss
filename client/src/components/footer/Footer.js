import React from 'react';
import SocialNetworks from './SocialNetworks';
const Footer = () => {
    return (
        <footer className="container-fluid mt-5">
            <p className="text-sub-title text-center pt-4 pb-1">Siga a Gente nas Redes Sociais</p>
            <SocialNetworks />
            <div className="row">
                <div className="col-10 mx-auto text-center p-1">
                    <strong><p>Babadoo</p> Lingerie e produtos eróticos <p>{new Date().getFullYear()}</p></strong>
                    <br />
                    Manaus - Amazonas
                </div>
            </div>
        </footer>
    );
};

export default Footer;
