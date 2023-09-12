let board=document.getElementById('board');
let n;
let turn = 1;

//To put Ladder Images
function ladderImg(box, scale, rotation)
{
    let img=document.createElement('img');
    img.classList.add('image');
    img.setAttribute('src','Snake2/ladder.png');
    img.style.transform = `scaleY(${scale}) rotateZ(${rotation}deg)`;
    box.appendChild(img);
}

//To put Snake Images
function snakeImg(box, image, scale, rotateX, rotateY, originX, originY)
{
    let img=document.createElement('img');
    img.classList.add('image');
    img.style.scale = `${scale}`;
    img.style.transformOrigin = `${originX}% ${originY}%`; 
    img.style.transform = `rotateZ(${rotateX}deg) rotateY(${rotateY}deg)`;
    img.setAttribute('src',`Snake2/Snake${image}.png`);
    box.appendChild(img);
}

//To put Color in Boxes
function boxColor(box,i)
{
    if(i%4==0)
        box.classList.add('red');
    if(i%4==1)
        box.classList.add('blue');
    if(i%4==2)
        box.classList.add('yellow');
    if(i%4==3)
        box.classList.add('green');
}

//To create Boxes
for(let i=99;i>=0;i--)
{
    let box=document.createElement('div');
    let id;
    box.classList.add('box');
    if(Math.floor(i/10)%2!=0)
    {
        id=i+1;
        n=i-9;
    }
    else
    {
        id=n;
        n++;
    }
    box.innerHTML=`<span>${id}</span><br>`;
    box.setAttribute('id',`b${id}`);
    boxColor(box,i);

    // Parameter --> box imageNo. scale rotateX rotateY originX, originY 
    if(id==79)
        snakeImg(box, 1, 1, 0, 0, 0, 0);
    else if(id==45)
        snakeImg(box, 3, 1.2, -10, 0, 0, -8);
    else if(id==95)
        snakeImg(box, 3, 1, 0, 0, 0, 0);
    else if(id==92)
        snakeImg(box, 8, 1.4, -6, 0, 0, 0);
    else if(id==99)
        snakeImg(box, 5, 4, -15, 0, 0, 0);
    else if(id==31)
        snakeImg(box, 5, 3, 3, 180, 10, 0);
    else if(id==68)
        snakeImg(box, 8, 1.4, 26, -180, 25, 0);
    else if(id==23)
        snakeImg(box, 1, 1, 0, 0, 0, 0);

    // Ladder
    // Parameter --> box scaleY rotation
    if(id==43)
        ladderImg(box, 1, 35);
    else if(id==33)
        ladderImg(box, 1, -18);
    else if(id==88)
        ladderImg(box, 1.15, -20);
    else if(id==96)
        ladderImg(box, 1.5, 18);
    board.appendChild(box);
}


// Default values
let p1 = 1, p2 = 1;
const snake = [[23,18,3],[31,29,13,7],[45,36,26,16],[68,54,46,35,25],[79,62,59],[92,89,72,70,51],[95,86,75],[99,83,77,76,65,66]];
const ladder = [[9,12,28,33],[20,22,39,43],[44,57,64,76,85,96],[52,69,73,88]];

//Player Initialiser
let img1=document.createElement('img');
let img2=document.createElement('img');

img1.setAttribute('class','player');
img2.setAttribute('class','player');

img1.setAttribute('src','Snake2/blue.png');
img2.setAttribute('src','Snake2/purple.png');

document.getElementById(`b${p1}`).appendChild(img1);
document.getElementById(`b${p2}`).appendChild(img2);


// Move Generator
generator=function(){
    let v=1+Math.floor(Math.random()*6);
    return v;
}

// Check if a player win or not
winner=function(){
    if(p1==100)
    {
        let result = document.getElementById('result');
        let banner = document.getElementById('banner');
        result.innerText = 'Player 1 Wins';
        banner.style.transform = 'scale(1)';
    }
    if(p2==100)
    {
        let result = document.getElementById('result');
        let banner = document.getElementById('banner');
        result.innerText='Player 2 Wins';
        banner.style.transform = 'scale(1)';
    }
    if(p1==100 || p2==100)
        return true;
    else
        return false;
}


// Check if Ladder or not
let isLadder=function(){
    ladder.forEach(function(element,index){
        if(element[0]==p1)
        {   
            console.log(element.length);
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p1}`).removeChild(img1);
                p1=ladder[index][v];
                v++;
                if(v==element.length)
                    clearInterval(interval);
                document.getElementById(`b${p1}`).appendChild(img1); 
            },300);
        }
    });
    ladder.forEach(function(element,index){
        if(element[0]==p2)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p2}`).removeChild(img2);
                p2=ladder[index][v];
                v++;
                if(v==element.length)
                    clearInterval(interval);
                document.getElementById(`b${p2}`).appendChild(img2); 
            },300);
        }
    });
}

// Check if Snake or not
let isSnake=function(){
    snake.forEach(function(element,index){
        if(element[0]==p1)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p1}`).removeChild(img1);
                p1=snake[index][v];
                v++;
                if(v==element.length)
                    clearInterval(interval);
                document.getElementById(`b${p1}`).appendChild(img1); 
            },300);
        }
    });
    snake.forEach(function(element,index){
        if(element[0]==p2)
        {   
            let v=0;
            let interval=setInterval(()=>{
                document.getElementById(`b${p2}`).removeChild(img2);
                p2=snake[index][v];
                v++;
                if(v==element.length)
                    clearInterval(interval);
                document.getElementById(`b${p2}`).appendChild(img2); 
            },300);
        }
    });
}


//Movement of Players on click
const playerOneMovement = function(){
    let v=p1+generator();
    let interval=setInterval(()=>{
        document.getElementById(`b${p1}`).removeChild(img1);
        p1++;
        if(winner())
        {
            clearInterval(interval);
            return ;
        }
        if(p1==v)
        {
            clearInterval(interval);
            isLadder();
            isSnake();
        }
        document.getElementById(`b${p1}`).appendChild(img1); 
    },300);
}

const playerTwoMovement = function(){
    let v=p2+generator();
    let interval=setInterval(()=>{
        document.getElementById(`b${p2}`).removeChild(img2);
        p2++;
        if(winner())
        {
            clearInterval(interval);
            return ;
        }
        if(p2==v)
        {
            clearInterval(interval);
            isLadder();
            isSnake();
        }
        document.getElementById(`b${p2}`).appendChild(img2); 
    },300);
}

document.getElementById('btn1').addEventListener('click', ()=>{
    if(turn == 1){
        playerOneMovement();
        turn = 2;
    }
});

document.getElementById('btn2').addEventListener('click', ()=>{
    if(turn == 2){
        playerTwoMovement();
        turn = 1;
    }
});

window.addEventListener('keydown', (event)=>{
    const clickedKey = event.key + event.location;
    if(clickedKey=='Shift1' && turn==1){
            playerOneMovement();
            turn = 2;
    }
});

window.addEventListener('keydown', (event)=>{
    const clickedKey = event.key + event.location;
    if(clickedKey=='Shift2' && turn==2){
        playerTwoMovement();
        turn = 1;
    }
});

