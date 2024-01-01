import React from "react";
import Image from "next/legacy/image";
import { Zoom } from "react-awesome-reveal";

const AboutSection = () => {
  return (
    <div className="grid md:grid-cols-2 items-center justify-items gap-10 py-10 px-4">
      <div>
        <h2>
          The Data Cat-alytic Converter: Unlocking the Power of Data to Drive
          Business Success
        </h2>
        <br />
        <p className="leading-10">
          I am a purr-fessional data whisperer, weaving intricate tales from
          numbers with the stealth and grace of a night-prowling cat. In the
          vast, shadowy realm of analytics, I illuminate complex mysteries with
          a glint of insight as sharp as a cat's gaze.
        </p>
      </div>
      <div>
        <Zoom triggerOnce>
          <Image
            src="/index/about-curious-cat.svg"
            alt="about image"
            width={300}
            height={300}
            layout="responsive"
            quality={50}
          />
        </Zoom>
      </div>
    </div>
  );
};

export default AboutSection;
