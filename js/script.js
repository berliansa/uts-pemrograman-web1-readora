/* =====================================
   READORA - MAIN JAVASCRIPT
   ===================================== */

// DATA AKUN PENGGUNA DARI FILE data.js
let akunPengguna = [...dataPengguna];

// =====================================
// 1. LOGIN DAN VALIDASI FORM
// =====================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const akun = akunPengguna.find(function(user) {
            return user.email === email &&
                   user.password === password;
        });

        if (akun) {

            alert("Login berhasil! Selamat datang di Readora.");

            window.location.href = "dashboard.html";

        } else {

            alert("email/password yang anda masukkan salah");

        }

    });

}


// =====================================
// 2. MODAL DAFTAR DAN LUPA PASSWORD
// =====================================

const forgotBtn = document.getElementById("forgotBtn");
const registerBtn = document.getElementById("registerBtn");

const forgotModal = document.getElementById("forgotModal");
const registerModal = document.getElementById("registerModal");


// Membuka modal lupa password

if (forgotBtn) {

    forgotBtn.addEventListener("click", function() {
        forgotModal.style.display = "flex";
    });

}


// Membuka modal daftar

if (registerBtn) {

    registerBtn.addEventListener("click", function() {
        registerModal.style.display = "flex";
    });

}


// Menutup modal

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const modalId = button.getAttribute("data-close");

        document.getElementById(modalId).style.display = "none";

    });

});


// Menutup modal ketika area luar diklik

document.querySelectorAll(".modal").forEach(function(modal) {

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {
            modal.style.display = "none";
        }

    });

});


// =====================================
// 3. FORM LUPA PASSWORD
// =====================================

const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("forgotEmail").value.trim();

        const akun = akunPengguna.find(function(user) {
            return user.email === email;
        });

        if (akun) {

            alert("Email ditemukan! Fitur ini merupakan simulasi lupa password.");

        } else {

            alert("Email tidak ditemukan. Silakan periksa kembali.");

        }

        forgotForm.reset();
        forgotModal.style.display = "none";

    });

}


// =====================================
// 4. FORM PENDAFTARAN AKUN
// =====================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nama = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;

        const emailTerdaftar = akunPengguna.some(function(user) {
            return user.email === email;
        });

        if (emailTerdaftar) {

            alert("Email sudah terdaftar. Silakan gunakan email lain.");

        } else {

            akunPengguna.push({
                nama: nama,
                email: email,
                password: password
            });

            alert("Pendaftaran berhasil! Silakan login menggunakan akun baru.");

            registerForm.reset();
            registerModal.style.display = "none";

        }

    });

}

// =====================================
// 5. DASHBOARD READORA
// =====================================

const greetingName = document.getElementById("greetingName");

if (greetingName) {

    // Greeting berdasarkan waktu lokal

    const waktuSekarang = new Date();
    const jam = waktuSekarang.getHours();

    let sapaan;

    if (jam >= 5 && jam < 11) {
        sapaan = "Selamat pagi";
    } else if (jam >= 11 && jam < 15) {
        sapaan = "Selamat siang";
    } else if (jam >= 15 && jam < 18) {
        sapaan = "Selamat sore";
    } else {
        sapaan = "Selamat malam";
    }

    greetingName.textContent = sapaan + ", Admin Readora!";

    const tanggal = waktuSekarang.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("greetingTime").textContent =
        "Hari ini, " + tanggal;


    // Menampilkan ringkasan data buku dan pesanan

    if (typeof dataKatalogBuku !== "undefined") {

        document.getElementById("totalBuku").textContent =
            dataKatalogBuku.length;

    }

    if (typeof dataPesanan !== "undefined") {

        document.getElementById("totalPesanan").textContent =
            dataPesanan.length;

        const pesananAktif = dataPesanan.filter(function(pesanan) {
            return pesanan.status !== "Selesai";
        });

        document.getElementById("pesananProses").textContent =
            pesananAktif.length;


        // Menampilkan tabel history transaksi

        const historyTable = document.getElementById("historyTable");

        historyTable.innerHTML = "";

        dataPesanan.forEach(function(pesanan) {

            const baris = document.createElement("tr");

            baris.innerHTML = `
                <td>${pesanan.id}</td>
                <td>${pesanan.nama}</td>
                <td>${pesanan.buku}</td>
                <td>Rp ${pesanan.total.toLocaleString("id-ID")}</td>
                <td>${pesanan.status}</td>
            `;

            historyTable.appendChild(baris);

        });

    }

}


// =====================================
// 6. TOMBOL LOGOUT
// =====================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        const konfirmasi = confirm("Apakah kamu yakin ingin logout?");

        if (konfirmasi) {
            window.location.href = "index.html";
        }

    });

}

// 7. HALAMAN INFORMASI STOK / KATALOG BUKU
const catalogTable = document.getElementById("catalogTable");

if (catalogTable) {
    const formTambahBuku = document.getElementById("formTambahBuku");
    const cariBuku = document.getElementById("cariBuku");

    // Menampilkan data buku ke tabel
    function tampilkanKatalog(data) {
        catalogTable.innerHTML = "";

        data.forEach(function(buku, index) {
            const baris = document.createElement("tr");

            const nomor = document.createElement("td");
            nomor.textContent = index + 1;
            
            const judul = document.createElement("td");
            judul.innerHTML = `
            <div class="buku-info">
            <img src="${buku.gambar}" alt="${buku.judul}" class="gambar-buku">
            <span>${buku.judul}</span>
            </div>
            `;

            const penulis = document.createElement("td");
            penulis.textContent = buku.penulis;

            const kategori = document.createElement("td");
            kategori.textContent = buku.kategori;

            const harga = document.createElement("td");
            harga.textContent = "Rp " + buku.harga.toLocaleString("id-ID");

            const stok = document.createElement("td");
            stok.textContent = buku.stok + " buku";

            baris.append(
                nomor, judul, penulis, kategori, harga, stok
            );

            catalogTable.appendChild(baris);
        });
    }

    // Menampilkan katalog saat halaman dibuka
    tampilkanKatalog(dataKatalogBuku);

    // Fitur pencarian buku
    cariBuku.addEventListener("input", function() {
        const kataKunci = cariBuku.value.toLowerCase();

        const hasilPencarian = dataKatalogBuku.filter(function(buku) {
            return buku.judul.toLowerCase().includes(kataKunci) ||
                   buku.penulis.toLowerCase().includes(kataKunci);
        });

        tampilkanKatalog(hasilPencarian);
    });

    // Menambahkan buku baru
    formTambahBuku.addEventListener("submit", function(event) {
        event.preventDefault();

        const bukuBaru = {
            id: dataKatalogBuku.length + 1,
            judul: document.getElementById("judulBuku").value.trim(),
            penulis: document.getElementById("penulisBuku").value.trim(),
            kategori: document.getElementById("kategoriBuku").value.trim(),
            harga: Number(document.getElementById("hargaBuku").value),
            stok: Number(document.getElementById("stokBuku").value),
            gambar: ""
        };

        dataKatalogBuku.push(bukuBaru);

        tampilkanKatalog(dataKatalogBuku);
        formTambahBuku.reset();

        alert("Buku berhasil ditambahkan ke katalog!");
    });
}

// =====================================
// 8. HALAMAN CHECKOUT DAN LAPORAN PEMESANAN
// =====================================

const formCheckout = document.getElementById("formCheckout");

if (formCheckout) {
    const pilihBuku = document.getElementById("pilihBuku");
    const jumlahBuku = document.getElementById("jumlahBuku");
    const totalHarga = document.getElementById("totalHarga");
    const orderTable = document.getElementById("orderTable");
    const editOrderId = document.getElementById("editOrderId");
    const btnSimpanPesanan = document.getElementById("btnSimpanPesanan");
    const btnBatalEdit = document.getElementById("btnBatalEdit");

    // Mengambil kode buku, baik dari kodeBarang maupun id
    function ambilKodeBuku(buku) {
        return String(buku.kodeBarang ?? buku.id ?? "");
    }

    // Mengambil judul buku
    function ambilJudulBuku(buku) {
        return buku.judul ?? buku.namaBarang ?? "-";
    }

    // Mengubah harga menjadi angka
    function ambilHargaBuku(buku) {
        if (typeof buku.harga === "number") {
            return buku.harga;
        }

        return Number(String(buku.harga).replace(/[^\d]/g, "")) || 0;
    }

    // Mengisi pilihan buku dari katalog
    pilihBuku.innerHTML = '<option value="">-- Pilih Buku --</option>';

    dataKatalogBuku.forEach(function(buku) {
        const pilihan = document.createElement("option");

        pilihan.value = ambilKodeBuku(buku);
        pilihan.textContent = ambilJudulBuku(buku);

        pilihBuku.appendChild(pilihan);
    });

    // Mencari buku berdasarkan kode yang dipilih
    function cariBukuDipilih() {
        return dataKatalogBuku.find(function(buku) {
            return ambilKodeBuku(buku) === pilihBuku.value;
        });
    }

    // Menghitung total harga
    function hitungTotal() {
        const bukuDipilih = cariBukuDipilih();
        const jumlah = Number(jumlahBuku.value);

        if (bukuDipilih && jumlah > 0) {
            const total = ambilHargaBuku(bukuDipilih) * jumlah;

            totalHarga.textContent =
                "Rp " + total.toLocaleString("id-ID");
        } else {
            totalHarga.textContent = "Rp 0";
        }
    }

    pilihBuku.addEventListener("change", hitungTotal);
    jumlahBuku.addEventListener("input", hitungTotal);

    // Menampilkan daftar pesanan
    function tampilkanPesanan() {
        orderTable.innerHTML = "";

        dataPesanan.forEach(function(pesanan) {
            const baris = document.createElement("tr");

            const dataBaris = [
                pesanan.id,
                pesanan.nama,
                pesanan.buku,
                pesanan.jumlah,
                "Rp " + Number(pesanan.total).toLocaleString("id-ID"),
                pesanan.status
            ];

            dataBaris.forEach(function(nilai) {
                const kolom = document.createElement("td");
                kolom.textContent = nilai;
                baris.appendChild(kolom);
            });

            const kolomAksi = document.createElement("td");
            const tombolEdit = document.createElement("button");

            tombolEdit.type = "button";
            tombolEdit.className = "btn-edit";
            tombolEdit.textContent = "Edit";
            tombolEdit.dataset.id = pesanan.id;

            kolomAksi.appendChild(tombolEdit);
            baris.appendChild(kolomAksi);

            orderTable.appendChild(baris);
        });
    }

    // Menampilkan data pesanan awal
    tampilkanPesanan();

    // Menyimpan pesanan baru atau perubahan pesanan
    formCheckout.addEventListener("submit", function(event) {
        event.preventDefault();

        const bukuDipilih = cariBukuDipilih();

        if (!bukuDipilih) {
            alert("Silakan pilih buku terlebih dahulu.");
            return;
        }

        const jumlah = Number(jumlahBuku.value);
        const stokBuku = Number(bukuDipilih.stok);

        if (!Number.isInteger(jumlah) || jumlah < 1) {
            alert("Jumlah buku harus berupa bilangan bulat minimal 1.");
            return;
        }

        if (jumlah > stokBuku) {
            alert("Jumlah pesanan melebihi stok buku yang tersedia.");
            return;
        }

        const dataBaru = {
            nama: document.getElementById("namaPembeli").value.trim(),
            email: document.getElementById("emailPembeli").value.trim(),
            alamat: document.getElementById("alamatPembeli").value.trim(),
            buku: ambilJudulBuku(bukuDipilih),
            jumlah: jumlah,
            total: ambilHargaBuku(bukuDipilih) * jumlah,
            pembayaran: document.getElementById("metodePembayaran").value,
            ekspedisi: document.getElementById("ekspedisi").value,
            tanggalKirim: new Date().toISOString().slice(0, 10),
            paket: document.getElementById("jenisPaket").value
        };

        if (editOrderId.value) {
            // Memperbarui pesanan yang sudah ada
            const pesananLama = dataPesanan.find(function(pesanan) {
                return String(pesanan.id) === editOrderId.value;
            });

            if (pesananLama) {
                Object.assign(pesananLama, dataBaru);
                alert("Data pesanan berhasil diperbarui!");
            }
        } else {
            // Menambahkan pesanan baru
            const pesananBaru = {
                id: "RD" + String(Date.now()).slice(-6),
                ...dataBaru,
                status: "Dikemas"
            };

            dataPesanan.push(pesananBaru);
            alert("Pesanan berhasil ditambahkan!");
        }

        // Mengembalikan form ke kondisi awal
        formCheckout.reset();
        editOrderId.value = "";
        totalHarga.textContent = "Rp 0";
        btnSimpanPesanan.textContent = "Simpan Pesanan";
        btnBatalEdit.hidden = true;

        tampilkanPesanan();
    });

    // Mengisi form ketika tombol Edit diklik
    orderTable.addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-edit")) {
            const id = event.target.dataset.id;

            const pesanan = dataPesanan.find(function(item) {
                return String(item.id) === id;
            });

            if (pesanan) {
                editOrderId.value = pesanan.id;

                document.getElementById("namaPembeli").value =
                    pesanan.nama;

                document.getElementById("emailPembeli").value =
                    pesanan.email || "";

                document.getElementById("alamatPembeli").value =
                    pesanan.alamat || "";

                const buku = dataKatalogBuku.find(function(item) {
                    return ambilJudulBuku(item) === pesanan.buku;
                });

                if (buku) {
                    pilihBuku.value = ambilKodeBuku(buku);
                }

                jumlahBuku.value = pesanan.jumlah;

                document.getElementById("metodePembayaran").value =
                    pesanan.pembayaran || "";

                document.getElementById("ekspedisi").value =
                    pesanan.ekspedisi || "";

                document.getElementById("jenisPaket").value =
                    pesanan.paket || "";

                hitungTotal();

                btnSimpanPesanan.textContent = "Simpan Perubahan";
                btnBatalEdit.hidden = false;

                formCheckout.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });

    // Membatalkan proses edit
    btnBatalEdit.addEventListener("click", function() {
        formCheckout.reset();
        editOrderId.value = "";
        totalHarga.textContent = "Rp 0";
        btnSimpanPesanan.textContent = "Simpan Pesanan";
        btnBatalEdit.hidden = true;
    });
}

// =====================================
// 9. HALAMAN TRACKING PENGIRIMAN
// =====================================

const trackingForm = document.getElementById("trackingForm");

if (trackingForm) {

    const nomorDO = document.getElementById("nomorDO");
    const hasilTracking = document.getElementById("hasilTracking");
    const pesanError = document.getElementById("pesanError");

    trackingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nomor = nomorDO.value.trim();

        // Mencari data dari dataTracking milik dosen
        const pengirimanDosen = dataTracking[nomor];

        // Mencari data pesanan Readora sendiri
        const pengirimanReadora = dataPesanan.find(function(pesanan) {
            return pesanan.id === nomor;
        });

        // Memilih data yang ditemukan
        const pengiriman = pengirimanDosen || pengirimanReadora;

        // Jika nomor tidak ditemukan
        if (!pengiriman) {

            hasilTracking.style.display = "none";
            pesanError.style.display = "block";

            return;
        }

        // Menampilkan hasil tracking
        pesanError.style.display = "none";
        hasilTracking.style.display = "block";

        // Informasi pesanan
        document.getElementById("hasilDO").textContent =
            pengiriman.nomorDO || pengiriman.id;

        document.getElementById("hasilNama").textContent =
            pengiriman.nama;

        document.getElementById("hasilBuku").textContent =
            pengiriman.namaBuku || "-";

        document.getElementById("hasilEkspedisi").textContent =
            pengiriman.ekspedisi || "-";

        // Format tanggal pengiriman
        const tanggal = new Date(
            pengiriman.tanggalKirim + "T00:00:00"
        );

        document.getElementById("hasilTanggal").textContent =
            isNaN(tanggal.getTime())
                ? pengiriman.tanggalKirim
                : tanggal.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

        document.getElementById("hasilPaket").textContent =
            pengiriman.paket || "-";

        // Menampilkan total pembayaran
        const totalPembayaran =
            typeof pengiriman.total === "number"
                ? "Rp " + pengiriman.total.toLocaleString("id-ID")
                : pengiriman.total || "-";

        document.getElementById("hasilTotal").textContent =
            totalPembayaran;

        // Menampilkan status pengiriman
        document.getElementById("statusPengiriman").textContent =
            "Status saat ini: " + pengiriman.status;

        // Mengatur progress pengiriman
        let tahapAktif = 1;

        if (
            pengiriman.status === "Dalam Perjalanan" ||
            pengiriman.status === "Dalam Pengiriman"
        ) {
            tahapAktif = 3;

        } else if (
            pengiriman.status === "Dikirim" ||
            pengiriman.status === "Selesai"
        ) {
            tahapAktif = 4;

        } else if (pengiriman.status === "Dikemas") {
            tahapAktif = 2;
        }

        const semuaTahap =
            document.querySelectorAll(".progress-step");

        semuaTahap.forEach(function(tahap, index) {

            if (index < tahapAktif) {
                tahap.classList.add("active");
            } else {
                tahap.classList.remove("active");
            }

        });

        // Menampilkan riwayat perjalanan paket
        const daftarPerjalanan =
            document.getElementById("hasilPerjalanan");

        if (daftarPerjalanan) {

            daftarPerjalanan.innerHTML = "";

            if (
                pengiriman.perjalanan &&
                pengiriman.perjalanan.length > 0
            ) {

                pengiriman.perjalanan.forEach(function(item) {

                    const baris = document.createElement("div");
                    baris.className = "riwayat-item";

                    const waktu = document.createElement("p");
                    waktu.textContent = item.waktu;

                    const keterangan = document.createElement("p");
                    keterangan.textContent = item.keterangan;

                    baris.appendChild(waktu);
                    baris.appendChild(keterangan);

                    daftarPerjalanan.appendChild(baris);

                });

            } else {

                daftarPerjalanan.textContent =
                    "Riwayat perjalanan belum tersedia untuk pesanan ini.";

            }
        }

    });

}