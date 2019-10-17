import React, { Fragment } from 'react';
// MODALS
import Modal from './Modal';
import ModalFavorite from './ModalFavorite';
import UnderConstruction from './UnderConstruction';
// default
import ModalDefault from './ModalDefault';
// auth
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
// END MODALS

export default function AllModals() {
    return (
        <Fragment>
            <Modal />
            <ModalDefault />
            <ModalFavorite />
            <UnderConstruction />
            <ModalLogin />
            <ModalRegister />
        </Fragment>
    );
}