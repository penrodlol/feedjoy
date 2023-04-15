# feedjoy

[![Netlify Status](https://api.netlify.com/api/v1/badges/af4929ae-4a1b-495e-a018-2c12848510c0/deploy-status)](https://app.netlify.com/sites/feedjoy/deploys)

[![Daily Job Status](https://github.com/penrodlol/feedjoy/actions/workflows/cron.yml/badge.svg)](https://github.com/penrodlol/feedjoy/actions/workflows/cron.yml)

<p>
  A minimal tech blog RSS feed congregator. Serving as a centralized proxy for blog posts I personally find valuable.
</p>

<p>
  On a daily basis, feedjoy fetches any new posts across the provided RSS feeds. Posts' content are then run through <a href="https://platform.openai.com/docs/guides/chat">OpenAI's API</a> to generate summaries.
</p>

- Built with [Astro](https://docs.astro.build).
- Hosted with [Netlify](https://netlify.com/docs).
- Styled with [Tailwind CSS](https://tailwindcss.com).
