const formUpdateProfile = document.getElementById("form-update-profile");
const inputFormUpdateProfile = document.querySelectorAll("input");
const cancelButton = document.querySelector("#cancelBackForm");

cancelButton.addEventListener("click", () => {
  document.location.href = "../index.html";
});

formUpdateProfile.addEventListener("submit", async (e) => {
  e.preventDefault();

  let collValid = true;
  inputFormUpdateProfile.forEach((input) => {
    if (input.value.trim() === "") {
      collValid = false;
    }
  });

  if (!collValid) {
    alert("mohon isikan semua data dengan benar");
  } else {
    const data = {
      nama_pengajar: formUpdateProfile.nama_pengajar.value,
      alamat_email: formUpdateProfile.alamat_email.value,
      tanggal_lahir: formUpdateProfile.tanggal_lahir.value,
      no_telepon: formUpdateProfile.no_telepon.value,
      jabatan: formUpdateProfile.jabatan.value,
      mata_pelajaran: formUpdateProfile.mata_pelajaran.value,
    };
    try {
      localStorage.setItem("profileData2", JSON.stringify(data));
      console.log("Data berhasil disimpan:", data);
      alert("data sedang dalam proses pengirman");
      window.location.href = "../index.html";
    } catch (err) {
      console.log(`gagal menyimpan ke localStorage `, err);
    }
  }
});
