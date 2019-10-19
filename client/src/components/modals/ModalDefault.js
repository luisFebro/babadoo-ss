import React, { Component } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../redux/actions/modalActions';
import { addFieldUser } from '../../redux/actions/userActions';
// End Redux
import { Link } from 'react-router-dom';
import { showSnackbarBlack } from '../../redux/actions/snackbarActions';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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

export default function ModalDefault({ propTitle, propMsg, propTxtBtn, objToSend }) {
    const { isModalDefaultOpen, _idUser } = useStoreState(state => ({
        isModalDefaultOpen: state.modalReducers.cases.isModalDefaultOpen,
        _idUser: state.authReducer.cases.user['_id']
    }));
    const dispatch = useStoreDispatch();

    const setCoupon = () => {
        let data = objToSend;
        addFieldUser(dispatch, data, _idUser);
    }

    const classes = useStyles();
    return (
        <div>
          <Dialog
                style={{zIndex: 1500}}
                open={isModalDefaultOpen}
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
                              setCoupon();
                              showSnackbarBlack(dispatch, `Cupom de Desconto Adicionado!`);
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
