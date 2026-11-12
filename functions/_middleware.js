// Une seule adresse officielle : www.electro-depannage-menager.com -> electro-depannage-menager.com
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === "www.electro-depannage-menager.com") {
    url.hostname = "electro-depannage-menager.com";
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
