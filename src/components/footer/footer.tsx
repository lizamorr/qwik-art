import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer class="cursor-pointer bg-white fixed bottom-0 left-0 p-2 shadow z-10 w-full flex justify-center tracking-wider">
      <a
        href="https://github.com/lizamorr/artwork-website"
        target="_blank"
      >{`© Liza Morrison ${new Date().getFullYear()}`}</a>
    </footer>
  );
});
