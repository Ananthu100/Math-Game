// if we click on the start/reset button
    // if we are playing
        //reload the page
    // otherwise
        //  set score to 0
        // show countdown box
        // reduce time by 1sec in loops
            // if there is timeleft?
                 //continue
            // else
                //gameover
        //  change the button to reset
        // generate new Q&A

// if we click on the answer box
    //if we are playing
        //correct?
            //yes
                //increase the score
                //show correct msg for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec

var playing = false;
var score;
var counter,timeremaining;
var correctAnswer;
document.getElementById("startreset").onclick = function()
{
    if(playing==true){
        location.reload();  // reload the page
    }
    else{
        playing=true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("timer").style.display = "block"; // block is used to show the item
        timeremaining = 60;
        document.getElementById("timervalue").innerHTML = timeremaining;
        document.getElementById("gameover").style.display = "none";
        document.getElementById("startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
}
for(i=1;i<5;i++)
{
    document.getElementById("box"+i).onclick = function()
{
    if(playing==true){
        if(this.innerHTML==correctAnswer){
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            document.getElementById("correct").style.display = "block";
            document.getElementById("wrong").style.display = "none";
            setTimeout(() => {
                document.getElementById("correct").style.display = "none";
            }, 1000);
            generateQA();
        }else{
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "block";
            setTimeout(() => {
                document.getElementById("wrong").style.display = "none";
            }, 1000);
        }
    }
}
}
function startCountdown()
{
    counter = setInterval(() => {
        timeremaining -= 1;
        document.getElementById("timervalue").innerHTML = timeremaining;
        if(timeremaining==0){
            clearInterval(counter);// to stop the countdown
            document.getElementById("gameover").style.display = "block";
            document.getElementById("gameover").innerHTML = "<p>game over !</p><p>Your score is "+score+".</p>"
            document.getElementById("timer").style.display = "none";
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000); 
}
function generateQA(){
    var x  = 1+ Math.round(9*Math.random()); // generates no between 1 and 10
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctansPosition = 1+ Math.round(3*Math.random()); 
    document.getElementById("box"+correctansPosition).innerHTML = correctAnswer;
    var answers = [correctAnswer];
    for(i=1;i<5;i++){
        if(i!=correctansPosition){
            var wrongAnswer ;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random())) * (1+ Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}