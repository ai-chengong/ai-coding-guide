const SITES_ORIGIN = "https://coding-aichengong.freya-czy.chatgpt.site";
const PUBLIC_ORIGIN = "https://coding.aichengong.com";

export function buildUpstreamUrl(requestUrl) {
  const incoming = new URL(requestUrl);
  const upstream = new URL(SITES_ORIGIN);
  upstream.pathname = incoming.pathname;
  upstream.search = incoming.search;
  return upstream;
}

export function rewriteLocation(location, upstreamUrl) {
  if (!location) return null;

  const resolved = new URL(location, upstreamUrl);
  if (resolved.origin !== SITES_ORIGIN) return resolved.toString();

  const publicUrl = new URL(PUBLIC_ORIGIN);
  publicUrl.pathname = resolved.pathname;
  publicUrl.search = resolved.search;
  publicUrl.hash = resolved.hash;
  return publicUrl.toString();
}

const domainEdge = {
  async fetch(request) {
    const upstreamUrl = buildUpstreamUrl(request.url);
    const upstreamRequest = new Request(upstreamUrl, request);
    const upstreamResponse = await fetch(upstreamRequest);
    const headers = new Headers(upstreamResponse.headers);
    const location = rewriteLocation(headers.get("location"), upstreamUrl);

    if (location) headers.set("location", location);

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  },
};

export default domainEdge;
