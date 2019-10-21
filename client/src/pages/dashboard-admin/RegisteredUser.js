import React from 'react';
import styled from 'styled-components';
import { useStoreDispatch } from 'easy-peasy';
import { deleteUser, getUpdatedUsers } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// End Material UI

RegisteredUser.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        favoriteList: PropTypes.arrayOf(PropTypes.object),
        inCartList: PropTypes.arrayOf(PropTypes.object),
        registerDate: PropTypes.string,
    }).isRequired
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    color: 'var(--mainWhite)',
    fontSize: '1.9rem',
  },
  input: {
    display: 'none',
  },
}));


export default function RegisteredUser({ data }) {
    const { _id, name, email, favoriteList, inCartList, registerDate } = data;
    const classes = useStyles();

    const dispatch = useStoreDispatch();

    return (
        <DivWrapper id="container-user" className="text-default" style={{position: 'relative'}}>
            <div>
                <p>Name: {name}</p>
            </div>
            <div>
                <p>Email: {email}</p>
            </div>
            <div>
                <p>Dia do Cadastro: {registerDate}</p>
            </div>
            <section>
                <h2 className="text-default text-center">Totais de Itens do Usuário:</h2>
                <div className="container-center" style={{flexDirection: 'row'}}>
                    <div style={{marginRight: '15px'}}>Totais de Favoritos: <strong>{favoriteList.length}</strong></div>
                    <div>Totais de Items no Carrinho: <strong>{inCartList.length}</strong></div>
                </div>
            </section>
            <div style={{position: 'absolute', top: '-10px', right: '-15px'}}>
                <IconButton
                    onClick={() => {
                        let container = document.querySelector("#container-user");
                        container.classList.add("animated", "hinge", "slower")
                        deleteUser(dispatch, _id);
                        setTimeout(() => {
                            getUpdatedUsers(dispatch);
                        }, 4000)
                }}>
                    <DeleteIcon className={classes.button} aria-label="deletar um usuário" />
                </IconButton>
            </div>
        </DivWrapper>
    );
}

const DivWrapper = styled.div`
    width: 90%;
    border-radius: 10px;
    padding: 20px 10px;
    margin: 15px auto;
    background-color: #f39c12;
    color: #ecf0f1;
`;