import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MDXComponents } from 'mdx/types';

import CloudinaryVideoPlayer from '@/components/CloudinaryVideoPlayer';
import CollapsibleThink from '@/components/content/CollapsibleThink';
import DeepSeekPipeline from '@/components/content/blog/DeepSeekPipeline';
import Note from '@/components/Note';
import Quiz from '@/components/content/blog/Quiz';
import GithubCard from '@/components/content/card/GithubCard';
import InteractiveDiagram from '@/components/content/InteractiveDiagram';
import { Pre } from '@/components/content/Pre';
import SplitImage, { Split } from '@/components/content/SplitImage';
import TweetCard from '@/components/content/TweetCard';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import TechIcons from '@/components/TechIcons';

// Load dinamycally LiteYouTubeEmbed to avoid issues with ES modules/CommonJS
const LiteYouTubeEmbed = dynamic(
  () => import('react-lite-youtube-embed').then((mod) => mod.default),
  { ssr: false }
);

const components: MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  // code: CustomCode,
  CloudinaryImg,
  CloudinaryVideoPlayer,
  LiteYouTubeEmbed,
  SplitImage,
  Split,
  TechIcons,
  TweetCard,
  GithubCard,
  Quiz,
  Note,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full max-w-full overflow-x-auto rounded-xl border border-[#cbcfe0] dark:border-[#262f6e]'>
      <table {...props} className='w-full min-w-[540px]' />
    </div>
  ),
  DeepSeekPipeline,
  CollapsibleThink,
  InteractiveDiagram,
};

export default function useMDXComponents(): MDXComponents {
  return components;
} 
