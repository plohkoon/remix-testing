# Remix Testing

This is a repository designed to create and deploy a near identical Remix app to multiple deploy targets including

1. Cloudflare Pages
2. Cloudflare Workers
3. Fly.io
4. Architect (AWS Lambda)
5. Netlify
6. Vercel

## Seeding the database

At the root of the repository create a `.env` file with a mysql DATABASE_URL. The `.env` file's contents should look like

```env
DATABASE_URL='mysql://USERNAME:PASSWORD@HOST
```

## Development

The development occurs in the `dev` folder and scripts copy the code to the folders corresponding to the different deploy targets and update the imports.
