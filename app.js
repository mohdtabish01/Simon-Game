
let gameSeq=[];
let userSeq=[];
let h3=document.querySelector("h3");
let btns=["yellow", "red", "purple", "green"];

let started=false;
let level=0;

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }

});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout( function(){
        btn.classList.remove("flash");
    },100);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout( function(){
        btn.classList.remove("userflash");
    },100);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;

    //random btn choose
    let randIdx=Math.floor(Math.random() *4);
    let randColor=btns[randIdx];
    let randomBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randomBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);  //game sequence

    gameFlash(randomBtn);
    
}

function checkAns(idx){
    //console.log(`current level is ${level}`);
   // let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        //console.log("same value");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,700);
        }
    }
    else {
        //console.log("Game over! press any key to restart");
        h3.innerHTML=`Game over! Your score was <b>${level}</b> </br> press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },100);
        reset();
    }
}


function btnPressed(){
    //console.log(this);
    if (!started) return; // Ignore button presses until the game has started  
    let btnn=this;
    userFlash(btnn);
    let userColor=btnn.getAttribute("id");
    //console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for (bt of allBtns){
    bt.addEventListener("click",btnPressed);
}


function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}