import { buildUrl } from 'cloudinary-build-url';
import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

type CloudinaryImgType = {
  publicId: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  noStyle?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
  mdx?: boolean;
} & React.ComponentPropsWithoutRef<'figure'>;

export default function CloudinaryImg({
  publicId,
  height,
  width,
  alt,
  title,
  className,
  noStyle = false,
  mdx = false,
  style,
  aspect,
  ...rest
}: CloudinaryImgType) {
  const isDirectUrl = publicId.startsWith('/') || publicId.startsWith('http');

  const urlBlurred = isDirectUrl
    ? publicId
    : buildUrl(publicId, {
        cloud: {
          cloudName: 'pedromebo',
        },
        transformations: {
          effect: {
            name: 'blur:200',
          },
          quality: 1,
          rawTransformation: aspect
            ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
            : undefined,
        },
      });

  const url = isDirectUrl
    ? publicId
    : buildUrl(publicId, {
        cloud: {
          cloudName: 'pedromebo',
        },
        transformations: {
          rawTransformation: aspect
            ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
            : undefined,
        },
      });

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  const RESIZE_MAX_WIDTH = 1000;
  const resizedToMaxWidth = mdx && +width >= RESIZE_MAX_WIDTH;

  return (
    <figure
      className={clsx(className, {
        'overflow-hidden rounded shadow dark:shadow-none': !noStyle,
        'mx-auto w-full': mdx && +width <= 800,
      })}
      style={{
        ...(mdx && +width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
        }}
        className='img-blur overflow-hidden'
      >
        <style jsx>{`
          .img-blur::before {
            content: '';
            position: absolute;
            inset: 0;
            filter: blur(20px);
            z-index: 0;
            background-image: url(${urlBlurred});
            background-position: center center;
            background-size: cover;
          }
        `}</style>
        <div className='absolute inset-0 z-[1] h-full w-full'>
          <Image
            fill
            className='h-full w-full object-cover'
            unoptimized
            src={url}
            alt={alt}
            title={title || alt}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>
    </figure>
  );
}
