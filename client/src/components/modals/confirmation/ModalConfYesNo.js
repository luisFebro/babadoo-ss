import React, { Component, useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../../redux/actions/modalActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { updateProduct } from '../../../redux/actions/productActions';
import { deleteUser, getUpdatedUsers } from '../../../redux/actions/userActions';
import { deleteProduct, getAllProducts } from '../../../redux/actions/productActions';
// import { animateAnotherComponent } from '../../../redux/actions/animationActions';
// End Redux
import { Link } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';
// End Material UI
import PropTypes from 'prop-types';

ModalConfYesNo.propTypes = {
    currItemFound: PropTypes.shape({
        action: PropTypes.objectOf(PropTypes.string),
        _idUser: PropTypes.string,
        mainSubject: PropTypes.string,
        name: PropTypes.string
    })
};

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    media: {
        height: 50,
        width: '50%',
        margin: 'auto'
    }
}));

export default function ModalConfYesNo({ currItemFound }) {
    const [newInfo, setNewInfo] = useState('');
    const { isModalConfYesNoOpen } = useStoreState(state => ({
        isModalConfYesNoOpen: state.modalReducers.cases.isModalConfYesNoOpen
    }));

    const dispatch = useStoreDispatch();

    const _idUser = currItemFound ? currItemFound._id : null;

    let name;
    if (currItemFound) {
        switch (currItemFound.mainSubject) {
            case 'Usuário':
                name = currItemFound ? currItemFound.name : null;
                break;
            case 'Produto':
                name = currItemFound ? currItemFound.title : null;
                break;
            default:
                console.log('No matching for mainSubject');
        }
    }

    // For any case
    const action = {
        noun: currItemFound ? currItemFound.action.noun : null,
        verb: currItemFound ? currItemFound.action.verb : null
    };
    const mainSubject = currItemFound ? currItemFound.mainSubject : null;
    // End For any case

    const classes = useStyles();
    return (
        <div>
            <Dialog style={{ zIndex: 1500 }} open={isModalConfYesNoOpen} aria-labelledby="form-dialog-title">
                <CardMedia className={classes.media} image="img/babadoo-logo_no-slogon.png" title="loja babadoo" />
                <DialogTitle id="form-dialog-title">
                    <span className="text-main-container">{`Confirmação de ${action.noun} de ${mainSubject}`}</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span className="text-default">
                            {parse(`${action.verb} o ${mainSubject}: <strong>${name}</strong> ?`)}
                            <br />
                        </span>
                    </DialogContentText>

                    <section>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
                            <Button
                                onClick={() => {
                                    closeModal(dispatch);
                                }}
                                color="primary"
                            >
                                NÃO
                            </Button>
                            <Button
                                onClick={() => {
                                    showSnackbar(dispatch, `O ${mainSubject} ${name} foi excluído com sucesso!`, 'success');
                                    closeModal(dispatch);
                                    // animateAnotherComponent(dispatch);
                                    if (currItemFound) {
                                        switch (currItemFound.mainSubject) {
                                            case 'Usuário':
                                                setTimeout(() => {
                                                    deleteUser(dispatch, _idUser);
                                                    getUpdatedUsers(dispatch);
                                                }, 8000);
                                                break;
                                            case 'Produto':
                                                setTimeout(() => {
                                                    deleteProduct(dispatch, _idUser);
                                                    getAllProducts(dispatch);
                                                }, 8000);
                                                break;
                                            default:
                                                console.log('no matching for main Subject');
                                        }
                                    }
                                }}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                SIM
                                <i className="far fa-check-circle" style={{ marginLeft: '5px' }}></i>
                            </Button>
                        </div>
                    </section>
                </DialogContent>
            </Dialog>
        </div>
    );
}
