import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

EmptyContent.propTypes = {
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
}
export default function EmptyContent({ text, img }) {
    return (
        <Fragment>
            <h2 className="text-center text-sub-title-upper">{text}</h2>
            <div className="container-center">
                <img className="image-center shadow-elevation" src={img} alt="conteúdo da página está vazio" />
            </div>
        </Fragment>
    );
}
