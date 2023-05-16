import { component$, useSignal } from "@builder.io/qwik";

import type { IGalleryImage } from "../../routes/gallery/image-groups";
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";

export default component$((props: { group: any }) => {
  const { group } = props;

  const slideIndex = useSignal(1);
  const touchendX = useSignal(0);
  const touchendY = useSignal(0);
  const touchstartX = useSignal(0);
  const touchstartY = useSignal(0);

  const totalNumOfImages = group.length;

  return group.map((img: IGalleryImage, index: number) => (
    <div
      key={index}
      class={slideIndex.value === index + 1 ? "block" : "hidden"}
      onTouchStart$={(e) => {
        touchstartX.value = e.changedTouches[0].screenX;
        touchstartY.value = e.changedTouches[0].screenY;
      }}
      onTouchEnd$={(e) => {
        touchendX.value = e.changedTouches[0].screenX;
        touchendY.value = e.changedTouches[0].screenY;

        if (
          Math.abs(touchendX.value - touchstartX.value) >
          Math.abs(touchendY.value - touchstartY.value)
        ) {
          if (touchendX.value < touchstartX.value) {
            slideIndex.value === totalNumOfImages
              ? (slideIndex.value = 1)
              : (slideIndex.value += 1);
          }
          if (touchendX.value > touchstartX.value) {
            slideIndex.value === 1
              ? (slideIndex.value = totalNumOfImages)
              : (slideIndex.value -= 1);
          }
        }
      }}
    >
      <div>
        <img
          src={img.original}
          alt={img.originalAlt}
          id={img.id}
          class="w-full"
          style={`max-width: ${img.originalWidth}px`}
          width={img.originalWidth}
          height="auto"
        />
        <div class="mt-1 space-x-2" id="dots">
          {[...Array(totalNumOfImages).keys()].map((arrIndex) => (
            <span
              key={`${slideIndex.value}--${arrIndex}`}
              class={`${
                slideIndex.value === arrIndex + 1 ? "bg-black" : "bg-slate-300"
              } h-2 w-2 md:h-3 md:w-3 rounded-full inline-block cursor-pointer`}
              onClick$={() => (slideIndex.value = arrIndex + 1)}
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
            slideIndex.value === 1
              ? (slideIndex.value = totalNumOfImages)
              : (slideIndex.value -= 1);
          }}
          class="h-full w-8 md:h-full md:w-12 arrow ml-[-30px] md:ml-[-40px] justify-center items-center cursor-pointer"
          alt="Left arrow"
        />
        <img
          src={rightArrow}
          onClick$={() => {
            slideIndex.value === totalNumOfImages
              ? (slideIndex.value = 1)
              : (slideIndex.value += 1);
          }}
          class="h-full w-8 md:h-full md:w-12 arrow mr-[-30px] md:mr-[-40px] justify-center items-center cursor-pointer"
          alt="Right arrow"
        />
      </div>
    </div>
  ));
});
