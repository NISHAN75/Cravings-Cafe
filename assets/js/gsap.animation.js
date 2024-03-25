gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.35,
    effects: true,
    smoothTouch: false,
    normalizeScroll: false,
    ignoreMobileResize: true,
});



