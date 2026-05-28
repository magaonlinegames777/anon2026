var user_balance, user_name;

$(document).ready(function(){

    GET_IP_ADDRESS_NB();
 
    
});


function INTEL(name,balance){
    user_name = name;
    balance = user_balance;
    window.location.assign("account.html");
    console.log(balance);
    console.log(name);
    $('.balance_txt').text(balance);
    $('#avatarname_bx').text(name);
}


function GET_IP_ADDRESS_NB(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
      console.log("USER IP: "+e.ip);
      if (e.ip != "") {
        
        $.get("https://ipinfo.io", function(response) {
          var IPCODE = response.ip;
          var IP_CITY = response.city;
          var IP_COUNTRY = response.country;  
          WHOAREYOU = IPCODE;
          LOGOUT_ID = IPCODE;
          FIND_USERIP(IPCODE);

          console.log("Country of origin: "+response.city, response.country);
          //setDate();
        }, "jsonp");
        return e.ip;
      }
    });
}

function FIND_USERIP(ip){
    var docRef = db.collection("SESSIONS").doc(ip);

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            GETUSER(doc.data().user_dir);
            // show data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // window.location.assign("access.html");
            moveToLOGINPAGE();

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


function GETUSER(DIRECTORY){
    var docRef = db.collection("accounts").doc(DIRECTORY);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            // show data();
            balanceOfUser = doc.data().balance;
            nameOfUser = doc.data().username;
            setUserData();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}