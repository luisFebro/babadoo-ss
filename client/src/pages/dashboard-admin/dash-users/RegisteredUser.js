import React, { useRef } from 'react';
import styled from 'styled-components';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { findAnItem } from '../../../redux/actions/globalActions'
import { showModalConfYesNo, showModalTextField } from '../../../redux/actions/modalActions'
import { animateHinge } from '../../../redux/actions/animationActions'
// End Redux
import DeleteButton from '../../../components/buttons/DeleteButton';
import MessageButton from '../../../components/buttons/MessageButton';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
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
    const animateRef = useRef(null);
    const { updatedUsers, setAnimationTimer } = useStoreState(state => ({
        updatedUsers: state.userReducer.cases.updatedUsers,
        setAnimationTimer: state.animationReducer.cases.setAnimationTimer
    }));
    const { _id, name, email, favoriteList, inCartList, registerDate } = data;
    const classes = useStyles();
    const dispatch = useStoreDispatch();

    return (
        <DivWrapper ref={animateRef} className="text-default" style={{position: 'relative'}}>
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
            <div>
                {name !== "admin" ? (
                    <div>
                        <MessageButton
                            top={-20}
                            left={190}
                            onClick={() => {
                                const attachedObj = {
                                    propTitle: "Envio de Mensagem Instantânea",
                                    propSubTitle: "Enviar mensagem para usuário",
                                    propTxtBtn: "Enviar",
                                    mainSubject: "Mensagem",
                                    objToSend: {

                                    }
                                }
                                findAnItem(dispatch, updatedUsers, _id, attachedObj);
                                showModalTextField(dispatch);
                            }}
                        />
                        <DeleteButton
                            top={-20}
                            left={245}
                            onClick={() => {
                                const attachedObj = {
                                    action: {
                                        noun: "Exclusão",
                                        verb: "Excluir"
                                    },
                                    mainSubject: "Usuário",
                                }
                                findAnItem(dispatch, updatedUsers, _id, attachedObj);
                                showModalConfYesNo(dispatch);
                                setTimeout(() => {
                                    const cssText = `
                                        width: 90%;
                                        border-radius: 10px;
                                        padding: 20px 10px;
                                        margin: 15px auto;
                                        background-color: #f39c12;
                                        color: #ecf0f1;`;
                                    animateHinge(animateRef, cssText);
                                }, 9000);
                            }}
                        />
                    </div>
                    ) : null
                }
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