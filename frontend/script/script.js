const buttonPages = document.querySelectorAll(".button-page");
const contentPage = document.querySelector("#main-content");
const formUploadModul = document.querySelector("#uploadModulForm");
const pages = document.querySelectorAll(".sect");
const buttonSubmit = document.querySelector("#submitButton");

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
