# Google Search Console MCP (Cursor)

Read-only access to **taxirabatairoport.com** Search Console data from Cursor Agent.

```
Cursor Agent → MCP Server (uvx) → Google Search Console API → your property
```

Config is already in [`.cursor/mcp.json`](mcp.json).

## Step 1 — Google Cloud (one time, ~5 min)

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (e.g. `taxirabatairoport-mcp`)
3. **APIs & Services → Library** → enable **Google Search Console API**
4. **APIs & Services → OAuth consent screen**
   - User type: **External** (or Internal if Workspace)
   - Add your Gmail as a test user
5. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Desktop app**
   - Download the JSON file

## Step 2 — Save OAuth client JSON

```bash
mkdir -p ~/.config/mcp-google-search-console
# Replace with your downloaded file path:
cp ~/Downloads/client_secret_*.json ~/.config/mcp-google-search-console/oauth_credentials.json
```

Never commit this file.

## Step 3 — Authorize (browser, one time)

```bash
uvx mcp-google-search-console auth
```

- Browser opens → sign in with the Google account that has access to Search Console
- Allow read-only access
- Token is saved to `~/.config/mcp-google-search-console/token.json`

## Step 4 — Enable in Cursor

1. **Restart Cursor** (or reload window)
2. **Settings → MCP** → confirm `google-search-console` is listed and **enabled** (green)
3. If it shows red, click **View logs** — usually missing Step 2 or 3

## Step 5 — Try it in Agent chat

Use the property URL exactly as in Search Console:

```
https://taxirabatairoport.com/
```

### Example prompts

```
List my Search Console properties.
```

```
Show top 30 queries for https://taxirabatairoport.com/ in the last 28 days.
```

```
Which pages have impressions but zero clicks in the last 7 days?
```

```
Inspect indexing status for https://taxirabatairoport.com/taxi-rabat-aeroport/
```

```
Generate an SEO audit HTML report for https://taxirabatairoport.com/ for the last 28 days.
```

## Available tools (read-only)

| Tool | Use |
|------|-----|
| `gsc_sites` | List verified properties |
| `gsc_query` | Queries, pages, countries, devices by dimension |
| `gsc_performance_overview` | Clicks, impressions, CTR, position |
| `gsc_inspect_url` | URL inspection (indexing, mobile, rich results) |
| `gsc_sitemaps` | Submitted sitemaps |
| `gsc_audit` | Full HTML audit → `~/gsc-reports/` |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| MCP red in Cursor | Run `uvx mcp-google-search-console auth` again |
| 401 Unauthorized | Delete `~/.config/mcp-google-search-console/token.json` and re-auth |
| Property not found | Use `https://taxirabatairoport.com/` or `sc-domain:taxirabatairoport.com` |
| `uvx` not found | `brew install uv` |

## Security

- Scope is **webmasters.readonly** — cannot delete data or change settings
- Keep `oauth_credentials.json` and `token.json` out of git
