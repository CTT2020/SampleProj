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
const auth = firebase.auth();


function sendEmail() {
    database.ref('/users/').once('value', (function (snapshot) {
        snapshot.forEach(function (users) {
            var list = "";
            let name = users.val().user_name;
            let db = new Date(users.val().DOB);
            let birthdate = db.toISOString().slice(0, 10);
            let today = moment().format('YYYY-MM-DD');
            let years = moment().diff(birthdate, 'years');
            let adjustToday = (birthdate.substring(5) == today.substring(5)) ? 0 : 1;
            let nextBirthday = moment(birthdate).add(years + adjustToday, 'years');
            let daysUntilBirthday = nextBirthday.diff(today, 'days');
            if(daysUntilBirthday > parseInt(365))
            {
                daysUntilBirthday = daysUntilBirthday - parseInt(365);
            }
            if (daysUntilBirthday == 0)
            {
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: 'trctt2020@gmail.com',
                    Password: "ctttr2020$",
                    To: mail,
                    From: 'trctt2020@gmail.com',
                    Subject: `Hey ${name},Greetings from ThomsonReuters`,
                    // Cc: 'ctt@thomsonreuters.com',
                    Body: `Hi ${name}, We Wish you a many many happy returns of the day. May God bless you with health, wealth and prosperity in your life. HAPPY BIRTHDAY`,
                })
            }
        });
    }))
}

function havingbirthdaytoday() {
    database.ref('/users/').once('value', (function (snapshot) {
        snapshot.forEach(function (users) {
            var list = "";
            let name = users.val().user_name;
            let db = new Date(users.val().DOB);
            let birthdate = db.toISOString().slice(0, 10);
            let today = moment().format('YYYY-MM-DD');
            let years = moment().diff(birthdate, 'years');
            let adjustToday = (birthdate.substring(5) == today.substring(5)) ? 0 : 1;
            let nextBirthday = moment(birthdate).add(years + adjustToday, 'years');
            let daysUntilBirthday = nextBirthday.diff(today, 'days');
            if(daysUntilBirthday > parseInt(365))
            {
                daysUntilBirthday = daysUntilBirthday - parseInt(365);
            }
            if (daysUntilBirthday == 0)
            {
                list += '<tr>';
                list += '<td>' + '<h3>' + name + '</h3>' + '</td>';
                list += '</tr>';
                $('table').append(list);
            }
        });
    }))
}
