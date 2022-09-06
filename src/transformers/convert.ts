import pptxgen from "pptxgenjs";
import { SlideDefinition } from "../slides";

export interface SlideOptions {
    backgroundColor?: string;
}

export function convertSlides(pres: pptxgen, slides: SlideDefinition[]) {
    for (const slide of slides) {
        const base = pres.addSlide();
        convertSlide(base, slide);
    }
    return pres;
}

export function convertSlide(slide: pptxgen.Slide, base: SlideDefinition, options?: SlideOptions) {
    // Slide Background
    const bg: pptxgen.BackgroundProps = {};
    // Background Image
    if (base.backgroundImage) {
        bg.path = base.backgroundImage.url;
    }
    // Background Color
    if (options?.backgroundColor) {
        const value = options.backgroundColor;
        if (value.startsWith("#")) {
            // Remove # from hex
            bg.color = value.slice(1);
        } else {
            bg.color = value;
        }
    }
    slide.background = bg;
    return slide;
}