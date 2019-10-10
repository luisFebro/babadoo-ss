import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';
import Title from '../../components/Title';
import parse from 'html-react-parser';
import EmptyContent from '../../components/EmptyContent';
import { ButtonContainerPressedEffectDark as Dark } from '../../components/buttons/Default';

export default function Favorites() {
    const name = useStoreState(state => state.authReducer.cases.user.name);
    return (
        <Fragment>
            {name !== null ?
                <div>
                    <Title title={`Seus Favaritos, ${name}`} /> :
                    <EmptyContent text={"Sua Galeria está vazia..."} />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Dark className="mt-5">
                            Escolher seus favoritos
                        </Dark>
                    </div>
                </div> :
                <div>
                    <Title title={`Faça seu Acesso`} />
                    <h4
                        className="text-sub-title text-center"
                    >
                        {parse(`Você precisa de uma conta para acessar seus favoritos. <br/> Click já no ícone de usuário alí em cima`)}
                    </h4>
                </div>
            }
        </Fragment>
    );
}