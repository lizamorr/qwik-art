import {
  $,
  component$,
  useOnWindow,
  useSignal,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';

import labrinth from './labrinth.mp4';
import title from './name.gif';

export default component$(() => {
  const isMobile = useSignal<boolean>(true);

  useOnWindow(
    "resize",
    $(() => {
      isMobile.value = window.innerWidth < 640;
    })
  );

  return (
    <div class="w-full flex justify-center items-center overflow-hidden h-full">
      <video
        src={labrinth}
        playsInline
        autoplay
        muted
        loop
        class="object-cover w-auto h-full fixed top-0"
        id="labrinth"
      />
      <Image
        src={title}
        class="absolute m-auto inset-0 overflow-hidden"
        alt="Liza Morrison Art"
        layout="fixed"
        height={`${isMobile.value ? 200 : 300}`}
        width={`${isMobile.value ? 300 : 700}`}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Liza Morrison Art",
  meta: [
    {
      name: "Liza Morrison Art",
      content: "Artwork",
    },
  ],
};
