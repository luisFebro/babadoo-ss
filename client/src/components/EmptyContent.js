import React, { Fragment } from 'react';

export default function EmptyContent({ text }) {
    return (
        <Fragment>
            <h2 className="text-center text-sub-title-upper">{ text }</h2>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img style={{height: 'auto', width: '90%'}} className="shadow-elevation" src="img/illustrations/empty-content.png" alt="conteúdo da página está vazio"/>
            </div>
        </Fragment>
    );
}