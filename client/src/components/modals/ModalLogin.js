import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToggleVisibilityPassword from '../forms/fields/ToggleVisibilityPassword';
import parse from 'html-react-parser';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import { showModalUnderConstruction, closeModal } from '../../redux/actions/modalActions';
import { getUpdatedUsers } from '../../redux/actions/userActions';
import { setErrorOff } from '../../redux/actions/globalActions';
import { loginEmail } from '../../redux/actions/authActions';
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
        margin: theme.spacing(1)
    },
    media: {
        height: 50,
        width: '50%',
        margin: 'auto'
    }
}));

export default function ModalLogin() {
    // Redux
    // > set state
    const { isModalLoginOpen, isUserAuthenticated, errorMsg, allRegisteredUsersList } = useStoreState(state => ({
        isModalLoginOpen: state.modalReducers.cases.isModalLoginOpen,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        errorMsg: state.globalReducer.cases.errorMsg,
        allRegisteredUsersList: state.userReducer.cases.allRegisteredUsersList
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    const [data, setData] = useState({
        name: '', //This is not a field in DB. just for checking either name or email
        email: '',
        password: '',
        showPassword: false,
        hasErrorMsg: null
    });

    let { name, email, password } = data;
    const classes = useStyles();

    // Check and insert "name" key to the request body
    const compareNameWithSystem = nameFromEmail => {
        // if the user name is already registered, then set this name
        if (allRegisteredUsersList.includes(nameFromEmail)) {
            setData({ ...data, name: nameFromEmail });
        }
    };

    // If authenticated, close modal and salute user
    useEffect(() => {
        if (isModalLoginOpen) {
            if (isUserAuthenticated) {
                closeModal(dispatch);
                setTimeout(() => {
                    showSnackbar(dispatch, `Olá de volta, ${window.Helper.textCapi(name)}!`, 'success');
                }, 3000);
            }
        }
        compareNameWithSystem(email);
    }, [isModalLoginOpen, isUserAuthenticated, email]);

    // }

    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const onSubmit = e => {
        // e.preventDefault();

        const user = {
            name,
            email,
            password
        };

        // Attempt to login
        loginEmail(dispatch, user);
    };

    return (
        <div>
            <Dialog open={isModalLoginOpen} aria-labelledby="form-dialog-title">
                <CardMedia className={classes.media} image="img/babadoo-logo_no-slogon.png" title="loja babadoo" />
                <DialogTitle id="form-dialog-title">Entrar com Nome ou Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMsg ? (
                            <span className="text-red text-main-container">{errorMsg}</span>
                        ) : (
                            'Falta pouco para você entrar na sua conta novamente'
                        )}
                    </DialogContentText>
                    <form>
                        <TextField
                            required
                            onChange={onChange}
                            margin="dense"
                            error={errorMsg ? true : false}
                            id="email"
                            name="email"
                            type="email"
                            label="Nome ou Email"
                            autoFocus
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
                                color="primary"
                                className={classes.link}
                                style={{ fontSize: '.6em' }}
                                onClick={() => showModalUnderConstruction(dispatch)}
                            >
                                Esqueceu sua senha?
                            </Button>
                            <Button
                                onClick={() => {
                                    onSubmit();
                                    setTimeout(() => getUpdatedUsers(dispatch), 3000);
                                    showSnackbar(dispatch, 'Carregando...');
                                }}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Entrar
                                <i className="fas fa-paper-plane" style={{ marginLeft: '5px' }}></i>
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
