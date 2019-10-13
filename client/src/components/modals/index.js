import React, { Fragment } from 'react';
// MODALS
import Modal from './Modal';
import ModalFavorite from './ModalFavorite';
import UnderConstruction from './UnderConstruction';
//> auth
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
// END MODALS

export default function AllModals() {
    return (
        <Fragment>
            <Modal />
            <ModalFavorite />
            <UnderConstruction />
            <ModalLogin />
            <ModalRegister />
        </Fragment>
    );
}