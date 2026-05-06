// Data Simulasi Realistis - Statistik Pengadilan Agama Indonesia
// Sumber referensi: BPS & Badilag (data simulasi untuk keperluan akademik)
(function() {
const TAHUN = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

const JENIS_KASUS = [
  { id: 'cerai_gugat', label: 'Cerai Gugat', warna: '#10b981' },
  { id: 'cerai_talak', label: 'Cerai Talak', warna: '#3b82f6' },
  { id: 'dispensasi_kawin', label: 'Dispensasi Kawin', warna: '#f59e0b' },
  { id: 'itsbat_nikah', label: 'Itsbat Nikah', warna: '#8b5cf6' },
  { id: 'harta_waris', label: 'Harta Waris', warna: '#ef4444' },
  { id: 'hak_asuh', label: 'Hak Asuh Anak', warna: '#06b6d4' },
  { id: 'kdrt', label: 'KDRT', warna: '#f97316' },
  { id: 'ekonomi_syariah', label: 'Ekonomi Syariah', warna: '#84cc16' },
];

// Faktor pertumbuhan per jenis kasus (trend nasional)
const TREND_FAKTOR = {
  cerai_gugat:      [1.00, 1.04, 0.85, 1.10, 1.08, 1.06, 1.05, 1.04, 1.03],
  cerai_talak:      [1.00, 1.02, 0.83, 1.08, 1.05, 1.04, 1.03, 1.02, 1.02],
  dispensasi_kawin: [1.00, 1.08, 1.15, 1.45, 1.38, 1.20, 1.12, 1.08, 1.06],
  itsbat_nikah:     [1.00, 1.03, 0.90, 1.05, 1.04, 1.03, 1.02, 1.01, 1.01],
  harta_waris:      [1.00, 1.05, 0.92, 1.07, 1.06, 1.05, 1.04, 1.03, 1.03],
  hak_asuh:         [1.00, 1.06, 0.88, 1.09, 1.07, 1.06, 1.05, 1.04, 1.03],
  kdrt:             [1.00, 1.10, 1.05, 1.18, 1.15, 1.12, 1.08, 1.06, 1.04],
  ekonomi_syariah:  [1.00, 1.15, 1.08, 1.20, 1.25, 1.30, 1.28, 1.25, 1.22],
};

// Provinsi dengan data base (kasus per tahun 2018, 8 jenis)
const PROVINSI_DATA = [
  { id: 'aceh',             nama: 'Aceh',                    base: [3200, 1800, 420, 890, 310, 180, 95, 42],  pop: 5.27 },
  { id: 'sumut',            nama: 'Sumatera Utara',          base: [5800, 3200, 680, 1200, 520, 310, 180, 95],  pop: 14.79 },
  { id: 'sumbar',           nama: 'Sumatera Barat',          base: [3100, 1700, 390, 780, 280, 165, 88, 38],  pop: 5.53 },
  { id: 'riau',             nama: 'Riau',                    base: [4200, 2300, 510, 980, 380, 225, 125, 68],  pop: 6.59 },
  { id: 'jambi',            nama: 'Jambi',                   base: [2100, 1150, 260, 540, 190, 112, 62, 28],  pop: 3.60 },
  { id: 'sumsel',           nama: 'Sumatera Selatan',        base: [4800, 2600, 580, 1100, 420, 248, 138, 72],  pop: 8.47 },
  { id: 'bengkulu',         nama: 'Bengkulu',                base: [1200, 650, 155, 320, 115, 68, 38, 16],  pop: 2.01 },
  { id: 'lampung',          nama: 'Lampung',                 base: [5200, 2850, 640, 1180, 460, 272, 152, 78],  pop: 9.01 },
  { id: 'babel',            nama: 'Kep. Bangka Belitung',   base: [780, 420, 98, 210, 72, 42, 24, 10],  pop: 1.43 },
  { id: 'kepri',            nama: 'Kepulauan Riau',          base: [1100, 580, 135, 290, 102, 60, 34, 18],  pop: 2.16 },
  { id: 'dki',              nama: 'DKI Jakarta',             base: [11200, 6200, 950, 1800, 980, 580, 320, 210],  pop: 10.56 },
  { id: 'jabar',            nama: 'Jawa Barat',              base: [28500, 15800, 2800, 4200, 2400, 1420, 780, 420],  pop: 49.32 },
  { id: 'jateng',           nama: 'Jawa Tengah',             base: [22000, 12200, 2200, 3800, 1900, 1120, 620, 310],  pop: 36.52 },
  { id: 'diy',              nama: 'DI Yogyakarta',           base: [3200, 1760, 320, 680, 280, 165, 92, 58],  pop: 3.76 },
  { id: 'jatim',            nama: 'Jawa Timur',              base: [32000, 17800, 3100, 5200, 2800, 1650, 920, 480],  pop: 40.67 },
  { id: 'banten',           nama: 'Banten',                  base: [8200, 4500, 820, 1600, 720, 425, 235, 118],  pop: 11.90 },
  { id: 'bali',             nama: 'Bali',                    base: [420, 230, 55, 125, 38, 22, 12, 8],  pop: 4.32 },
  { id: 'ntb',              nama: 'Nusa Tenggara Barat',     base: [5800, 3200, 680, 1400, 520, 305, 170, 82],  pop: 5.32 },
  { id: 'ntt',              nama: 'Nusa Tenggara Timur',     base: [480, 265, 62, 138, 42, 25, 14, 6],  pop: 5.33 },
  { id: 'kalbar',           nama: 'Kalimantan Barat',        base: [2800, 1540, 355, 730, 248, 145, 82, 36],  pop: 5.41 },
  { id: 'kalteng',          nama: 'Kalimantan Tengah',       base: [1900, 1040, 242, 498, 168, 99, 56, 24],  pop: 2.66 },
  { id: 'kalsel',           nama: 'Kalimantan Selatan',      base: [4200, 2310, 535, 1100, 372, 218, 122, 54],  pop: 4.23 },
  { id: 'kaltim',           nama: 'Kalimantan Timur',        base: [3500, 1920, 445, 918, 308, 182, 102, 48],  pop: 3.77 },
  { id: 'kalut',            nama: 'Kalimantan Utara',        base: [580, 318, 74, 152, 52, 30, 17, 7],  pop: 0.72 },
  { id: 'sulut',            nama: 'Sulawesi Utara',          base: [420, 230, 55, 118, 38, 22, 12, 5],  pop: 2.62 },
  { id: 'sulteng',          nama: 'Sulawesi Tengah',         base: [1800, 988, 230, 472, 158, 93, 52, 22],  pop: 2.98 },
  { id: 'sulsel',           nama: 'Sulawesi Selatan',        base: [7200, 3960, 918, 1890, 636, 374, 208, 90],  pop: 9.07 },
  { id: 'sultra',           nama: 'Sulawesi Tenggara',       base: [2100, 1155, 268, 552, 186, 109, 61, 26],  pop: 2.62 },
  { id: 'gorontalo',        nama: 'Gorontalo',               base: [820, 450, 105, 216, 72, 43, 24, 10],  pop: 1.18 },
  { id: 'sulbar',           nama: 'Sulawesi Barat',          base: [980, 538, 125, 258, 86, 51, 28, 12],  pop: 1.42 },
  { id: 'maluku',           nama: 'Maluku',                  base: [680, 374, 87, 178, 60, 35, 20, 8],  pop: 1.85 },
  { id: 'malut',            nama: 'Maluku Utara',            base: [720, 396, 92, 188, 64, 38, 21, 9],  pop: 1.28 },
  { id: 'papbar',           nama: 'Papua Barat',             base: [380, 208, 48, 99, 34, 20, 11, 5],  pop: 1.13 },
  { id: 'papua',            nama: 'Papua',                   base: [520, 285, 66, 136, 46, 27, 15, 6],  pop: 4.31 },
];

// Kota/Kabupaten per provinsi (sampel representatif)
const KOTA_PER_PROVINSI = {
  aceh: [
    { nama: 'Banda Aceh', fak: 0.18 }, { nama: 'Lhokseumawe', fak: 0.12 },
    { nama: 'Langsa', fak: 0.10 }, { nama: 'Kab. Aceh Besar', fak: 0.14 },
    { nama: 'Kab. Pidie', fak: 0.11 }, { nama: 'Kab. Bireuen', fak: 0.10 },
    { nama: 'Kab. Aceh Utara', fak: 0.13 }, { nama: 'Lainnya', fak: 0.12 },
  ],
  sumut: [
    { nama: 'Medan', fak: 0.22 }, { nama: 'Deli Serdang', fak: 0.14 },
    { nama: 'Langkat', fak: 0.09 }, { nama: 'Serdang Bedagai', fak: 0.08 },
    { nama: 'Asahan', fak: 0.09 }, { nama: 'Labuhan Batu', fak: 0.08 },
    { nama: 'Simalungun', fak: 0.10 }, { nama: 'Lainnya', fak: 0.20 },
  ],
  sumbar: [
    { nama: 'Padang', fak: 0.20 }, { nama: 'Bukittinggi', fak: 0.12 },
    { nama: 'Payakumbuh', fak: 0.10 }, { nama: 'Kab. Agam', fak: 0.12 },
    { nama: 'Kab. Tanah Datar', fak: 0.10 }, { nama: 'Kab. Pasaman', fak: 0.09 },
    { nama: 'Lainnya', fak: 0.27 },
  ],
  riau: [
    { nama: 'Pekanbaru', fak: 0.24 }, { nama: 'Dumai', fak: 0.10 },
    { nama: 'Kab. Kampar', fak: 0.13 }, { nama: 'Kab. Bengkalis', fak: 0.10 },
    { nama: 'Kab. Rokan Hulu', fak: 0.11 }, { nama: 'Lainnya', fak: 0.32 },
  ],
  jambi: [
    { nama: 'Jambi Kota', fak: 0.22 }, { nama: 'Kab. Muaro Jambi', fak: 0.14 },
    { nama: 'Kab. Batanghari', fak: 0.12 }, { nama: 'Kab. Merangin', fak: 0.11 },
    { nama: 'Lainnya', fak: 0.41 },
  ],
  sumsel: [
    { nama: 'Palembang', fak: 0.23 }, { nama: 'Prabumulih', fak: 0.08 },
    { nama: 'Kab. OKU', fak: 0.10 }, { nama: 'Kab. Musi Banyuasin', fak: 0.11 },
    { nama: 'Kab. Banyuasin', fak: 0.12 }, { nama: 'Lainnya', fak: 0.36 },
  ],
  bengkulu: [
    { nama: 'Bengkulu Kota', fak: 0.28 }, { nama: 'Kab. Seluma', fak: 0.15 },
    { nama: 'Kab. Bengkulu Tengah', fak: 0.13 }, { nama: 'Lainnya', fak: 0.44 },
  ],
  lampung: [
    { nama: 'Bandar Lampung', fak: 0.22 }, { nama: 'Metro', fak: 0.08 },
    { nama: 'Kab. Lampung Selatan', fak: 0.12 }, { nama: 'Kab. Lampung Tengah', fak: 0.14 },
    { nama: 'Kab. Lampung Timur', fak: 0.12 }, { nama: 'Lainnya', fak: 0.32 },
  ],
  babel: [
    { nama: 'Pangkalpinang', fak: 0.30 }, { nama: 'Kab. Bangka', fak: 0.22 },
    { nama: 'Kab. Belitung', fak: 0.18 }, { nama: 'Lainnya', fak: 0.30 },
  ],
  kepri: [
    { nama: 'Batam', fak: 0.38 }, { nama: 'Tanjungpinang', fak: 0.20 },
    { nama: 'Kab. Bintan', fak: 0.15 }, { nama: 'Lainnya', fak: 0.27 },
  ],
  dki: [
    { nama: 'Jakarta Pusat', fak: 0.15 }, { nama: 'Jakarta Utara', fak: 0.16 },
    { nama: 'Jakarta Barat', fak: 0.20 }, { nama: 'Jakarta Selatan', fak: 0.22 },
    { nama: 'Jakarta Timur', fak: 0.24 }, { nama: 'Kep. Seribu', fak: 0.03 },
  ],
  jabar: [
    { nama: 'Bandung', fak: 0.12 }, { nama: 'Bekasi', fak: 0.10 },
    { nama: 'Depok', fak: 0.08 }, { nama: 'Bogor', fak: 0.09 },
    { nama: 'Cimahi', fak: 0.05 }, { nama: 'Tasikmalaya', fak: 0.06 },
    { nama: 'Garut', fak: 0.07 }, { nama: 'Sukabumi', fak: 0.06 },
    { nama: 'Kab. Cianjur', fak: 0.07 }, { nama: 'Kab. Indramayu', fak: 0.08 },
    { nama: 'Kab. Karawang', fak: 0.08 }, { nama: 'Lainnya', fak: 0.14 },
  ],
  jateng: [
    { nama: 'Semarang', fak: 0.10 }, { nama: 'Solo', fak: 0.07 },
    { nama: 'Kab. Brebes', fak: 0.07 }, { nama: 'Kab. Cilacap', fak: 0.07 },
    { nama: 'Kab. Banyumas', fak: 0.07 }, { nama: 'Kab. Kendal', fak: 0.06 },
    { nama: 'Kab. Pemalang', fak: 0.06 }, { nama: 'Kab. Tegal', fak: 0.07 },
    { nama: 'Purwokerto', fak: 0.06 }, { nama: 'Lainnya', fak: 0.37 },
  ],
  diy: [
    { nama: 'Yogyakarta', fak: 0.22 }, { nama: 'Kab. Sleman', fak: 0.24 },
    { nama: 'Kab. Bantul', fak: 0.22 }, { nama: 'Kab. Kulon Progo', fak: 0.16 },
    { nama: 'Kab. Gunungkidul', fak: 0.16 },
  ],
  jatim: [
    { nama: 'Surabaya', fak: 0.10 }, { nama: 'Malang', fak: 0.07 },
    { nama: 'Sidoarjo', fak: 0.07 }, { nama: 'Gresik', fak: 0.05 },
    { nama: 'Kab. Jember', fak: 0.07 }, { nama: 'Kab. Banyuwangi', fak: 0.06 },
    { nama: 'Kab. Kediri', fak: 0.06 }, { nama: 'Kab. Pasuruan', fak: 0.06 },
    { nama: 'Kab. Sampang', fak: 0.06 }, { nama: 'Kab. Bangkalan', fak: 0.05 },
    { nama: 'Kab. Pamekasan', fak: 0.05 }, { nama: 'Lainnya', fak: 0.30 },
  ],
  banten: [
    { nama: 'Tangerang', fak: 0.18 }, { nama: 'Tangerang Selatan', fak: 0.14 },
    { nama: 'Serang', fak: 0.12 }, { nama: 'Cilegon', fak: 0.09 },
    { nama: 'Kab. Tangerang', fak: 0.20 }, { nama: 'Kab. Serang', fak: 0.14 },
    { nama: 'Lainnya', fak: 0.13 },
  ],
  bali: [
    { nama: 'Denpasar', fak: 0.30 }, { nama: 'Kab. Badung', fak: 0.18 },
    { nama: 'Kab. Gianyar', fak: 0.14 }, { nama: 'Lainnya', fak: 0.38 },
  ],
  ntb: [
    { nama: 'Mataram', fak: 0.18 }, { nama: 'Kab. Lombok Tengah', fak: 0.14 },
    { nama: 'Kab. Lombok Timur', fak: 0.18 }, { nama: 'Kab. Sumbawa', fak: 0.12 },
    { nama: 'Kab. Dompu', fak: 0.10 }, { nama: 'Lainnya', fak: 0.28 },
  ],
  ntt: [
    { nama: 'Kupang', fak: 0.32 }, { nama: 'Kab. Flores Timur', fak: 0.15 },
    { nama: 'Lainnya', fak: 0.53 },
  ],
  kalbar: [
    { nama: 'Pontianak', fak: 0.24 }, { nama: 'Singkawang', fak: 0.12 },
    { nama: 'Kab. Mempawah', fak: 0.11 }, { nama: 'Kab. Sambas', fak: 0.12 },
    { nama: 'Lainnya', fak: 0.41 },
  ],
  kalteng: [
    { nama: 'Palangkaraya', fak: 0.26 }, { nama: 'Kab. Kotawaringin Barat', fak: 0.14 },
    { nama: 'Kab. Kapuas', fak: 0.12 }, { nama: 'Lainnya', fak: 0.48 },
  ],
  kalsel: [
    { nama: 'Banjarmasin', fak: 0.22 }, { nama: 'Banjarbaru', fak: 0.12 },
    { nama: 'Kab. Banjar', fak: 0.14 }, { nama: 'Kab. Hulu Sungai Selatan', fak: 0.10 },
    { nama: 'Lainnya', fak: 0.42 },
  ],
  kaltim: [
    { nama: 'Samarinda', fak: 0.24 }, { nama: 'Balikpapan', fak: 0.20 },
    { nama: 'Bontang', fak: 0.10 }, { nama: 'Kab. Kutai Kartanegara', fak: 0.16 },
    { nama: 'Lainnya', fak: 0.30 },
  ],
  kalut: [
    { nama: 'Tarakan', fak: 0.35 }, { nama: 'Kab. Bulungan', fak: 0.25 },
    { nama: 'Lainnya', fak: 0.40 },
  ],
  sulut: [
    { nama: 'Manado', fak: 0.35 }, { nama: 'Bitung', fak: 0.18 },
    { nama: 'Lainnya', fak: 0.47 },
  ],
  sulteng: [
    { nama: 'Palu', fak: 0.28 }, { nama: 'Kab. Poso', fak: 0.12 },
    { nama: 'Kab. Donggala', fak: 0.12 }, { nama: 'Lainnya', fak: 0.48 },
  ],
  sulsel: [
    { nama: 'Makassar', fak: 0.22 }, { nama: 'Parepare', fak: 0.08 },
    { nama: 'Kab. Gowa', fak: 0.10 }, { nama: 'Kab. Bone', fak: 0.10 },
    { nama: 'Kab. Wajo', fak: 0.08 }, { nama: 'Kab. Bulukumba', fak: 0.08 },
    { nama: 'Lainnya', fak: 0.34 },
  ],
  sultra: [
    { nama: 'Kendari', fak: 0.28 }, { nama: 'Bau-Bau', fak: 0.14 },
    { nama: 'Kab. Konawe', fak: 0.12 }, { nama: 'Lainnya', fak: 0.46 },
  ],
  gorontalo: [
    { nama: 'Gorontalo Kota', fak: 0.32 }, { nama: 'Kab. Gorontalo', fak: 0.28 },
    { nama: 'Lainnya', fak: 0.40 },
  ],
  sulbar: [
    { nama: 'Mamuju', fak: 0.30 }, { nama: 'Kab. Polewali Mandar', fak: 0.22 },
    { nama: 'Lainnya', fak: 0.48 },
  ],
  maluku: [
    { nama: 'Ambon', fak: 0.35 }, { nama: 'Kab. Maluku Tengah', fak: 0.22 },
    { nama: 'Lainnya', fak: 0.43 },
  ],
  malut: [
    { nama: 'Ternate', fak: 0.30 }, { nama: 'Kab. Halmahera Barat', fak: 0.18 },
    { nama: 'Lainnya', fak: 0.52 },
  ],
  papbar: [
    { nama: 'Manokwari', fak: 0.38 }, { nama: 'Kab. Sorong', fak: 0.28 },
    { nama: 'Lainnya', fak: 0.34 },
  ],
  papua: [
    { nama: 'Jayapura', fak: 0.32 }, { nama: 'Kab. Merauke', fak: 0.18 },
    { nama: 'Lainnya', fak: 0.50 },
  ],
};

// Generate data lengkap
function generateData() {
  const result = {};

  PROVINSI_DATA.forEach(prov => {
    result[prov.id] = {
      nama: prov.nama,
      pop: prov.pop,
      tahunan: {},
      kota: {},
    };

    // Data per tahun per jenis kasus
    TAHUN.forEach((th, ti) => {
      result[prov.id].tahunan[th] = {};
      JENIS_KASUS.forEach((jk, ji) => {
        // Akumulasi faktor sampai tahun ini
        let faktor = 1;
        for (let f = 0; f <= ti; f++) {
          faktor *= TREND_FAKTOR[jk.id][f];
        }
        // Variasi acak kecil (deterministik berdasarkan id)
        const seed = (prov.id.charCodeAt(0) + ji * 7 + ti * 13) % 20;
        const noise = 0.92 + (seed / 100);
        result[prov.id].tahunan[th][jk.id] = Math.round(prov.base[ji] * faktor * noise);
      });
    });

    // Data per kota
    const kotaList = KOTA_PER_PROVINSI[prov.id] || [];
    kotaList.forEach(kota => {
      result[prov.id].kota[kota.nama] = { tahunan: {} };
      TAHUN.forEach((th, ti) => {
        result[prov.id].kota[kota.nama].tahunan[th] = {};
        JENIS_KASUS.forEach((jk, ji) => {
          const seed = (kota.nama.charCodeAt(0) + ji * 5 + ti * 11) % 15;
          const noise = 0.88 + (seed / 100);
          result[prov.id].kota[kota.nama].tahunan[th][jk.id] =
            Math.round(result[prov.id].tahunan[th][jk.id] * kota.fak * noise);
        });
      });
    });
  });

  return result;
}

// Helper: total kasus satu provinsi satu tahun
function totalProvinsiTahun(data, provId, tahun) {
  const kasusObj = data[provId]?.tahunan[tahun] || {};
  return Object.values(kasusObj).reduce((s, v) => s + v, 0);
}

// Helper: total nasional per tahun
function totalNasionalTahun(data, tahun) {
  return Object.keys(data).reduce((s, id) => s + totalProvinsiTahun(data, id, tahun), 0);
}

// Helper: total per jenis kasus nasional satu tahun
function totalJenisTahun(data, jenisId, tahun) {
  return Object.keys(data).reduce((s, id) => s + (data[id]?.tahunan[tahun]?.[jenisId] || 0), 0);
}

const _STAT_DATA = generateData();

window.STATISTIK = {
  DATA: _STAT_DATA,
  TAHUN,
  JENIS_KASUS,
  PROVINSI_DATA,
  KOTA_PER_PROVINSI,
  totalProvinsiTahun,
  totalNasionalTahun,
  totalJenisTahun,
};
})();
