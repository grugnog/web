type ExcludeProps = {
  pathname: string
  pageName?: string
  url: string
}

const isWhitelisted = ({ pathname, pageName, url }: ExcludeProps) => {
  return (
    url.startsWith('/img/') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/api/') ||
    url.endsWith('.js') ||
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
    url.endsWith('.xml') ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pageName === '/_offline'
  )
}

export { isWhitelisted }
