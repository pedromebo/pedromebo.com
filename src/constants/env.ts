import { getFromLocalStorage } from '@/lib/helper.client';

export const isProd = process.env.NODE_ENV === 'production';

/**
 * Get content meta from the database
 * @see useContentMeta.tsx
 */
export const contentMetaFlag =
  isProd || process.env.NEXT_PUBLIC_FLAG_CONTENT_META === 'true';

/**
 * Open API access to newsletter provider (subscribe and view count)
 * @see SubscribeCard.tsx
 */
export const newsletterFlag =
  isProd || process.env.NEXT_PUBLIC_FLAG_NEWSLETTER === 'true';

/**
 * Only increase count when in specified domain meta
 * @see _app.tsx
 */
export const blockDomainMeta =
  isProd || process.env.NEXT_PUBLIC_META_BLOCK_DOMAIN === 'true';
