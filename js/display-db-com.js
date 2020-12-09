//menampilkan semua materi
function displayLesson(lessons){
    const div = document.createElement('div');
    let lesson = "";
    lesson +=  `<h5>Lesson - ${lessons[0].hari_id}</h5>`;
    lesson += `<ul class = "collapsible" data-collapsible = "expandable">`;
    lesson += `<li class="active">
    <div class = "collapsible-header">${lessons[0].grammar}</div>
    <div class = "collapsible-body">
    <p>Uses : ${lessons[0].explanation}</p>
    <p>Example : </p>
    <ol>
        <li>${lessons[0].ex1}
        <p>${lessons[0].trans1}</p></li>
        <li>${lessons[0].ex2}
        <p>${lessons[0].trans2}</p></li>
    </ol>
    </div>
    </li>`
    for (let i = 1; i<lessons.length; i++){
        lesson += `
        <li>
        <div class = "collapsible-header">${lessons[i].grammar}</div>
        <div class = "collapsible-body">
        <p>Uses : ${lessons[i].explanation}</p>
        <p>Example : </p>
        <ol>
            <li>${lessons[i].ex1}
            <p>${lessons[i].trans1}</p></li>
            <li>${lessons[i].ex2}
            <p>${lessons[i].trans2}</p></li>
        </ol>
        </div>
        </li>`
    }
    lesson += `</ul>`;

    div.innerHTML = lesson
    document.getElementById("quizList").appendChild(div);
    var elem = document.querySelectorAll('.collapsible');
        var instance = M.Collapsible.init(elem, {
        accordion: false
    });
}
//menampilkan list materi
function displayList(listlesson){
    console.log(listlesson)
    console.log(listlesson[1].fields.judul)
    for (let i = 0; i<listlesson.length; i++){
        content(listlesson[i].pk)
        .then(a => {
            displayLesson(a);
        })
        console.log()
    }    
}
//menampilkan kuis (perbab)
function displayQuiz(quizz, id){
    console.log(quizz)
    const div = document.createElement('div');
    let quiz = "";
    quiz += `<ol>`
    for (let i = 0; i<quizz.length; i++){
        quiz += `
            <li>${quizz[i].fields.text}</p></li>
            <label>
                <input type="radio" id="${quizz[i].fields.c1}" name = "answer${i}" value="${quizz[i].fields.c1}">
                <span>${quizz[i].fields.c1}</span>
            </label> <br>
            <label>
                <input type="radio" id="${quizz[i].fields.c2}" name = "answer${i}" value="${quizz[i].fields.c2}">
                <span>${quizz[i].fields.c2}</span>
            </label>`
    }
    quiz += ` </ol>`;
    quiz += `<button id = "SubmitAnswer" class="waves-effect waves-light btn-large red darken-3">Submit
    </button>`
    div.innerHTML = quiz;
    document.getElementById("question").appendChild(div);
    const submitAnswerBtn = document.getElementById('SubmitAnswer');
    submitAnswerBtn.addEventListener('click', function(){
        let answers = []
        const answer0 = document.getElementsByName('answer0');
        for (let i = 0; i< answer0.length; i++){
            if(answer0[i].checked){
                console.log(answer0[i].value);
                answers.push(answer0[i].value)
            }
        }
        const answer1 = document.getElementsByName('answer1');
        for (let i = 0; i< answer1.length; i++){
            if(answer1[i].checked){
                console.log(answer1[i].value)
                answers.push(answer1[i].value)
            }
        }
        const answer2 = document.getElementsByName('answer2');
        for (let i = 0; i< answer2.length; i++){
            if(answer2[i].checked){
                console.log(answer2[i].value)
                answers.push(answer2[i].value)
            }
        }
        const answer3 = document.getElementsByName('answer3');
        for (let i = 0; i< answer3.length; i++){
            if(answer3[i].checked){
                console.log(answer3[i].value)
                answers.push(answer3[i].value)
            }
        }
        const answer4 = document.getElementsByName('answer4');
        for (let i = 0; i< answer4.length; i++){
            if(answer4[i].checked){
                console.log(answer4[i].value)
                answers.push(answer4[i].value)
            }
        }
        countScore(id, answers[0], answers[1], answers[2], answers[3], answers[4])
    })
}
//mengetahui button mana (kuis mana) yang dipilih, lalu mengirim
//id kuis ke showQuiz lalu ditampilkan dengan displayQuiz(quiz)
function displayListQuizzes(listQuiz){ 
    const div = document.createElement('div');
    let quizList = "";
    console.log(listQuiz)
    for (let i = 0; i<listQuiz.length; i++){
        quizList += `
        <button id = "${listQuiz[i].pk}" class="QuizButton waves-effect waves-light btn-large red darken-3">Quiz ${listQuiz[i].pk}
        </button>`
    }
    div.innerHTML = quizList;
    document.getElementById("choices").appendChild(div);
    var buttons = document.getElementsByClassName('QuizButton');

    for(var i = 0; i < buttons.length; i++){  
        buttons[i].addEventListener('click', function(a){
            console.log(a.target.id);
            showQuiz(a.target.id)
            .then(quiz =>{
                displayQuiz(quiz, a.target.id);
                document.getElementById('choices').style.display = "none"
            })
        }) 
    }
}
function countScore(id, a1, a2, a3, a4, a5){
    const username = localStorage.getItem('username')
    answer(id, username, a1, a2, a3, a4, a5)
    .then(result =>{
        console.log(result)
        displayScore(result.q1, result.q2, result.q3, result.q4, result.q5, result.score)
        console.log(result.score)
    })
    
}
function displayScore(r1, r2, r3, r4, r5, score){
    const div = document.createElement('div');
    let res = "";
    res += `<ol>
        <li>${r1}</li>
        <li>${r2}</li>
        <li>${r3}</li>
        <li>${r4}</li>
        <li>${r5}</li>
        </ol>`
    res += `your score : ${score}`;
    div.innerHTML = res;
    document.getElementById("result").appendChild(div);
}