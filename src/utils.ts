// Copyright 2019 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { v1 as uuidV1 } from 'uuid';
import { Color } from './slides';
import fetch from "node-fetch";
import * as fs from 'fs';

export function uuid(): string {
  return uuidV1();
}

export function convertColorToHex(color: Color, fallback: string = '#FFFFFF'): string {
  if (color) {
    if (typeof color === 'string') {
      if (color.startsWith('#')) {
        // Remove the # if it's there
        return color.substring(1);
      }
      return color;
    }
    // Convert object to hex
    if (color.opaqueColor?.rgbColor) {
      const { red, green, blue } = color.opaqueColor.rgbColor;
      if (red && green && blue) {
        return rgbToHex(red, green, blue);
      }
    }
    if (color.opaqueColor?.themeColor) {
      const value = color.opaqueColor.themeColor;
      if (value.startsWith('#')) {
        // Remove the # if it's there
        return value.substring(1);
      }
    }
    console.warn(`Unable to convert color ${JSON.stringify(color)} to hex`);
  }
  return fallback;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b].map(x => {
    const hex = x?.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function hexString(color: string) {
  if (color.startsWith('#')) {
    return color.substring(1);
  }
  return color;
}

export async function getImage(img: string) {
  if (img.startsWith('http')) {
    const data = await fetch(img).then(res => res.arrayBuffer());
    const base64 = Buffer.from(data).toString('base64');
    return `data:image/png;base64,${base64}`;
  }
  else {
    console.error('Only http images are supported');
    return undefined;
  }
}