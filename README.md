# Proyek Backend Recipe dengan Express.js

Proyek ini adalah backend API yang dibangun menggunakan framework Express.js untuk mengelola data pada sebuah aplikasi. API ini menyediakan berbagai fitur utama termasuk operasi CRUD, pengurutan, pencarian, dan pagination untuk mengelola data dengan efisien. Proyek ini juga menggunakan manajemen variabel lingkungan (env) dan disertai dengan koleksi Postman untuk pengujian API dan untuk database yang digunakan adalah PostgreSQL.

## Fitur Utama:
- **CRUD Operations**: Memungkinkan pengguna untuk membuat, membaca, memperbarui, dan menghapus entitas dalam sistem.
- **Sort**: Menyediakan opsi untuk mengurutkan data berdasarkan kriteria tertentu, seperti nama, tanggal, atau harga.
- **Search**: Memungkinkan pengguna untuk mencari data berdasarkan kriteria pencarian tertentu, dengan dukungan untuk pencarian teks parsial.
- **Pagination**: Membagi hasil pencarian atau data menjadi halaman terpisah untuk meningkatkan kinerja dan pengalaman pengguna.
- **Env Management**: Menggunakan variabel lingkungan untuk mengkonfigurasi aplikasi, seperti koneksi database atau pengaturan global lainnya.
- **Postman Collection**: Disertakan koleksi Postman yang berisi permintaan API yang dapat digunakan untuk menguji dan mendokumentasikan API.

## Instalasi dan Penggunaan:
1. **Clone Repository**: Clone repositori ini ke dalam sistem lokal Anda.
2. **Instal Dependensi**: Jalankan `npm install` untuk menginstal semua dependensi yang diperlukan.
3. **Konfigurasi Environment**: Atur variabel lingkungan yang diperlukan dalam file `.env` untuk mengatur pengaturan aplikasi.
4. **Jalankan Server**: Jalankan server dengan perintah `npm start`.
5. **Uji API**: Gunakan koleksi Postman yang disertakan untuk menguji dan mengeksplorasi API.