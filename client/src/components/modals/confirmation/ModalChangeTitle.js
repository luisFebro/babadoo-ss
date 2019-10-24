import React, { Component, useState } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeModal } from '../../../redux/actions/modalActions';
import { showSnackbarBlack } from '../../../redux/actions/snackbarActions';
import { changeProduct } from '../../../redux/actions/productActions';
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

ModalChangeTitle.propTypes = {
    currItemFound: PropTypes.object,
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

export default function ModalChangeTitle({ currItemFound }) {
    const [newInfo, setNewInfo] = useState("");
    const { isModalConfTitleOpen } = useStoreState(state => ({
        isModalConfTitleOpen: state.modalReducers.cases.isModalConfTitleOpen,
    }));

    let mainItem = currItemFound ? currItemFound.title : null;
    let mainSubject = currItemFound ? currItemFound.mainSubject: null;

    //This is a self-invoked function to attach price to title
    const gotPrice = (() => {
        if(currItemFound) {
            if(currItemFound.nameForm === 'price') {
                mainItem = currItemFound ? (parse(`${currItemFound.title}<br />(R$ ${currItemFound.price})`)) : null;
            }
        }
    })();

    const dispatch = useStoreDispatch();

    const setObjectToSend = () => {
        let data = newInfo;
        const id = currItemFound ? currItemFound._id : null
        changeProduct(dispatch, data, id);
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
                open={isModalConfTitleOpen}
                aria-labelledby="form-dialog-title"
            >
            <CardMedia
                className={classes.media}
                image='img/babadoo-logo_no-slogon.png'
                title='loja babadoo'
            />
            <DialogTitle id="form-dialog-title">
               <span className="text-main-container">{`Alterar ${mainSubject} do Produto`}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                    <span className="text-default">
                        {`Insira o novo ${mainSubject} do atual:`}<br />
                        <strong>{mainItem}</strong>. <br /><br />
                        para...
                    </span>
              </DialogContentText>
            <form onChange={onChange} style={{marginTop: '5px'}}>
                  <TextField
                    required
                    margin="dense"
                    id="changeInfo"
                    name={currItemFound ? currItemFound.nameForm : null}
                    type={currItemFound ? currItemFound.typeForm : null}
                    label={`Novo ${mainSubject} aqui:`}
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
                              setObjectToSend();
                              showSnackbarBlack(dispatch, `${mainSubject} do Item Alterado com Sucesso!`);
                              closeModal(dispatch);
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                        mudar
                        <i className="fas fa-paper-plane" style={{marginLeft: '5px'}}></i>
                      </Button>
                  </div>
              </section>
            </DialogContent>
          </Dialog>
        </div>
    );

}
