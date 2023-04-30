# feedjoy

<p>
  A minimal tech blog RSS feed aggregator. Serving as a centralized proxy for blog posts I find valuable.
</p>

<p>
  On a daily basis, feedjoy fetches any new posts across the provided RSS feeds. Post contents are then run through <a href="https://platform.openai.com/docs/guides/chat">OpenAI's API</a> to generate summaries and identify technical topics.
</p>

- Built with [Next.js](https://nextjs.org/docs).
- Hosted with [Vercel](https://vercel.com/docs).
- Data with [Supabase](https://supabase.io/docs).
- Styled with [Tailwind CSS](https://tailwindcss.com/docs).
