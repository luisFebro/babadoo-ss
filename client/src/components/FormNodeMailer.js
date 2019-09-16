import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainerPressedEffectDark as DarkBtn} from './Button';

export default class FormNodeMailer extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            phone: '',
            address: '',
            additional: '',
            itemDescription: '',
            totalPay: '',
            isFinishedFields: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInfoProducts = this.setInfoProducts.bind(this);
    }

    componentDidMount() {
        this.setInfoProducts();
    }

    // showReady() {
    //     this.setState({isFinishedFields: true});
    //     console.log("this worked well!");
    // }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e) {
       e.preventDefault();
       document.getElementById('wait').innerHTML = "ENVIANDO! Aguarde um instante..."

       setTimeout(() => {
           alert("PEDIDO ENVIADO!\nENTRAREMOS EM CONTATO O MAIS BREVE POSSÍVEL\nAGRADECEMOS SUA PREFERÊNCIA!");
           document.getElementById('wait').innerHTML = ""
           this.resetForm();
       }, 4000);
       const { name, phone, address, additional, itemDescription, totalPay } = this.state;

       await axios.post('/api/form', {
            name,
            phone,
            address,
            additional,
            itemDescription,
            totalPay
       })

    }

    setInfoProducts() {
        const items = document.getElementById('items').innerHTML;
        const totalPay = document.getElementById('total').innerHTML;
        this.setState({itemDescription: items, totalPay: totalPay});
    }

    // validateForm() {
    //     let x = document.forms["contactForm"]["address"].value;
    //         if (x == "") {
    //             alert("Endereço deve ser preenchido");
    //             return false;
    //         } else {
    //             return this.handleSubmit
    //         }
    // }

    resetForm(e){
        e.preventDefault(); //only allow one click
        document.getElementById('contactForm').reset();
    }

    render() {
        return (
            <React.Fragment>
                <DivContainer className="container">
                    <h2 style={{margin: '4rem 0'}} className="brand bt-5"><strong>Quase lá!</strong></h2>
                    <ProductConsumer>
                        {value => {
                            const { cart } = value;
                            let listTemp = cart.map((item) => {
                                return `${item.count} ${item.title} || `;
                            });

                            return (
                                <section style={{padding: "15px", background: "green", color: "white", marginBottom: "15px"}}>
                                    <h3 className="text-center text-uppercase">Resumo do seu Pedido</h3>
                                    <ul>
                                        <li id="items"><h4>Items:<br />{listTemp}</h4></li>
                                        <br/>
                                        <li id="total"><h4>Valor Total com Frete:<br />R$ {value.cartTotal}</h4></li>
                                    </ul>
                                  </section>
                            );

                        }}
                    </ProductConsumer>

                    <div className="wrapper animated rotateInDownLeft slower delay-3s">
                        <div className="company-info text-capitalize">
                            <h3>precisamos identificar você para o envio</h3>
                        </div>
                        <div className="contact">
                            <form id="contactForm" onChange={this.handleChange} onSubmit={this.handleSubmit} method="POST" action="send">
                                <p className="full">
                                    <label>Seu Nome</label>
                                    <input type="text" name="name" required/>
                                </p>
                                <p className="full">
                                    <label>Telefone/Whatsapp</label>
                                    <input type="tel" name="phone" required/>
                                </p>
                                <p className="full">
                                    <label onMouseOver={this.showReady}>Endereço para Entrega<br /> (Rua/Avenida, Número, Bairro, Referência) </label>
                                    <textarea name="address" rows="8" required></textarea>
                                </p>
                                <p className="full">
                                    <label>Alguma Informação Adicional? (Opcional)</label>
                                    <textarea name="additional" rows="8"></textarea>
                                </p>
                                <h3 id="wait"></h3>
                                <p className="full">
                                    <button
                                        type="submit"
                                        style={{color: "var(--mainWhite)", background: "var(--mainYellow)"}}
                                    >
                                        Concluir Compra
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </DivContainer>
                <div className="container">
                    <div className="row">
                        <Link to="/seu-carrinho" className="col-10 mx-auto text-uppercase my-4">
                            <DarkBtn>
                                Voltar Carrinho
                            </DarkBtn>
                        </Link>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const DivContainer = styled.div`
    *{
      box-sizing: border-box;
    }

    body{
      background:#92bde7;
      color:#485e74;
      line-height: 1.6em;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding:1em;
    }

    .container{
      max-width:1170px;
      margin-left:auto;
      margin-right:auto;
      padding:1em;
    }

    ul{
      list-style: none;
      padding:0;
    }

    .brand{
      text-align: center;
    }

    .brand span{
      color: var(--mainWhite);
    }

    .wrapper{
      box-shadow: 0 0 20px 0 rgba(72,94,116,0.7);
    }

    .wrapper > *{
      padding: 2em;
    }

    .company-info{
      color: var(--mainWhite);
      background: var(--mainRed);
    }

    .company-info h3, .company-info ul{
      text-align: center;
      margin:0 0 1rem 0;
    }

    .contact{
      background:#f9feff;
    }

    /* FORM STYLES */
    .contact form{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap:20px;
      padding:1em;
    }

    .contact form label{
      display:block;
    }

    .contact form p{
      margin:0;
    }

    .contact form .full{
      grid-column: 1 / 3;
    }

    .contact form button, .contact form input, .contact form textarea, .contact form buyer-name {
      width:100%;
      border:1px solid #c9e6ff;
      height: 3em;
    }

    .contact form button{
      background:#c9e6ff;
      border:0;
      text-transform: uppercase;
    }

    .contact form button:hover,.contact form button:focus{
      background:#92bde7;
      color:#fff;
      outline:0;
      transition: background-color 2s ease-out;
    }

    /* LARGE SCREENS */
    @media(min-width:700px){
      .wrapper{
        display: grid;
        grid-template-columns: 1fr 2fr;
      }

      .wrapper > *{
        padding:2em;
      }
      //.company-info h3, .company-info ul, .brand{
        text-align: left;
    }

`;






//ADPT THIS:
// import React, {Component} from 'react';
// import axios from 'axios';

// class ContactForm extends Component{
//     handleSubmit(e){
//         e.preventDefault();
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const message = document.getElementById('message').value;
//         axios({
//             method: "POST",
//             url:"http://localhost:3002/send",
//             data: {
//                 name: name,
//                 email: email,
//                 message: message
//             }
//         }).then((response)=>{
//             if (response.data.msg === 'success'){
//                 alert("Message Sent.");
//                 this.resetForm()
//             }else if(response.data.msg === 'fail'){
//                 alert("Message failed to send.")
//             }
//         })
//     }

//     resetForm(){
//         document.getElementById('contact-form').reset();
//     }

//     render(){
//         return(
//             <div className="col-sm-4 offset-sm-4">
//                 <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
//                     <div className="form-group">
//                         <label for="name">Name</label>
//                         <input type="text" className="form-control" id="name" />
//                     </div>
//                     <div className="form-group">
//                         <label for="exampleInputEmail1">Email address</label>
//                         <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="form-group">
//                         <label for="message">Message</label>
//                         <textarea className="form-control" rows="5" id="message"></textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default ContactForm;