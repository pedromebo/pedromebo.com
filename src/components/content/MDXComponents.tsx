import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MDXComponents } from 'mdx/types';

import CloudinaryVideoPlayer from '@/components/CloudinaryVideoPlayer';
import Quiz from '@/components/content/blog/Quiz';
import GithubCard from '@/components/content/card/GithubCard';
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
};

export default function useMDXComponents(): MDXComponents {
  return components;
} 
