import React, { useState, useEffect, Fragment } from 'react';
// Redux
import { useStoreState } from 'easy-peasy';
// End Redux
import axios from 'axios';
import RegisteredUser from './RegisteredUser';
import LoadingIndicator from '../../../components/LoadingIndicator';
import DashSectionTitle from '../DashSectionTitle';

export default function RegisteredUsersList() {
    const [total, setTotal] = useState({
        allFavorites: [],
        allItemsInCart: [],
    });

    const { updatedUsers, isLoading, gotError, errorMsg } = useStoreState(state => ({
        updatedUsers: state.userReducer.cases.updatedUsers,
        isLoading: state.globalReducer.cases.isLoading,
        gotError: state.globalReducer.cases.gotError,
        errorMsg: state.globalReducer.cases.errorMsg
    }))
    const getArray = obj => {
        obj.forEach(user => {
            total.allFavorites.push(user.favoriteList.length);
            total.allItemsInCart.push(user.inCartList.length);
        });
    }

    const getTotals = () => {
        const totalFav = total.allFavorites.reduce((tot, cur) => tot + cur);
        const totalCart = total.allItemsInCart.reduce((tot, cur) => tot + cur);
        const totals = {
            fav: totalFav,
            cart: totalCart,
        }
        return totals;
    }

    // const finalTotals = getTotals();

    useEffect(() => {
        getArray(updatedUsers);
        // let tot = getTotals();
        // console.log("tot", tot);
    }, [updatedUsers])

    console.log("total", total)

    const registeredUserList = updatedUsers.map(user => <RegisteredUser key={user._id} data={user} />);

    return (
        <Fragment>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <div>
                    <DashSectionTitle title="Dados dos Usuários Cadastrados" />
                    <section>
                        <div>
                            <h2 className="text-main-container text-center">Totais de Todos os Usuários:</h2>
                            <div className="container-center" style={{flexDirection: 'column'}}>
                                <h2>
                                    Itens
                                    <i
                                        style={{animationIterationCount: 10, animationDelay: '2s', fontSize: "2.3rem", color: "var(--mainRed)"}}
                                        className=" animated heartBeat fast fas fa-heart"></i>: <strong>{3}</strong></h2>
                                <h2>Itens <i style={{animationDelay: '4s', fontSize: "2.3rem", color: "var(--mainYellow)"}} className="animated lightSpeedIn slow fas fa-shopping-cart"></i>: <strong>{0}</strong></h2>
                            </div>
                            <br />
                            <h2
                                className="text-sub-title text-left pl-5">
                                Total de Usuários: <strong>{updatedUsers.length}</strong>
                            </h2>
                        </div>
                        {gotError ? (
                            <p>{errorMsg}</p>
                        ) : (
                            <div className="text-default">
                                {registeredUserList}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </Fragment>
    );
}