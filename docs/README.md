## Geting Start
Selamat datang di documentation dari permainan game ular yang telah saya buat

### Pengenalan Game Ular
> Game Ular ini menggunakan bahasa pemrograman `javascript` native. Cara main game ini adalah dengan menggunakan tombol navigasi `left`, `right`, `top`, `bottom`. Pada game ini disediakan Nama dan Jumlah Score anda dan dapat dilihat pada navbar.

### Penggunaan Syntax HTML
> Pada game ini dibuat melalui syntax html yaitu `<canvas>` sebagai dasar dimana game ini akan dibuat dengan id board
```
<canvas id="board"></canvas>
```

## Penggunaan Script
Karena permainan ini dibuat menggunakan javascript, berikut ini adalah penjelasan dari script yang digunakan

### Menampilkan Nama
> pada bagian ini saya menggunakan prompt untuk mengambil nilai nama
```
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
```
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
```

### Mengambil Ukuran Layar
> Untuk mengambil lebar dan tinggi layar menggunakan script `window.innerWidth` dan `window.innerHeight`. Kemudian memberi warna pada layar canvas `context.fillStyle`
```
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var clear = function() {
    context.fillStyle = "#2c3e50";
    context.fillRect(0, 0, canvas.width, canvas.height); 
};
```

### 

