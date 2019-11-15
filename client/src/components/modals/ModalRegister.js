import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ToggleVisibilityPassword from '../forms/fields/ToggleVisibilityPassword';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
import { showModalLogin, showModalUnderConstruction, closeModal } from '../../redux/actions/modalActions';
import { setErrorOff } from '../../redux/actions/globalActions';
import { getUpdatedUsers } from '../../redux/actions/userActions';
import { sendWelcomeEmail } from '../../redux/actions/emailActions';
import { registerEmail } from '../../redux/actions/authActions';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// End Material UI

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    media: {
        height: 50,
        width: '50%',
        margin: 'auto'
    }
}));

export default function ModalRegister() {
    // Redux
    const { bizInfo, isModalRegisterOpen, isUserAuthenticated, errorMsg, successMsg } = useStoreState(state => ({
        isModalRegisterOpen: state.modalReducers.cases.isModalRegisterOpen,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        bizInfo: state.businessInfoReducer.cases.businessInfo,
        errorMsg: state.globalReducer.cases.errorMsg,
        successMsg: state.globalReducer.cases.successMsg
    }));
    const dispatch = useStoreDispatch();
    // End Redux
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { bizName, bizWebsite, bizWhatsapp } = bizInfo;
    const { name, email, password } = data;

    const classes = useStyles();

    useEffect(() => {
        if (isModalRegisterOpen) {
            if (isUserAuthenticated) {
                closeModal(dispatch, isModalRegisterOpen);
                sendEmail();
                showSnackbarBlack(dispatch, "Cadastro Realizado com Sucesso via Email!", 3000);
            }
        }
    }, [isUserAuthenticated, isModalRegisterOpen]);

    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const sendEmail = () => {
        const dataEmail = {
            name,
            email,
            bizName,
            bizWebsite,
            bizWhatsapp
        };
        sendWelcomeEmail(dispatch, dataEmail)
        .then(res => {
            if(!res) {
                // the error is displayed in the modal itself so far
            } else {
                showSnackbarBlack(dispatch, res.data.msg, 4000);
            }
        })
    };

    const registerThisUser = e => {
        // e.preventDefault();

        const newUser = {
            name,
            email,
            password
        };
        // Attempt to register NEED TO BE REFACTORED
        registerEmail(newUser)(dispatch);
    };

    return (
        <div>
            <Dialog open={isModalRegisterOpen} aria-labelledby="form-dialog-title">
                <CardMedia className={classes.media} image="img/babadoo-logo_no-slogon.png" title="loja babadoo" />
                <DialogTitle id="form-dialog-title">
                    Registre sua Conta
                    <br />
                    <span className="text-default">
                        ou faça{' '}
                        <button
                            style={{ padding: '2px 5px', borderRadius: '20px', backgroundColor: 'var(--mainYellow)' }}
                            onClick={() => showModalLogin(dispatch)}
                        >
                            Seu Login
                        </button>
                    </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMsg ? <span className="text-red text-main-container">{errorMsg}</span> : 'quase lá!'}
                    </DialogContentText>
                    <form onChange={onChange}>
                        <TextField
                            autoFocus
                            required
                            error={errorMsg ? true : false}
                            margin="dense"
                            id="name"
                            name="name"
                            type="name"
                            label="Nome"
                            fullWidth
                        />
                        <TextField
                            required
                            margin="dense"
                            error={errorMsg ? true : false}
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                            fullWidth
                        />
                        <ToggleVisibilityPassword data={data} onChange={onChange} setData={setData} error={errorMsg} />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
                            <Button
                                onClick={() => {
                                    closeModal(dispatch);
                                    setErrorOff(dispatch);
                                }}
                                color="primary"
                            >
                                Sair
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                className={classes.link}
                                onClick={() => showModalUnderConstruction(dispatch)}
                            >
                                Esqueceu sua senha?
                            </Button>
                            <Button
                                onClick={() => {
                                    registerThisUser();
                                    setTimeout(() => getUpdatedUsers(dispatch), 3000);
                                    showSnackbarBlack(dispatch, "Carregando...");
                                }}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Criar
                                <i className="fas fa-paper-plane" style={{ marginLeft: '5px' }}></i>
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
