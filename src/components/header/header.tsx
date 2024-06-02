import { $, component$, useSignal } from "@builder.io/qwik";
import { HiBars3Solid, HiXMarkSolid } from "@qwikest/icons/heroicons";

import { Image } from "@unpic/qwik";
import MenuItem from "./menu-item";
import initials from "./initials-compressed.png";
import initialsWhite from "./initials-white.png";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const isMenuOpen = useSignal(false);
  const loc = useLocation();

  return (
    <>
      <header
        class={`${
          loc.url.pathname === `/contact/`
            ? "text-white bg-transparent backdrop-blur-md"
            : "bg-white"
        } fixed w-full flex justify-between items-center z-50 h-12 md:h-16 overflow-hidden md:py-4`}
      >
        <a class="flex items-center md:ml-4" href="/" title="Liza Morrison">
          <Image
            src={loc.url.pathname === `/contact/` ? initialsWhite : initials}
            class="h-10 w-16 md:h-16 md:w-24 logo cursor-pointer"
            aria-label="Navigate home"
            layout="constrained"
            height={40}
            width={64}
          />
        </a>
        <div class="inline-block md:hidden m-2 md:mr-4">
          {!isMenuOpen.value ? (
            <HiBars3Solid
              onClick$={$(() => (isMenuOpen.value = true))}
              class="cursor-pointer text-4xl md:text-5xl"
            />
          ) : (
            <HiXMarkSolid
              onClick$={$(() => (isMenuOpen.value = false))}
              class="cursor-pointer text-4xl md:text-5xl"
            />
          )}
        </div>
      </header>

      <div
        class={`${
          isMenuOpen.value
            ? "flex bg-white w-full flex-col bg-opacity-90 space-y-4 p-10 top-12 h-full"
            : "hidden md:flex md:flex-row md:space-x-6 md:top-0 md:h-16 md:justify-end md:pr-6 md:w-fit md:right-0"
        }  fixed items-center z-50 overflow-hidden ${
          loc.url.pathname === `/contact/` ? "md:text-white" : ""
        }`}
      >
        <MenuItem name="gallery" />
        <MenuItem name="contact" />
        <MenuItem name="about" />
      </div>
    </>
  );
});
