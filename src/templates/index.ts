import pptxgen from "pptxgenjs";

import { addMasterSlide } from "./MASTER_SLIDE";
import { addTitleSlide } from "./TITLE_SLIDE";

export function addTemplates(pres: pptxgen) {
    addMasterSlide(pres);
    addTitleSlide(pres);
}