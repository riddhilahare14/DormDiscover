const section = document.querySelector("section");

const left = document.querySelector(".togglePanelLeft");
const right = document.querySelector(".togglePanelRight");

const sec1 = document.querySelector(".sec1");
const sec2 = document.querySelector(".sec2");

left.addEventListener("submit", (event) => {
    event.preventDefault();
    section.classList.toggle("changed");
    sec2.style.display = "flex";
    sec1.style.display = "none";
   
})

right.addEventListener("submit", (event) => {
    event.preventDefault();
    section.classList.toggle("changed"); 
    sec1.style.display = "flex";
    sec2.style.display = "none";
})
