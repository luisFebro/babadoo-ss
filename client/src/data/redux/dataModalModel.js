import { action } from 'easy-peasy';

export const dataModalModel = {
    //State
    isModalOpen: false,
    //

    //Actions
    showModal: action((state, payload) => {
        state.isModalOpen = payload;
    }),

    toggleModal: action((state, payload) => {
        state.isModalOpen = payload;
    }),
    //

    closeModal: action((state, payload) => {
        state.isModalOpen = payload;
    }),
}