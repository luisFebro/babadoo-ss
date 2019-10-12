import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';
import Title from '../../components/Title';
import parse from 'html-react-parser';
import EmptyContent from '../../components/EmptyContent';
import { ButtonContainerPressedEffectDark as Dark } from '../../components/buttons/Default';
import { HashLink } from 'react-router-hash-link';
import { ProductConsumer } from '../../data/contexts/mainContext';
import Product from '../../components/products/Product';

export default function Favorites() {
    const name = useStoreState(state => state.authReducer.cases.user.name);
    return (
        <Fragment>
            {(name !== null) ?
                <div>
                    <Title title={`Seus Favaritos, ${name}`} /> :
                    { true ?
                    <div className="py-2">
                        <div className="container">
                            <div className="row">
                                <ProductConsumer>
                                    {value => {
                                        console.log(value.products);
                                        return value.products.map(product => {
                                            return product.isAddedToFav === true ? (
                                                <Product key={product.id} product={product} />
                                            ) : null;
                                        });
                                    }}
                                </ProductConsumer>
                            </div>
                        </div>
                    </div> :
                        <div>
                            <EmptyContent text={"Sua Galeria está vazia..."} img={"img/illustrations/empty-content.png"} />
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <HashLink smooth to='/#inicio'>
                                    <Dark className="mt-5">
                                        Escolher seus favoritos
                                    </Dark>
                                </HashLink>
                            </div>
                        </div>
                    }
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