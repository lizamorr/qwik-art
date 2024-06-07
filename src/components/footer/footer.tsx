import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  return (
    <footer
      class={`cursor-pointer ${
        location.url.pathname.includes("contact") ||
        location.url.pathname === "/"
          ? "absolute bottom-0 left-0"
          : ""
      } mt-auto p-2 z-10 w-full flex justify-center tracking-wider`}
    >
      <a
        href="https://github.com/lizamorr/artwork-website"
        target="_blank"
      >{`© Liza Morrison ${new Date().getFullYear()}`}</a>
    </footer>
  );
});
