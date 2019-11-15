import React from 'react';
import { Switch, Route } from 'react-router';

export default (
    // Switch is added in v4 react-router
    <Switch>
        {/*Categories Pages*/}
        <Route path="/lingeries" />
        <Route path="/cosmeticos" />
        <Route path="/comestiveis" />
        {/*End Categories Pages*/}
        <Route path="/loja" />
        <Route path="/detalhes-do-produto" />
        <Route path="/seu-carrinho" />
        <Route path="/finalizar-compra" />
        <Route path="/favoritos" />
        <Route />
    </Switch>
);
