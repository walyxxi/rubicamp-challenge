-- No. 1
SELECT nim, nama, umur, alamat, nm_jurusan
FROM mahasiswa
INNER JOIN jurusan ON mahasiswa.jurusan = jurusan.id_jurusan

-- No. 2
SELECT nim, nama, umur, alamat
FROM mahasiswa
WHERE umur < '20';

-- No. 3
SELECT mh.nim, mh.nama, mk.nama_mk, kn.nilai
FROM mahasiswa mh, matakuliah mk, kontrak kn
WHERE kn.nim = mh.nim
AND kn.id_mk = mk.id_mk
AND nilai <= 'B';

-- No. 4
SELECT mh.nim, mh.nama, SUM(mk.sks) AS total_sks
FROM mahasiswa mh
INNER JOIN kontrak kn on mh.nim = kn.nim
INNER JOIN matakuliah mk on kn.id_mk = mk.id_mk
GROUP BY nama
HAVING 10 < SUM(sks);

-- No. 5
SELECT mh.nim, mh.nama, mk.nama_mk
FROM mahasiswa mh, matakuliah mk, kontrak kn
WHERE kn.nim = mh.nim
AND kn.id_mk = mk.id_mk
AND nama_mk = 'Data Mining';

-- No. 6
SELECT ds.id_dosen, ds.nama_dosen, COUNT(kn.nim)
FROM dosen ds, matakuliah mk, kontrak kn
WHERE kn.id_dosen = ds.id_dosen
AND kn.id_mk = mk.id_mk
GROUP BY nama_dosen;

-- No. 7
SELECT nim, nama, umur, alamat
FROM mahasiswa
ORDER BY umur ASC;

-- No. 8
SELECT mh.nim, mh.nama, jr.nm_jurusan, mk.id_mk, nama_mk, kn.nilai, ds.nama_dosen
FROM mahasiswa mh
INNER JOIN jurusan jr ON mh.jurusan = jr.id_jurusan
INNER JOIN kontrak kn ON mh.nim = kn.nim
INNER JOIN matakuliah mk ON kn.id_mk = mk.id_mk
INNER JOIN dosen ds ON kn.id_dosen = ds.id_dosen
WHERE nilai >= 'D';