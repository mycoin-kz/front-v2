export const generateHeadMeta = (
  title: string,
  description = "Get Crypto Sginals on MyCoin.kz",
  image?: string,
  robots = true
) => ({
  title: title + " • MyCoin.kz",
  meta: [
    { name: "application-name", content: "MyCoin.kz" },
    {
      name: "title",
      content: title + " • MyCoin.kz",
    },
    {
      name: "description",
      content: description,
      id: "desc",
    },
    {
      name: "robots",
      content: robots ? "index, follow" : "noindex, nofollow",
    },
    // Twitter
    {
      name: "twitter:title",
      content: title + " • MyCoin.kz",
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:card",
      content: image ?? "public/favicon.ico",
    },
    {
      name: "twitter:image",
      content: image ?? "public/favicon.ico",
    },
    // Google+ / Schema.org
    { itemprop: "name", content: title + " • MyCoin.kz" },
    { itemprop: "description", content: description },
    // Facebook / Open Graph
    { property: "fb:app_id", content: title + " • MyCoin.kz" },
    { property: "og:title", content: title + " • MyCoin.kz" },
    { property: "og:description", content: description },

    {
      property: "og:image",
      content: image ?? "public/favicon.ico",
    },
  ],
});
