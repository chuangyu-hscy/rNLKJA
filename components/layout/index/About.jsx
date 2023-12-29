import React from "react";
import { IoPawOutline } from "react-icons/io5";
import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="grid md:grid-cols-2 items-center justify-items gap-4 py-10 px-4">
      <div>
        <h2>
          The Data Cat-alytic Converter: Unlocking the Power of Data to Drive
          Business Success
        </h2>

        <p className="">
          I am a purr-fessional data whisperer, weaving intricate tales from
          numbers with the stealth and grace of a night-prowling cat. In the
          vast, shadowy realm of analytics, I illuminate complex mysteries with
          a glint of insight as sharp as a cat's gaze.
        </p>
      </div>
      <div>
        <Image
          src="/about-curious-cat.svg"
          alt="about image"
          width={300}
          height={300}
          layout="responsive"
          quality={75}
        />
      </div>
    </div>
  );
};

export default AboutSection;