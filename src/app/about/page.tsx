import Separator from '@/ui/separator';

export default function Page() {
  return (
    <div className="mx-auto mt-fluid-6 flex max-w-screen-md flex-col gap-10">
      <section>
        <h1 className="text-8xl tracking-widest text-fancy">FEEDJOY</h1>
        <h2 className="text-lg tracking-wider text-2">a minimal RSS feed aggregator</h2>
      </section>
      <Separator />
      <section className="flex flex-col gap-6 text-sm !leading-8 text-2">
        <p>
          feedjoy aggregates blog posts from multiple RSS feeds into a single source. Its goal is to
          provide a more efficient way of tracking new posts without having to subscribe to multiple
          newsletters.
        </p>
        <p>
          On a daily basis, feedjoy will fetch any new posts across the list of provided RSS feeds
          <em className="whitespace-nowrap px-1 text-xs">(maintained internally)</em>. These new
          posts are then passed through GPT to generate a short summary and identify the most
          relevant topic. The goal here is to identify trends and quickly consume content without
          having to navigate externally.
        </p>
      </section>
    </div>
  );
}
