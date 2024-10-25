const webBtn = document.getElementById("web")
const backBtn = document.getElementById("back")
const designBtn = document.getElementById("design")

const image1 = document.querySelector(".image1")
const image2 = document.querySelector(".image2")
const image3 = document.querySelector(".image3")

designBtn.addEventListener("click", () => {
    image1.style.display = "flex"
    image2.style.display = "none"
    image3.style.display = "none"
})

backBtn.addEventListener("click", () => {
    image1.style.display = "none"
    image2.style.display = "none"
    image3.style.display = "flex"
})

webBtn.addEventListener("click", () => {
    image1.style.display = "none"
    image2.style.display = "flex"
    image3.style.display = "none"
})


