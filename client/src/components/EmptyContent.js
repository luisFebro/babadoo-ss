import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import { ButtonContainerPressedEffectDark as Dark } from '../components/buttons/Default';

EmptyContent.propTypes = {
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    ActionButton: PropTypes.shape({
        btnName: PropTypes.string,
        title: PropTypes.string,
        to: PropTypes.string,
    })
}
export default function EmptyContent({ text, img, actionButton = {} }) {

    const showActionButton = (actionButton) => {
        const { btnName, title, to } = actionButton;
        return(
            btnName === "dark" &&
            <div className="container-center">
                <HashLink smooth to={to || "/#inicio"}>
                    <Dark className="mt-5">{title}</Dark>
                </HashLink>
            </div>
        );
    }

    return (
        <Fragment>
            <h2 className="text-center text-sub-title-upper">{text}</h2>
            <div className="container-center">
                <img className="image-center shadow-elevation" src={img} alt="conteúdo da página está vazio" />
            </div>
            {showActionButton(actionButton)}
        </Fragment>
    );
}
