import { metaSetter } from '@app/utils/meta-setter'
import { getBlogPage } from '@app/lib/get-blog'
import { BlogPage } from '@app/components/blog/blog-page'
import type { BlogPageProps } from '@app/types'
import type { GetStaticProps } from 'next'
import { DOMAIN_NAME } from '@app/configs'
import { blogPaths } from '@app/data/static/blog-paths'

function Blog(props: BlogPageProps) {
  return <BlogPage {...props} />
}

export async function getStaticPaths() {
  return {
    paths: DOMAIN_NAME === 'https://a11ywatch.com' ? blogPaths : [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params ?? {}
  const websiteUrl = Array.isArray(slug) ? slug : []
  let props = {}

  try {
    props = await getBlogPage(websiteUrl.join('/'))
  } catch (e) {
    console.error(e)
  }

  return {
    props,
    revalidate: 3600 * 12, // every 12 hours
  }
}

export default metaSetter(
  { Blog },
  {
    gql: false,
  }
)
