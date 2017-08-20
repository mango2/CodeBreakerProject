let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == ''){
        setHiddenFields();
        //console.log(answer.value)
    }

    if(!validateInput(input.value)) return;
    attempt.value++;

    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if(attempt.value >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();        
    } else {
        setMessage("Incorrect, try again.");
    }
}

function setHiddenFields (){
    let answerVal = Math.floor(Math.random() * 10000).toString();
    while(answerVal.length < 4){
        answerVal = "0" + answerVal;
    }
    answer.value = answerVal;
    attempt.value = "0";
    console.log(answer)
}

function setMessage (msg){
    document.getElementById("message").innerHTML = msg;
}

function validateInput (input){
    if(input.length !== 4){
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    } 
    return true;
}

function getResults(input){
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    let charOk = 0;

    for(i = 0; i < input.length; i++){

        ////version 1
        // let is = false;
        // for(j = 0; j < answer.value.length; j++){
        //     if(input.charAt(i) === answer.value.charAt(j)){
        //         is = true;
 
        //         if(i === j){
        //             html += '<span class="glyphicon glyphicon-ok"></span>';
        //             charOk++;
        //         }
        //         else{
        //             html += '<span class="glyphicon glyphicon-transfer"></span>'
        //         }
        //     }
        // }

        // if(is === false){
        //     html += '<span class="glyphicon glyphicon-remove"></span>';
        // }


        //version 2
        if(input.charAt(i) === answer.value.charAt(i)){
            html += '<span class="glyphicon glyphicon-ok"></span>';
            charOk++;
        } else if(answer.value.indexOf(input.charAt(i)) > -1){
            html += '<span class="glyphicon glyphicon-transfer"></span>'
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }

    }

    html += "</div></div>";

    document.getElementById("results").innerHTML += html;

    if(charOk === answer.value.length) return true;
    return false;

}


function showAnswer(success){
    let code = document.getElementById("code");
    code.innerHTML = answer.value;

    if(success){
        code.className += " success";
    } else {
        code.className += " failure";
    }
}

function showReplay(){
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}
