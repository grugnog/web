type ExcludeProps = {
  pathname: string
  pageName?: string
  url: string
}

const isWhitelisted = ({ pathname, pageName, url }: ExcludeProps) => {
  return (
    pathname.includes('.') ||
    url.startsWith('/static/') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/api/') ||
    pathname.endsWith('/sw.js') ||
    url.endsWith('.svg') ||
    url.endsWith('.webp') ||
    url.endsWith('.wasm') ||
    pathname === '/robots.txt' ||
    pageName === '/_offline'
  )
}

export { isWhitelisted }
