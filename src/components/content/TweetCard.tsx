import clsx from 'clsx';
import * as React from 'react';
import { Tweet } from 'react-tweet';

type TweetCardProps = {
  className?: string;
  tweetId: string;
};

class TweetErrorBoundary extends React.Component<
  { tweetId: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { tweetId: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch() {}

  override render() {
    if (this.state.hasError) {
      return (
        <div className='my-4 rounded-xl border border-[#cbcfe0] dark:border-[#262f6e] bg-[#f8f9fc] dark:bg-[#0a0d24] p-4 text-center text-sm text-[#586094] dark:text-[#b6bddb]'>
          <p>No se pudo previsualizar el tweet.</p>
          <a
            href={`https://twitter.com/x/status/${this.props.tweetId}`}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-2 inline-block font-mono text-xs font-semibold text-[#596dff] dark:text-[#00f5d4] hover:underline'
          >
            Ver tweet en X (Twitter) →
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function TweetCard({ tweetId, className }: TweetCardProps) {
  return (
    <div className={clsx('not-prose flex justify-center', className)}>
      <TweetErrorBoundary tweetId={tweetId}>
        <Tweet id={tweetId} />
      </TweetErrorBoundary>
    </div>
  );
}
