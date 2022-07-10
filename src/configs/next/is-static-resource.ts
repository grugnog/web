type ExcludeProps = {
  pathname: string
  pageName?: string
  url: string
}

const isWhitelisted = ({ pathname, url }: ExcludeProps) => {
  return (
    [
      '/api/iframe',
      '/_next/image',
      '/js/gql/middleware.js.map',
      '/img/',
      '/en',
      '/home',
    ].includes(pathname) ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/api/') ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pathname === '/_offline' ||
    url.endsWith('.js') ||
    url.endsWith('.html') ||
    url.endsWith('.svg') ||
    url.endsWith('.webp') ||
    url.endsWith('.wasm') ||
    url.endsWith('.css') ||
    url.endsWith('.mp4') ||
    url.endsWith('.mp3') ||
    url.endsWith('.ico') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.xml')
  )
}

export { isWhitelisted }
