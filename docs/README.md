## Geting Start
Selamat datang di documentation dari permainan game ular yang telah saya buat


### Pengenalan Game Ular
> Game Ular ini menggunakan bahasa pemrograman `javascript` native. Cara main game ini adalah dengan menggunakan tombol navigasi `left`, `right`, `top`, `bottom`. Pada game ini disediakan Nama dan Jumlah Score anda dan dapat dilihat pada navbar.

### Penggunaan Syntax HTML
> Pada game ini dibuat melalui syntax html yaitu `<canvas>` sebagai dasar dimana game ini akan dibuat dengan id board
```html
<canvas id="board"></canvas>
```

## Penggunaan Script
Karena permainan ini dibuat menggunakan javascript, berikut ini adalah penjelasan dari script yang digunakan

### Menampilkan Nama
> pada bagian ini saya menggunakan prompt untuk mengambil nilai nama
```js
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
```

### Membuat variabel canvas
> The CanvasRenderingContext2D interface, bagian dari Canvas API, menyediakan konteks rendering 2D untuk permukaan gambar elemen `<canvas>`. Ini digunakan untuk menggambar bentuk, teks, gambar, dan objek lainnya.
```js
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
```

### Mengambil Ukuran Layar
> Untuk mengambil lebar dan tinggi layar menggunakan script `window.innerWidth` dan `window.innerHeight`. Kemudian memberi warna pada layar canvas `context.fillStyle`
```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var clear = function() {
	context.fillStyle = "#2c3e50";
	context.fillRect(0, 0, canvas.width, canvas.height); 
};
```

### Menentukan Posisi sang ular
> Untuk mengatur posisi sang ular dan pembuatan sang ular saya menggunakan script sebagai berikut.

```js
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
}
```

### Pembuatan makanan sang Ular
> Untuk pembuatan makanan untuk sang Ular saya menggunakan script berikut.

```js
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
```

### Pengambilan Nilai Score
> Untuk melakukan pengambilan Nilai, Score akan bertambah jika ular memakan makanannya.

```js
var nilai = 0
var Snake = function() {
	this.len = 1;
	this.parts = [new Position(parseInt(canvas.width/2), parseInt(canvas.height/2))];
	this.speed = 3;
	this.radius = 10;
	this.dir = new Position(this.speed, 0);
	this.movement = [this.dir.clone()];

	this.update = function() {
	for (var i = 0; i < this.len; i++) {
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
```

### Ular menjadi panjang ketika Makan
> Untuk membuat ular menjadi panjang ketika memakan makanannya, maka dapat digunakan script seperti berikut

```js
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
```

### Game Over
> Permainan akan berakhir jika ular menabrak pembatas layar, permainan dapat dimulai lagi dengan score dan panjang ular seperti di awal tadi. 

```js
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
}
```


### Kontrol keyboard

>Untuk dapat mengendalikan ular menggunakan keyboard dapat menggunakan `window.addEventListener`.

```js
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
```

## Anggota
> Berikut ini adalah Nama dan NIM anggota


* Andri Winanda		- 161111931
* Mega Catur Herningrum 			- 161111906
* Hamdi Ziqki Bagus Trilaksono 					- 161112103
* Steven Claode Aprilasta		- 161111124







