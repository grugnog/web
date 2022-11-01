import { Typography, List, ListItem } from '@material-ui/core'
import { Mailto, MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import { theme } from '@app-theme'
import type { PageProps } from '@app/types'
import {
  Header,
  Header2,
  Header3,
  Header4,
  Header5,
} from '@app/components/general/header'
import { SectionContainer } from '@app/app/containers/section-container'

const linkStyle = {
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  fontWeight: 600,
}

function Faq({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>Frequently Asked Questions</Header>
        <Typography variant='body1' component='p' gutterBottom>
          Stuck on a certain problem? Check some of these common gotchas first
          in the FAQ.
        </Typography>

        <Typography variant='body2' component='p' gutterBottom>
          If you still need help go to the support page
        </Typography>
        <Header2>How can I support the project?</Header2>
        <Typography variant='body1'>
          {strings.appName} allows multiple ways of contributing to the project.
          You can send BTC to the following address:{' '}
          <strong>3EBwSQdPc43CFg8YGBRy3hj9ubihbnPEKv</strong>.
        </Typography>

        <Header3>How many websites can I monitor?</Header3>
        <Typography variant='body1'>
          Free accounts can add one domain, all paid accounts get up to 50
          domains.
        </Typography>

        <Header4>Can I upgrade or downgrade anytime I want?</Header4>
        <Typography variant='body1'>
          Yes, upgrade and downgrades take effect immediately.
        </Typography>

        <Header5>How can I sign up as a company?</Header5>
        <Typography variant='body1'>
          You have two main options for joining on A11yWatch as a company, brand
          or organization. Sign up from a regular user account under your
          organization{`'s`} email. You can treat the general account as the
          main account for your company. The safest way to share account access
          is through the google sign on method.
        </Typography>
      </SectionContainer>

      <List aria-label={`support ${strings.appName}`} dense className='border'>
        <ListItem>
          <Typography variant='subtitle1' component='p'>
            Spread the word and evangelize {strings.appName}{' '}
            <Typography
              component={'a'}
              target='_blank'
              style={linkStyle}
              href={'https://a11ywatch.com'}
            >
              linking to a11ywatch.com
            </Typography>{' '}
            on your website, every backlink matters. Follow us on{' '}
            <Typography
              component={'a'}
              target='_blank'
              style={linkStyle}
              href={'https://www.twitter.com/a11ywatcher'}
            >
              Twitter
            </Typography>
            , like and retweet the important news. Or just talk about us with
            your friends.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle1' component='p'>
            <b>Give us feedback.</b> Tell us what {`we're`} doing well or where
            we can improve. Please upvote (👍) the issues that you are the most
            interested in seeing solved.
          </Typography>
        </ListItem>
      </List>

      <div className='py-6 text-lg'>
        <div>If you have any questions, please contact us at </div>
        <Mailto
          email='support@a11ywatch.com'
          subject='TOS'
          body='Hello, Support Team'
        >
          support@a11ywatch.com
        </Mailto>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Faq },
  {
    description:
      'Get answers to frequently asked questions on A11yWatch plans and pricing. Teams use A11yWatch to fix, monitor, and guide web accessibility in one place.',
  }
)
