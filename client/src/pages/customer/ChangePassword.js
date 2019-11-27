import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useStyles, makeStyles } from '@material-ui/core/styles'
import Title from '../../components/Title';
import parse from 'html-react-parser';
// Redux
import { useStoreDispatch, useStoreState } from 'easy-peasy';
import { showSnackbar } from '../../redux/actions/snackbarActions'
import { sendNewPasswordLink } from '../../redux/actions/emailActions';
// helpers
import handleChange from '../../utils/form/use-state/handleChange';

// material-ui
import ButtonMulti from '../../components/buttons/material-ui/ButtonMulti';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';

export default function ChangePassword() {
    const [data, setData] = useState({
        email: '',
        needMsgAfterSent: false,
    })
    const { email, needMsgAfterSent } = data;

    // Redux
    const dispatch = useStoreDispatch();
    // End Redux

    const showMsgAfterSent = needMsgAfterSent => (
        needMsgAfterSent &&
        <div className="container-center" style={{'margin': '20px auto', 'width': '80%'}}>
            <p className="text-center text-default animated zoomIn slow">
                Enviado! Se não encontrar na sua caixa de entrada, verifique sua caixa de spam.
                Se ainda não achar, clique em reenviar email abaixo:
            </p><br />
            <ButtonMulti
                onClick={sendEmail}
                variant='link'
            >
                Reenviar Email
            </ButtonMulti>
        </div>
    );

    // Email
    const sendEmail = () => {
        sendNewPasswordLink(dispatch, email)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            showSnackbar(dispatch, res.data.msg, 'success');
        })

        setData({needMsgAfterSent: true})
        showMsgAfterSent();
    };

    // Form
    const showButtonActions = () => (
        <div className="container-center my-4">
            <ButtonMulti
                onClick={sendEmail}
                iconFontAwesome="fas fa-paper-plane"
            >
                Enviar Email
            </ButtonMulti>
        </div>
    );

    const showForm = needMsgAfterSent => (
        !needMsgAfterSent &&
        <form className={!needMsgAfterSent ? "animated zoomIn" : null} style={{'margin': 'auto', 'width': '80%'}}>
            <TextField
                margin="dense"
                onChange={handleChange(setData, data)}
                name="email"
                type="email"
                label="Email"
                placeholder="Insira o email que você cadastrou"
                autoComplete="email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
            />
            {showButtonActions()}
        </form>
    );
    return (
        <div>
            <Title title="Solicitar nova senha" subTitle={parse("Um link de troca de senha será enviado para o seu email cadastrado.<br />O link de recuperação estará disponível por 1 hora antes de expirar.")}/>
            <div>
                <img src="img/illustrations/empty-cart.png" width='100' height='100' alt="change-password"/>
            </div>
            {showForm(needMsgAfterSent)}
            {showMsgAfterSent(needMsgAfterSent)}
        </div>
    );
}
