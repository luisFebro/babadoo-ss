import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';
// MODALS
import Modal from './Modal';
import ModalFavorite from './ModalFavorite';
import UnderConstruction from './UnderConstruction';
// default
import ModalDefault from './ModalDefault';
// auth
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
// confirmation
import ModalChangeTitle from './confirmation/ModalChangeTitle';
// end confirmation
// END MODALS

export default function AllModals() {
    const { currentItemFound } = useStoreState(state => ({
        currentItemFound: state.productReducer.cases.currentItemFound,
    }));
    return (
        <Fragment>
            <Modal />
            <ModalDefault />
            <ModalFavorite />
            <UnderConstruction />
            <ModalLogin />
            <ModalRegister />
            <ModalChangeTitle currItemFound={currentItemFound} />
        </Fragment>
    );
}