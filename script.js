document.addEventListener("DOMContentLoaded", () => {
  // Efek animasi saat scroll
  const sections = document.querySelectorAll("section");

  const revealSection = () => {
    sections.forEach((section) => {
      const position = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (position < windowHeight - 100) {
        section.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealSection);

  // Smooth scroll untuk navigasi
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: "smooth",
      });
    });
  });

  // Efek tombol pada halaman event
  const button = document.querySelector(".button");
  if (button) {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#d32f2f";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#b71c1c";
    });
  }
})
