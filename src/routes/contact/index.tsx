import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import type { DocumentHead } from "@builder.io/qwik-city";
import capri from "../../images/capri-min.webp";
import checkIcon from "./check.svg";
import emailjs from "@emailjs/browser";
import loadingIcon from "./loading.svg";
import sendIcon from "./send.svg";
import switzerland from "../../images/switzerland-min.webp";

export default component$(() => {
  const mailerState = useStore({
    name: "",
    email: "",
    message: "",
    userId: "",
  });

  const isSendingEmail = useSignal(false);
  const isEmailSent = useSignal(false);
  const isMobile = useSignal(true);

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
    isMobile.value = window.innerWidth < 640;
  });

  useOnWindow(
    "resize",
    $(() => {
      isMobile.value = window.innerWidth < 640;
    })
  );

  const submitEmail = $(async (e: any): Promise<void> => {
    isSendingEmail.value = true;
    const userId = import.meta.env.VITE_USER_ID;

    try {
      emailjs.init(userId);
      await emailjs.sendForm("service_art", "template_art", e.target, userId);
      isSendingEmail.value = false;
      isEmailSent.value = true;
      resetForm();
    } catch (e) {
      alert("Sorry, please email me at lizammorrison@gmail.com instead.");
      isSendingEmail.value = false;
    }

    setTimeout(() => {
      isEmailSent.value = false;
      isSendingEmail.value = false;
    }, 1000);
  });

  return (
    <div
      style={{
        backgroundImage: `url(${isMobile.value ? capri : switzerland})`,
      }}
      class="fixed top-[48px] left-0 h-screen w-full flex justify-center bg-cover bg-center"
    >
      <form
        preventdefault:submit
        class={`${
          isSendingEmail.value ? "opacity-80" : "opacity-100"
        } flex justify-center pt-24 m-4 w-4/5 lg:w-2/5`}
        method="post"
        onSubmit$={submitEmail}
      >
        {isEmailSent.value ? (
          <div
            id="thank-you"
            class="z-50 absolute flex justify-center items-center w-full h-3/4 text-2xl sm:text-4xl"
          >
            Thank you!
          </div>
        ) : null}
        <fieldset class="flex relative flex-col py-8 w-full">
          <input
            class="w-full border-none rounded-md bg-white mb-2 opacity-95 min-h-[50px] placeholder-black px-4"
            placeholder="Name"
            onChange$={handleStateChange}
            name="name"
            value={mailerState.name}
            maxLength={32}
          />
          <input
            class="w-full border-none rounded-md bg-white mb-2 opacity-95 min-h-[50px] placeholder-black px-4"
            placeholder="Email"
            onChange$={handleStateChange}
            name="email"
            value={mailerState.email}
            type="text"
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            required
          />
          <textarea
            class="w-full rounded-md bg-white mb-2 p-4 opacity-95 min-h-[120px] placeholder-black"
            placeholder="Message"
            onChange$={handleStateChange}
            name="message"
            value={mailerState.message}
            maxLength={140}
          />
          <div class="flex justify-center align-center pt-8">
            <button
              disabled={!mailerState.email || !mailerState.name}
              class={`flex items-center justify-center align-center border shadow bg-white hover:bg-slate-200 px-6 py-3 cursor-pointer rounded-md disabled:bg-slate-50  ${
                !isEmailSent.value && !isSendingEmail.value
                  ? "disabled:opacity-60"
                  : "disabled:opacity-100"
              } disabled:cursor-not-allowed`}
            >
              {isEmailSent.value ? (
                <img src={checkIcon} class="h-6 w-6" alt="Email sent" />
              ) : isSendingEmail.value ? (
                <img src={loadingIcon} class="h-6 w-6" alt="Sending email" />
              ) : (
                <img src={sendIcon} class="h-6 w-6" alt="Send email" />
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
