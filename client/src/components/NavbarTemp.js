import React from 'react';

export default function Navbar() {
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


// Floating Nav former
<script>
    //resource: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapse_sidebar
    function openNav() {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    }
</script>
<noscript>You need to enable JavaScript to run this app.</noscript>

<div class="navPosition">
    <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <a href="#">Langerie</a>
        <a href="#">Sadomasoquismo</a>
        <a href="#">Cosméticos</a>
        <a href="#">Comestíveis</a>
        <a href="#">Carrinho</a>
        <a href="#">Contato</a>
    </div>

    <div id = "main">
        <button class="openbtn" onclick="openNav()">☰</button>
    </div>
</div>
   <style>
        .navPosition {
            cursor: pointer;
            margin-top: 2px;
            position: fixed;
            z-index: 70;
        }

        .sidebar {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }

        .sidebar a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 25px;
          color: white;
          display: block;
          transition: 0.3s;
        }

        .sidebar a:hover {
          color: red;
        }

        .sidebar .closebtn {
          position: absolute;
          top: 0;
          right: 25px;
          font-size: 36px;
          margin-left: 50px;
        }

        .openbtn {
          font-size: 20px;
          cursor: pointer;
          background-color: #111;
          color: white;
          padding: 10px 15px;
          border: none;
        }

        .openbtn:hover {
          background-color: red;
        }

        #main {
          transition: margin-left .5s;
          padding: 10px;
        }

        /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
        @media screen and (max-height: 450px) {
          .sidebar {padding-top: 15px;}
          .sidebar a {font-size: 18px;}
        }
    </style>