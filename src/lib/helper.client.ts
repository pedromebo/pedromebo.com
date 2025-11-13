export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
  banner?: string;
  isBlog?: boolean;
  tags?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  banner,
  logo = 'https://res.cloudinary.com/pedromebo/image/upload/c_pad,g_center,w_1200,h_630,b_white/v1725804553/logo.png',
  isBlog = false,
  tags,
}: OpenGraphType): string {
  const ogLogo = logo.trim();
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  if (banner) {
    const ogTags = tags ? encodeURIComponent(tags.trim()) : undefined;
    const ogBanner = banner.trim();

    return `${ogBanner}?siteName=${ogSiteName}&description=${ogDesc}&templateTitle=${ogTemplateTitle}${
      ogTags ? `&tags=${ogTags}` : ''
    }`;
  }

  return `${ogLogo}?siteName=${ogSiteName}&description=${ogDesc}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

/**
 * Remove `en-` prefix
 */
export const cleanPagePrefix = (slug: string) => {
  if (slug.slice(0, 3) === 'en-') {
    return slug.slice(3);
  } else {
    return slug;
  }
};

/**
 * Access session storage on browser
 */
export function getFromSessionStorage(key: string) {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function getFromLocalStorage(key: string) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}
