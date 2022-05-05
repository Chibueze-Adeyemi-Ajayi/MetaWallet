<?php 
  #checking if an existing wallet is detected
  include "assets/php/wallet.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="icon" type="image/x-jpg" href="assets/img/ethereum-icon.png">
        <meta name="description" content="A decentralized app for sending JILO ERC20">
        <meta name="author" content="Ajayi Chibueze Adeyemi, Blockchain dev">
        <link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="assets/css/et-lineicon.css" />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
        <meta name="keyword" content="Ethereum, blockchain, web3.0, JILO, DEX, DeFi, ERC20">
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,500,400italic,500italic,700' rel='stylesheet' type='text/css'>
        <title>JILO Wallet</title>
    </head>
    <body>

    <div class="container">
      <div id="-form-">
        <img src="assets/img/ethereum-icon.png" class="logo">
        <div class="message">
          <h2>Welcome to MetaWallet<h2><br>
        </div>
        <button onclick="window.location='get-startted.html'" >Get Started</button>
      </div>
    </div><br><br>

    <footer>
        &copy; <script>
               
                 var year = new Date().getFullYear();

                  document.write(year)
            
            </script> Jilo Innovations
    </footer>

    </body>
    <script src="assets/js/jquery-3.5.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/5.5.2/ethers.umd.min.js" type="application/javascript"></script>
    <script src="assets/js/index.js" type="module"></script>
    
</html>