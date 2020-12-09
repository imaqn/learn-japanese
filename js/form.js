//cek apakah username valid
function validateUsername(inputText){
    const usernameFormat = /^[a-zA-Z0-9]+$/;
    return inputText.match(usernameFormat);
}
//cek apakah input kosong
function MTInput(inputText){
    return (inputText.length == 0)
}
//cek apakah nama valid
function validateName (inputName){
    const nameFormat = /^[a-zA-Z ]+$/;
    return inputName.match(nameFormat);
}
//cek apakah password valid
function checkPass(inputPass){
    const passFormat = /^[A-Za-z]\w{7,14}$/;
    return inputPass.match(passFormat);
}
//cek apakah kolom password dan comfirm password sama isinya
function validatePass(inputPass, thePass){
    return inputPass.match(thePass);
}
