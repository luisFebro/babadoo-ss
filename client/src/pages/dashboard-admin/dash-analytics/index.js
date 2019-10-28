import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';

export default function DashAnalytics() {
    return (
        <Fragment>
            <div>
                <DashSectionTitle title="Gráficos Analíticos da Loja" />
            </div>
            <div>
                <h2 className="text-sub-title text-center">
                    Funcionalidades<br/>(Disponível nas Próximas Atualizações)
                </h2>
                <h3
                    className="text-sub-title text-center">
                    Gráfico Top Produtos: Produtos mais Favoritos, mais Adicionados No Carrinho, mais vendidos
                </h3>
            </div>
        </Fragment>
    );
}