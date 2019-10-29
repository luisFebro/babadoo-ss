import React, { Fragment } from 'react';
import DashSectionTitle from '../DashSectionTitle';
import ExpansiblePanel from '../../../components/expansion-panels/ExpansiblePanel';
import ExpansiblePanelContent from '../ExpansiblePanelContent';

// Expansion Panel Content
const done = []
const inProgress = [
    { task: "Confirmação de Vendas" },
    { task: "Históricos" },
    { task: "Totais" },
    { task: "Status de Entrega" },
]

const expansiblePanelActions = [
    {
        id: 1,
        mainHeading: 'Funcionalidades desta seção',
        secondaryHeading: 'Veja aqui o que já está funcionando e em Andamento',
        hiddenContent: <ExpansiblePanelContent doneTasks={done} inProgressTasks={inProgress} />
    },
]
// End Expansion Panel Content

export default function DashSales() {
    return (
        <Fragment>
            <div>
                <DashSectionTitle title="Informações de Vendas" />
            </div>
            <div>
                <ExpansiblePanel actions={expansiblePanelActions} />
            </div>
        </Fragment>
    );
}