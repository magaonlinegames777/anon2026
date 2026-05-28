var productName;
var featureAddedPrice = 350;
var productPrice=0;

var CLIENT_ID, LOGOUT_ID;
var CURRENT_DATE;
var balanceOfUser, nameOfUser;
var db;
$(document).ready(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyA51VbpKCNz9OyCtcdLuf7x3IVC1ZKBJRI",
        authDomain: "anon-d0646.firebaseapp.com",
        projectId: "anon-d0646",
        storageBucket: "anon-d0646.firebasestorage.app",
        messagingSenderId: "873477732809",
        appId: "1:873477732809:web:88ea4d3246bcf5873a5018"
      };
     // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      
    db = firebase.firestore();

    setUserData();

 
    
  });



function moveToLOGINPAGE(){
    window.location.assign("access.html");
}

  function setUserData(){
         $('.balance_txt').text(balanceOfUser);
         $('#avatarname_bx').text(nameOfUser);
  }
  function OPEN_THIS(where){
    if (where == 'dashboard') {
        $('.dashboard_sectionall').addClass('hide');
        $('.dashboard_section').removeClass('hide');
        checkScreen();

    }
    if (where == 'orders') {
        $('.dashboard_sectionall').addClass('hide');
        $('.order_section').removeClass('hide');
        checkScreen();

    }
    if (where == 'cart') {
        $('.dashboard_sectionall').addClass('hide');
        $('.cart_section').removeClass('hide');
        checkScreen();

    }
    if (where == 'ticket') {
        $('.dashboard_sectionall').addClass('hide');
        $('.ticket_section').removeClass('hide');
        checkScreen();

    }
    if (where == 'settings') {
        $('.dashboard_sectionall').addClass('hide');
        $('.settings_section').removeClass('hide');
        checkScreen();
    }
    
    if (where == 'info_dept') {
        $('.dashboard_sectionall').addClass('hide');
        $('.fixed_info_dept').removeClass('hide');
        checkScreen();

    }


    // open banks
    var fixed_balance;
    if (where == 'logs') {
        $('.dashboard_sectionall').addClass('hide');
        $('.logs_section').removeClass('hide');
        checkScreen();
    }
    if (where == 'wellsfargo') {
        productName = 'wells fargo';   
        $('.dashboard_sectionall').addClass('hide');
        $('.logs_section').removeClass('hide');
        // fixed balance data and fix them 10 times
        $(".logs_section .bankio_table_body tr").remove();
        
        for (let i = 0; i < 10; i++) {
            fixed_balance = getRandomPrice();
            if (fixed_balance <= 10000) {
                ADD_GOD_DATA('Wells Fargo Bank',fixed_balance,'$150','personal');
            }
            if (fixed_balance <= 15000) {
                ADD_GOD_DATA('Wells Fargo Bank',fixed_balance,'$200','personal');
            }
            if (fixed_balance >= 20000) {
                ADD_GOD_DATA('Wells Fargo Bank',fixed_balance,'$250','current');
            }
            if (fixed_balance >= 25000) {
                ADD_GOD_DATA('Wells Fargo Bank',fixed_balance,'$300','current');
            }
            if (fixed_balance >= 30000) {
                ADD_GOD_DATA('Wells Fargo Bank',fixed_balance,'$350','personal');
            }
        }

        checkScreen();
    }
    if (where == 'principal') {
        $('.dashboard_sectionall').addClass('hide');
        $('.logs_section').removeClass('hide');

        checkScreen();
    }
    
  }



  function ADD_GOD_DATA(forwhat,sale_amount,sale_price,busPersCurrent){
    $(".logs_section .bankio_table_body").append(
            '<tr>' +
                '<td class="bank_sale_amount">' + sale_amount + '</td>' +
                '<td>' + forwhat + '</td>' +
                '<td>' + busPersCurrent+'</td>' +
                '<td>' + sale_price + '</td>' +
                '<td class="productBuyNowBTN">' +
                '<a class="btn green" data-amount='
                +sale_amount+' data-price='
                +sale_price+' data-type='+busPersCurrent+' onclick="getProduct(this);">BUY NOW</a>' +
                '</td>' +
            '</tr>'
    );
  }

//   NEW GET 01
function getProduct(el){
    var product_amount = el.getAttribute('data-amount');
    var dummyProductPrice = el.getAttribute('data-price');
    var product_type = el.getAttribute('data-type');
    // console.log(product_amount);

    $('.logs_section ').addClass('hide');
    $('.show_btc_addy ').removeClass('hide');

    revertProducts();

    // $('#youwanttobuyTABLE tr td').text('');
    $('#product_price').text(dummyProductPrice);
    $('#logs_balance_amount').text(product_amount);
    $('#logs_account_type').text(product_type);
    $('#product_name').text(productName);

    // add total
    addTotalPrice(dummyProductPrice);
    
}

function getRandomPrice() {
  return Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
}


function addTotalPrice(x){
    var facevalue_productPrice = x.slice(1);
    productPrice = Number(facevalue_productPrice);
    var total = productPrice + featureAddedPrice ;

        let usdAmount = total;

        // Fetch BTC price in USD
        $.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", function(data) {
          let btcPrice = data.bitcoin.usd;
          let btcValue = usdAmount / btcPrice;

          console.log('BTC VALUE: '+ btcValue);
        
             //   $("#btc_value_live").text("≈ " + btcValue.toFixed(8) + " BTC");
          $("#product_total_btctxt").text(btcValue.toFixed(8));
        });
        
        $('#product_total_txt').text('$' +total);
}

function buyNOW(){
    $('.product_buy_bx').hide();
   
        var total_price = featureAddedPrice + productPrice;
    
    if (total_price > balanceOfUser) {
        // user cannot buy so topup
        $('.product_buy_bx').hide();
        $('.product_buying_table').hide();
        $('.product_insufficientBalance').removeClass('hide');

        setTimeout(() => {
            $('.showbtcsection').removeClass('hide');
            $('.product_buying_table').show();
        }, 3333);
    }else{
        // buy and add to order for download.
        

        var accID, prodNAME, prodDETAILS, prodPRICE, prodTOTAL;
        accID = CLIENT_ID;
        prodNAME = $('#product_name').text();
        prodDETAILS = $('#product_info').text();
        prodPRICE = $('#product_price').text();
        prodBTCPRICE = $('#product_total_btctxt').text();
        prodTOTAL = $('#product_total_txt').text();
        
        // register transaction payment
        var od = REGISTER_ORDER(accID, prodNAME,prodDETAILS,prodPRICE,prodBTCPRICE,prodTOTAL);
        if (od == 1) {
            $('.product_buy_bx').show();    
        }
        if (od == 2) {
            $('.product_buy_bx').show();
        }
    }
}
// UPDATE NEW BALANCE IN DB
function UPDATE_NEW_BALANCE(){
        var total_price = featureAddedPrice + productPrice;
        console.log('buy now clicked: ', total_price +' and ',balanceOfUser);
        var newBalance = balanceOfUser - total_price;
        balanceOfUser = newBalance;
        $('.balance_txt').text(balanceOfUser);
}

function REGISTER_ORDER(accID,prodName, prodDetails, prodPrice, prodBtcPrice, prodTotal){
    // Add a new document in collection "cities"
    var orderId = get_order_id();
    var  orderIDD = accID + orderId;
        console.log('Prod total: '+ prodTotal);
    
    db.collection("ORDER_HISTORY").doc(orderIDD).set({
            product_name: prodName,
            product_details: prodDetails,
            product_price: prodPrice,
            product_btc_price: prodBtcPrice,
            product_total: prodTotal,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            s_date: CURRENT_DATE,
            client_id: accID
    })
    .then(() => {
        UPDATE_NEW_BALANCE();
        console.log("Document successfully written!");
        return 1;
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        return 2;
    });

}
// get date order id
function get_order_id(){
    let now = new Date();

    let year = now.getFullYear();      // 2026
    let month = now.getMonth() + 1;    // 5 (months are 0-based)
    let day = now.getDate();           // 25
    let hours = now.getHours();        // 14
    let minutes = now.getMinutes();    // 44

    var orderID = month + ""+day +""+hours+""+minutes ;
    return orderID;
}


// show btc address
function showBTC(){
    $('.blurs').css('filter','blur(105px)');
    $('#show_btc_btn').addClass('hide');
    $('#click_to_copy_btn').removeClass('hide');


    setTimeout(() => {
        $('.blurs').css('filter','blur(5px)');

        $('#click_to_copy_btn').addClass('hide');
        $('#show_btc_btn').removeClass('hide');
        
    }, 6444);
}

function hideBTC(){
    $('.blurs').css('filter','blur(5px)');
    $('#show_btc_btn').removeClass('hide');
    $('#click_to_copy_btn').addClass('hide');
}
    
function copyTEXT() {
    $('#click_to_copy_btn').hide();
    var selector = $('#btcTXT')
    const text = $('#btcTXT').text();
    navigator.clipboard.writeText(text)
        .then(() => console.log("Copied:", text), $('#click_to_copy_btn').text('Copied'))   
        .catch(err => console.error("Copy failed:", err));


    setTimeout(() => {
        $('#click_to_copy_btn').show();
    }, 2333);
}



// close features
function closeVPN(){
    featureAddedPrice = 350 - 100;
    $('.productVPNSECTION').hide();

    allTotal();
}
function closeEMAILFLDD(){
    featureAddedPrice = featureAddedPrice - 100;
    $('.productEMAILFLOOD').hide();

    allTotal();
}
function revertProducts(){
    featureAddedPrice = 350;
    $('.allProductsSecs').show();
    $('.product_buying_table').show();
    $('.product_total_bx').show();
    $('.product_buy_bx').show();

    $('.showbtcsection').addClass('hide');

}

function allTotal(){
    var totalFigure = featureAddedPrice + productPrice;

    let usdAmount = totalFigure;

     // Fetch BTC price in USD
        $.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", function(data) {
          let btcPrice = data.bitcoin.usd;
          let btcValue = usdAmount / btcPrice;

          console.log('BTC VALUE: '+ btcValue);
        
             //   $("#btc_value_live").text("≈ " + btcValue.toFixed(8) + " BTC");
          $("#product_total_btctxt").text(btcValue.toFixed(8));
        });
        
        $('#product_total_txt').text('$' +totalFigure);
}


// SEND SUPPORT AND TICKET

function sendSupport(){
    var subject = $('#ticket_subject').val();
    var email = $('#ticket_email').val();
    var message = $('#ticket_message').val();

    if (email == '') {
        $('#email_error_txt').text('Email cannot be left blank');
        hidetimererror();
    }
    if (message == '') {
        $('#message_error_txt').text('Message field cannot be left blank');
        hidetimererror();
        
    }
    if (email != '' && message != '') {
        //  send to db
        $('.ticket_success').removeClass('hide');
        $('.ticket_send_btn').hide();

        setTimeout(() => {
        $('.ticket_send_btn').show(); 
        }, 9999);
    }
}
function hidetimererror(){
    $('.ticket_section .errorTXT').text('');
}

// top up btc
function top_up_account(){
    $('.dashboard_sectionall').addClass('hide');
    $('.show_btc_addy').removeClass('hide');

    $('.showbtcsection').removeClass('hide');
    setTimeout(() => {
        $('.btcinfowarning1').removeClass('hide');
    }, 3444);
    $('.product_buying_table').hide();
    $('.product_total_bx').hide();
    $('.product_buy_bx').hide();



}

// TOP UP BTC 
function TOPUPS(){
    // Add a new document 
    var orderId = get_order_id();
    var orderIDD = CLIENT_ID + orderId;
    var btcAddress = $('#btcTXT').text();
        console.log('btc address: '+ btcAddress);


    let now = new Date();

    let year = now.getFullYear();      // 2026
    let month = now.getMonth() + 1;    // 5 (months are 0-based)
    let day = now.getDate();           // 25
    let hours = now.getHours();        // 14
    let minutes = now.getMinutes();    // 44

    var date_string = month + "/"+day +"/"+year+" "+ hours + ":"+ minutes;
    
    db.collection("TOPUPS").doc(orderIDD).set({
            address_btc: btcAddress,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            s_date: date_string,
            client_id: CLIENT_ID
    })
    .then(() => {
        console.log("Document successfully written!");
        setTimeout(() => {
            $('.btcinfowarning1').addClass('hide');
        }, 6666);
        
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

}

// OPEN MENU NAVIGATOR
function openMenuNav(){
    $('#navigator_menu').show();
    $('.glassblur').removeClass('hide');
}

function closeMenuNav(){
    $('#navigator_menu').hide();
    $('.glassblur').addClass('hide');
}

function checkScreen(){
    if (window.innerWidth <= 590) {
    console.log("Screen width is 590px");
        $('#navigator_menu').hide();
        $('.glassblur').addClass('hide');

    }
}





function LOGOUT(){
    $('.loaderPage').show();
    var db = firebase.firestore();
    db.collection("SESSIONS").doc(LOGOUT_ID).delete().then(() => {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch((error) => {
        console.error("Error removing document: ", error);
        $('.loaderPage').hide();

    });
}
