/* =================================
   DATA PENGGUNA DARI DOSEN
================================= */

var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User"
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User"
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin"
    }
];


/* =================================
   DATA KATALOG BUKU DARI DOSEN
================================= */

var dataKatalogBuku = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: 180000,
        hargaLabel: "Rp 180.000",
        cover: "images/pengantar_komunikasi.jpg",

        // Penyesuaian untuk kode Readora sebelumnya
        judul: "Pengantar Ilmu Komunikasi",
        penulis: "Tidak dicantumkan",
        kategori: "Buku Ajar",
        gambar: "images/pengantar_komunikasi.jpg"
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "Buku Ajar",
        edisi: "3",
        stok: 392,
        harga: 220000,
        hargaLabel: "Rp 220.000",
        cover: "images/manajemen_keuangan.jpg",

        judul: "Manajemen Keuangan",
        penulis: "Tidak dicantumkan",
        kategori: "Buku Ajar",
        gambar: "images/manajemen_keuangan.jpg"
    },
    {
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "Buku Ajar",
        edisi: "1",
        stok: 278,
        harga: 150000,
        hargaLabel: "Rp 150.000",
        cover: "images/kepemimpinan.jpg",

        judul: "Kepemimpinan",
        penulis: "Tidak dicantumkan",
        kategori: "Buku Ajar",
        gambar: "images/kepemimpinan.jpg"
    },
    {
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 165,
        harga: 200000,
        hargaLabel: "Rp 200.000",
        cover: "images/mikrobiologi.jpg",

        judul: "Mikrobiologi Dasar",
        penulis: "Tidak dicantumkan",
        kategori: "Buku Ajar",
        gambar: "images/mikrobiologi.jpg"
    },
    {
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "Buku Ajar",
        edisi: "4",
        stok: 204,
        harga: 250000,
        hargaLabel: "Rp 250.000",
        cover: "images/paud_perkembangan.jpg",

        judul: "Perkembangan Anak Usia Dini",
        penulis: "Tidak dicantumkan",
        kategori: "Buku Ajar",
        gambar: "images/paud_perkembangan.jpg"
    }
];


/* =================================
   DATA PEMESANAN READORA
================================= */

var dataPesanan = [
    {
        id: "RD001",
        nama: "Nadia Putri",
        buku: "Pengantar Ilmu Komunikasi",
        jumlah: 1,
        total: 180000,
        pembayaran: "Transfer Bank",
        ekspedisi: "JNE",
        tanggalKirim: "2026-11-03",
        paket: "Reguler",
        status: "Dalam Pengiriman"
    },
    {
        id: "RD002",
        nama: "Raka Pratama",
        buku: "Manajemen Keuangan",
        jumlah: 2,
        total: 440000,
        pembayaran: "E-Wallet",
        ekspedisi: "J&T",
        tanggalKirim: "2026-11-02",
        paket: "Express",
        status: "Dikemas"
    },
    {
        id: "RD003",
        nama: "Alya Safira",
        buku: "Kepemimpinan",
        jumlah: 1,
        total: 150000,
        pembayaran: "Transfer Bank",
        ekspedisi: "SiCepat",
        tanggalKirim: "2026-11-01",
        paket: "Reguler",
        status: "Selesai"
    }
];


/* =================================
   DATA TRACKING DARI DOSEN
================================= */

var dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        namaBuku: "Pengantar Ilmu Komunikasi",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            }
        ]
    },

    "20230013": {
        nomorDO: "20230013",
        nama: "Agus Pranoto",
        namaBuku: "Manajemen Keuangan",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
};