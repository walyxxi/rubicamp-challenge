const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Silahkan pilih opsi di bawah ini!'
})

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('university.db');

// db.all("SELECT m.nim, m.nama, mk.id_mk, mk.nama_mk, k.nilai, d.nama_dosen " +
//     "FROM mahasiswa m " +
//     "INNER JOIN kontrak k ON m.nim = k.nim " +
//     "INNER JOIN matakuliah mk ON k.id_mk = mk.id_mk " +
//     "INNER JOIN dosen d ON mk.dosen = d.id_dosen", (err, rows) => {
//         // let data = rows.toString()
//         console.log(rows);
//     })

const Table = require('cli-table');
let table = null;

login();
function login() {
    console.log('============================================================');
    console.log('Welcome to University Pendidikan Indonesia');
    console.log('Jl. Setiabudi No. 255 Bandung');
    console.log('============================================================');
    askUser();
}

function askUser() {
    rl.question('Username   : ', (user) => {
        rl.question('Password   : ', (pass) => {
            db.all(`SELECT * FROM user WHERE username = '${user}' AND password = '${pass}'`, (err, rows) => {
                if (err) {
                    throw err;
                } else if (rows.length > 0) {
                    console.log(`Welcome, ${user}. Your access level is: ${rows[0].access}`);
                    dashboard();
                } else {
                    console.log('Username atau Password yang anda inputkan salah!');
                    console.log('============================================================');
                    askUser();
                }
            })
        })
    })
}

function dashboard() {
    console.log('============================================================');
    rl.prompt();
    console.log('\n[1] Mahasiswa');
    console.log('[2] Jurusan');
    console.log('[3] Dosen');
    console.log('[4] Mata Kuliah');
    console.log('[5] Kontrak');
    console.log('[6] Keluar');
    console.log('============================================================');
    askMenu();
}

function askMenu() {
    rl.question('Masukkan salah satu opsi diatas: ', (choose) => {
        switch (choose) {
            case '1':
                mahasiswaMenu();
                break;
            case '2':
                jurusanMenu();
                break;
            case '3':
                dosenMenu();
                break;
            case '4':
                matakuliahMenu();
                break;
            case '5':
                kontrakMenu();
                break;
            case '6':
                console.log('============================================================');
                console.log('Anda telah keluar, silahkan login kembali!');
                login();
                break;
        }
    })
}

// ========================Mahasiswa========================
function mahasiswaMenu() {
    console.log('============================================================');
    rl.prompt();
    console.log('\n[1] Daftar Murid');
    console.log('[2] Cari Murid');
    console.log('[3] Tambah Murid');
    console.log('[4] Hapus Murid');
    console.log('[5] Kembali');
    console.log('============================================================');
    askMahasiswa();
}

function askMahasiswa() {
    rl.question('Masukkan salah satu opsi diatas: ', (choose) => {
        switch (choose) {
            case '1':
                daftarMurid();
                break;
            case '2':
                cariMurid();
                break;
            case '3':
                tambahMurid();
                break;
            case '4':
                hapusMurid();
                break;
            case '5':
                dashboard();
                break;
        }
    })
}

function daftarMurid() {
    db.all("SELECT nim, nama, umur, alamat, nm_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.jurusan = jurusan.id_jurusan", (err, rows) => {
        table = new Table({
            head: ['NIM', 'NAMA', 'UMUR', 'ALAMAT', 'JURUSAN']
            , colWidths: [15, 15, 10, 20, 25]
        });
        rows.forEach((row) => {
            table.push(
                [row.nim, row.nama, row.umur, row.alamat, row.nm_jurusan]
            );
        })
        console.log('============================================================');
        console.log(table.toString());
        mahasiswaMenu();
    });
}

function cariMurid() {
    rl.question('Masukkan NIM: ', (findNim) => {
        db.all(`SELECT nim, nama, alamat, nm_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.jurusan = jurusan.id_jurusan WHERE nim = '${findNim}'`, (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                rows.forEach((row) => {
                    console.log('============================================================');
                    console.log('Mahasiswa Details');
                    console.log('============================================================');
                    console.log(`NIM     : ${row.nim}`);
                    console.log(`Nama    : ${row.nama}`);
                    console.log(`Alamat  : ${row.alamat}`);
                    console.log(`Jurusan : ${row.nm_jurusan}`);
                    mahasiswaMenu();
                })
            } else {
                console.log(`Mahasiswa dengan NIM ${findNim} tidak terdaftar!`);
                cariMurid();
            }
        })
    })
}

function tambahMurid() {
    console.log('============================================================');
    console.log('Lengkapi semua data dibawah ini!');
    rl.question('NIM     : ', (inim) => {
        rl.question('Nama    : ', (inama) => {
            rl.question('Alamat  : ', (ialamat) => {
                rl.question('Jurusan : ', (ijurusan) => {
                    rl.question('Umur    : ', (iumur) => {
                        db.run(`INSERT INTO mahasiswa VALUES ('${inim}', '${inama}', '${ialamat}', '${ijurusan}', '${iumur}')`, (err) => {
                            if (err) {
                                throw err;
                            }
                            daftarMurid();
                        });
                    })
                })
            })
        })
    })
}

function hapusMurid() {
    console.log('============================================================');
    rl.question('Masukkan NIM Mahasiswa yang akan dihapus: ', (nim) => {
        db.run(`DELETE FROM mahasiswa WHERE nim = '${nim}'`, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Mahasiswa dengan NIM '${nim}' telah dihapus!`);
            daftarMurid();
        });
    })
}

// ========================Jurusan========================
function jurusanMenu() {
    console.log('============================================================');
    rl.prompt();
    console.log('\n[1] Daftar Jurusan');
    console.log('[2] Cari Jurusan');
    console.log('[3] Tambah Jurusan');
    console.log('[4] Hapus Jurusan');
    console.log('[5] Kembali');
    console.log('============================================================');
    askJurusan();
}

function askJurusan() {
    rl.question('Masukkan salah satu opsi diatas: ', (choose) => {
        switch (choose) {
            case '1':
                daftarJurusan();
                break;
            case '2':
                cariJurusan();
                break;
            case '3':
                tambahJurusan();
                break;
            case '4':
                hapusJurusan();
                break;
            case '5':
                dashboard();
                break;
        }
    })
}

function daftarJurusan() {
    db.all("SELECT * FROM jurusan", (err, rows) => {
        table = new Table({
            head: ['ID JURUSAN', 'NAMA JURUSAN']
            , colWidths: [12, 25]
        });
        rows.forEach((row) => {
            table.push(
                [row.id_jurusan, row.nm_jurusan]
            );
        })
        console.log('============================================================');
        console.log(table.toString());
        jurusanMenu();
    });
}

function cariJurusan() {
    console.log('============================================================');
    rl.question('Masukkan ID Jurusan: ', (findId) => {
        db.all(`SELECT * FROM jurusan WHERE id_jurusan = '${findId}'`, (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                rows.forEach((row) => {
                    console.log('============================================================');
                    console.log('Jurusan Details');
                    console.log('============================================================');
                    console.log(`ID Jurusan     : ${row.id_jurusan}`);
                    console.log(`Nama Jurusan   : ${row.nm_jurusan}`);
                    jurusanMenu();
                })
            } else {
                console.log(`Jurusan dengan ID ${findId} tidak terdaftar!`);
                cariJurusan();
            }
        })
    })
}

function tambahJurusan() {
    console.log('============================================================');
    console.log('Lengkapi semua data dibawah ini!');
    rl.question('ID Jurusan     : ', (iid) => {
        rl.question('Nama Jurusan   : ', (inama) => {
            db.run(`INSERT INTO jurusan VALUES ('${iid}', '${inama}')`, (err) => {
                if (err) {
                    throw err;
                }
                daftarJurusan();
            });
        })
    })
}

function hapusJurusan() {
    console.log('============================================================');
    rl.question('Masukkan ID Jurusan yang akan dihapus: ', (id) => {
        db.run(`DELETE FROM jurusan WHERE id_jurusan = '${id}'`, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Jurusan dengan ID ${id} telah dihapus!`);
            daftarJurusan();
        });
    })
}

// ========================Dosen========================
function dosenMenu() {
    console.log('============================================================');
    rl.prompt();
    console.log('\n[1] Daftar Dosen');
    console.log('[2] Cari Dosen');
    console.log('[3] Tambah Dosen');
    console.log('[4] Hapus Dosen');
    console.log('[5] Kembali');
    console.log('============================================================');
    askDosen();
}

function askDosen() {
    rl.question('Masukkan salah satu opsi diatas: ', (choose) => {
        switch (choose) {
            case '1':
                daftarDosen();
                break;
            case '2':
                cariDosen();
                break;
            case '3':
                tambahDosen();
                break;
            case '4':
                hapusDosen();
                break;
            case '5':
                dashboard();
                break;
        }
    })
}

function daftarDosen() {
    db.all("SELECT * FROM dosen", (err, rows) => {
        table = new Table({
            head: ['ID DOSEN', 'NAMA DOSEN']
            , colWidths: [13, 17]
        });
        rows.forEach((row) => {
            table.push(
                [row.id_dosen, row.nama_dosen]
            );
        })
        console.log('============================================================');
        console.log(table.toString());
        dosenMenu();
    });
}

function cariDosen() {
    console.log('============================================================');
    rl.question('Masukkan ID Dosen: ', (findId) => {
        db.all(`SELECT * FROM dosen WHERE id_dosen = '${findId}'`, (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                rows.forEach((row) => {
                    console.log('============================================================');
                    console.log('Dosen Details');
                    console.log('============================================================');
                    console.log(`ID Dosen     : ${row.id_dosen}`);
                    console.log(`Nama Dosen   : ${row.nama_dosen}`);
                    dosenMenu();
                })
            } else {
                console.log(`Dosen dengan ID ${findId} tidak terdaftar!`);
                cariDosen();
            }
        })
    })
}

function tambahDosen() {
    console.log('============================================================');
    console.log('Lengkapi semua data dibawah ini!');
    rl.question('ID Dosen     : ', (iid) => {
        rl.question('Nama Dosen   : ', (inama) => {
            db.run(`INSERT INTO dosen VALUES ('${iid}', '${inama}')`, (err) => {
                if (err) {
                    throw err;
                }
                daftarDosen();
            });
        })
    })
}

function hapusDosen() {
    console.log('============================================================');
    rl.question('Masukkan ID Dosen yang akan dihapus: ', (id) => {
        db.run(`DELETE FROM dosen WHERE id_dosen = '${id}'`, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Dosen dengan ID ${id} telah dihapus!`);
            daftarDosen();
        });
    })
}

// =========================Mata Kuliah=========================
function matakuliahMenu() {
    console.log('============================================================');
    rl.prompt();
    console.log('\n[1] Daftar Mata Kuliah');
    console.log('[2] Cari Mata Kuliah');
    console.log('[3] Tambah Mata Kuliah');
    console.log('[4] Hapus Mata Kuliah');
    console.log('[5] Kembali');
    console.log('============================================================');
    askMatakuliah();
}

function askMatakuliah() {
    rl.question('Masukkan salah satu opsi diatas: ', (choose) => {
        switch (choose) {
            case '1':
                daftarMatakuliah();
                break;
            case '2':
                cariMatakuliah();
                break;
            case '3':
                tambahMatakuliah();
                break;
            case '4':
                hapusMatakuliah();
                break;
            case '5':
                dashboard();
                break;
        }
    })
}

function daftarMatakuliah() {
    db.all("SELECT id_mk, nama_mk, sks, nama_dosen FROM matakuliah INNER JOIN dosen ON matakuliah.dosen = dosen.id_dosen", (err, rows) => {
        table = new Table({
            head: ['ID MK', 'NAMA MK', 'SKS', 'DOSEN']
            , colWidths: [8, 30, 5, 15]
        });
        rows.forEach((row) => {
            table.push(
                [row.id_mk, row.nama_mk, row.sks, row.nama_dosen]
            );
        })
        console.log('============================================================');
        console.log(table.toString());
        matakuliahMenu();
    });
}

function cariMatakuliah() {
    console.log('============================================================');
    rl.question('Masukkan ID Mata Kuliah: ', (findId) => {
        db.all(`SELECT * FROM matakuliah WHERE id_mk = '${findId}'`, (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                rows.forEach((row) => {
                    console.log('============================================================');
                    console.log('Mata Kuliah Details');
                    console.log('============================================================');
                    console.log(`ID Mata Kuliah   : ${row.id_mk}`);
                    console.log(`Nama Mata Kuliah : ${row.nama_mk}`);
                    console.log(`SKS              : ${row.sks}`);
                    console.log(`Dosen            : ${row.dosen}`);
                    dosenMenu();
                })
            } else {
                console.log(`Mata Kuliah dengan ID ${findId} tidak terdaftar!`);
                cariMatakuliah();
            }
        })
    })
}

function tambahMatakuliah() {
    console.log('============================================================');
    console.log('Lengkapi semua data dibawah ini!');
    rl.question('ID MK   : ', (iidmk) => {
        rl.question('Nama MK : ', (inmmk) => {
            rl.question('SKS     : ', (isks) => {
                rl.question('Dosen   : ', (idosen) => {
                    db.run(`INSERT INTO matakuliah VALUES ('${iidmk}', '${inmmk}', '${isks}', '${idosen}')`, (err) => {
                        if (err) {
                            throw err;
                        }
                        daftarMatakuliah();
                    })
                })
            })
        })
    })
}

function hapusMatakuliah() {
    console.log('============================================================');
    rl.question('Masukkan ID Mata Kuliah yang akan dihapus: ', (id) => {
        db.run(`DELETE FROM matakuliah WHERE id_mk = '${id}'`, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Mata Kuliah dengan ID ${id} telah dihapus!`);
            daftarMatakuliah();
        });
    })
}

// =========================Kontrak=========================
function kontrakMenu() {
    console.log('============================================================');
    rl.prompt();
    console.log('\n[1] Daftar Kontrak');
    console.log('[2] Cari Kontrak');
    console.log('[3] Tambah Kontrak');
    console.log('[4] Hapus Kontrak');
    console.log('[5] Kembali');
    console.log('============================================================');
    askKontrak();
}

function askKontrak() {
    rl.question('Masukkan salah satu opsi diatas: ', (choose) => {
        switch (choose) {
            case '1':
                daftarKontrak();
                break;
            case '2':
                cariKontrak();
                break;
            case '3':
                tambahKontrak();
                break;
            case '4':
                hapusKontrak();
                break;
            case '5':
                dashboard();
                break;
        }
    })
}

function daftarKontrak() {
    db.all("SELECT m.nim, m.nama, mk.id_mk, mk.nama_mk, k.nilai, d.nama_dosen " +
           "FROM mahasiswa m " +
           "INNER JOIN kontrak k ON m.nim = k.nim " +
           "INNER JOIN matakuliah mk ON k.id_mk = mk.id_mk " +
           "INNER JOIN dosen d ON mk.dosen = d.id_dosen", (err, rows) => {
            table = new Table({
                head: ['NIM', 'NAMA', 'ID MK', 'NAMA MK', 'NILAI', 'DOSEN']
                , colWidths: [13, 10, 8, 28, 7, 15]
            });
            rows.forEach((row) => {
                table.push(
                    [row.nim, row.nama, row.id_mk, row.nama_mk, row.nilai, row.nama_dosen]
                );
            })
            console.log('============================================================');
            console.log(table.toString());
            kontrakMenu();
        });
}

function cariKontrak() {
    console.log('============================================================');
    rl.question('Masukkan NIM Mahasiswa: ', (findId) => {
        db.all(`SELECT * FROM kontrak WHERE nim = '${findId}'`, (err, rows) => {
            if (err) {
                throw err;
            } else if (rows.length > 0) {
                table = new Table({
                    head: ['NIM', 'ID MK', 'ID DOSEN', 'NILAI']
                    , colWidths: [13, 8, 13, 7]
                });
                rows.forEach((row) => {
                    table.push(
                        [row.nim, row.id_mk, row.id_dosen, row.nilai]
                    );
                })
                console.log('============================================================');
                console.log(table.toString());
                kontrakMenu();
            } else {
                console.log(`Kontrak dengan NIM ${findId} tidak terdaftar!`);
                cariKontrak();
            }
        })
    })
}

function tambahKontrak() {
    console.log('============================================================');
    console.log('Lengkapi semua data dibawah ini!');
    rl.question('NIM      : ', (inim) => {
        rl.question('ID MK    : ', (iidmk) => {
            rl.question('ID Dosen : ', (idosen) => {
                rl.question('Nilai    : ', (inilai) => {
                    db.run(`INSERT INTO kontrak VALUES ('${inim}', '${iidmk}', '${idosen}', '${inilai}')`, (err) => {
                        if (err) {
                            throw err;
                        }
                        daftarKontrak();
                    })
                })
            })
        })
    })
}

function hapusKontrak() {
    console.log('============================================================');
    rl.question('Masukkan NIM Kontrak yang akan dihapus: ', (nim) => {
        db.run(`DELETE FROM kontrak WHERE nim = '${nim}'`, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Kontrak dengan NIM ${nim} telah dihapus!`);
            daftarKontrak();
        });
    })
}