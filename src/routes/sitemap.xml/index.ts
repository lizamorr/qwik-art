import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ send, headers }) => {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>http://www.lizamorrisonart.com/</loc>
    </url>
    <url>
        <loc>http://www.lizamorrisonart.com/gallery/</loc>
    </url>
    <url>
        <loc>http://www.lizamorrisonart.com/contact/</loc>
    </url>
    <url>
        <loc>http://www.lizamorrisonart.com/about/</loc>
    </url>
    </urlset>`;

  headers.set("Content-Type", "text/xml");
  send(200, content);
};
