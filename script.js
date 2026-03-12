document.getElementById("staccForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = document.getElementById("submitBtn");

  // Start loading animation
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://stacc-feedback.onrender.com/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      document.getElementById("feedback-section").classList.remove("active");
      document.getElementById("page-success").classList.add("active");
    } else {
      alert("Something went wrong. Please try again.");
    }

  } catch (error) {
    console.error("Submission error:", error);
    alert("Submission failed. Please check your connection.");
  }

  // Stop loading animation
  submitBtn.classList.remove("loading");
  submitBtn.disabled = false;
});