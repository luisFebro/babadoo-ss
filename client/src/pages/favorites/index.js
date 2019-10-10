import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';
import Title from '../../components/Title';
import parse from 'html-react-parser';

export default function Favorites() {
    const name = useStoreState(state => state.authReducer.cases.user.name);
    return (
        <Fragment>
            {name !== null ?
            <Title title={`Seus Favaritos, ${name}`} /> :
            <div>
                <Title title={`Faça seu Acesso`} />
                <h4 className="text-sub-title text-center">{parse(`Você precisa de uma conta para acessar seus favoritos. <br/> Click já no ícone de usuário alí em cima`)}</h4>
            </div>
            }
        </Fragment>
    );
}