import React, { Fragment } from 'react';

export default function EmptyContent({ text }) {
    return (
        <Fragment>
            <h2 className="text-center text-sub-title-upper">{ text }</h2>
            <div className="container-center">
                <img className="image-center shadow-elevation" src="img/illustrations/empty-content.png" alt="conteúdo da página está vazio"/>
            </div>
        </Fragment>
    );
}