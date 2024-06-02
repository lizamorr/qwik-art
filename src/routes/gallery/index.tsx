import {
  $,
  component$,
  useComputed$,
  useOnDocument,
  useSignal,
} from "@builder.io/qwik";

import type { DocumentHead } from "@builder.io/qwik-city";
import { HiChevronDoubleUpMini } from "@qwikest/icons/heroicons";
import { Image } from "@unpic/qwik";
import ImageCarousel from "../../components/image-carousel/image-carousel";
import { imageGroups } from "./image-groups";

export default component$(() => {
  const isDrawingSelected = useSignal(false);
  const isPaintingSelected = useSignal(false);
  const isDigitalSelected = useSignal(false);
  const isOtherSelected = useSignal(false);
  const isScrollBtnDisplayed = useSignal(true);

  const filteredImages = useComputed$(() => {
    if (
      !isPaintingSelected.value &&
      !isDrawingSelected.value &&
      !isOtherSelected.value &&
      !isDigitalSelected.value
    ) {
      return imageGroups;
    }

    const filteredImages = imageGroups.filter((group) =>
      group.find((img) =>
        isPaintingSelected.value
          ? img.id === "painting"
          : isDrawingSelected.value
          ? img.id === "drawing"
          : isOtherSelected.value
          ? img.id === "misc"
          : isDigitalSelected.value
          ? img.id === "digital"
          : img
      )
    );

    console.log(filteredImages);

    return filteredImages;
  });

  useOnDocument(
    "scroll",
    $(() => {
      isScrollBtnDisplayed.value =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    })
  );

  return (
    <>
      <div
        id="scroll-btn"
        class={`${
          isScrollBtnDisplayed.value ? "block" : "hidden"
        } fixed bottom-10 right-4 z-50 p-2 cursor-pointer`}
        onClick$={() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }}
      >
        <HiChevronDoubleUpMini color="#cbd5e1" class="h-10 w-10" />
      </div>

      <div class="fixed h-14 md:h-20 top-12 z-40 left-0 !bg-white bg-opacity-90 text-md md:text-2xl flex space-x-4 md:space-x-20 justify-between px-6 md:justify-center items-center w-full tracking-wider">
        <span
          class={`cursor-pointer hover:underline underline-offset-8 ${
            isDrawingSelected.value
              ? "underline underline-offset-8"
              : "no-underline"
          }`}
          onClick$={() => {
            isDrawingSelected.value = !isDrawingSelected.value;
            isPaintingSelected.value =
              isDigitalSelected.value =
              isOtherSelected.value =
                false;
          }}
        >
          Drawings
        </span>
        <span
          class={`cursor-pointer hover:underline underline-offset-8 ${
            isPaintingSelected.value
              ? "underline underline-offset-8"
              : "no-underline"
          }`}
          onClick$={() => {
            isPaintingSelected.value = !isPaintingSelected.value;
            isDrawingSelected.value =
              isDigitalSelected.value =
              isOtherSelected.value =
                false;
          }}
        >
          Paintings
        </span>
        <span
          class={`cursor-pointer hover:underline underline-offset-8 ${
            isDigitalSelected.value
              ? "underline underline-offset-8"
              : "no-underline"
          }`}
          onClick$={() => {
            isDigitalSelected.value = !isDigitalSelected.value;
            isDrawingSelected.value =
              isPaintingSelected.value =
              isOtherSelected.value =
                false;
          }}
        >
          Digital
        </span>
        <span
          class={`cursor-pointer hover:underline underline-offset-8 ${
            isOtherSelected.value
              ? "underline underline-offset-8"
              : "no-underline"
          }`}
          onClick$={() => {
            isOtherSelected.value = !isOtherSelected.value;
            isDrawingSelected.value =
              isPaintingSelected.value =
              isDigitalSelected.value =
                false;
          }}
        >
          Other
        </span>
      </div>

      <div class="flex flex-row w-full flex-wrap justify-center align-center text-center mt-6 md:mt-10">
        {filteredImages.value.map((group, index) => (
          <div key={`${group[0].desc}-${index}`} class="self-center">
            {group.length === 1 ? (
              <div class="align-center inline-flex flex-col justify-center m-5">
                <Image
                  src={group[0].original}
                  alt={group[0].originalAlt}
                  id={group[0].id}
                  layout="constrained"
                  width={group[0].originalWidth}
                  height="auto"
                  priority={index < 3}
                  background="auto"
                />
                <p
                  class="text-md md:text-xl w-full text-center tracking-wider mt-2"
                  style={`max-width: ${group[0].originalWidth}px`}
                >
                  {group[0].desc}
                </p>
              </div>
            ) : (
              <div class="relative z-5 align-center inline-flex flex-col justify-center w-full my-5 mx-10 md:mx-8 max-w-fit">
                <ImageCarousel group={group} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Liza Morrison Gallery",
    description:
      "Drawings, paintings, digital art, and other works by Liza Morrison over the years.",
  };
};
