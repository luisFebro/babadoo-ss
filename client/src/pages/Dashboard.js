import React, { Fragment } from 'react';
import Title from '../components/Title';
import { useStoreState } from 'easy-peasy';

export default function Dashboard() {
    const { name } = useStoreState(state => ({
        name: state.authReducer.cases.user.name
    }));

    return (
        <div>
            { (name === "admin") ?
                <Fragment>
                    <Title title="Painel de Controle Babadoo" />
                    <h2 className="text-title">Somente o Admin tem acesso a esta página com autentificação válida</h2>
                </Fragment> :
                <Title title="Oops! Você não tem permissão de acessar esta página." />
            }

            }
        </div>
    );
}