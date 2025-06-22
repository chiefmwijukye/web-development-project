
// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  // Example: change background color dynamically
  document.body.style.backgroundColor = "#f9f9f9";

  // Example: style all buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.style.backgroundColor = "#007bff";
    button.style.color = "white";
    button.style.padding = "10px 20px";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s ease";

    // Hover effect
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "#0056b3";
    });

    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "#007bff";
    });

    // Optional: alert when clicked
    button.addEventListener("click", () => {
      alert(`You clicked the "${button.innerText}" button!`);
    });
  });

  // Example: change header color if one exists
  const header = document.querySelector("h1");
  if (header) {
    header.style.color = "#333";
    header.style.fontFamily = "Arial, sans-serif";
  }
});
