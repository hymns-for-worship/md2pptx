import pptxgen from "pptxgenjs";
import extractSlides from "./parser/extract_slides";

interface ParserOptions {
    css: string;
    useFileio: boolean,
}

// /**
//    * Generate slides from markdown
//    *
//    * @param {String} markdown Markdown to import
//    * @param css
//    * @param useFileio
//    * @returns {Promise.<String>} ID of generated slide
//    */
// export async function generateFromMarkdown(
//     markdown: string,
//     { css, useFileio }: ParserOptions
// ): Promise<string> {
//     const slides = extractSlides(markdown, css);
//     return slides;
// }

export function generateSlides(markdown: string,
    { css, useFileio }: ParserOptions) {
    const slides = extractSlides(markdown, css);
    return slides;
}

