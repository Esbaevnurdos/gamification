let serviceCard1 = document.querySelector(".service-card1")
let serviceCard2 = document.querySelector(".service-card2")
let serviceCard3 = document.querySelector(".service-card3")

let btn1 = document.querySelector(".firstBtn")
let btn2 = document.querySelector(".secondBtn")
let btn3 = document.querySelector(".thirdBtn")

btn1.addEventListener("click", () => {
    serviceCard1.style.display = "flex"
    serviceCard2.style.display = "none"
    serviceCard3.style.display = "none"
})

btn2.addEventListener("click", () => {
    serviceCard1.style.display = "none"
    serviceCard2.style.display = "flex"
    serviceCard3.style.display = "none"
})

btn3.addEventListener("click", () => {
    serviceCard1.style.display = "none"
    serviceCard2.style.display = "none"
    serviceCard3.style.display = "flex"
})


var swiper = new Swiper('.workship', {
    slidesPerView:3,
    spaceBetween:20, 
    loop:true,
    autoplay:true,
})