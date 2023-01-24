import { component$ } from "@builder.io/qwik";
import initials from "./initials-compressed.png";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();

  return (
    <header class="fixed w-full flex items-center bg-white shadow-md z-10">
      <a href="/" title="Liza Morrison">
        <img
          src={initials}
          class="h-12 w-15 cursor-pointer"
          aria-label="Navigate home"
        />
      </a>

      <ul class="m-0 list-none flex-1 text-right pr-4 space-x-4">
        <li class="inline-block m-0 p-0">
          <a
            class={`text-md md:text-xl inline-block hover:underline underline-offset-2 tracking-wider ${
              loc.pathname === "/gallery/"
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            href="/gallery/"
          >
            Gallery
          </a>
        </li>
        <li class="inline-block m-0 p-0">
          <a
            class={`text-md md:text-xl inline-block hover:underline underline-offset-2 tracking-wider ${
              loc.pathname === "/contact/"
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            href="/contact/"
          >
            Contact
          </a>
        </li>
        <li class="inline-block m-0 p-0">
          <a
            class={`text-md md:text-lg inline-block hover:underline underline-offset-2 tracking-wider ${
              loc.pathname === "/about/"
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
            href="/about/"
          >
            About
          </a>
        </li>
      </ul>
    </header>
  );
});
