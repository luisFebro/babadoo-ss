import React, { useState, Fragment, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSuccessSnackbar } from '../../data/redux/actions/snackbarActions';
import PropTypes from 'prop-types';
import axios from 'axios';


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

export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: 'LOGIN_FAIL'
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


export default function ModalLogin() {
    // Redux
    // > set state
    const { isModalLoginOpen, isUserAuthenticated, error } = useStoreState(state => ({
            isModalLoginOpen: state.modalReducers.cases.isModalLoginOpen,
            isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
            error: state.errorReducer.cases
        }));
    const dispatch = useStoreDispatch();
    // End Redux

    const [data, setData] = useState({
        email: "",
        password: "",
        hasErrorMsg: null
    });

    const { email, password, hasErrorMsg } = data;
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
      if (isModalLoginOpen) {
          if (isUserAuthenticated) {
            dispatch({"type": "TOGGLE_MODAL_LOGIN", "payload": isModalLoginOpen});
            setTimeout(() => {
                dispatch({type: "SHOW_SNACKBAR_SUCCESS", payload: "Seja Bem-Vindo(a)!"})
            }, 3000);
          }
      }
  }, [isModalLoginOpen, isUserAuthenticated, error]);

  // }

  const onChange = e => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
  };

  const onSubmit = e => {
    // e.preventDefault();

    const user = {
        email,
        password
    };

    // Attempt to login
    login(user)(dispatch);
  };

    return (
        <div>
          <Dialog
                open={isModalLoginOpen}
                aria-labelledby="form-dialog-title"
            >
            <CardMedia
                className={classes.media}
                image='img/babadoo-logo_no-slogon.png'
                title='loja babadoo'
            />
            <DialogTitle id="form-dialog-title">Entrar com Email</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  {error.msg.msg ? (
                    <span className="text-red text-main-container">{error.msg.msg}</span>
                  ) : "Bem-Vindo(a) de volta!"}
              </DialogContentText>
              <form onChange={onChange}>
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
                      autoComplete="senha"
                      fullWidth
                    />
                    <div style={{marginTop: '28px'}}>
                        <Button
                              color="primary"
                              className={classes.link}
                              style={{fontSize: '.6em'}}
                              onClick={() => dispatch({ type: 'SHOW_MODAL_UNDER_CONSTRUCTION', payload: true })}
                          >
                          Esqueceu sua senha?
                        </Button>
                        <Button
                                onClick={() => {
                                  dispatch({type: 'TOGGLE_MODAL_LOGIN', payload: isModalLoginOpen})
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
