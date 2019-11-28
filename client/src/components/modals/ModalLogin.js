import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import ToggleVisibilityPassword from '../forms/fields/ToggleVisibilityPassword';
import ButtonMulti from '../buttons/material-ui/ButtonMulti'
// Helpers
import handleChange from '../../utils/form/use-state/handleChange';
import handleChecked from '../../utils/form/use-state/handleChecked';
import clearForm from '../../utils/form/use-state/clearForm';
import detectErrorField from '../../utils/validation/detectErrorField';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions';
import { closeModal, showModalRegister } from '../../redux/actions/modalActions';
import { getUpdatedUsers } from '../../redux/actions/userActions';
import { loginEmail } from '../../redux/actions/authActions';
// Material UI
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// End Material UI

export default function ModalLogin() {
    const [data, setData] = useState({
        name: '', //This is not a field in DB. just for checking either name or email
        email: '',
        password: '',
        needKeepLoggedIn: true
    });
    // detecting field errors
    const [fieldError, setFieldError] = useState(null);
    const errorName = fieldError && fieldError.name;
    const errorEmail = fieldError && fieldError.email;
    const errorPass = fieldError && fieldError.password;
    // end detecting field errors
    // Redux
    // > set state
    const { isModalLoginOpen, isUserAuthenticated, allRegisteredUsersList } = useStoreState(state => ({
        isModalLoginOpen: state.modalReducers.cases.isModalLoginOpen,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        allRegisteredUsersList: state.userReducer.cases.allRegisteredUsersList
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    let { name, email, password, needKeepLoggedIn } = data;

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
            }
        }
        // allow user to logIn with his/her name
        compareNameWithSystem(email);
    }, [isModalLoginOpen, isUserAuthenticated, email]);

    const clearData = () => {
        clearForm(setData, data);
        setFieldError(null);
    }

    const signInThisUser = e => {
        // e.preventDefault();

        const userData = {
            name,
            email,
            password,
            needKeepLoggedIn
        };

        // Attempt to login
        loginEmail(dispatch, userData)
        .then(res => {
            if(res.status !== 200) {
                showSnackbar(dispatch, res.data.msg, 'error');
                // detect field errors
                const objFields = Object.keys(data);
                const foundObjError = detectErrorField(res.data.msg, objFields);
                setFieldError(foundObjError);
                return;
            }
            showSnackbar(dispatch, res.data.msg, 'success');
            clearData();
        })
    };

    // Render
    const showHeader = () => (
        <Fragment>
            <div style={{'display': 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img width="90" height="90" src="img/babadoo-logo_no-slogon.png" alt="loja babadoo"/>
            </div>
            <DialogTitle
                id="form-dialog-title"
                className="text-center"
            >
            ACESSO LOGIN
            <br />
            Entrar com Nome ou Email Cadastrado
            <br/>
            <span className="text-default">
                Seu Primeiro acesso ?{' '}
                <button
                    style={{ padding: '2px 5px', borderRadius: '20px', backgroundColor: 'var(--mainYellow)' }}
                    onClick={() => showModalRegister(dispatch)}
                >
                    Faça seu Cadastro
                </button>
            </span>
            </DialogTitle>

        </Fragment>
    );

    // Form
    const showActionButtons = () => (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 5px 15px' }}>
            <ButtonMulti
                onClick={() => closeModal(dispatch)}
                variant='link'
            >
                Voltar
            </ButtonMulti>
            <ButtonMulti
                onClick={() => {
                    signInThisUser();
                    setTimeout(() => getUpdatedUsers(dispatch), 3000);
                    showSnackbar(dispatch, "Acessando sua conta...");
                }}
                iconFontAwesome="fas fa-paper-plane"
            >
                Entrar
            </ButtonMulti>
        </div>
    );

    const showForm = () => (
        <form style={{ margin: 'auto', width: '80%' }}>
            <TextField
                required
                onChange={handleChange(setData, data)}
                margin="dense"
                error={errorEmail || errorName ? true : false}
                name="email"
                type="email"
                label="Nome ou Email"
                placeholder="Insira nome ou email cadastrado"
                autoFocus
                autoComplete="email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
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
            <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChecked(setData, data)}
                    name="needKeepLoggedIn"
                    checked={Boolean(needKeepLoggedIn)}
                    color="primary"
                    size="medium"
                  />
                }
                label="Manter-se conectado."
            />
            {showActionButtons()}
        </form>
    );

    return (
        <Dialog open={isModalLoginOpen} aria-labelledby="form-dialog-title">
            {showHeader()}
            {showForm()}
        </Dialog>
    );
}
