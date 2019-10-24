import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
import { showModalUnderConstruction, closeModal } from '../../redux/actions/modalActions';
import { getAllProducts } from '../../redux/actions/productActions';
import { clearErrors } from '../../redux/actions/errorActions';
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

ModalLogin.propTypes = {
    isUserAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    login: PropTypes.func,
    clearErrors: PropTypes.func,
    allRegisteredUsersList: PropTypes.arrayOf(PropTypes.string)
}

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
    const { isModalLoginOpen, isUserAuthenticated, error, allRegisteredUsersList } = useStoreState(state => ({
            isModalLoginOpen: state.modalReducers.cases.isModalLoginOpen,
            isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
            error: state.errorReducer.cases,
            allRegisteredUsersList: state.userReducer.cases.allRegisteredUsersList
        }));
    const dispatch = useStoreDispatch();
    // End Redux


    const [data, setData] = useState({
        name: "", //This is not a field. just for checking either name or email
        email: "",
        password: "",
        hasErrorMsg: null
    });

    const { name, email, password } = data;
    const classes = useStyles();

    const compareNameWithSystem = (nameFromEmail) => {
        // if the user name is already registered, then set this name
        if(allRegisteredUsersList.includes(nameFromEmail)) {
            setData({...data, name: nameFromEmail})
        }
    }

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
            closeModal(dispatch);
            setTimeout(() => {
                showSnackbarBlack(dispatch, `Olá de volta!`);
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
    loginEmail(user)(dispatch);
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
            <DialogTitle id="form-dialog-title">Entrar com Nome ou Email</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  {error.msg.msg ? (
                    <span className="text-red text-main-container">{error.msg.msg}</span>
                  ) : "Falta pouco para você entrar na sua conta novamente"}
              </DialogContentText>
              <form onChange={onChange}>
                    <TextField
                      required
                      margin="dense"
                      error={error.msg.msg ? true : false}
                      id="email"
                      name="email"
                      type="email"
                      label="Nome ou Email"
                      autoFocus
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
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '28px'}}>
                        <Button
                                onClick={() => {
                                  closeModal(dispatch);
                                  clearErrors(dispatch);
                              }}
                              color="primary"
                          >
                          Sair
                        </Button>
                        <Button
                              color="primary"
                              className={classes.link}
                              style={{fontSize: '.6em'}}
                              onClick={() => showModalUnderConstruction(dispatch)}
                          >
                          Esqueceu sua senha?
                        </Button>
                        <Button
                              onClick={() => {
                                onSubmit();
                                showSnackbarBlack(dispatch, "Carregando...");
                                getAllProducts(dispatch);
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

