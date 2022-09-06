import pptxgen from "pptxgenjs";

export function addTitleSlide(pres: pptxgen) {
    pres.defineSlideMaster({
        title: "TITLE_SLIDE",
        objects: [
            {
                placeholder: {
                    options: {
                        name: "title",
                        type: "title",
                        y: '40%',
                        h: '20%',
                        w: "100%",
                        fontFace: "Arial",
                        color: '000000',
                        fontSize: 60,
                        align: "center",
                        valign: "middle",
                        margin: 0,
                    },
                    text: "",
                },
            },
            {
                placeholder: {
                    options: {
                        name: "subtitle",
                        type: "body",
                        y: '60%',
                        h: '20%',
                        w: "100%",
                        fontFace: "Arial",
                        color: '666666',
                        fontSize: 36,
                        align: "center",
                        valign: "middle",
                        margin: 0,
                    },
                    text: "(Click to edit)",
                },
            }
        ],
    });
}