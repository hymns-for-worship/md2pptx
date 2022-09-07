import pptxgen from "pptxgenjs";
import { SlideDefinition } from "./slides";
import { getImage, hexString } from "./utils";

export interface SlideOptions {
    backgroundColor?: string;
    foregroundColor?: string;
}

export async function convertSlides(pres: pptxgen, slides: SlideDefinition[]) {
    for (const slide of slides) {
        await convertSlide(pres, slide);
    }
    return pres;
}

export async function convertSlide(pres: pptxgen, base: SlideDefinition, options?: SlideOptions) {
    const bgColor = hexString(options?.backgroundColor ?? '#000000');
    const fgColor = hexString(options?.foregroundColor ?? '#FFFFFF');

    let slide: pptxgen.Slide;

    const template = getTemplate(base);
    if (template) {
        slide = pres.addSlide({
            masterName: template,
        });
    } else {
        slide = pres.addSlide();
    }

    slide.color = fgColor;

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

    // Objects
    for (const obj of base.bodies) {
        // Images
        // for (const img of obj.images) {
        //     if (img.url) {
        //         const data = await getImage(img.url);
        //         if (data) {
        //             const x = img.offsetX ?? 0;
        //             const y = img.offsetY ?? 0;
        //             const width = img.width ?? '100%';
        //             const height = img.height ?? '100%';
        //             const pad = img.padding ?? 0;

        //             slide.addImage({
        //                 data,
        //                 x: x + pad,
        //                 y: y + pad,
        //                 w: width - 2 * pad,
        //                 h: height - 2 * pad,
        //             });
        //         }
        //     }
        // }
        // // Text
        // if (obj.text) {
        //     const desc = obj.text.rawText;
        //     slide.addText(desc);
        // }
    }

    // Speaker notes
    if (base.notes) {
        slide.addNotes(base.notes.rawText);
    }

    // Background
    await addBackground(base, slide, bgColor);

    return slide;
}

async function addBackground(base: SlideDefinition, slide: pptxgen.Slide, bgColor: string) {
    if (base.backgroundImage?.url) {
        const data = await getImage(base.backgroundImage.url);
        if (data) {
            slide.background = {
                data,
                color: bgColor,
            };
            return;
        }
    }
    slide.background = { color: bgColor };
}

function getTemplate(base: SlideDefinition) {
    if (base.title || base.subtitle) {
        return "TITLE_SLIDE";
    }
    return undefined;
}