import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
import { showModalUnderConstruction, toggleModalRegister } from '../../redux/actions/modalActions';
import { clearErrors } from '../../redux/actions/errorActions';
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
    },
    media: {
        height: 50,
        width: '50%',
        margin: 'auto'
    }
}));


export default function ModalRegister() {
    // Redux
    const { isModalRegisterOpen, isUserAuthenticated, error } = useStoreState(state => ({
        isModalRegisterOpen: state.modalReducers.cases.isModalRegisterOpen,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        error: state.errorReducer.cases
    }));
    const dispatch = useStoreDispatch();
    // End Redux
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        hasErrorMsg: null
    });

    const { name, email, password } = data;
    const classes = useStyles();

    // componentDidUpdate(prevProps) {
    //   const { error, isUserAuthenticated } = this.props;
    //   if (error !== prevProps.error) {
    //     // Check for register error
        // if (error.id === 'LOGIN_FAIL') {
        //   this.setState({ msg: error.msg.msg });
        // } else {
        //   this.setState({ msg: null });
        // }
    //   }

    // If authenticated, close modal
    useEffect(() => {
        // Check for register error
        // if (error.id === 'LOGIN_FAIL') {
        //   setData({ msg: error.msg.msg });
        // } else {
        //   setData({ msg: null });
        // }
        //
        if (isModalRegisterOpen) {
            if (isUserAuthenticated) {
              toggleModalRegister(dispatch, isModalRegisterOpen);
              setTimeout(() => {
                showSnackbarBlack(dispatch, "Cadastro Realizado com Sucesso via Email!");
              })
            }
        }

    }, [isUserAuthenticated, isModalRegisterOpen]);


    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        //updating the obj keys
        //   let test = {
        //       color: "",
        //       color: "red",
        //   }
        //   console.log("color", test.color); //red
    };

    const onSubmit = e => {
        // e.preventDefault();

        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        registerEmail(newUser)(dispatch);
    };

    return (
        <div>
          <Dialog
                open={isModalRegisterOpen}
                aria-labelledby="form-dialog-title"
            >
            <CardMedia
                className={classes.media}
                image='img/babadoo-logo_no-slogon.png'
                title='loja babadoo'
            />
            <DialogTitle id="form-dialog-title">Registre sua Conta</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {error.msg.msg ? (
                  <span className="text-red text-main-container">{error.msg.msg}</span>
                ) : "quase lá!"}
              </DialogContentText>
              <form onChange={onChange}>
                  <TextField
                    required
                    error={error.msg.msg ? true : false}
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
                      error={error.msg.msg ? true : false}
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      fullWidth
                    />
                    <TextField
                      required
                      margin="dense"
                      error={error.msg.msg ? true : false}
                      id="password"
                      name="password"
                      type="password"
                      label="Senha"
                      fullWidth
                    />
                    <div style={{marginTop: '28px'}}>
                        <Button
                              type="submit"
                              color="primary"
                              className={classes.link}
                              onClick={() => showModalUnderConstruction(dispatch) }
                          >
                          Esqueceu sua senha?
                        </Button>
                        <Button
                              onClick={() => {
                                toggleModalRegister(dispatch, isModalRegisterOpen);
                                clearErrors(dispatch);
                            }}
                              color="primary"
                          >
                          Sair
                        </Button>
                        <Button
                              onClick={() => {
                                onSubmit();
                                showSnackbarBlack(dispatch, "Carregando...");
                              }}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                          >
                          Criar
                          <i className="fas fa-paper-plane" style={{marginLeft: '5px'}}></i>
                        </Button>
                    </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
    );
}

ModalRegister.propTypes = {
    showSnackbarBlack: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    register: PropTypes.func,
    clearErrors: PropTypes.func,
}

