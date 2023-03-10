import { component$, useStore } from "@builder.io/qwik";

import type { IGalleryImage } from "../../routes/gallery/image-groups";
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";

export default component$((props: { group: any }) => {
  const { group } = props;
  const state = useStore({ slideIndex: 1 });
  const totalNumOfImages = group.length;

  return group.map((img: IGalleryImage, index: number) => (
    <div
      key={index}
      class={state.slideIndex === index + 1 ? "block" : "hidden"}
    >
      <div>
        <img
          src={img.original}
          alt={img.originalAlt}
          id={img.id}
          class="w-full"
          style={`max-width: ${img.originalWidth}px`}
        />
        <div class="mt-1 space-x-2" id="dots">
          {[...Array(totalNumOfImages).keys()].map((arrIndex) => (
            <span
              class={`${
                state.slideIndex === arrIndex + 1 ? "bg-black" : "bg-slate-300"
              } h-2 w-2 md:h-3 md:w-3 rounded-full inline-block cursor-pointer`}
              onClick$={() => (state.slideIndex = arrIndex + 1)}
            ></span>
          ))}
        </div>
        <p
          class="w-full text-center tracking-wider mt-1 text-md md:text-xl"
          style={`max-width: ${img.originalWidth}px`}
        >
          {img.desc}
        </p>
      </div>
      <div
        class="flex top-0 absolute h-full w-full justify-between"
        style={`max-width: ${img.originalWidth}px`}
      >
        <img
          src={leftArrow}
          onClick$={() => {
            state.slideIndex === 1
              ? (state.slideIndex = totalNumOfImages)
              : (state.slideIndex -= 1);
          }}
          class="h-full w-8 md:h-full md:w-12 arrow ml-[-30px] md:ml-[-40px] justify-center items-center cursor-pointer"
          alt="Left arrow"
        />
        <img
          src={rightArrow}
          onClick$={() => {
            state.slideIndex === totalNumOfImages
              ? (state.slideIndex = 1)
              : (state.slideIndex += 1);
          }}
          class="h-full w-8 md:h-full md:w-12 arrow mr-[-30px] md:mr-[-40px] justify-center items-center cursor-pointer"
          alt="Right arrow"
        />
      </div>
    </div>
  ));
});
