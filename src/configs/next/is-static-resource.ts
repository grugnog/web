type ExcludeProps = {
  pathname: string
  pageName?: string
  url: string
}

const isWhitelisted = ({ pathname, pageName, url }: ExcludeProps) => {
  return (
    url.includes('/static/') ||
    pathname.includes('.') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/workbox-') ||
    pathname.startsWith('/api/') ||
    pathname.includes('/sw.js') ||
    pathname === '/robots.txt' ||
    pageName === '/_offline'
  )
}

export { isWhitelisted }
