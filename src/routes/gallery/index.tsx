import { $, component$, useOnWindow, useStore } from "@builder.io/qwik";

import type { DocumentHead } from "@builder.io/qwik-city";
import ImageCarousel from "../../components/image-carousel/image-carousel";
import arrowUp from "./arrow-up.svg";
import { imageGroups } from "./image-groups";

export default component$(() => {
  const state = useStore({
    filteredImages: imageGroups,
    isDrawingSelected: false,
    isPaintingSelected: false,
    isDigitalSelected: false,
    isOtherSelected: false,
    isScrollBtnDisplayed: false,
  });

  useOnWindow(
    "scroll",
    $(() => {
      if (
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20) &&
        !state.isScrollBtnDisplayed
      )
        state.isScrollBtnDisplayed = true;
    })
  );

  return (
    <div class="flex flex-col justify-center align-center w-full">
      {state.isScrollBtnDisplayed ? (
        <div
          id="scroll-btn"
          class="fixed bottom-10 right-4 z-50 p-2 cursor-pointer"
          onClick$={() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            state.isScrollBtnDisplayed = false;
          }}
        >
          <img src={arrowUp} class="h-10 w-10" alt="Scroll to top of page" />
        </div>
      ) : null}
      <div class="flex flex-col">
        <div class="text-md md:text-xl mb-4 flex flex-col md:flex-row md:space-x-20 justify-center items-center w-full tracking-wider">
          <span
            class={`cursor-pointer hover:underline underline-offset-2 ${
              state.isDrawingSelected
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            onClick$={() => {
              state.filteredImages = imageGroups.filter((group) =>
                group.find((img) => img.id === "drawing")
              );
              state.isDrawingSelected = true;
              state.isPaintingSelected = false;
              state.isDigitalSelected = false;
              state.isOtherSelected = false;
            }}
          >
            Drawings
          </span>
          <span
            class={`cursor-pointer hover:underline underline-offset-2 ${
              state.isPaintingSelected
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            onClick$={() => {
              state.filteredImages = imageGroups.filter((group) =>
                group.find((img) => img.id === "painting")
              );
              state.isDrawingSelected = false;
              state.isPaintingSelected = true;
              state.isDigitalSelected = false;
              state.isOtherSelected = false;
            }}
          >
            Paintings
          </span>
          <span
            class={`cursor-pointer hover:underline underline-offset-2 ${
              state.isDigitalSelected
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            onClick$={() => {
              state.filteredImages = imageGroups.filter((group) =>
                group.find((img) => img.id === "digital")
              );
              state.isDrawingSelected = false;
              state.isPaintingSelected = false;
              state.isDigitalSelected = true;
              state.isOtherSelected = false;
            }}
          >
            Digital
          </span>
          <span
            class={`cursor-pointer hover:underline underline-offset-2 ${
              state.isOtherSelected
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            onClick$={() => {
              state.filteredImages = imageGroups.filter((group) =>
                group.find((img) => img.id === "misc")
              );
              state.isDrawingSelected = false;
              state.isPaintingSelected = false;
              state.isDigitalSelected = false;
              state.isOtherSelected = true;
            }}
          >
            Other
          </span>
        </div>
        <div class="flex flex-row w-full flex-wrap justify-center text-center">
          {state.filteredImages.map((group, index) => (
            <div class="self-center">
              {group.length === 1 ? (
                <div
                  key={index}
                  class="align-center inline-flex flex-col justify-center w-full m-5 max-w-fit"
                >
                  <img
                    src={group[0].original}
                    alt={group[0].originalAlt}
                    id={group[0].id}
                    class="w-full"
                    style={`max-width: ${group[0].originalWidth}px`}
                  />
                  <p
                    class="text-md md:text-xl w-full text-center tracking-wider mt-2"
                    style={`max-width: ${group[0].originalWidth}px`}
                  >
                    {group[0].desc}
                  </p>
                </div>
              ) : (
                <div class="relative align-center inline-flex flex-col justify-center w-full my-5 mx-10 md:mx-8 max-w-fit">
                  <ImageCarousel group={group} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Liza Morrison Gallery",
    description:
      "Drawings, paintings, digital art, and other works by Liza Morrison over the years.",
  };
};
