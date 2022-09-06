import pptxgen from "pptxgenjs";
import extractSlides from "./parser/extract_slides";
import { convertSlides } from "./convert";
import { addTemplates } from "./templates";

interface ParserOptions {
    css?: string;
    useFileio?: boolean,
    title?: string;
}

export function generateSlides(markdown: string,
    options?: ParserOptions) {
    let pres = new pptxgen();
    addTemplates(pres);
    const slides = extractSlides(markdown, options?.css);
    pres = convertSlides(pres, slides);
    if (options?.title) {
        pres.title = options.title;
    }
    return pres;
}

