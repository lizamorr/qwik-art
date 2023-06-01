import { HiBars3Solid, HiXMarkSolid } from "@qwikest/icons/heroicons";
import { component$, useSignal } from "@builder.io/qwik";

import MenuItem from "./menu-item";
import initials from "./initials-compressed.png";

export default component$(() => {
  const isMenuOpen = useSignal(false);

  return (
    <>
      <header class="fixed w-full flex justify-between items-center bg-white shadow-md z-50 h-14 overflow-hidden">
        <a class="flex items-center md:ml-4" href="/" title="Liza Morrison">
          <img
            src={initials}
            class="h-12 w-15 md:h-16 md:w-24 logo cursor-pointer"
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
