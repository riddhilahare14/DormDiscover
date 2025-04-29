const section = document.querySelector("section");

const left = document.querySelector(".togglePanelLeft");
const right = document.querySelector(".togglePanelRight");

const sec1Whole = document.querySelector(".sec1Whole");
const sec2Whole = document.querySelector(".sec2Whole");

left.addEventListener("submit", (event) => {
    event.preventDefault();
    section.classList.toggle("changed");
    sec2Whole.style.display = "block";
    sec1Whole.style.display = "none";
   
})

right.addEventListener("submit", (event) => {
    event.preventDefault();
    section.classList.toggle("changed"); 
    sec1Whole.style.display = "block";
    sec2Whole.style.display = "none";
})
