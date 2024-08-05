import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  StaticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export default function IgaMain({
  files,
}: {
  files: { file: StaticFile; caption: string }[];
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sequenceDuration = durationInFrames / files.length;

  const textOpacity = interpolate(
    frame % sequenceDuration,
    [0, sequenceDuration],
    [0, 100]
  );

  return (
    <AbsoluteFill className="bg-white">
      {files.map((f, idx) => (
        <Sequence
          key={f.file.name}
          from={idx * sequenceDuration}
          durationInFrames={sequenceDuration}
        >
          <div className="w-full flex justify-center max-h-full p-8">
            <div className="flex flex-col h-full">
              <MyImage
                src={f.file.src}
                className="object-contain h-[512px] w-full"
                durationInFrames={sequenceDuration}
              />
              <p
                className="text-8xl text-black text-center"
                style={{ opacity: textOpacity / 100 }}
              >
                {f.caption}
              </p>
            </div>
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

function MyImage({
  src,
  className,
  durationInFrames,
}: {
  src: string;
  className: string;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame,
    fps,
    config: {
      damping: 22,
      mass: 4,
    },
    durationInFrames: durationInFrames / 2,
  });

  return (
    <Img src={src} className={className} style={{ scale: spr.toFixed(2) }} />
  );
}
