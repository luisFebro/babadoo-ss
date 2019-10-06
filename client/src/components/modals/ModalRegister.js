import React, { useState, Fragment } from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
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
// import { clearErrors } from '../../actions/errorActions';

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
    const isModalRegisterOpen = useStoreState(state => state.modalReducers.cases.isModalRegisterOpen);
    const dispatch = useStoreDispatch();
    // End Redux

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        hasErrorMsg: null
    });

    const { email, password, hasErrorMsg } = data;
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
  //   if (this.state.modal) {
  //     if (isAuthenticated) {
  //       this.toggle();
  //     }
  //   }
  // }

  // const toggle = () => {
    // Clear errors
    // this.props.clearErrors();
    // setData({
    //   modal: !data.modal
    // });
  // };

  const onChange = e => {
    setData({ [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
        email,
        password
    };

    // Attempt to login
    // this.props.register(newUser);
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
                  alert(data.msg)
                ) : "quase lá!"}
              </DialogContentText>
              <form onSubmit={onSubmit}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    type="name"
                    label="Nome"
                    fullWidth
                    onChange={onChange}
                  />
                    <TextField
                      margin="dense"
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      fullWidth
                      onChange={onChange}
                    />
                    <TextField
                      margin="dense"
                      id="password"
                      name="password"
                      type="password"
                      label="Senha"
                      fullWidth
                      onChange={onChange}
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
                              onClick={() => dispatch({type: 'TOGGLE_MODAL_REGISTER', payload: isModalRegisterOpen})}
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
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(
//   mapStateToProps,
//   { login, clearErrors }
// )(LoginModal);
