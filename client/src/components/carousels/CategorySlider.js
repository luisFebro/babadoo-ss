import React, { Component } from "react";
import Slider from "react-slick";
import "./_slick.css";
import "./_slickTheme.css";
import { Link } from "react-router-dom";
export default class CenterMode extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            className: "center",
            centerPadding: "60px",
            slidesToShow: 5,
            autoplay: true,
            speed: 600,
            autoplaySpeed: 5000,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        centerPadding: "60px",
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        centerPadding: "60px",
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                    }
                }
            ]
        };

        return (
        <div style={{backgroundColor: "rgba(242, 38, 19, .7)"}}>
            <h3 className="title-carousel text-center text-capitalize bg-danger">Categorias</h3>
            <Slider {...settings}>
                <div className="card-carousel">
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img src="img/icons/lingerie-corset-128.png" alt="categoria lingeries"></img></span>
                            <h3>Lingeries</h3>
                        </div>
                    </button>
                </div>
                <div className="card-carousel">
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img src="img/icons/cosmetics.png" alt="categoria cosméticos"></img></span>
                            <h3>Cosméticos</h3>
                        </div>
                    </button>
                </div>
                <div className="card-carousel">
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img className="img-fluid" src="img/icons/handcuffs.png" alt="categoria sadomasoquismo"></img></span>
                            <h3>Sado</h3>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img className="img-fluid" src="img/icons/whipped-cream.png" alt="categoria comestíveis"></img></span>
                            <h3>Comestíveis</h3>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img className="img-fluid" src="img/icons/hair-brush.png" alt="categoria acessórios"></img></span>
                            <h3>Acessórios</h3>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img className="img-fluid" src="img/icons/games.png" alt="categoria jogos"></img></span>
                            <h3>Jogos</h3>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img className="img-fluid" src="img/icons/fantasies.png" alt="categoria fantasias"></img></span>
                            <h3>Fantasias</h3>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="categoryBtn shadow-elevation">
                        <div className="main-letters-shadow">
                            <span><img className="img-fluid" src="img/icons/miscelleneous.png" alt="categoria variados"></img></span>
                            <h3>Variados</h3>
                        </div>
                    </button>
                </div>
            </Slider>
      </div>
    );
    }
}