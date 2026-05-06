# Panduan Download Data BPS & Badilag

Panduan ini menjelaskan cara mengunduh data statistik perkara Pengadilan Agama
untuk digunakan bersama `convert.html`.

---

## Sumber 1 — Badilag (Pusatdata)

**URL:** https://pusatdata.badilag.net/perkara/

### Langkah-langkah:

1. Buka URL di atas di browser
2. Di bagian atas halaman, pilih **tahun** yang diinginkan (tersedia 2017–2026)
3. Pilih menu **DATA PERKARA** → **Per Jenis Perkara**
4. Pilih filter **Provinsi** = "Semua Provinsi"
5. Klik tombol **Export** atau **Unduh Excel** (ikon spreadsheet)
6. Simpan file dengan nama misalnya: `badilag-2023.xlsx`

Ulangi untuk setiap tahun yang dibutuhkan (2018–2026).

### Format yang diharapkan:

Kolom minimal yang harus ada di file Excel:
| Kolom | Contoh isi |
|---|---|
| Provinsi | Jawa Barat |
| Tahun | 2023 |
| Jenis Perkara | Cerai Gugat |
| Jumlah | 28.500 |

Jika kolom berbeda nama, gunakan fitur pemetaan kolom di `convert.html`.

### Data satker (kota/kabupaten):

1. Masih di pusatdata.badilag.net, pilih menu **DATA PERKARA** → **Per Satuan Kerja**
2. Filter: Tahun yang diinginkan, Provinsi = "Semua"
3. Export ke Excel
4. Simpan sebagai `badilag-satker-2023.xlsx`

---

## Sumber 2 — BPS (Badan Pusat Statistik)

**URL:** https://www.bps.go.id → Statistik Sosial → Peradilan

### Langkah-langkah:

1. Buka https://www.bps.go.id
2. Klik menu **Statistik** → **Statistik Sosial** → **Peradilan**
3. Cari tabel: **"Perkara yang Diterima Pengadilan Agama Menurut Provinsi"**
4. Klik tabel tersebut
5. Di halaman tabel, klik tombol **Unduh** (pojok kanan atas) → pilih format **Excel**
6. Simpan file

### Catatan BPS:

- BPS menyediakan data agregat per provinsi (tidak per kota)
- Biasanya tersedia tahun 2018–2024 (data terbaru mungkin belum lengkap)
- Jika tersedia, unduh juga tabel per jenis perkara

---

## Cara Menggunakan Data yang Sudah Diunduh

1. Buka `convert.html` di browser
2. Di **File 1 (Data Provinsi)**: drag-drop file Excel dari BPS atau Badilag
3. Periksa preview tabel — pastikan kolom terbaca dengan benar
4. Jika kolom tidak terdeteksi otomatis, petakan secara manual menggunakan dropdown
5. Jika punya data satker: upload di **File 2 (Data Satker/Kota)**
6. Klik **Generate data.js**
7. Klik **Salin Semua**
8. Buka file `data.js` dengan Notepad (atau editor teks apapun)
9. Hapus seluruh isi file
10. Tempel (Ctrl+V) hasil yang disalin
11. Simpan file
12. Refresh `dashboard.html` di browser — dashboard sekarang menampilkan data real

---

## Troubleshooting

**"Tidak ada data yang berhasil diparsing"**
→ Nama kolom tidak dikenali. Gunakan dropdown pemetaan kolom secara manual.

**"X baris dilewati"**
→ Baris tersebut punya nama provinsi atau jenis kasus yang tidak dikenali.
Periksa ejaan di file Excel — pastikan sesuai dengan nama provinsi Indonesia standar.

**Dashboard tidak berubah setelah ganti data.js**
→ Coba hard-refresh: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac).

**Peta tidak muncul**
→ Dashboard akan menampilkan tabel alternatif jika peta gagal dimuat.
Ini normal jika koneksi internet tidak tersedia.
