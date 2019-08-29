import React from 'react';
import './MainNavDiv.css';

const MainNavDiv = () => {
    return (
        // resource: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapse_sidebar
        <div className="navPosition">
            <div id="mySidebar" class="sidebar">
                <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>×</a>
                <a href="#">Langerie</a>
                <a href="#">Sadomasoquismo</a>
                <a href="#">Cosméticos</a>
                <a href="#">Comestíveis</a>
                <a href="#">Carrinho</a>
                <a href="#">Contato</a>
            </div>

            <div id = "main">
                <button class="openbtn" onClick={openNav}>☰</button>
            </div>
        </div>


    )
}

export default MainNavDiv;