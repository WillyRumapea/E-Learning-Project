const buttonPages = document.querySelectorAll(".button-page");
const contentPage = document.querySelector("#main-content");

const loadPage = async (page) => {
  try {
    const response = await fetch(`pages/${page}`);

    if (!response.ok) {
      throw new Error(`error: ${response.statusText}`);
    }

    const html = await response.text();

    contentPage.innerHTML = html;
  } catch (err) {
    console.log("Error:", err.message);
    contentPage.innerHTML = `<h1>Error</h1><p>${err.message}</p>`;
  }
};

buttonPages.forEach((buttonPage) => {
  buttonPage.addEventListener("click", () => {
    const page = buttonPage.getAttribute("data-page");
    loadPage(page);
  });
});

// formUploadModul.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   let collomnValidation = true;
//   inputColl.forEach((e) => {
//     if (e.value.trim() === "") {
//       collomnValidation = false;
//     }
//   });

//   if (!collomnValidation) {
//     alert("tolong isikan dengan benar");
//   } else {
//     const data = {
//       nama_pengajar: formUploadModul.nama_pengajar.value,
//       judul_modul: formUploadModul.judul_modul.value,
//       file_modul: formUploadModul.file_modul.value,
//       mata_pelajaran: formUploadModul.mata_pelajaran.value,
//       tingkat_sekolah: formUploadModul.tingkat_sekolah.value,
//       tanggal_upload: formUploadModul.tanggal_upload.value,
//     };

//     await fetch("http://localhost:3000/materi-modul", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     alert("data berhasil di inputkan");
//   }
//   formUploadModul.reset();
// });
