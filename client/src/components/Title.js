import React from 'react';

export default function Title({ name = '', title, subTitle }) {
    //Render
    const showSubTitle = subTitle => (
        subTitle &&
        <h4 className="text-sub-title mt-3">
            {subTitle}
        </h4>
    );
    return (
        <div id="inicio" style={{ marginTop: '40px' }} className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h1 className="text-title text-red font-weight-bold">
                    {name} <strong>{title.cap()}</strong>
                </h1>
                {showSubTitle(subTitle)}
            </div>
        </div>
    );
}
