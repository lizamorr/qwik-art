import { QRL } from "@builder.io/qwik";

interface TypeToggle {
  label: string;
  isSelected: boolean;
  onClick$: QRL<() => void>;
}
export const TypeToggle = (props: TypeToggle) => {
  const { isSelected, label, onClick$ } = props;

  return (
    <span
      class={`cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${
        isSelected ? "underline underline-offset-8" : "no-underline"
      }`}
      onClick$={onClick$}
    >
      {label}
    </span>
  );
};
