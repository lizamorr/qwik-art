import { HiBars3Solid, HiXMarkSolid } from "@qwikest/icons/heroicons";
import { component$, useSignal } from "@builder.io/qwik";

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
          <img
            src={loc.url.pathname === `/contact/` ? initialsWhite : initials}
            class="h-10 w-15 md:h-16 md:w-24 logo cursor-pointer"
            aria-label="Navigate home"
          />
        </a>
        <li class="inline-block m-2 md:mr-4">
          {!isMenuOpen.value ? (
            <HiBars3Solid
              onClick$={() => (isMenuOpen.value = true)}
              class="cursor-pointer text-4xl md:text-5xl"
            />
          ) : (
            <HiXMarkSolid
              onClick$={() => (isMenuOpen.value = false)}
              class="cursor-pointer text-4xl md:text-5xl"
            />
          )}
        </li>
      </header>

      {isMenuOpen.value && (
        <div class="bg-white fixed items-center w-full h-full flex flex-col z-50 top-14 overflow-hidden space-y-4 p-10 bg-opacity-90">
          <MenuItem name="gallery" />
          <MenuItem name="contact" />
          <MenuItem name="about" />
        </div>
      )}
    </>
  );
});
