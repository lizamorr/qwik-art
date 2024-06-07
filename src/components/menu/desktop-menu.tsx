import MenuItem from "./menu-item";
import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();

  return (
    <div
      class={`hidden md:flex md:flex-row md:space-x-6 md:top-0 md:h-16 md:justify-end md:pr-6 md:w-fit md:right-0 fixed items-center z-50 overflow-hidden ${
        loc.url.pathname === `/contact/` ? "md:text-white" : ""
      }`}
    >
      <MenuItem name="gallery" />
      <MenuItem name="contact" />
      <MenuItem name="about" />
    </div>
  );
});
