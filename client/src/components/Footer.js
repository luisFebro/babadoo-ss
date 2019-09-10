import React from 'react';

const Footer = () => {
    return (
        <footer className="container-fluid mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center p-1">
                    <strong>Babadoo - lingerie e produtos eróticos {new Date().getFullYear()}</strong>
                    <br />Manaus - Amazonas
                </div>
            </div>
        </footer>
    )
}

export default Footer;