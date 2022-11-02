import { metaSetter } from '@app/utils/meta-setter'
import { getBlogPage } from '@app/lib/get-blog'
import { WordPressPage } from '@app/components/blog/wordpress-page'
import type { BlogPageProps } from '@app/types'
import type { GetStaticProps } from 'next'

function Blog(props: BlogPageProps) {
  return <WordPressPage {...props} />
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
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
    revalidate: 3600 * 4, // every 4 hours
  }
}

export default metaSetter(
  { Blog },
  {
    gql: false,
  }
)
