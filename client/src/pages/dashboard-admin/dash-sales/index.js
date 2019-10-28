import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';

export default function DashSales() {
    return (
        <Fragment>
            <div>
                <DashSectionTitle title="Informações de Vendas" />
            </div>
            <div>
                <h2 className="text-sub-title text-center">
                    Funcionalidades<br/>(Disponível nas Próximas Atualizações)
                </h2>
                <h3
                    className="text-sub-title text-center">
                    Confirmação de Vendas, Históricos, Totais, Status de Entrega
                </h3>
            </div>
        </Fragment>
    );
}