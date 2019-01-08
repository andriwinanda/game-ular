// Nama
var txt
var nama = document.getElementById("nama")
var person = prompt("Masukkan Nama Kamu :", "Andri");
if (person == null || person ==""){
    txt = "Kamu belum masukkan nama"
}
else{
    txt = person;
}
nama.innerHTML = txt

// Game
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");

// Layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var clear = function() {
    context.fillStyle = "#2c3e50";
    context.fillRect(0, 0, canvas.width, canvas.height); 
};

//Posisi
var Position = function(x, y) {
    this.x = x;
    this.y = y;
    
    this.add = function(pos) {
        this.x += pos.x;
        this.y += pos.y;
    };
    
    this.clone = function() {
        return new Position(this.x, this.y);
    };
    
    this.bounds = function(x, y, width, height) {
        if(this.x < x || this.y < y || this.x > x + width || this.y > y + height)
        return false;
        return true;
    };
};

//Makanan

var Food = function(pos) {
    this.pos = pos;
    this.rad = 10;
    
    this.draw = function() {
        context.fillStyle = "#2980b9";
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.rad, 0, 2*Math.PI);
        context.fill();
    };
}

var foods = [];
var score = document.getElementById("jlh-score")

var nilai = 0
var Snake = function() {
    this.len = 1;
    this.parts = [new Position(parseInt(canvas.width/2), parseInt(canvas.height/2))];
    this.speed = 3;
    this.radius = 10;
    this.dir = new Position(this.speed, 0);
    this.movement = [this.dir.clone()];
    
    this.update = function() {
        for(var i = 0; i < this.len; i++) {
        this.parts[i].add(this.movement[i]);
        if(!this.parts[i].bounds(0, 0, canvas.width, canvas.height)) {
            window.alert('Kamu Mati dengan score '+nilai+', Main Lagi ??')
            nilai = 0;
            score.innerHTML = nilai;
            return false;
            
            
        }
        
        }
        
        for(var i = foods.length-1; i >= 0; i--) {
        if(this.parts[0].bounds(foods[i].pos.x-foods[i].rad, foods[i].pos.y-foods[i].rad, 2*foods[i].rad, 2*foods[i].rad)) {                
            
            foods.splice(i, 1);
            nilai++;
            score.innerHTML = nilai;
            this.grow();
            }
        }
        
        this.movement.pop();
        this.movement.unshift(this.dir.clone());
        return true;
    };
    
    this.draw = function() {
        context.fillStyle = "#c0392b";
        for(var i = 0; i < this.len; i++) {
        context.beginPath()
        context.arc(this.parts[i].x, this.parts[i].y, this.radius, 0, 2*Math.PI);
        context.fill();
        }
    };
    
    this.grow = function() {
        this.parts.unshift(new Position(this.parts[0].x + this.dir.x, this.parts[0].y + this.dir.y));
        this.movement.unshift(this.dir.clone());
        this.len++;
    };
    
    this.moveLeft = function() {
        this.dir = new Position(-this.speed, 0);
    };
    
    this.moveDown = function() {
        this.dir = new Position(0, this.speed);
    };
    
    this.moveUp = function() {
        this.dir = new Position(0, -this.speed);
    };
    
    this.moveRight = function() {
        this.dir = new Position(this.speed, 0);
    };
};

var baru = new Snake();

var random = function() {
return new Position(Math.floor(Math.random() * (canvas.width)), Math.floor(Math.random() * (canvas.height)));
};

var draw = function() {
clear();

if(Math.random() > 0.99 || foods.length == 0) {
    foods.push(new Food(random()))
}

if(!baru.update()) {
    
    baru = new Snake();
    foods = [];
}
baru.draw();

for(var i = 0; i < foods.length; i++) {
    foods[i].draw();
}

requestAnimationFrame(draw);
};

window.addEventListener("keydown", function(e) {
switch(e.keyCode) {
    case 37: baru.moveLeft();
            break;
    case 38: baru.moveUp();
            break;
    case 39: baru.moveRight();
            break;
    case 40: baru.moveDown();
            break;
                }
});

draw();