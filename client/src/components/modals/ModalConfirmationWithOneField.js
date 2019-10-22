import React, { Component, useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../redux/actions/modalActions';
import { changeProduct } from '../../redux/actions/productActions';
// End Redux
import { Link } from 'react-router-dom';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

ModalDefault.propTypes = {
    propTitle: PropTypes.string,
    propMsg: PropTypes.string,
    propTxtBtn: PropTypes.string,
    objToSend: PropTypes.object,
    closeAnimation: PropTypes.func
}
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

export default function ModalDefault({ propTitle, propMsg, propTxtBtn, keyToChange, label, _idProduct }) {
    const [newInfo, setNewInfo] = useState("");
    const { isModalConfOneFieldOpen } = useStoreState(state => ({
        isModalConfOneFieldOpen: state.modalReducers.cases.isModalConfOneFieldOpen,
    }));
    const dispatch = useStoreDispatch();

    const setObjectToSend = () => {
        let data = {[`${keyToChange}`]: newInfo};
        changeProduct(dispatch, data, _idProduct);
    }

    const onChange = e => {
      const { name, value } = e.target;
      setNewInfo({ ...newInfo, [name]: value });
    };

    const classes = useStyles();
    return (
        <div>
          <Dialog
                style={{zIndex: 1500}}
                open={isModalConfOneFieldOpen}
                aria-labelledby="form-dialog-title"
            >
            <CardMedia
                className={classes.media}
                image='img/babadoo-logo_no-slogon.png'
                title='loja babadoo'
            />
            <DialogTitle id="form-dialog-title">{propTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                    <span className="text-main-container">{propMsg}</span>
              </DialogContentText>
              <form onChange={onChange}>
                    <TextField
                      required
                      margin="dense"
                      id="changeInfo"
                      name="changeInfo"
                      type="changeInfo"
                      label={label}
                      autoFocus
                      autoComplete="changeInfo"
                      fullWidth
                    />
                </form>
              <section>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '28px'}}>
                      <Button
                              onClick={() => {
                                closeModal(dispatch);
                            }}
                            color="primary"
                        >
                        Sair
                      </Button>
                      <Button
                            onClick={() => {
                              showSnackbarBlack(dispatch, `Alterando...`);
                              setObjectToSend();
                              showSnackbarBlack(dispatch, `Alterado com sucesso!`);
                              closeModal(dispatch);
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                        {propTxtBtn}
                        <i className="fas fa-paper-plane" style={{marginLeft: '5px'}}></i>
                      </Button>
                  </div>
              </section>
            </DialogContent>
          </Dialog>
        </div>
    );

}
