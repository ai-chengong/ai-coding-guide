# coding.aichengong.com custom-domain edge

`coding.aichengong.com` uses a versioned Cloudflare Worker Custom Domain that runs the same vinext build artifact as the public OpenAI Sites preview.

## Responsibilities

- Markdown and repository source remain the content truth.
- OpenAI Sites remains the public preview and rollback surface.
- The production Worker serves `dist/server` and `dist/client` directly, avoiding a second network hop and origin security coupling.
- Cloudflare Custom Domains owns the `coding.aichengong.com` DNS record and TLS certificate.
- Canonical URLs, sitemap, robots, search index, and article content continue to identify `https://coding.aichengong.com`.

This runtime exists because the available Wrangler OAuth session can manage Workers and Custom Domains but cannot edit arbitrary zone DNS records. Cloudflare Custom Domains creates the required DNS record and certificate as one managed operation, without storing an API key in this repository.

## Deploy and verify

```bash
npm run test:domain-edge
npm run deploy:production
dig +short coding.aichengong.com
curl -sSIL https://coding.aichengong.com/
```

The deployment command rebuilds the course before publishing the generated vinext server and client assets. After deployment, verify representative articles, discovery endpoints, certificate SANs, canonical metadata, images, and unauthenticated access. The Sites preview stays public under its generated hostname; any unused pending Sites custom-domain attachment should be removed so there is one authoritative production routing path.

## Direct-Sites migration

The production Worker can be replaced later without changing course content. First add the exact CNAME and TXT records returned by Sites, wait for Sites routing and TLS to become active, then remove the Cloudflare Worker Custom Domain. Never operate both hostname owners as if they were authoritative simultaneously.
