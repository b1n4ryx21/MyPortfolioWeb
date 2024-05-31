document.addEventListener("DOMContentLoaded", () => {
    const errorTL = gsap.timeline({
        duration: 2,
        defaults: {
            ease: "linear",
            override: true
        }
    })

    errorTL.to(".header", {
        y: 0,
        opacity: 1
    }).to(".err-code, .err-text", {
        x: 0,
        borderBottom: "1px solid var(--portfolio-orange)",
        opacity: 1
    }).to(".err-code h1, .err-text h3", {
        y: 0,
        opacity: 1
    }).to(".home-button", {
        x: 0
    })

    document.querySelector(".home-button").addEventListener("click", (e) => {
        e.preventDefault();

        const buttonTL = gsap.timeline({
            defaults: {
                ease: "linear"
            }
        })

        buttonTL.to("button", {
                duration: 1,
                background: "var(--portfolio-white)",
                color: "var(--portfolio-black)",
                onComplete: () => errorTL.reverse()
            })
            .then(() => location.assign("/home"))

    })
})