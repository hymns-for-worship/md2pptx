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
    const { _master } = Object(_slides[0]) as any;

    await pres.writeFile({ fileName: './test.pptx' });

    expect(_master).toBe('TITLE_SLIDE');
});