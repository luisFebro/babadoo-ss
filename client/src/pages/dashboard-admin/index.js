import React, { Fragment } from 'react';
import Title from '../../components/Title';
import { bizEmail } from '../../data/dataBiz';
import { useStoreState } from 'easy-peasy';
import GroupedDashSessions from './GroupedDashSessions';

export default function Dashboard() {
    const { email } = useStoreState(state => ({
        email: state.userReducer.cases.currentUpdatedUser.email,
    }));

    return (
        <div>
            { (email === bizEmail) ?
                <Fragment>
                    <Title title="Painel de Controle Babadoo" />
                    <div>
                        <h2 className="text-sub-title text-center">Somente a Conta Admin tem acesso a esta página com autentificação válida.</h2>
                        <br/>
                        <h2
                            className="text-sub-title text-center">
                            Todas as modificações aqui são atualizadas tanto no site e banco de dados em tempo real.
                        </h2>
                    </div>
                    <br />
                    <GroupedDashSessions />
                </Fragment> :
                <Title title="Oops! Você não tem permissão de acessar esta página." />
            }
        </div>
    );
}