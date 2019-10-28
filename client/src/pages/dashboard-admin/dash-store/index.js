import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';

export default function DashStore() {
    return (
        <Fragment>
            <div>
                <DashSectionTitle title="Informações sobre a Loja" />
            </div>
            <div>
                <h2 className="text-sub-title text-center">
                    Funcionalidades<br/>(Disponível nas Próximas Atualizações)
                </h2>
                <h3
                    className="text-sub-title text-center">
                    Alterar Senha Admin, Dados da Loja incluindo Horário de Funcionamento, Email, Endereços LOja Física e Redes Sociais, Contatos
                </h3>
            </div>
        </Fragment>
    );
}