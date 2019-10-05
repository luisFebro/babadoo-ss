import React, { useState, Fragment } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import PropTypes from 'prop-types';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// End Material UI
// import { login } from '../../actions/authActions';
// import { clearErrors } from '../../actions/errorActions';

function ModalLogin() {
    const [data, setData] = useState({
        email: "someemail",
        passport: "",
        msg: null
    });
    const { email, password, msg } = data;
    const isModalLoginOpen = useStoreState(state => state.dataModal.showModal.isModalLoginOpen);
    console.log("isModalLoginOpen", isModalLoginOpen);

    const toggleModal = useStoreActions(actions => actions.dataModal.toggleModal);

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

    const user = {
        email,
        password
    };

    // Attempt to login
    // this.props.login(user);
  };

    return (
        <div>
          <Dialog open={isModalLoginOpen} onClose={toggleModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Entrar com Email</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Escolha um email e uma senha.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Seu Email"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Senha"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => toggleModal(!isModalLoginOpen)} color="primary">
                Sair
              </Button>
              <Button onClick={onSubmit} color="primary">
                Entrar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}

ModalLogin.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    isModalLoginOpen: PropTypes.bool,
    // isAuthenticated: PropTypes.bool,
    // error: PropTypes.object.isRequired,
    // login: PropTypes.func.isRequired,
    // clearErrors: PropTypes.func.isRequired
  };

export default ModalLogin;
// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(
//   mapStateToProps,
//   { login, clearErrors }
// )(LoginModal);
