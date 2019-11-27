import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useStyles, makeStyles } from '@material-ui/core/styles'
import Title from '../../components/Title';
import parse from 'html-react-parser';
// Redux
import { useStoreDispatch, useStoreState } from 'easy-peasy';
import { changePassword } from '../../redux/actions/authActions';
import { showSnackbar } from '../../redux/actions/snackbarActions'
import { showModalLogin } from '../../redux/actions/modalActions';
// helpers
import handleChange from '../../utils/form/use-state/handleChange';
import getFirstQueryValue from '../../utils/urls/getFirstQueryValue';

// material-ui
import ToggleVisibilityPassword from '../../components/forms/fields/ToggleVisibilityPassword';
import ButtonMulti from '../../components/buttons/material-ui/ButtonMulti';
import TextField from '@material-ui/core/TextField';

export default function ChangePassword({ location, match }) {
    const [data, setData] = useState({
        password: '',
        needRedirectToLogin: false,
        userId: getFirstQueryValue(location.search),
        authToken: match.params.token,
    })
    const { password, needRedirectToLogin, userId, authToken } = data;

    // Redux
    const dispatch = useStoreDispatch();
    // End Redux

    // const redirectToLogin = needRedirectToLogin => (
    //     //<Redirect to="/" />
    // );

    // password
    const handlePassword = () => {
        const bodyPass = {
            password,
            authToken
        }
        changePassword(bodyPass, userId)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error');
            showSnackbar(dispatch, res.data.msg, 'success');
            setTimeout(() => showModalLogin(dispatch), 5000);
            setTimeout(() => showSnackbar(dispatch, "Faça o seu login com sua nova senha"), 8000);
            setData({needRedirectToLogin: true})
            // redirectToLogin();
        })
    };

    // Form
    const showButtonActions = () => (
        <div className="container-center my-4">
            <ButtonMulti
                onClick={handlePassword}
                iconFontAwesome="fas fa-password"
            >
                Trocar Senha
            </ButtonMulti>
        </div>
    );

    const showForm = needRedirectToLogin => (
        !needRedirectToLogin &&
        <form className={!needRedirectToLogin ? "animated zoomIn" : null} style={{'margin': 'auto', 'width': '80%'}}>
            <ToggleVisibilityPassword
                data={data}
                setData={setData}
                onChange={handleChange(setData, data)}
                error={null}
                label="Nova Senha aqui. Pelo menos 6 characteres."
                showForgotPass={false}
            />
            {showButtonActions()}
        </form>
    );
    return (
        <div>
            <Title title="Insira sua nova senha"/>
            {showForm(needRedirectToLogin)}
            {/*redirectToLogin(needRedirectToLogin)*/}
        </div>
    );
}
