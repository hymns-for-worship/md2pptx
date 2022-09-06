import { expect, it } from 'vitest';
import * as fs from 'fs';
import extractSlides from '../../src/parser/extract_slides'

it('check if empty markdown returns no slides', () => {
    const markdown = '';

    const result = extractSlides(markdown);

    expect(result.length).toBe(0);
});

it('check if single slide is returned', () => {
    const markdown = [
        '# Title',
        '',
        '![](https://picsum.photos/g/1600/900){.background}',
    ].join('\n');

    const result = extractSlides(markdown);

    expect(result.length).toBe(1);
    expect(result[0].title?.rawText).toBe('Title');
    expect(result[0].backgroundImage?.url).toBe('https://picsum.photos/g/1600/900');
});

it('check if example markdown is parsed correctly', () => {
    const markdown = fs.readFileSync('examples/example.md', 'utf8');

    const result = extractSlides(markdown);

    expect(result.length).toBe(23);
});
