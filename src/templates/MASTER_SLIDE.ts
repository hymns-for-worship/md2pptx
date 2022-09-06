import pptxgen from "pptxgenjs";

export function addMasterSlide(pres: pptxgen) {
    pres.defineSlideMaster({
        title: "MASTER_SLIDE",
        margin: [0.5, 0.25, 1.0, 0.25],
        slideNumber: { x: 0.3, y: "95%" },
    });
}