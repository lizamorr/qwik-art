import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import labrinth from "./labrinth.mp4";
import title from "./liza-morrison-art-compressed.png";
import labrinthPoster from "../../gallery/images/labrinth-min.jpg";

export default component$(() => {
  return (
    <div class="w-full flex justify-center items-center overflow-hidden h-full">
      <video
        src={labrinth}
        playsInline
        autoPlay
        muted
        loop
        class="object-cover w-auto h-full fixed top-0"
        id="labrinth"
        poster={labrinthPoster}
      />
      <img
        src={title}
        class="absolute m-auto inset-0 w-3/4"
        alt="Liza Morrison Art"
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
