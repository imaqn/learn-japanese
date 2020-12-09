//fetch untuk signup
function signup(nameInput, usernameInput, passInput, confPass){
    return fetch("http://localhost:3000/api/register",{
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            fullname: nameInput,
            username: usernameInput,
            password: passInput,
            password2: confPass
        })
    })
    .then(res =>{
        return res.json()
    })
    .then(responseJson  =>{
        if(responseJson.success){
            M.toast({html: 'sign up success'}); //toast tanda login berhasil
            return Promise.resolve(true);
        }
        else{
            M.toast({html: `${responseJson.message}`}) //toast tanda login gagal
            return Promise.reject(false)
        }
    })
}
//fetch untuk login
function login(usernameInput, passInput){
    return fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: usernameInput,
            password: passInput
        })
    })
    .then(res =>{
        return res.json()
    })
    .then(responseJson  =>{
        if(responseJson.isAuth){
            localStorage.setItem('username', responseJson.username)
            localStorage.setItem('token', responseJson.token); //simpan token di local storage
            M.toast({html: 'Login success'}); //toast tanda login berhasil
            return Promise.resolve(true);
        }
        else{
            M.toast({html: `${responseJson.message}`}) //toast tanda login gagal
            return Promise.reject(false)
        }
    })
}
//fetch untuk logout
function logout(){
    fetch("http://localhost:3000/api/logout", {
        method: "GET",
        headers: {'x-access-token' : localStorage.getItem('token')} //pakai headers untuk access activity
    })
    .then(res =>{
        if (res.status == 200){
            localStorage.removeItem('token'); //hapus token di local storage
            localStorage.removeItem('username');
            return true;
        }
        else{
            return false;
        }
    })
}
//menampilkan daftar bab
function showLessonList(){
    return fetch("http://localhost:8000/kuis/",{
        method: "GET",
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        return Promise.resolve(responseJson);
    })
    .catch ( error => {
        return Promise.reject(error);
    })
}
//menampilkan quiz berdasarkan bab
function showQuiz(id){
    return fetch(`http://localhost:8000/kuis/soal?id=${id}`,{
        method: "GET",
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        return Promise.resolve(responseJson);
    })
    .catch ( error => {
        return Promise.reject(error);
    })
}
//mengirim hasil jawaban kuis, respon berupa jawaban yang benar-salah dan skor
function answer(id, username, a1, a2, a3, a4, a5){
    return fetch("http://localhost:8000/kuis/ans/", {
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: id,
            username: username,
            q1: a1,
            q2: a2,
            q3: a3,
            q4: a4,
            q5: a5
        })
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        return Promise.resolve(responseJson);
    })
    .catch ( error => {
        M.toast({html: 'answer all the question'});
        return Promise.reject(error);
    })
}
//menampilkan materi berdasarkan bab
function content(id){
    return fetch(`http://localhost:4000/materi/${id}`,{
        method: "GET",
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        //displayLesson(responseJson);
        return Promise.resolve(responseJson);
    })
    .catch ( error => {
        return Promise.reject(error);
    })
}