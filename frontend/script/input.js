const formUploadModul = document.querySelector("#upload-modul-form");
const input = document.querySelector("input");

formUploadModul.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formUploadModul);

  try {
    const response = await fetch("http://localhost:4000/materi-modul", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("data berhasil di input");
    } else {
      const result = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      alert(`data gagal di input ${result.message}`);
    }
  } catch (err) {
    console.error("Error saat mengirim data:", err);
    alert("Terjadi kesalahan saat mengirim data.");
  }
});
