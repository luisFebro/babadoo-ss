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
import ModalConfYesNo from './confirmation/ModalConfYesNo';
// end confirmation
// END MODALS

export default function AllModals() {
    const { currentItemFound } = useStoreState(state => ({
        currentItemFound: state.globalReducer.cases.currentItemFound,
    }));
    // Checkingthe right places to send data to confirmation modals
    let ItemsYesNo = null, ItemsField = null, checkCondition = null;
    if(currentItemFound) {
        checkCondition = (currentItemFound.mainSubject === 'Preço' || currentItemFound.mainSubject === 'Título');
    }
    if(checkCondition) {
        ItemsField = currentItemFound;
    } else {
        ItemsYesNo = currentItemFound;
    }


    return (
        <Fragment>
            <Modal />
            <ModalDefault />
            <ModalFavorite />
            <UnderConstruction />
            <ModalLogin />
            <ModalRegister />
            <ModalChangeTitle currItemFound={ItemsField} />
            <ModalConfYesNo currItemFound={ItemsYesNo} />
        </Fragment>
    );
}