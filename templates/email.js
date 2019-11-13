const bizName= 'Sexy Store';


exports.welcomeAndConfirmEmail = client => ({
    subject: `Seja Bem Vindo(a) a ${bizName}, ${client}`,
    html: `
        <center>
            <header">
                 <img style="box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);" src="https://imgur.com/9GjtAiW.png" width="200px" height="200px"/>
            </header>
        </center>
        <h1><center>Lingeries e Acessórios Eróticos</center></h1>
        <ul>
          <li><h3>Embalagens Discretas</h3></li>
          <li><h3>Entregamos por toda a cidade</h3></li>
        </ul>
        <footer>
            <h3><strong>Contato/Whatsapp: (92) 99506-6603</strong></h3>
        </footer>
    `
});









// Exemple
// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
// module.exports = {

//   confirm: id => ({
//     subject: 'React Confirm Email',
//     html: `
//       <a href='${CLIENT_ORIGIN}/confirm/${id}'>
//         click to confirm email
//       </a>
//     `,
//     text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
//   })