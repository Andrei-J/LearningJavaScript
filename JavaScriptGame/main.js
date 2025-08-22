
const canvas = document.querySelector('canvas');
const CanvasContext = canvas.getContext('2d');    

canvas.width = 1520;
canvas.height = 668;

CanvasContext.fillRect(0, 0, canvas.width, canvas.height);
// sprite is the visual representation of an object in the game
//how it moves, looks and interacts with the game 

const Gravity = 0.2;

class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity
        this.height = 150;
    }
    //how players will look
    PlayerContext (){
        CanvasContext.fillStyle = 'red';
        CanvasContext.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    //update is how the sprite moves and interacts with the game
    update(){
        this.PlayerContext();
        this.position.y += this.velocity.y;

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
    }
});

//functions

function animate() {
    window.requestAnimationFrame(animate);
    CanvasContext.fillStyle = "black";
    CanvasContext.fillRect(0, 0, canvas.width, canvas.height);
    Player1.update();
    Player2.update();
}

animate();  