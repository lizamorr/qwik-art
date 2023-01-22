import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer class="bg-white fixed bottom-0 left-0 p-2 shadow z-10 w-full flex justify-center tracking-wider">
      {`© Liza Morrison ${new Date().getFullYear()}`}
    </footer>
  );
});
