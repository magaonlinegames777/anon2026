//SECURITY
var WHOAREYOU, TODAY_DATE;
var max = 5;
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

   
    
    findRandom();

    // UPDATED ON  APRIL 18 2023
    // security_protector();
    
});


function movetoREGISTER(){
  console.log('MOVE TO REGISTER');
  
  findRandom();
  $('.loginSection').hide(); 
  $('.registerSection').show(); 
  $('.signinRegisterTxt').hide(); 
  $('.signinTxt').hide();
  $('.registerTxt').show();

}

function movetoLOGIN(){
  console.log('MOVE TO LOGIN');
  findRandom();
  $('.loginSection').show(); 
  $('.registerSection').hide();
  $('.signinRegisterTxt').hide();
  $('.registerTxt').hide();
  $('.signinTxt').show();
}

function findRandom() {
  random = Math.floor(Math.random() * max);  //Finds number between 0 - max
  console.log(random);

  $('#captureImg').attr("src",+random+ '.JPG');
}


  
//LOGIN USER SECTION
function loginUser(){
    var username = $('#username_input').val().toLowerCase();
    var password = $('#password_input').val().toLowerCase();
    var captureVerify =  $('#verifyCapture').val(); 
    if (captureVerify != '') {
        console.log('User and Password: '+username+' and Password: '+password);
        var images = $('#captureImg').attr('src');
        if (images == '2.JPG' && captureVerify == '50759') {
            console.log('CAPTURE CERTIFIED: '+images);
            firebaseGetUser(username + password);
        }else if (images == '0.JPG' && captureVerify == '84531') {
            console.log('CAPTURE CERTIFIED');
            firebaseGetUser(username + password);
        }
        else if (images == '1.JPG' && captureVerify == '29846') {
            console.log('CAPTURE CERTIFIED');
            firebaseGetUser(username + password);
        }else if (images == '3.JPG' && captureVerify == '81248') {
            console.log('CAPTURE CERTIFIED');
            firebaseGetUser(username + password);
        }else if (images == '4.JPG' && captureVerify == '63619') {
            console.log('CAPTURE CERTIFIED: '+images);
            firebaseGetUser(username + password);
        }
        else if (images == '5.JPG' && captureVerify == '00836') {
            console.log('CAPTURE CERTIFIED: '+images);
            firebaseGetUser(username + password); 
        }
        else{
            //RANDOMIZE AND SHOW NEW CAPTURE
            $('.EG_password').text('Verification code incorrect');
            //$('#signUp_btn').show();
            setTimeout(
                function(){
                    $('.EG_password').text('');
                },9000
            );
        }
    }else{
        if(username == '' || password == ''){
            $('.EG_password').text('Login with the correct logins.');
            setTimeout(
                function(){
                    $('.EG_password').text(' ');
                },5000
            );
        }else{
            alert('Enter verification...');
            $('#signUp_btn').show();
            $('#verifyCapture').css('border-color','red');
        }   
        
    }
    
}

// SAVE SESSION
function SAVE_SESSIONS(x,IP,userID){
    var currentDate = new Date();
    var currentDateString = currentDate.toLocaleString();
    $("#current-date").text(currentDateString);
    var db = firebase.firestore();

    // Add a new document 
    db.collection("SESSIONS").doc(IP).set({
        session: x,
        ids: IP,
        user_dir: userID,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        date_string: currentDateString
    })
    .then(() => {
        console.log("session successfully written!");
        return 1;

    })
    .catch((error) => {
        console.error("Error writing sessions: ", error);
        return 0;
    });

}
                                                     




function signUp(){
    $('#signUp_btn').hide();
    var username, password, email, captureVerify;

    username = $('#username_input').val().toLowerCase();
   // email = $('#email_input').val().toLowerCase();
    password = $('#password_input').val();
    captureVerify = $('#verifyCapture').val();

    console.log('signup='+username,captureVerify);
    
    //VERIFY USER REGISTRATION  href="mailto:report@anon-bit101.io"
    if (username != '' && password != '') {
        if (captureVerify != '') {
            var images = $('#captureImg').attr('src');
            if (images == '2.JPG' && captureVerify == '50759') {
                console.log('CAPTURE CERTIFIED: '+images);
                firebaseAddUser(username,password);
            }else if (images == '1.JPG' && captureVerify == '29846') {
                console.log('CAPTURE CERTIFIED');
                firebaseAddUser(username,password);
            }else if (images == '0.JPG' && captureVerify == '84531') {
                console.log('CAPTURE CERTIFIED');
                firebaseAddUser(username,password);
            }else if (images == '3.JPG' && captureVerify == '81248') {
                console.log('CAPTURE CERTIFIED');
                firebaseAddUser(username,password);
            }else if (images == '4.JPG' && captureVerify == '63619') {
                console.log('CAPTURE CERTIFIED: '+images);
                firebaseAddUser(username,password);
            }
            else if (images == '5.JPG' && captureVerify == '00836') {
                console.log('CAPTURE CERTIFIED: '+images);
                firebaseAddUser(username,password);
            }
            else{
                //RANDOMIZE AND SHOW NEW CAPTURE
                $('.EG_password').text('Verification code incorrect');
                $('#signUp_btn').show();
                setTimeout(
                    function(){
                        $('.EG_password').text('');
                    },9000
                );
            }
        }else{
            alert('Enter verification...');
            $('#signUp_btn').show();
            $('#verifyCapture').css('border-color','red');
        }
        
    }else{
        $('#signUp_btn').show();
        if (username == '') {
            $('.EG_username').text('username cannot be left blank');
            setTimeout(
                function(){
                    $('.EG_username').text('');
                },6000
            );
        }
        if (email == '') {
            $('.EG_email').text('email cannot be left blank');
            setTimeout(
                function(){
                    $('.EG_email').text('');
                },6000
            );
        }
        if (password == '') {
            $('.EG_password').text('password cannot be left blank');
            setTimeout(
                function(){
                    $('.EG_password').text('');
                },6000
            );
        }
    }
    
    

}
function firebaseAddUser(username,password){
    var client_id = username + password;
    firebase.firestore().collection("accounts").doc(client_id).set({
        username: username,
        password: password,
        balance: '0.00',
        date: 18042022
    })
    .then((docRef) => {
        console.log("ACCOUNT CREATED: ");
        SAVE_SESSIONS('register',)
        movetoLOGIN();
        //end of april
        $('.accountCreatedHides').hide();
        $('.accountSuccessCreate').removeClass('hide');
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Failed to register user. Try again later');
        setTimeout(
            function(){
                location.reload();
            },3000
        );
    });
}



// LOGIN USER 
function LOGIN_USER(){
    var username = $('#username_input').val().toLowerCase().trim();
    var password = $('#password_input').val().toLowerCase();
    var captureVerify =  $('#verifyCapture').val(); 


    if (captureVerify != '') {
        console.log('User and Password: '+username+' and Password: '+password);
        var images = $('#captureImg').attr('src');
        sortUser(images,captureVerify,username,password);
    }else{
        
        if(username == '' || password == ''){
            console.log('nothing');
            $('#login_password_error').text('Login with the correct logins.');
            setTimeout(
                function(){
                    $('.errorTXT span').text(' ');
                },5000
            );
        }else{
            alert('Enter verification...');
            $('#signUp_btn').show();
            $('#verifyCapture').css('border-color','red');
        }   
    }
}  

function sortUser(images,captureVerify,username,password){
        if (images == '2.JPG' && captureVerify == '50759') {
            console.log('CAPTURE CERTIFIED: '+images);
            firebaseGetUser(username + password);
        }else if (images == '0.JPG' && captureVerify == '84531') {
            console.log('CAPTURE CERTIFIED');
            firebaseGetUser(username + password);
        }
        else if (images == '1.JPG' && captureVerify == '29846') {
            console.log('CAPTURE CERTIFIED');
            firebaseGetUser(username + password);
        }else if (images == '3.JPG' && captureVerify == '81248') {
            console.log('CAPTURE CERTIFIED');
            firebaseGetUser(username + password);
        }else if (images == '4.JPG' && captureVerify == '63619') {
            console.log('CAPTURE CERTIFIED: '+images);
            firebaseGetUser(username + password);
        }
        else if (images == '5.JPG' && captureVerify == '00836') {
            console.log('CAPTURE CERTIFIED: '+images);
            firebaseGetUser(username + password); 
        }
        else{
            //RANDOMIZE AND SHOW NEW CAPTURE
            $('.EG_password').text('Verification code incorrect');
            //$('#signUp_btn').show();
            setTimeout(
                function(){
                    $('.EG_password').text('');
                },9000
            );
        }
}



function firebaseGetUser(usernamepassword){
    var user_id= usernamepassword;
    $('.loaderPage').show();


    var docRef = db.collection("accounts").doc(user_id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            var sesh= SAVE_SESSIONS('login',WHOAREYOU, user_id);
            if (sesh = 1) {
                console.log('sesh is 1');
                
                window.location.assign("account.html");
            }
            if (sesh = 0){
                console.log('sesh is 0');

                // failed to save sesh
                $('.loaderPage').hide();
                $('#loginerror_sec').text('Failed to save. Try again later.');
                closeErrors();
            }
            // INTEL(doc.data().username, doc.data().balance);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            $('.loaderPage').hide();
            $('#loginerror_sec').text('Your account does not exist. Register for a new account');
            closeErrors();
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        $('#loginerror_sec').text('Failed to login. Please try again...');
        $('.loaderPage').hide();
        closeErrors();

    });

   
}

function closeErrors() {
    $('.errorTXT span').text('');
}


