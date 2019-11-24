import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ToggleVisibilityPassword from '../forms/fields/ToggleVisibilityPassword';
import detectErrorField from '../../utils/validation/detectErrorField';
import clearForm from '../../utils/form/use-state/clearForm';
import handleChange from '../../utils/form/use-state/handleChange';
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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
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
        password: '',
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
            }
        }
    }, [isUserAuthenticated, isModalRegisterOpen]);

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
            setTimeout(() => showSnackbar(dispatch, res.data.msg, 'warning', 3000), 4000);
        });
    };

    const clearData = () => {
        clearForm(setData, data);
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
            sendEmail();
            clearData();
        })

    };

    // render
    const showHeader = () => (
        <Fragment>
            <div style={{'display': 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img width="90" height="90" src="img/babadoo-logo_no-slogon.png" alt="loja babadoo"/>
            </div>
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
        </Fragment>
    );

    const showForm = () => (
        // n1
        <form style={{ margin: 'auto', width: '80%' }}>
            <TextField
                autoFocus
                required
                onChange={handleChange(setData, data)}
                error={errorName ? true : false}
                margin="dense"
                id="name"
                name="name"
                type="name"
                label="Nome"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
            />
            <TextField
                required
                margin="dense"
                onChange={handleChange(setData, data)}
                error={errorEmail ? true : false}
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
            />
            <ToggleVisibilityPassword
                data={data}
                onChange={handleChange(setData, data)}
                setData={setData}
                error={errorPass}
            />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 5px 15px' }}>
                <Button
                    onClick={() => {
                        closeModal(dispatch);
                        setErrorOff(dispatch);
                    }}
                    color="primary"
                >
                    Voltar
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
                    Criar Conta
                    <i className="fas fa-paper-plane" style={{ marginLeft: '5px' }}></i>
                </Button>
            </div>
        </form>
    );

    return (
        <Dialog open={isModalRegisterOpen} aria-labelledby="form-dialog-title">
            {showHeader()}
            {showForm()}
        </Dialog>
    );
}


/* COMMENTS
n1: LESSON: never put onChange as a standlone prop to check each field. If you are using CheckBox, can conflict and leads to unexpected results.
*/