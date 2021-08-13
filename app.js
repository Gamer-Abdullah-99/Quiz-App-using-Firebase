//Array Of Objects Containing Questions and Answers

let QnA = [
    {
        question: "Who won 2014 FIFA Worlcup?",
        opt1: "Brazil",
        opt2: "Germany",
        opt3: "Argentina",
        opt4: "France"
    }, {
        question: "Who won 2018 FIFA Worlcup?",
        opt1: "Italy",
        opt2: "Brazil",
        opt3: "Germany",
        opt4: "France"
    }, {
        question: "Which player has won 3 Worldcups in his career?",
        opt1: "Pele",
        opt2: "Maradona",
        opt3: "Ronaldo",
        opt4: "Ronaldinho"
    }, {
        question: "Which player is known as 'El Pibe de Oro'?",
        opt1: "Ronaldinho",
        opt2: "Pele",
        opt3: "Maradona",
        opt4: "Ronaldo"
    }, {
        question: "Which player is known as 'El Pistolero'?",
        opt1: "Suarez",
        opt2: "Messi",
        opt3: "Ronaldo",
        opt4: "Maradona"
    }
]

//Facebook Login

function fblogin() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            // The signed-in user info.
            var user = result.user;
            var fullname = user.displayName
            localStorage.setItem('name', fullname)
            window.location.href = './quiz.html'
        })
        .catch((error) => {
            // Handle Errors here.

            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

//Email Sign Up

function signup() {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user)
            window.location.href = './signin.html'
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

//Email Sign In

function signin() {
    email = document.getElementById('s-email').value
    password = document.getElementById('s-password').value
    fullname = document.getElementById('s-name').value
    localStorage.setItem('name', fullname)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user)
            window.location.href = './quiz.html'
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

//Getting Name From Local Storage

function fname() {
    fullname = localStorage.getItem('name')
    document.getElementById('name').innerText = fullname
}

//Timer 

minutes = document.getElementById("minutes")
seconds = document.getElementById("seconds")
minutes.innerText = 05
sec = 300
let timer = () => {
    setInterval(function () {
        sec--
        seconds.innerHTML = sec % 60
        minutes.innerHTML = Math.floor(sec / 60)
        if (sec <= 0) {
            end()
        }
    }, 1000)
}

//Starting Quiz

let startQuiz = () => {
    timer()
    quiz()
}

//Printing Questions and Options

a = 1
b = 0
let quiz = () => {
    if (a < 6 || b < 5) {
        document.getElementById('main').innerHTML = `
    <br>
<h2 id="question">Q.${a} ${QnA[b].question}</h2>
<br><br>
<div class="options">

    <button class="Opt" onclick="answer(this)">${QnA[b].opt1}</button>

    <button class="Opt" onclick="answer(this)">${QnA[b].opt2}</button>

    <button class="Opt" onclick="answer(this)">${QnA[b].opt3}</button>

    <button class="Opt" onclick="answer(this)">${QnA[b].opt4}</button>
</div>`
        a++
        b++
    } else {
        end()
    }
}

//End Function 

let end = () => {
    checkAns()
    window.location.href = './result.html'
}


//Getting Users Answers

userAns = []
let answer = (a) => {
    get = a.innerText
    small = get.toLowerCase()
    userAns.push(small)
    quiz()
}

//Array Containing Right Answers

correctAns = ["germany", "france", "pele", "maradona", "suarez"];

//Checking Answers

score = 0;
let checkAns = () => {
    for (var i = 0; i <= 4; i++) {
        if (correctAns[i] == userAns[i]) {
            score++
            // console.log(score)
        }
    }
    localStorage.setItem('score', score)

}

//Result Printing

function Result() {
    fname()
    para = document.getElementById('result')
    fullname = localStorage.getItem('name')
    score = localStorage.getItem('score')
    num = Math.random() * 1000
    // console.log(num)
    user = {
        'fname': fullname,
        'score': score
    }
    console.log(user)
    firebase.database().ref('Names and Scores').push(user)

    para.innerText = fullname + "\n" + "Your Score is " + score + " Out of 5"

    desc = document.getElementById('resultPara')
    if (score == 5) {
        desc.innerText = "Excellent"
    }
    else if (score == 4) {
        desc.innerText = "Good"
    }
    else if (score == 3) {
        desc.innerText = "Just passed"
    }
    else if (score == 2) {
        desc.innerText = "Failed"
    }
    else if (score == 1) {
        desc.innerText = "Very poor performance"
    }
    else if (score == 0) {
        desc.innerText = "You don't watch Football ?"
    }
    // localStorage.clear()
}

