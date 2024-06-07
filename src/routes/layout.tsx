import { Slot, component$ } from "@builder.io/qwik";

import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import { LoadingPage } from "../components/loading-page";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const { isNavigating } = useLocation();

  return isNavigating ? (
    <LoadingPage />
  ) : (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <Footer />
    </>
  );
});
