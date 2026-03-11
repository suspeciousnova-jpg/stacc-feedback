document.getElementById("staccForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:5000/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    // Hide form page
    document.getElementById("feedback-section").classList.remove("active");

    // Show success page
    document.getElementById("page-success").classList.add("active");

  } catch (error) {
    console.error("Submission error:", error);
  }
});