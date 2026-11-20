// Invoked only when a request does NOT exactly match a static file.
// Replicates GitHub Pages behaviour while keeping the ".html" URLs used in
// canonicals and sitemap.xml.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.mayinab.com") {
      url.hostname = "mayinab.com";
      return Response.redirect(url.toString(), 301);
    }
    const path = url.pathname;
    const asset = (p) => env.ASSETS.fetch(new Request(new URL(p, url), request));

    if (path.endsWith("/")) {
      // "/" -> /index.html, "/blog/" -> /blog/index.html
      const res = await asset(path + "index.html");
      if (res.status !== 404) return res;
    } else if (!/\.[a-z0-9]+$/i.test(path)) {
      // Extensionless URL: "/contact" -> 301 "/contact.html", "/blog" -> 301 "/blog/"
      const target = (await asset(path + ".html")).ok
        ? path + ".html"
        : (await asset(path + "/index.html")).ok
          ? path + "/"
          : null;
      if (target) return Response.redirect(url.origin + target + url.search, 301);
    }

    const notFound = await env.ASSETS.fetch(new URL("/404.html", url));
    return new Response(notFound.body, { status: 404, headers: notFound.headers });
  },
};
