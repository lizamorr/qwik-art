import {
  component$,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import {
  Link,
  useLocation,
} from '@builder.io/qwik-city';

export default component$((props: { name: string }) => {
  const loc = useLocation();
  const isPageSelected = useComputed$(
    () =>
      loc.url.pathname === `/${props.name}/` ||
      (loc.url.pathname === "/" && props.name === "home")
  );
  const navigateTo = useSignal<string>(
    props.name === "home" ? "/" : `/${props.name}/`
  );

  return (
    <div class="flex m-0 p-0">
      <Link
        class={`text-4xl md:text-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 tracking-wider ${
          isPageSelected.value ? "underline underline-offset-8" : "no-underline"
        }`}
        href={navigateTo.value}
      >
        {props.name}
      </Link>
    </div>
  );
});
