import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ToggleVisibilityPassword from '../forms/fields/ToggleVisibilityPassword';
import detectErrorField from '../../utils/validation/detectErrorField';
import clearForm from '../../utils/form/clearForm';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';
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
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = data;

    // detecting field errors
    const [fieldError, setFieldError] = useState(null);
    const errorName = fieldError && fieldError.name;
    const errorEmail = fieldError && fieldError.email;
    const errorPass = fieldError && fieldError.password;
    // end detecting field errors

    // Redux
    const { bizInfo, isModalRegisterOpen, isUserAuthenticated } = useStoreState(state => ({
        isModalRegisterOpen: state.modalReducers.cases.isModalRegisterOpen,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        bizInfo: state.adminReducer.cases.businessInfo,
    }));

    // This component is running before fetching bizInfo, that's why this condition until further info
    const bizName = bizInfo && bizInfo.bizName;
    const bizWebsite = bizInfo && bizInfo.bizWebsite;
    const bizWhatsapp = bizInfo && bizInfo.bizWhatsapp;

    const dispatch = useStoreDispatch();
    // End Redux

    const classes = useStyles();

    useEffect(() => {
        if (isModalRegisterOpen) {
            if (isUserAuthenticated) {
                closeModal(dispatch, isModalRegisterOpen);
                sendEmail();
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
            if (res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            setTimeout(() => showSnackbar(dispatch, res.data.msg, 3000), 4000);
        });
    };

    const clearData = () => {
        clearForm(data, setData);
        setFieldError(null);
    }

    const registerThisUser = e => {
        // e.preventDefault();

        const newUser = {
            name,
            email,
            password
        };
        // Attempt to register
        registerEmail(dispatch, newUser)
        .then(res => {
            if(res.status !== 200) {
                showSnackbar(dispatch, res.data.msg, 'error');
                // detect field errors
                const thisModalFields = Object.keys(data);
                const foundObjError = detectErrorField(res.data.msg, thisModalFields);
                setFieldError(foundObjError);
                return;
            }
            showSnackbar(dispatch, res.data.msg, 'success', 4000);
            clearData();
        })

    };

    // render
    const showTitle = () => (
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
    );

    const showForm = () => (
        <form onChange={onChange} style={{margin: 'auto', width: '80%'}}>
            <TextField
                autoFocus
                required
                error={errorName ? true : false}
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
                error={errorEmail ? true : false}
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                fullWidth
            />
            <ToggleVisibilityPassword data={data} onChange={onChange} setData={setData} error={errorPass} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px', marginBotton: '40px' }}>
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
                        showSnackbar(dispatch, 'Registrando...');
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
    );

    return (
        <Dialog open={isModalRegisterOpen} aria-labelledby="form-dialog-title">
            <CardMedia className={classes.media} image="img/babadoo-logo_no-slogon.png" title="loja babadoo" />
            {showTitle()}
            {showForm()}
        </Dialog>
    );
}
