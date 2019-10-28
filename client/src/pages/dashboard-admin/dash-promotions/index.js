import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';

export default function DashPromotions() {
    return (
        <Fragment>
            <div>
                <DashSectionTitle title="Modificar Promoções da Loja" />
            </div>
            <div>
                <h2 className="text-sub-title text-center">
                    Funcionalidades<br/>(Disponível nas Próximas Atualizações)
                </h2>
                <h3
                    className="text-sub-title text-center">
                    Desconto primeira compra, Desconto por quantidade, Desconto Fidelidade, Frete Grátis a partir de certa qtde
                </h3>
            </div>
        </Fragment>
    );
}