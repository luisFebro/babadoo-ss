import React, { Component, useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../../redux/actions/modalActions';
import { showSnackbarBlack } from '../../../redux/actions/snackbarActions';
import { changeProduct } from '../../../redux/actions/productActions';
import { deleteUser, getUpdatedUsers } from '../../../redux/actions/userActions';
// End Redux
import { Link } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';
// End Material UI
import PropTypes from 'prop-types';

ModalConfYesNo.propTypes = {
    currItemFound: PropTypes.shape({
        action: PropTypes.objectOf(PropTypes.string),
        _idUser: PropTypes.string,
        mainSubject: PropTypes.string,
        name: PropTypes.string.isRequired,
    }),
}

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

export default function ModalConfYesNo({ currItemFound }) {
    const [newInfo, setNewInfo] = useState("");
    const { isModalConfYesNoOpen } = useStoreState(state => ({
        isModalConfYesNoOpen: state.modalReducers.cases.isModalConfYesNoOpen,
    }));

    const dispatch = useStoreDispatch();

    const action = {
        noun: currItemFound ? currItemFound.action.noun : null,
        verb: currItemFound ? currItemFound.action.verb : null,
    }
    const mainSubject = currItemFound ? currItemFound.mainSubject : null;
    let name;
    if(typeof name !== 'undefined') {
        name = currItemFound ? currItemFound.name : null;
    } else {
        name = currItemFound ? currItemFound.title : null;
    }

    const classes = useStyles();
    return (
        <div>
          <Dialog
                style={{zIndex: 1500}}
                open={isModalConfYesNoOpen}
                aria-labelledby="form-dialog-title"
            >
            <CardMedia
                className={classes.media}
                image='img/babadoo-logo_no-slogon.png'
                title='loja babadoo'
            />
            <DialogTitle id="form-dialog-title">
               <span className="text-main-container">{`Confirmação de ${action.noun} de ${mainSubject}`}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                    <span className="text-default">
                        {parse(`${action.verb} o ${mainSubject}: <strong>${name}</strong> ?`)}<br />
                    </span>
              </DialogContentText>

              <section>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '28px'}}>
                      <Button
                              onClick={() => {
                                closeModal(dispatch);
                            }}
                            color="primary"
                        >
                        NÃO
                      </Button>
                      <Button
                            onClick={() => {
                                let _idUser = currItemFound ? currItemFound._id : null
                                showSnackbarBlack(dispatch, `O ${mainSubject} ${currItemFound ? currItemFound.mainField : null} excluído com sucesso!`);
                                deleteUser(dispatch, _idUser);
                                closeModal(dispatch);
                                setTimeout(() => {
                                    getUpdatedUsers(dispatch);
                                }, 4000);
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                        SIM
                        <i className="far fa-check-circle" style={{marginLeft: '5px'}}></i>
                      </Button>
                  </div>
              </section>
            </DialogContent>
          </Dialog>
        </div>
    );

}
