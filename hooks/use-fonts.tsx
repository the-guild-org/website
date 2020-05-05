import React from "react";
import FontFaceObserver from "fontfaceobserver";

export function useFonts() {
  React.useEffect(() => {
    const robotoLink = document.createElement("link");
    robotoLink.href =
      "https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap";
    robotoLink.rel = "stylesheet";

    const ptSerifLink = document.createElement("link");
    ptSerifLink.href =
      "https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap";
    ptSerifLink.rel = "stylesheet";

    // <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"></link>

    document.head.appendChild(robotoLink);
    document.head.appendChild(ptSerifLink);

    const roboto = new FontFaceObserver("Roboto");
    roboto.load().then(() => {
      document.documentElement.classList.add("roboto");
    });

    const ptSerif = new FontFaceObserver("PT Serif");
    ptSerif.load().then(() => {
      document.documentElement.classList.add("PTSerif");
    });
  }, []);
}
