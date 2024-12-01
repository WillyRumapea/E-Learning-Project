const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const sql = require("./controller/connection");
const response = require("./controller/response");
const bodyParser = require("body-parser");
const upload = require("./middleware/multerConfig");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is ready");
});

app.get("/materi-video", (req, res) => {
  const query = "SELECT * FROM table_materi_video";
  sql.query(query, (err, result) => {
    const mssg = [
      "Succes get all data!",
      "Failed to get data! something wrong",
    ];
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, mssg[0], res);
    } else {
      response(404, result, mssg[1], res);
    }
  });
});

app.get("/materi-modul", (req, res) => {
  const query = "SELECT * FROM table_modul_pembelajaran";
  sql.query(query, (err, result) => {
    const mssg = [
      "Succes get all data!",
      "Failed to get data! something wrong",
    ];
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, mssg[0], res);
    } else {
      response(404, result, mssg[1], res);
    }
  });
});

app.post("/materi-video", (req, res) => {
  const {
    nama_guru,
    judul_video,
    deskripsi,
    url_video,
    mata_pembelajaran,
    tingkat_sekolah,
    tanggal_upload,
  } = req.body;
  const query = `INSERT INTO table_materi_video (nama_guru, judul_video, deskripsi, url_video, mata_pembelajaran, tingkat_sekolah, tanggal_upload) VALUES ('${nama_guru}', '${judul_video}', '${deskripsi}', '${url_video}', '${mata_pembelajaran}', '${tingkat_sekolah}', '${tanggal_upload}')`;

  sql.query(query, (err, result) => {
    const mssg = ["Success input data video", "sorry failed to input data"];
    if (err) throw err;
    if (result.affectedRows > 0) {
      const condition = {
        isSuccess: result.affectedRows,
        id: result.id,
      };
      response(200, condition, mssg[0], res);
    } else {
      response(404, condition, mssg[1], res);
    }
  });
});

app.post("/materi-modul", upload.single("file_modul"), (req, res) => {
  const {
    nama_pengajar,
    judul_modul,
    mata_pelajaran,
    tingkat_sekolah,
    tanggal_upload,
  } = req.body;

  const file_modul = req.file.filename;

  // console.log(req.body);
  // console.log(req.file);

  const query = `INSERT INTO table_modul_pembelajaran (nama_pengajar, judul_modul, file_modul, mata_pelajaran, tingkat_sekolah, tanggal_upload) VALUES ('${nama_pengajar}','${judul_modul}','${file_modul}', '${mata_pelajaran}', '${tingkat_sekolah}', '${tanggal_upload}')`;

  sql.query(query, (err, result) => {
    const mssg = ["Success input data modul", "sorry failed to input data"];

    if (err) throw err;
    if (result.affectedRows) {
      const condition = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, condition, mssg[0], res);
    } else {
      response(404, condition, mssg[1], res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});
