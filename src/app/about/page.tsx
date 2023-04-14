import { Anchor, NextAnchor } from '@/ui/anchor';

export default function About() {
  return (
    <div className="mx-auto mt-fluid-6 flex max-w-screen-sm flex-col gap-fluid-2">
      <h1 className="mb-2 font-fancy -tracking-[0.1em] text-6xl">feedjoy</h1>
      <div className="h-1.5 w-full self-center rounded bg-2"></div>
      <div className="flex flex-col gap-4 leading-relaxed">
        <p>
          A minimal tech blog RSS feed congregator. Serving as a centralized
          proxy for blog posts I personally find valuable.
        </p>
        <p>
          On a daily basis, feedjoy fetches any new posts across the provided
          RSS feeds. Posts&apos; content are then run through{' '}
          <Anchor href="https://platform.openai.com/docs/guides/chat">
            OpenAI&apos;s API
          </Anchor>{' '}
          to generate summaries.
        </p>
        <p>
          All posts are archived under their respective sites and can be
          accessed via the{' '}
          <NextAnchor className="underline" href="/sites/page/1">
            sites
          </NextAnchor>{' '}
          page.
        </p>
      </div>
    </div>
  );
}
