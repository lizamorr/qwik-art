import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { component$, useStyles$ } from "@builder.io/qwik";

import { RouterHead } from "./components/router-head/router-head";
import globalStyles from "./global.scss?inline";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Jost&display=swap"
        />
        <link
          rel="preload"
          href="/src/routes/gallery/images/switzerland-min.webp"
          as="image"
        ></link>
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
