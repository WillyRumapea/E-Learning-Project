const buttonPages = document.querySelectorAll(".button-page");
const contentPage = document.querySelector("#main-content");
const formUploadModul = document.querySelector("#uploadModulForm");
const pages = document.querySelectorAll(".sect");
const buttonSubmit = document.querySelector("#submitButton");
const buttonUplProfile = document.querySelector("#uploadProfile");
const containerUpdProfile = document.getElementById(
  "container-form-update-profile"
);
const uploadImgButton = document.getElementById("changeImgButton");
const changeImg = document.getElementById("changeImgInput");
const profileImg = document.getElementById("profileImg");

uploadImgButton.addEventListener("click", () => {
  changeImg.click();
});

changeImg.addEventListener("change", (e) => {
  const selectedImg = e.target.files[0];
  if (selectedImg) {
    const imgURL = URL.createObjectURL(selectedImg);
    profileImg.src = imgURL;
  }
});

buttonPages.forEach((btnPage) => {
  btnPage.addEventListener("click", (e) => {
    e.preventDefault();

    const targetID = btnPage.getAttribute("href").substring(1);

    const targetSection = document.getElementById(targetID);

    pages.forEach((page) => page.classList.add("hidden"));

    if (targetSection) {
      targetSection.classList.remove("hidden");
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

buttonUplProfile.addEventListener("click", () => {
  document.location.href = "../frontend/pages/form-upt-profile.html";
});

formUploadModul.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(formUploadModul);

    await fetch("http://localhost:4000/materi-modul", {
      method: "POST",
      body: formData,
    });

    alert("data berhasil di inputkan");
    formUploadModul.reset();
  } catch (err) {
    console.error("Error:", err);
    alert("Terjadi kesalahan saat mengirim data.");
  }
});

async function terimaUpdDataProfile() {
  const data = JSON.parse(localStorage.getItem("profileData2"));

  console.log(data);

  if (!data) {
    console.log("tidak ada data ditemukan di localStorage");
    return;
  }

  document.getElementById("profile-nama").textContent = data.nama_pengajar;
  document.getElementById("profile-email").textContent = data.alamat_email;
  document.getElementById("profile-ttl").textContent = data.tanggal_lahir;
  document.getElementById("profile-telpon").textContent = parseFloat(
    data.no_telpon
  );
  document.getElementById("profile-jabatan").textContent = data.jabatan;
  document.getElementById("profile-mapel").textContent = data.mata_pelajaran;
}

terimaUpdDataProfile();
