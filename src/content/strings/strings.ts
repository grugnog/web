export const generateStrings = ({
  appName,
  headers,
  meta,
}: {
  appName: string
  headers?: any
  meta: { title?: string; description?: string }
}) => {
  return {
    appName,
    headers,
    meta,
    title: 'Web Accessibility',
    monitoring: 'Monitoring',
    consulting: 'Web Accessibility Consultants',
    fixer: 'Remedy',
    helper: 'Helper',
    watcher: 'Insight',
    ai: 'Monitor',
    productivity: 'Productivity',
    ctaDetails: 'Everything you need to improve your websites accessibility',
    ctaInfo:
      'Improve your accessibility with our a11y monitor, helper and fixer powered by AI.',
    ctaTryOut: 'Try A11yWatch for free',
    ctaSeeHowItWorks: 'See How It Works',
    customers: 'Get reports, monitoring, and core web vitals',
    usersUsing: 'Used on here',
    customersWhy:
      'Get live results on any website like Twitter, Github, and Dropbox.',
    testimonials: [
      {
        title:
          'A11yWatch is lightning fast. Build designs that bring accessibility in mind before and after deployment. Always stay up to date with the latest issues as they arise.',
        who: 'Gilbert Bagaoisan, Head of Design at ZeeMee',
      },
    ],
    features: [
      {
        id: 0,
        title: 'On-Demand',
        detail:
          'Target WCAG issues spot on helping to figure out problems at hand. View detailed reports and vitals on your website.',
        reason: 'Stop waisting time with figuring out what your ada issues are',
      },
      {
        id: 1,
        title: 'Alerts',
        detail:
          'Get notified when issues occur so you can take action immediately. Control the days of the week you want to get alerted.',
        reason: 'Basic',
      },
      {
        id: 2,
        title: 'Recommendations',
        detail:
          'Get tips on how to improve your app so all users have a pleasant experience. Bring accessibility changes into production safer.',
        reason: 'Basic',
      },
      {
        id: 3,
        title: 'Cloud',
        detail:
          'Add a CDN script that mitigates drastic issues for your users easily. If you accidently deploy an issue to act like a safeguard.',
        reason: 'Basic',
        icon: 'accessibility',
      },
      {
        id: 4,
        title: 'API',
        detail:
          'Connect your software to handle issues via our API. Choose between REST, GraphQL, and gRPC to enhance your productivity.',
        reason: 'Basic',
      },
      {
        id: 5,
        title: 'Live Viewer',
        detail:
          'View the issues in the browser and experiment with fixes in real time. Adjust colors and accessibility properties to leverage productivity.',
        reason: 'Basic',
      },
      {
        id: 6,
        title: 'AI',
        detail:
          'With AI and machine learning we tailor custom needs for your website rapidly. Determine missing alts with high proximity ratios, css style issues, and more.',
        reason: 'Basic',
      },
      {
        id: 7,
        title: '100% Open-Source',
        detail:
          'Every line of code to power this project is fully open-source and available on GitHub. Easily fork the project and run on your own server with docker.',
        reason: 'Basic',
      },
    ],
    alerts: {
      enableNotificationsTitle: 'Would you like to enable notifications?',
      enableNotificationsDetail: `Enabling notifications can help you get alerted instantly as new issues occur.
	Save time by doing the things you care about and allow us to notify you when critical errors arise. 
	You can always disable and enable this in your browser settings.`,
      notNow: 'Not Now',
      yes: 'Yes',
      okay: 'Okay',
    },
    onboarding: {
      limitEmailsTitle:
        'Did you know you can limit the amount of emails you get from us?',
      limitEmailsDetail:
        'You can modify which days of the week you receive emails by going to alerts page and making the appropriate selections.',
    },
    getSupport: 'Get Professional Support',
    trySearch: 'Free website accessibility scan',
    tryOutCdn: 'after sign in.',
    subTitle: 'Elevating accessibility for every website',
  }
}
