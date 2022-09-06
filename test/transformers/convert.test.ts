import { expect, it } from 'vitest';
import pptxgen from "pptxgenjs";
import { convertSlides } from '../../src/transformers/convert';
import extractSlides from '../../src/parser/extract_slides';

it('check if background images are added', () => {
    let pres = new pptxgen();
    const markdown = [
        '![](https://picsum.photos/g/1600/900){.background}',
    ].join('\n');

    const slides = extractSlides(markdown);
    pres = convertSlides(pres, slides);

    const { _slides } = Object(pres) as any;
    const { _background } = Object(_slides[0]) as any;

    expect(_background.path).toBe('https://picsum.photos/g/1600/900');
});