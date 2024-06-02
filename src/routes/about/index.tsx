import type { DocumentHead } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import aboutText from "./about-text-min.webp";
import { component$ } from "@builder.io/qwik";
import github from "./github-mark.webp";
import lizaMontStMichel from "./liza-mont-st-michel.webp";

export default component$(() => {
  return (
    <div class="flex flex-wrap justify-center w-full">
      <div class="flex flex-col align-center mx-10">
        <Image
          src={lizaMontStMichel}
          alt="Liza at Mont St. Michel"
          layout="constrained"
          width={500}
          height="auto"
          class="w-full max-w-md"
          background="auto"
          loading="eager"
        />
        <div class="flex justify-center mt-6 space-x-2">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/lizamorrisonart/"
          >
            <img
              alt="Instagram"
              src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_50,h_50,al_c,q_85,usm_0.66_1.00_0.01/01c3aff52f2a4dffa526d7a9843d46ea.webp"
              class="w-10 h-10 object-cover"
            />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/lizamorr/artwork-website"
            class="flex items-center"
          >
            <img alt="GitHub" src={github} class="w-8 h-8 object-cover" />
          </a>
        </div>
      </div>
      <div class="flex justify-center px-6">
        <Image
          src={aboutText}
          alt="Text describing Liza"
          layout="constrained"
          width={500}
          height="auto"
          background="auto"
          loading="eager"
        />
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "About Liza Morrison",
    description: "Get to know Liza Morrison.",
  };
};
