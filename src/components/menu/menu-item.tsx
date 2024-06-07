import { component$, useSignal } from "@builder.io/qwik";

import { useLocation } from "@builder.io/qwik-city";

export default component$((props: { name: string }) => {
  const loc = useLocation();
  const isPageSelected = useSignal<boolean>(
    loc.url.pathname === `/${props.name}/` ||
      (loc.url.pathname === "/" && props.name === "home")
  );
  const navigateTo = useSignal<string>(
    props.name === "home" ? "/" : `/${props.name}/`
  );

  return (
    <div class="flex m-0 p-0">
      <a
        class={`text-4xl md:text-2xl hover:underline underline-offset-8 tracking-wider ${
          isPageSelected.value ? "underline underline-offset-8" : "no-underline"
        }`}
        href={navigateTo.value}
      >
        {props.name}
      </a>
    </div>
  );
});
