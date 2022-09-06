import pptxgen from "pptxgenjs";
import { SlideDefinition } from "./slides";
import { hexString } from "./utils";

export interface SlideOptions {
    backgroundColor?: string;
    foregroundColor?: string;
}

export function convertSlides(pres: pptxgen, slides: SlideDefinition[]) {
    for (const slide of slides) {
        convertSlide(pres, slide);
    }
    return pres;
}

export function convertSlide(pres: pptxgen, base: SlideDefinition, options?: SlideOptions) {
    const bgColor = hexString(options?.backgroundColor ?? '#FFFFFF');
    const fgColor = hexString(options?.foregroundColor ?? '#000000');

    let slide: pptxgen.Slide;
    const template = getTemplate(base);
    if (template) {
        slide = pres.addSlide(template);
    } else {
        slide = pres.addSlide();
    }

    // Title
    if (base.title) {
        slide.addText(base.title.rawText, {
            placeholder: 'title',
        });
    }
    // Subtitle
    if (base.subtitle) {
        slide.addText(base.subtitle.rawText, {
            placeholder: 'subtitle',
        });
    }

    // Speaker notes
    if (base.notes) {
        slide.addNotes(base.notes.rawText);
    }

    // Background
    addBackground(base, slide, bgColor);

    return slide;
}

function addBackground(base: SlideDefinition, slide: pptxgen.Slide, bgColor: string) {
    const bg: pptxgen.BackgroundProps = {};
    // -- Image
    if (base.backgroundImage) {
        if (base.backgroundImage.url?.startsWith('http')) {
            bg.path = base.backgroundImage.url;
        } else {
            bg.data = base.backgroundImage.url;
        }
    }
    // -- Color
    bg.color = bgColor;
    slide.background = bg;
}

function getTemplate(base: SlideDefinition) {
    if (base.title || base.subtitle) {
        return "TITLE_SLIDE";
    }
    return undefined;
}