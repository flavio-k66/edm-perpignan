// Une seule adresse officielle : www.edm66.fr -> edm66.fr
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === "www.edm66.fr") {
    url.hostname = "edm66.fr";
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
