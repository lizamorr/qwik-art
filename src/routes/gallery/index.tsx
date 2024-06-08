import 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import {
  $,
  component$,
  useComputed$,
  useOnDocument,
  useSignal,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { HiChevronDoubleUpMini } from '@qwikest/icons/heroicons';

import ImageCarousel from '../../components/image-carousel/image-carousel';
import { imageGroups } from './image-groups';
import placeholder from './placeholder.svg';
import { TypeToggle } from './type-toggle';

type SelectedType =
  | "isDrawingSelected"
  | "isPaintingSelected"
  | "isDigitalSelected"
  | "isOtherSelected";

type ActiveFilter = "drawing" | "painting" | "digital" | "misc" | "all";

export default component$(() => {
  const isDrawingSelected = useSignal(false);
  const isPaintingSelected = useSignal(false);
  const isDigitalSelected = useSignal(false);
  const isOtherSelected = useSignal(false);
  const isScrollBtnDisplayed = useSignal(true);

  const filteredImages = useComputed$(() => {
    let activeFilter: ActiveFilter = "all";
    if (isPaintingSelected.value) activeFilter = "painting";
    else if (isDrawingSelected.value) activeFilter = "drawing";
    else if (isOtherSelected.value) activeFilter = "misc";
    else if (isDigitalSelected.value) activeFilter = "digital";

    if (activeFilter === "all") {
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

  const toggleSelection = $((selectedType: SelectedType) => {
    scrollToTop();

    const signals = {
      isDrawingSelected,
      isPaintingSelected,
      isDigitalSelected,
      isOtherSelected,
    } as any;

    Object.keys(signals).forEach((type) => {
      if (type === selectedType) {
        signals[type].value = !signals[type].value;
      } else {
        signals[type].value = false;
      }
    });
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
        <TypeToggle
          label="Drawings"
          isSelected={isDrawingSelected.value}
          onClick$={$(() => toggleSelection("isDrawingSelected"))}
        />
        <TypeToggle
          label="Paintings"
          isSelected={isPaintingSelected.value}
          onClick$={$(() => toggleSelection("isPaintingSelected"))}
        />
        <TypeToggle
          label="Digital"
          isSelected={isDigitalSelected.value}
          onClick$={$(() => toggleSelection("isDigitalSelected"))}
        />
        <TypeToggle
          label="Other"
          isSelected={isOtherSelected.value}
          onClick$={$(() => toggleSelection("isOtherSelected"))}
        />
      </div>

      <div class="flex flex-row w-full flex-wrap justify-center align-center text-center mt-6 md:mt-10">
        {filteredImages.value.map((group, index) => (
          <div key={`${group[0].desc}-${index}`} class="self-center">
            {group.length === 1 ? (
              <div class="align-center inline-flex flex-col justify-center m-5">
                <img
                  data-sizes="auto"
                  class="lazyload blur-up h-auto"
                  src={placeholder}
                  data-src={group[0].original}
                  alt={group[0].originalAlt}
                  id={group[0].id}
                  width={group[0].originalWidth}
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
