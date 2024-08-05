const menuIcon = document.querySelector("#menu-icon")
const minNavMainContent = document.querySelector(".min-nav-main-content")


menuIcon.addEventListener("click", () => {
    minNavMainContent.classList.toggle("menuActive")
})