import { Button, Typography, List, ListItem } from '@material-ui/core'
import { MarketingDrawer } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { companyName } from '@app/configs'

const Reqs = [
  'React',
  'Web Technology (html,css,js)',
  'Graphql',
  'Node.js',
  'Skilled at technical problem solving.',
  'Care for accessibility or willing to learn more.',
  'Must be able to communicate effectively and work with team members and members of other functional teams to coordinate and meet deliverables.',
  'Rust - nice to have some of our main services are built in it.',
  'BS in Technology or Related Field - nice to have but not needed.',
]
function Careers({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <Box>
        <Header>Careers</Header>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          style={{ fontWeight: 100 }}
        >
          Open Positions
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
          color={'inherit'}
          component={'a'}
          href={'https://forms.gle/SE9vErBoUwNDk91q7'}
        >
          Software Engineer
        </Typography>
        <Typography variant='subtitle2' component='p' gutterBottom>
          Required Skills:
        </Typography>
        <List>
          {Reqs.map((item: string) => {
            return (
              <ListItem key={item}>
                <Typography variant='subtitle1' component='p' gutterBottom>
                  - {item}
                </Typography>
              </ListItem>
            )
          })}
        </List>
        <Typography
          variant='body1'
          component='p'
          gutterBottom
          style={{ marginBottom: 20 }}
        >
          Currently we are not actively hiring.
        </Typography>
        <Button
          component='a'
          href={'https://forms.gle/SE9vErBoUwNDk91q7'}
          variant={'outlined'}
        >
          Apply Now
        </Button>
      </Box>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Careers },
  {
    description: `Want to improve ${companyName} and build cool web things? Open positions for the right person.`,
  }
)
