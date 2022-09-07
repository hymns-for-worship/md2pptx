import { expect, it } from 'vitest';
import pptxgen from "pptxgenjs";
import { generateSlides } from '../src/index';

it('check if title is added and correct master is used', async () => {
    const markdown = [
        '# Title',
        '## Subtitle',
        "",
    ].join('\n');

    const pres = generateSlides(markdown);

    const { _slides } = Object(pres) as any;
    const slide = _slides[0] as pptxgen.Slide;

    expect(slide.background.color).toBe('FFFFFF');
});