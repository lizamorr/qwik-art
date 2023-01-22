import {
  $,
  component$,
  useOnWindow,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { Check, LoadingIcon, SendIcon } from "../../integrations/react/mui";

import { DocumentHead } from "@builder.io/qwik-city";
import antwerp from "./antwerp-multi-min.png";
import capri from "./capri-min.jpg";
import emailjs from "@emailjs/browser";

export default component$(() => {
  const mailerState = useStore({
    name: "",
    email: "",
    message: "",
    userId: "",
  });

  const state = useStore({
    isSendingEmail: false,
    isEmailSent: false,
    isMobile: true,
  });

  useOnWindow(
    "resize",
    $(() => {
      state.isMobile = window.innerWidth < 640;
    })
  );

  const handleStateChange = $((e: any): void => {
    if (e.target.name === "name") mailerState.name = e.target.value;
    if (e.target.name === "email") mailerState.email = e.target.value;
    if (e.target.name === "message") mailerState.message = e.target.value;
  });

  const resetForm = $((): void => {
    mailerState.name = "";
    mailerState.email = "";
    mailerState.message = "";
  });

  useTask$(() => {
    mailerState.userId = import.meta.env.VITE_USER_ID;
  });

  const submitEmail = $(async (e: any): Promise<void> => {
    state.isSendingEmail = true;

    try {
      emailjs.init(mailerState.userId);
      await emailjs.sendForm(
        "service_art",
        "template_art",
        e.target,
        mailerState.userId
      );
      state.isSendingEmail = false;
      state.isEmailSent = true;
      resetForm();
    } catch (e) {
      alert("Sorry, please email me at lizammorrison@gmail.com instead.");
      state.isSendingEmail = false;
    }

    setTimeout(() => {
      state.isEmailSent = false;
      state.isSendingEmail = false;
    }, 1000);
  });

  return (
    <div class="flex justify-center w-full">
      <form
        preventdefault:submit
        class={`${
          state.isSendingEmail ? "opacity-80" : "opacity-100"
        } bg-contain flex justify-center rounded-lg m-4 shadow-lg w-full sm:w-3/4`}
        style={{
          backgroundImage: `url(${state.isMobile ? capri : antwerp})`,
        }}
        method="post"
        onSubmit$={submitEmail}
      >
        {state.isEmailSent ? (
          <div
            id="thank-you"
            class="z-50 absolute flex justify-center items-center w-full h-3/4 text-2xl sm:text-4xl"
          >
            Thank you!
          </div>
        ) : null}
        <fieldset class="flex relative flex-col py-6 w-3/4">
          <input
            class="w-full border-none rounded-md bg-white mb-2 opacity-95 min-h-[40px] placeholder-black px-4"
            placeholder="Name"
            onChange$={handleStateChange}
            name="name"
            value={mailerState.name}
          />
          <input
            class="w-full border-none rounded-md bg-white mb-2 opacity-95 min-h-[40px] placeholder-black px-4"
            placeholder="Email"
            onChange$={handleStateChange}
            name="email"
            value={mailerState.email}
          />
          <textarea
            class="w-full rounded-md bg-white mb-2 p-4 opacity-95 min-h-[200px] placeholder-black"
            placeholder="Message"
            onChange$={handleStateChange}
            name="message"
            value={mailerState.message}
          />
          <div class="flex justify-center align-center pt-8">
            <button
              disabled={!mailerState.email || !mailerState.name}
              class={`justify-center align-center border border-slate-500 bg-white hover:bg-slate-200 px-6 py-2 cursor-pointer rounded-md disabled:bg-slate-50  ${
                !state.isEmailSent && !state.isSendingEmail
                  ? "disabled:opacity-60"
                  : "disabled:opacity-100"
              } disabled:cursor-not-allowed`}
            >
              {state.isEmailSent ? (
                <Check />
              ) : state.isSendingEmail ? (
                <LoadingIcon />
              ) : (
                <SendIcon />
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Contact Liza",
};
