import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$((props: { name: string }) => {
  const loc = useLocation();

  return (
    <li class="flex m-0 p-0">
      <a
        class={`text-4xl hover:underline underline-offset-8 tracking-wider ${
          loc.url.pathname === `/${props.name}/`
            ? "underline underline-offset-8"
            : "no-underline"
        }`}
        href={`/${props.name}/`}
      >
        {props.name}
      </a>
    </li>
  );
});
