const body = document.body
const dark = document.getElementById("dark")
const light = document.getElementById("light")

dark.addEventListener("click", () => {
    body.style.color = "white"
    body.style.background = "black"
})



// light.addEventListener("click", () => {
//     body.style.color = "black"
//     body.style.background = "white"
// })


    const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".navbar a");

        window.addEventListener("scroll", () => {
            let currentSection = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    currentSection = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").substring(1) === currentSection) {
                    link.classList.add("active");
                }
            });
        });