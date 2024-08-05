import { Composition, getStaticFiles } from "remotion";
import { Main } from "./MyComp/Main";
import IgaMain from "./IgaComp/Main";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { NextLogo } from "./MyComp/NextLogo";
import GPSMain from "./GPSComp/Main";

const captions = ["I love Iga", "Iga ma 9 lat", "Iga lubi ser"];

export const RemotionRoot: React.FC = () => {
  const staticFiles = getStaticFiles();

  const igaFiles = staticFiles
    .filter((f) => f.name.startsWith("iga/"))
    .map((f, idx) => {
      return {
        file: f,
        caption: captions[idx % captions.length],
      };
    });

  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      <Composition
        id="Iga"
        component={IgaMain}
        durationInFrames={igaFiles.length * 60 * 2}
        fps={60}
        width={1980}
        height={1080}
        defaultProps={{ files: igaFiles }}
      />
      <Composition
        id="GPS"
        component={GPSMain}
        durationInFrames={120}
        fps={60}
        width={1980}
        height={1080}
      />
    </>
  );
};
