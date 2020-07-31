
let object = {}; //objects containing all keypress functions
sounds1 = new Audio("gametheme.wav");
sounds1.loop = true;

//loads the score and name from database
window.onload = function(){
	
loadScore();
};
// This function is called every time when the player hits the wall or spaceships
// This functions saves the current score with name and either loads a previous or new game.
object.reset = function()
{
    sounds1.pause();

    //this gets the current name with score and sends it to database
    let name1 = document.querySelector("#name" ).innerHTML;
    let score1 = document.querySelector("#score" ).innerHTML;



    alert(document.querySelector("#name").innerHTML + ", Sorry! You Died!");
    alert("Your name: " + name1 + " Your Score: " + score1+ "\n" + document.querySelector("#highscore").innerHTML);
    sendScore(name1,score1);
    //resetting spaceship back to position for new game
    for(i=0;i<aliens.length;i++)
    {
        aliens[i].style.top = 4+"em";
        curr[i] = 9
    }
    vertical = 60;
    horizontal = 47;
    spaceship.style.top = vertical+"vh";
    spaceship.style.left = horizontal+"vw";

    document.querySelector("#score").innerHTML = 0;
    document.querySelector("#name").innerHTML =	prompt("Enter new player name: ");
    sounds1.play();
};



//this function gets current score after a game and sends it to score.php file
//referenced from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
function sendScore (name1,score1){
    const hr = new XMLHttpRequest();
    const url = "score.php";
    const vars = "name" + name1 + "score:" + score1 ;
    hr.open( "POST", url, true);
    hr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    hr.send(vars);
}




// AJAX post request - loads data from database
//referenced from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
function loadScore() {

    const hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    const url = "getscore.php";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState === 4 && hr.status === 200) {
            let return_data = hr.responseText;
            document.getElementById("highscore").innerHTML = return_data;
            console.log(document.querySelector('#highscore').innerHTML);
        }
    }
    hr.send();
}




// This function gets key input from user and moves the spaceship
// referenced and adapted "style" function from https://javascript.info/styles-and-classes

object.f = function()
{
    sounds1.play();
    a = parseInt(spaceship.style.left);
    b = parseInt(spaceship.style.top);
    for(i=0;i<aliens.length;i++)
    {
        if((parseInt(aliens[i].style.left)+5>a && a>parseInt(aliens[i].style.left)) || ((a+5>parseInt(aliens[i].style.left)) && a<parseInt(aliens[i].style.left)) || ((a+5<=parseInt(aliens[i].style.left)+5) && a>=parseInt(aliens[i].style.left)))
        {
            if((parseInt(aliens[i].style.top)+5>b) && (b+5>parseInt(aliens[i].style.top)))
            {
                object.reset();
                return;
            }
        }
    }
    //adding keyboard movement function to user and also setting game bounds for user
    k = event.key.toLowerCase();
    if(k == 's')
    {
        if(100 <= vertical+27)
        {
            object.reset();
            return;
        }
        vertical += 2;
        spaceship.style.top = vertical+"vh";
    }
    else if(k == 'w')
    {
        if(vertical <= 8)
        {
            object.reset();
            return;
        }
        vertical -= 2;
        spaceship.style.top = vertical+"vh";
    }
    else if(k == 'd')
    {
        if(100 <= horizontal+6)
        {
            object.reset();
            return;
        }
        horizontal += 2;
        spaceship.style.left = horizontal+"vw";
    }
    else if(k == 'a')
    {
        if(horizontal<= 0)
        {
            object.reset();
            return;
        }
        horizontal -= 2;
        spaceship.style.left = horizontal+"vw";
    }

    a = parseInt(spaceship.style.left);
    b = parseInt(spaceship.style.top);
    //when the pink aliens hits the bottom on the red bar score increases by 1 and new aliens generate.
    for(i=0;i<aliens.length;i++)
    {
        aliens[i].style.top = curr[i] + "vh";
        curr[i] = curr[i]+speeds[i];
        if(curr[i] >= 78)
        {
            curr[i] = 9;
            k = Math.random()*7;
            if(k<1)
            {
                k = 1;
            }
            speeds[i] = k;
            document.querySelector("#score").innerHTML = parseInt(document.querySelector("#score").innerHTML) + 1;
        }
    }
}




// Main code starts - Asks for user name and then sets initial parameters for the game

document.querySelector("#name").innerHTML =	prompt("Enter your name: ");
//sets the initial position of the alien
vertical = 60;
horizontal = 47;
aliens = document.querySelectorAll(".aliens>div");
speeds = [];

for(i=0;i<aliens.length;i++)
{
    k = ((Math.random())**2)*9;
    if(k<1)
    {
        k = 1;
    }
    speeds[i] = k;
}

curr = [];
for(i=0;i<aliens.length;i++)
{
    curr[i] = speeds[i]+ 14
}


spaceship = document.querySelector("#player"); //main spaceship

window.addEventListener("keypress",object.f,false) //keypress event handler

