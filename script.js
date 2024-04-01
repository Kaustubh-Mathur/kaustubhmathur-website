function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
// Add this to your existing script.js file
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});
