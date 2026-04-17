let click = false;

document.querySelector(".burger").addEventListener("click", () => {
    if(click === false) {
        document.querySelector("#menu").style.display = "flex";
        document.querySelector(".burger").classList.toggle("active");
        click = true;
    }
    else {
        document.querySelector("#menu").style.display = "none";
        document.querySelector(".burger").classList.toggle("active");
        click = false;
    }
})