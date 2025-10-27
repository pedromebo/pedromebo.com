import clsx from 'clsx';
import * as React from 'react';
import { Tweet } from 'react-tweet';

type TweetCardProps = {
  className?: string;
  tweetId: string;
};

export default function TweetCard({ tweetId, className }: TweetCardProps) {
  return (
    <div className={clsx('not-prose flex justify-center', className)}>
      <Tweet id={tweetId} />
    </div>
  );
}
