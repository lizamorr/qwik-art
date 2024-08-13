import { Slider } from 'qwik-slider';

import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';

import type { IGalleryImage } from '../../routes/gallery/image-groups';

export default component$((props: { group: any }) => {
  const { group } = props;

  const sliderSettings = {
    scrollSpeed: 5,
    gap: 20,
    showScrollbar: false,
    autoScroll: true,
    autoScrollSpeed: 15,
  };

  return (
    <Slider {...sliderSettings}>
      {group.map((img: IGalleryImage, index: number) => (
        <div
          key={`${img.original}--${index}`}
          class="flex flex-col w-full min-w-fit pb-4"
          style={`max-width: ${img.originalWidth}px`}
        >
          <Image
            src={img.original}
            alt={img.originalAlt}
            id={img.id}
            layout="constrained"
            width={img.originalWidth}
            height="auto"
            background="auto"
          />
          <p
            class="w-full text-center tracking-wider mt-1 text-md md:text-xl"
            style={`max-width: ${img.originalWidth}px`}
          >
            {img.desc}
          </p>
        </div>
      ))}
    </Slider>
  );
});
