document.addEventListener("DOMContentLoaded", () => {
    const preloaderIntro = gsap.timeline({
        defaults: {
            ease: "power2.inOut",
            duration: 1
        }
    });
    const mainAnimation = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power2.inOut"
        }
    });

    preloaderIntro.to(".preloader-outer", {
        opacity: 1
    }).from(".preloader-text-wrapper h1", {
        y: 32,
        opacity: 0
    }).from(".preloader-logo-wrapper svg", {
        y: 32,
        opacity: 0
    }).add(() => {
        preloaderIntro.to(".preloader-text-wrapper h1", {
            opacity: 0
        }).to(".preloader-logo-wrapper svg", {
            scale: 100,
            onComplete: () => {
                mainAnimation.play().to(".main-logo-inner svg", {
                    opacity: 0,
                    scale: 100
                }).to(".main", {
                    opacity: 1
                })
            }
        }).add(() => {
            mainAnimation.to(".preloader-outer", {
                opacity: 0,
                onComplete: () => {
                    mainAnimation.to(".preloader-outer", {
                        display: "none"
                    })
                }
            }).add(() => {
                mainAnimation.to(".main-logo-inner svg", {
                    ease: "linear",
                    opacity: 1,
                    scale: 1
                }).to(".head-inner h1", {
                    y: 0,
                    opacity: 1
                }).duration(3)
            }).add(() => {
                mainAnimation.to(".enq-inner p", {
                    y: 0,
                    opacity: 1
                }).to(".socials-inner a", {
                    y: 0,
                    opacity: 1,
                    stagger: {
                        amount: 0.33,
                    }
                }).to(".footer p", {
                    opacity: 1
                }).to(".header", {
                    x: 0
                })
            })
        })
    })
})