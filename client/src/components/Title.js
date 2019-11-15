import React from 'react';

export default function Title({ name = '', title }) {
    return (
        <div id="inicio" style={{ marginTop: '60px' }} className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-capitalize text-title text-red font-weight-bold">
                    {name} <strong>{title}</strong>
                </h1>
            </div>
        </div>
    );
}
