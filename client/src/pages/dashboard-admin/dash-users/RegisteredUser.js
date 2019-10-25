import React, { useRef } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { findAnItem } from '../../../redux/actions/globalActions'
import { showModalConfYesNo } from '../../../redux/actions/modalActions'
import DeleteButton from '../../../components/buttons/DeleteButton';
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

    const animateHinge = () => {
        const currElem = animateRef.current;
        currElem.className += " animated hinge slower";
        // it is required to reinsert the style of the container after applying animation. Otherwise, all style is gone
        currElem.style.cssText = `
            width: 90%;
            border-radius: 10px;
            padding: 20px 10px;
            margin: 15px auto;
            background-color: #f39c12;
            color: #ecf0f1;`;
    }

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
                                animateHinge();
                            }, 6000);
                        }}
                    />) : null
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