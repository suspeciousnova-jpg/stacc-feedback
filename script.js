document.getElementById('staccForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Basic validation to ensure at least some fields are filled
  const isValid = this.checkValidity();
  if(!isValid) {
    alert("Please fill out all required fields.");
    return;
  }

  // Smooth transition to Success Page
  document.getElementById('feedback-section').classList.remove('active');
  document.getElementById('page-success').classList.add('active');
  
  // Optionally push form data
  const formData = new FormData(this);
  console.log("Feedback data:", Object.fromEntries(formData));
});
