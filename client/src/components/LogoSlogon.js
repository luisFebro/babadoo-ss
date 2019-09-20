import React from 'react';

const LogoSlogon = () => {
    return (
        <div className="container">
            <div className="row">
                <div style={{ zIndex: 50 }} className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                    <img
                        style={{
                            position: 'relative',
                            zIndex: 150,
                            width: '190px',
                            height: '190px'
                        }}
                        src="img/babadoo-logo_no-slogon.png"
                        alt="logo-babadoo"
                    />
                    <h1>
                        <strong>lingeries e acessórios eróticos</strong>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default LogoSlogon;
