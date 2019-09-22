import React from 'react';

export default function SocialNetworks() {
    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <div style={{marginRight: '30px'}}>
                    <a href="https://www.instagram.com/babadoo_01" target="_blank">
                        <i className="fab fa-instagram icon-default"></i>
                    </a>
                </div>
                <div>
                    <a href="https://www.facebook.com/babadoo.sexyshop" target="_blank">
                        <i className="fab fa-facebook icon-default"></i>
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
}