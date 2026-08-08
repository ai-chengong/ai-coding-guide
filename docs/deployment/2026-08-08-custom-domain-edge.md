# coding.aichengong.com custom-domain edge

`coding.aichengong.com` uses a deliberately small Cloudflare Worker Custom Domain in front of the public OpenAI Sites deployment.

## Responsibilities

- OpenAI Sites remains the content host and deployment truth.
- `infra/domain-edge/worker.mjs` maps every fixed-path request to the public Sites origin.
- Cloudflare Custom Domains owns the `coding.aichengong.com` DNS record and TLS certificate.
- Canonical URLs, sitemap, robots, search index, and article content continue to identify `https://coding.aichengong.com`.

This edge exists because the available Wrangler OAuth session can manage Workers and Custom Domains but cannot edit arbitrary zone DNS records. Cloudflare Custom Domains creates the required DNS record and certificate as one managed operation, without storing an API key in this repository.

## Deploy and verify

```bash
npm run test:domain-edge
npm run deploy:domain-edge
dig +short coding.aichengong.com
curl -sSIL https://coding.aichengong.com/
```

After deployment, verify representative articles, discovery endpoints, certificate SANs, canonical metadata, images, and unauthenticated access. The unused pending Sites custom-domain attachment should then be removed so there is one authoritative routing path.

## Direct-Sites migration

The edge can be removed later without changing course content. First add the exact CNAME and TXT records returned by Sites, wait for Sites routing and TLS to become active, then remove the Cloudflare Worker Custom Domain. Never operate both hostname owners as if they were authoritative simultaneously.
