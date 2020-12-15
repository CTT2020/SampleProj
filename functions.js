const userId = document.getElementById('uId');
const userName = document.getElementById('uname');
const emailId = document.getElementById('email');
const dob = document.getElementById('dob');
const createBtn = document.getElementById('createBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const readBtn = document.getElementById('readBtn');

var firebaseConfig = {
    apiKey: "AIzaSyAN7T0pYtChBpeYIFXtd3PUt4Y2W1LSaFc",
    authDomain: "sampleproj-ee7ae.firebaseapp.com",
    databaseURL: "https://sampleproj-ee7ae-default-rtdb.firebaseio.com",
    projectId: "sampleproj-ee7ae",
    storageBucket: "sampleproj-ee7ae.appspot.com",
    messagingSenderId: "28286499634",
    appId: "1:28286499634:web:56358e965a1f3cb4e7b52b",
    measurementId: "G-07M9LFMD3P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const database = firebase.database();
  const auth=firebase.auth();


function createUser(){
    
    if(userId.value == ''|| userName.value == '' || emailId.value=='' ||dob.value == '')
    {
        alert("Please Enter All Values");
        return;
    }

    database.ref("users").orderByChild("userid").equalTo(userId.value).once("value",snapshot => {
        if (snapshot.exists()){
          alert("User Already Exists!!");
        }
        else{
            database.ref('/users/'+userId.value).set({
                userid : userId.value,
                user_name : userName.value,
                email : emailId.value,
                DOB : dob.value,
            });
            alert("User Created Successfully!!");
            console.log("User Created Successfully!!");
            document.getElementById("uId").value = "";
            document.getElementById("email").value = "";
            document.getElementById("uname").value = "";
            document.getElementById("dob").value = "";      }
    });

};

function deleteUser(){

    if(userId.value == '')
    {
        alert("Please Enter ID");
        return;
    }
    
    database.ref("users").orderByChild("userid").equalTo(userId.value).once("value",snapshot => {
        if (snapshot.exists()){
            database.ref('/users/'+userId.value).remove();
            console.log("User Deleted Successfully");
            alert("User Deleted Successfully!!");
        }
        else{        
            alert("User Does Not Exist!!");
        }
        document.getElementById("uId").value = "";
        document.getElementById("email").value = "";
        document.getElementById("uname").value = "";
        document.getElementById("dob").value = ""; 
    });
    
}

function updateUser(){

    if(userId.value == '')
    {
        alert("Please Enter ID");
        return;
    }
    
    database.ref("users").orderByChild("userid").equalTo(userId.value).once("value",snapshot => {
        if (snapshot.exists()){
            database.ref('/users/'+userId.value).update({
                user_name : userName.value,
                email : emailId.value,
                DOB : dob.value,
            });
            console.log("User Updated Successfully");
            alert("User Updated Successfully!!");
        }
        else{        
            alert("User Does Not Exist!!");
        }
        document.getElementById("uId").value = "";
        document.getElementById("email").value = "";
        document.getElementById("uname").value = "";
        document.getElementById("dob").value = ""; 
    });

    
}

function readUser() {
    database.ref('/users/').once('value', (function (snapshot) {
        snapshot.forEach(function (users) {
            var name = users.val().user_name;
            var id = users.val().userid;
            var db = new Date(users.val().DOB);
            var mail = users.val().email;
            today = new Date();
            var daystogo = new Date(today.getFullYear(), db.getMonth(), db.getDate());
            if (today.getMonth() == db.getMonth() && today.getDate() > db.getDate()) {
                daystogo.setFullYear(daystogo.getFullYear() + 1);
            }
            var one_day = 1000 * 60 * 60 * 24;
            var result = Math.ceil((daystogo.getTime() - today.getTime()) / (one_day));
            var numdaystogo = Math.abs(result);
            var dbinformat = db.toLocaleDateString();
            var content = "";
            console.log("Name: " + name + " ID: " + id + " DOB: " + db + " Mail: " + mail);
            content += '<tr>';
            content += '<td>' + name + '</td>';
            content += '<td>' + mail + '</td>';
            content += '<td>' + id + '</td>';
            content += '<td>' + dbinformat + '</td>';
            content += '<td>' + numdaystogo + '</td>';
            content += '</tr>';
            $('table').append(content);
        });
    }))
}


    function Login()
{
    const loginid = document.getElementById('loginid');
    const password = document.getElementById('password');
    const promise = auth.signInWithEmailAndPassword(loginid.value, password.value);
    promise.catch(e => alert(e.message));
    alert("Signed In as "+ loginid.value);
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
          window.location = 'CRUDPage.html';
        }
      });
}

