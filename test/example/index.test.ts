import { expect, it } from 'vitest';
import * as fs from 'fs';
import { generateSlides } from '../../src/index';
import extractSlides from '../../src/parser/extract_slides';

it('check if example renders properly', async () => {
    const markdown = fs.readFileSync('./test/example/example.md', 'utf8');

    const pres = await generateSlides(markdown);

    const { _slides } = Object(pres) as any;

    await pres.writeFile({ fileName: './test.pptx' });

    expect(_slides.length).toBe(23);
});


it('check if example markdown is parsed correctly', () => {
    const markdown = fs.readFileSync('./test/example/example.md', 'utf8');

    const result = extractSlides(markdown);

    expect(result.length).toBe(23);
});
