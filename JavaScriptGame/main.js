
const canvas = document.querySelector('canvas');
const CanvasContext = canvas.getContext('2d');    

canvas.width = 1520;
canvas.height = 668;

CanvasContext.fillRect(0, 0, canvas.width, canvas.height);
// sprite is the visual representation of an object in the game
//how it moves, looks and interacts with the game 

const Gravity = 0.4;
const Bounce = 0.7;

class Sprite {
    constructor({position, velocity, color = 'red'}){
        this.position = position;
        this.velocity = velocity
        this.height = 150;
        this.LastKey
        this.AttackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color;
    }
    //how players will look
    PlayerContext (){
        CanvasContext.fillStyle = this.color;
        CanvasContext.fillRect(this.position.x, this.position.y, 50, this.height);

        //attack box
        CanvasContext.fillStyle = 'green';
        CanvasContext.fillRect(this.AttackBox.position.x, this.AttackBox.position.y, this.AttackBox.width, this.AttackBox   .height);

    }
    //update is how the sprite moves and interacts with the game
    update(){
        this.PlayerContext();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
           this.velocity.y = 0;
        }else{
            this.velocity.y += Gravity;
        }
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
    color: 'blue'
    
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

function animate() {
    window.requestAnimationFrame(animate);
    CanvasContext.fillStyle = "black";
    CanvasContext.fillRect(0, 0, canvas.width, canvas.height);
    Player1.update();
    Player2.update();

    if(keys.a.pressed && Player1.LastKey === 'a'){
        Player1.velocity.x = -5;
    }else if(keys.d.pressed && Player1.LastKey === 'd'){
        Player1.velocity.x = 5;
    }else{
        Player1.velocity.x = 0;
    }


    if(keys.ArrowLeft.pressed && Player2.LastKey === 'ArrowLeft'){
        Player2.velocity.x = -5;
    }else if(keys.ArrowRight.pressed && Player2.LastKey === 'ArrowRight'){
        Player2.velocity.x = 5;
    }else{
        Player2.velocity.x = 0;
    }
}

animate();  
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