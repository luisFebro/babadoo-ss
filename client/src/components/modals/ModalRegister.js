import React, { useState, Fragment, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import axios from 'axios';
import PropTypes from 'prop-types';
// Material UI
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

    const { name, email, password, hasErrorMsg } = data;
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
              dispatch({"type": "TOGGLE_MODAL_REGISTER", "payload": isModalRegisterOpen});
              setTimeout(() => {
                  alert("Cadastro Realizado com Sucesso!");
              }, 3000);
            }
        }
    }, [isModalRegisterOpen, isUserAuthenticated, error]);

    // }

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
                              onClick={onSubmit}
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
//   isUserAuthenticated: state.auth.isUserAuthenticated,
//   error: state.error
// });

// export default connect(
//   mapStateToProps,
//   { login, clearErrors }
// )(LoginModal);