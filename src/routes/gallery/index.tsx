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
    let activeFilter = "";
    if (isPaintingSelected.value) activeFilter = "painting";
    else if (isDrawingSelected.value) activeFilter = "drawing";
    else if (isOtherSelected.value) activeFilter = "misc";
    else if (isDigitalSelected.value) activeFilter = "digital";

    if (activeFilter === "") {
      return imageGroups;
    }

    const filteredImages = imageGroups.filter((group) =>
      group.some((img) => img.id === activeFilter)
    );

    return filteredImages;
  });

  useOnDocument(
    "scroll",
    $(() => {
      isScrollBtnDisplayed.value =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    })
  );

  const scrollToTop = $(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });

  return (
    <>
      <div
        id="scroll-btn"
        class={`${
          isScrollBtnDisplayed.value ? "block" : "hidden"
        } fixed bottom-10 right-4 z-[49] p-2 cursor-pointer`}
        onClick$={scrollToTop}
      >
        <HiChevronDoubleUpMini color="#cbd5e1" class="h-10 w-10" />
      </div>

      <div
        class={`fixed h-14 md:h-20 top-12 z-40 left-0 !bg-white bg-opacity-90 text-md md:text-2xl flex space-x-4 md:space-x-20 justify-between px-6 md:justify-center items-center w-full tracking-wider`}
      >
        <span
          class={`cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
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
            scrollToTop();
          }}
        >
          Drawings
        </span>
        <span
          class={`cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
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
            scrollToTop();
          }}
        >
          Paintings
        </span>
        <span
          class={`cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
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
            scrollToTop();
          }}
        >
          Digital
        </span>
        <span
          class={`cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
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
            scrollToTop();
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
                  decoding={index < 3 ? "sync" : "async"}
                  loading={index < 3 ? "eager" : "lazy"}
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
