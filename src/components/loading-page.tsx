import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="text-center">
        <div class="spinner"></div>
      </div>
    </div>
  );
});
