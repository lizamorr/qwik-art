import {
  $,
  component$,
  useOnWindow,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import type { DocumentHead } from "@builder.io/qwik-city";
import antwerp from "./antwerp-multi-min.png";
import capri from "./capri-min.jpg";
import checkIcon from "./check.svg";
import emailjs from "@emailjs/browser";
import loadingIcon from "./loading.svg";
import sendIcon from "./send.svg";

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

  useVisibleTask$(() => {
    state.isMobile = window.innerWidth < 640;
  });

  useOnWindow(
    "resize",
    $(() => {
      state.isMobile = window.innerWidth < 640;
    })
  );

  const submitEmail = $(async (e: any): Promise<void> => {
    state.isSendingEmail = true;
    const userId = import.meta.env.VITE_USER_ID;

    try {
      emailjs.init(userId);
      await emailjs.sendForm("service_art", "template_art", e.target, userId);
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
        } bg-cover bg-center flex justify-center rounded-lg m-4 shadow-lg w-full sm:w-3/4`}
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
              class={`flex items-center justify-center align-center border border-slate-500 bg-white hover:bg-slate-200 px-4 py-2 cursor-pointer rounded-md disabled:bg-slate-50  ${
                !state.isEmailSent && !state.isSendingEmail
                  ? "disabled:opacity-60"
                  : "disabled:opacity-100"
              } disabled:cursor-not-allowed`}
            >
              {state.isEmailSent ? (
                <img src={checkIcon} class="h-5 w-5" alt="Email sent" />
              ) : state.isSendingEmail ? (
                <img src={loadingIcon} class="h-5 w-5" alt="Sending email" />
              ) : (
                <img src={sendIcon} class="h-5 w-5" alt="Send email" />
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Contact Liza Morrison",
    description:
      "Send an email to contact Liza Morrison about commissions or other questions.",
  };
};
