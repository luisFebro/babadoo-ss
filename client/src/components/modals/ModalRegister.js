import React, { useState, Fragment, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import axios from 'axios';
import PropTypes from 'prop-types';
// Material UI
import { SnackbarBlack } from '../snackbars/SnackbarBlack';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// End Material UI
// import { register } from '../../actions/authActions';

// Redux Actions
const returnErrors = (msg, status, id = null) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status, id }
  };
};

const clearErrors = (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' });
};

// Register User
const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });
    // json ready to Go Internet - exemple:
    // {"name":"Luis Febro","email":"mr.febro@gmail.com","password":"12345678910"}

    axios
        .post('/api/users', body, config)
        .then(res =>
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        )
      .catch(err => {
        console.log("ERRORresponse.data", err.response.data, err.response.status);
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
          type: 'REGISTER_FAIL'
        });
      });
};

// End Redux Actions

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
    // > set state
    const { isModalRegisterOpen, isAuthenticated } = useStoreState(state => ({
        isModalRegisterOpen: state.modalReducers.cases.isModalRegisterOpen,
        isAuthenticated: state.authReducer.cases.isAuthenticated,
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        hasErrorMsg: null
    });

    const { name, email, password, hasErrorMsg } = data;
    const classes = useStyles();


    // componentDidUpdate(prevProps) {
    //   const { error, isAuthenticated } = this.props;
    //   if (error !== prevProps.error) {
    //     // Check for register error
    //     if (error.id === 'LOGIN_FAIL') {
    //       this.setState({ msg: error.msg.msg });
    //     } else {
    //       this.setState({ msg: null });
    //     }
    //   }

    // If authenticated, close modal
    useEffect(() => {
        if (isModalRegisterOpen) {
            if (isAuthenticated) {
              dispatch({"type": "TOGGLE_MODAL_REGISTER", "payload": isModalRegisterOpen});
              console.log("dispatched from useEffect hook")
            }
        }
    }, [isModalRegisterOpen, isAuthenticated]);

    // }

    const onChange = e => {
        //updating the obj keys
        //   let test = {
        //       color: "",
        //       color: "red",
        //   }
        //   console.log("color", test.color); //red
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log(setData({ ...data, [name]: value }));
    };

    const onSubmit = e => {
        // e.preventDefault();

        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        register(newUser)(dispatch);
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
                {hasErrorMsg ? (
                  alert(hasErrorMsg)
                ) : "quase lá!"}
              </DialogContentText>
              <form onChange={onChange}>
                  <TextField
                    margin="dense"
                    id="name"
                    name="name"
                    type="name"
                    label="Nome"
                    fullWidth
                  />
                    <TextField
                      margin="dense"
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      fullWidth
                    />
                    <TextField
                      margin="dense"
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
                              style={{fontSize: '.6em'}}
                              onClick={() => dispatch({ type: 'SHOW_MODAL_UNDER_CONSTRUCTION', payload: true })}
                          >
                          Esqueceu sua senha?
                        </Button>
                        <Button
                              onClick={() => {
                                dispatch({type: 'TOGGLE_MODAL_REGISTER', payload: isModalRegisterOpen})
                                clearErrors(dispatch);
                            }}
                              color="primary"
                          >
                          Sair
                        </Button>
                        <Button
                              onClick={() => {
                                onSubmit();
                                setTimeout(() => {
                                    alert("Cadastro Realizado com Sucesso!");
                                }, 3000);
                              }}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                          >
                          Entrar
                          <i className="fas fa-paper-plane" style={{marginLeft: '5px'}}></i>
                        </Button>
                    </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
    );
}

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(
//   mapStateToProps,
//   { login, clearErrors }
// )(LoginModal);