
const canvas = document.querySelector('canvas');
const CanvasContext = canvas.getContext('2d');    

canvas.width = 1520;
canvas.height = 668;

CanvasContext.fillRect(0, 0, canvas.width, canvas.height);
// sprite is the visual representation of an object in the game
//how it moves, looks and interacts with the game 

const Gravity = 0.5;

class Sprite {
    constructor({position, velocity, color = 'red', offset}){
        this.position = position;
        this.velocity = velocity
        this.height = 150;
        this.width = 50;
        this.LastKey
        this.AttackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            offset,
                width: 100,
                height: 50 
        }
        //this is false by default
        this.isAttacking;
        this.color = color;
        this.health = 100;
    }
    //how players will look
    PlayerContext (){
        CanvasContext.fillStyle = this.color;
        CanvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);

        //attack box
        if(this.isAttacking === true){
            CanvasContext.fillStyle = 'green';
            CanvasContext.fillRect(this.AttackBox.position.x, 
                                   this.AttackBox.position.y, 
                                   this.AttackBox.width, 
                                   this.AttackBox.height);
        }

    }
    //update is how the sprite moves and interacts with the game
    update(){
        this.PlayerContext();
        this.AttackBox.position.x = this.position.x + this.AttackBox.offset.x;
        this.AttackBox.position.y = this.position.y;
        
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
           this.velocity.y = 0;
        }else{
            this.velocity.y += Gravity;
        }
    }
    //attack method if is attacking is true theres a collision
    attack(){
        this.isAttacking = true;

        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
//setting the properties for Player1    
const Player1 = new Sprite({
    position: {
        x: 100,
        y: 100
    },

    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    }
});

const Player2 = new Sprite({
    position: {
        x: 1100,
        y: 100
    },

    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset:{
        x: -50,
        y: 0
    }
});

//functions
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },

    ArrowRight:{
        pressed: false
    },

    ArrowLeft:{
        pressed: false
    },

    ArrowUp:{
        pressed: false
    }
    
}
let timer = 11;
function decreaseTimer(){
    setTimeout(decreaseTimer, 1000)
        timer--;
        if (timer >= 0) {
            document.querySelector('#timer').innerHTML = timer;
        }
        // Game over if any player's health reaches 0
        if (Player1.health <= 0) {
            document.querySelector('#result').innerHTML = 'Player 2 wins!';
            timer = 0; // Stop timer
            return;
        } else if(Player2.health <= 0) {
            document.querySelector('#result').innerHTML = 'Player 1 wins!';
            timer = 0; // Stop timer
            return;
        }
        // Game over when timer runs out
        if (timer === 0 && Player1.health > Player2.health) {
            document.querySelector('#result').innerHTML = 'Player 1 wins!';
        } else if(timer === 0 && Player2.health > Player1.health) {
            document.querySelector('#result').innerHTML = 'Player 2 wins!';
        } else if(timer === 0 && Player1.health === Player2.health) {
            document.querySelector('#result').innerHTML = 'Tie';
        }

}
 
decreaseTimer()


function attackingCollision({rectangle1, rectangle2}){
    return(
        rectangle1.AttackBox.position.x + rectangle1.AttackBox.width >= rectangle2.position.x 
        && rectangle1.AttackBox.position.x <= rectangle2.position.x + rectangle2.width 
        //collision for the y attackbox
        && rectangle1.AttackBox.position.y + rectangle1.AttackBox.height >= rectangle2.position.y
        && rectangle1.AttackBox.position.y <= rectangle2.position.y + rectangle2.height 
    );
}

function animate() {

    window.requestAnimationFrame(animate);
    CanvasContext.fillStyle = "black";
    CanvasContext.fillRect(0, 0, canvas.width, canvas.height);
    Player1.update();
    Player2.update();
  

    //detect keys for player movement
    if(keys.a.pressed && Player1.LastKey === 'a'){
        Player1.velocity.x = -5;
    }else if(keys.d.pressed && Player1.LastKey === 'd'){
        Player1.velocity.x = 5;
    }else{
        Player1.velocity.x = 0;
    }

    //detect keys for player movement
    if(keys.ArrowLeft.pressed && Player2.LastKey === 'ArrowLeft'){
        Player2.velocity.x = -5;
    }else if(keys.ArrowRight.pressed && Player2.LastKey === 'ArrowRight'){
        Player2.velocity.x = 5;
    }else{
        Player2.velocity.x = 0;
    }

    //detect for attack collision
    if(
        attackingCollision({rectangle1: Player1, rectangle2: Player2}) 
        && Player1.isAttacking
    ){
        Player1.isAttacking = false;
        Player2.health -= 20;
        console.log('Collision detected');
        document.getElementById('player2Health').style.width = Player2.health + '%' ;
    }

    if(
        attackingCollision({rectangle1: Player2, rectangle2: Player1}) 
        && Player2.isAttacking
    ){
        Player2.isAttacking = false;
        Player1.health -= 20;
        console.log('Collision detected 2');
        document.getElementById('player1Health').style.width = Player1.health + '%' ;
    }

}

animate();  

//event listeners the players key for action and movement
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd' :
            keys.d.pressed = true
            Player1.LastKey = 'd'
        break;

        case 'a' :
            keys.a.pressed = true
            Player1.LastKey = 'a'
        break;

        case 'w' :
            Player1.velocity.y = -18
        break;

        case ' ' :
            Player1.attack();
        break;

        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            Player2.LastKey = 'ArrowRight'
        break;

        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            Player2.LastKey = 'ArrowLeft'
        break;

        case 'ArrowUp' :
            Player2.velocity.y = -18
        break;

       case 'Enter' :
           Player2.attack();
    }


});


window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd' :
            keys.d.pressed = false
        break;

        case 'a' :
            keys.a.pressed = false
        break;

       case 'ArrowRight' :
           keys.ArrowRight.pressed = false
       break;

       case 'ArrowLeft' :
           keys.ArrowLeft.pressed = false
       break;

    }


});