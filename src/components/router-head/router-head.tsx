import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const { url } = useLocation();

  const title = head.title ? `${head.title}` : `Liza Morrison Art`;
  const description =
    head.meta.find((m) => m.name === "description")?.content ||
    `Drawings, paintings, digital art, and other works over the years by Liza Morrison 🎨`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#fff" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-title" content={title} />

      <meta property="og:site_name" content={title} />
      <meta name="twitter:site" content={title} />
      <meta name="twitter:title" content={title} />

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
