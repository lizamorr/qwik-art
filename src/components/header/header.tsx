import {
  $,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import {
  HiBars3Solid,
  HiXMarkSolid,
} from '@qwikest/icons/heroicons';
import { Image } from '@unpic/qwik';

import { DesktopMenu } from '../menu/desktop-menu';
import { MobileMenu } from '../menu/mobile-menu';
import initials from './initials-compressed.png';

export default component$(() => {
  const isMenuOpen = useSignal<boolean>(false);
  const loc = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => isMenuOpen.value);
    const body = document.getElementById("body");
    isMenuOpen.value
      ? body?.classList.add("no-scroll")
      : body?.classList.remove("no-scroll");
  });

  return (
    <>
      <header
        class={`${
          loc.url.pathname === `/contact/`
            ? "bg-transparent backdrop-blur-md"
            : "bg-white"
        } fixed w-full flex justify-between items-center z-50 h-12 md:h-16 overflow-hidden md:py-4`}
      >
        <a
          class="flex items-center mt-1 ml-2 md:ml-4"
          href="/"
          title="Liza Morrison"
        >
          <Image
            src={initials}
            class="h-10 w-16 md:h-16 md:w-24 logo cursor-pointer"
            aria-label="Navigate home"
            layout="constrained"
            height={40}
            width={64}
            priority={true}
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

      <DesktopMenu />
      <MobileMenu isOpen={isMenuOpen.value} />

      {isMenuOpen.value && (
        <div
          class="fixed inset-0 bg-black bg-opacity-50 z-[49]"
          onClick$={$(() => (isMenuOpen.value = false))}
        ></div>
      )}
    </>
  );
});
