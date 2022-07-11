type ExcludeProps = {
  pathname: string
  pageName?: string
  url: string
}

const isWhitelisted = ({ pathname, url }: ExcludeProps) => {
  return (
    [
      /// nextjs excludes
      '/_next/image',
      '/js/gql/middleware.js.map',
      '/img/',
      '/en',
      '/home',
    ].includes(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/backup/') ||
    pathname.startsWith('/backups/') ||
    pathname.startsWith('/bak/') ||
    pathname.startsWith('/restore/') ||
    pathname.startsWith('/old/') ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/src/') ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pathname === '/_offline' ||
    url.endsWith('.js') ||
    url.endsWith('.html') ||
    url.endsWith('.svg') ||
    url.endsWith('.webp') ||
    url.endsWith('.wasm') ||
    url.endsWith('.css') ||
    url.endsWith('.tar') ||
    url.endsWith('.mp4') ||
    url.endsWith('.sql') ||
    url.endsWith('.rar') ||
    url.endsWith('.mp3') ||
    url.endsWith('.ico') ||
    url.endsWith('.zip') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.xml')
  )
}

export { isWhitelisted }
