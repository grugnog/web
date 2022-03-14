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
    customers: 'Get accessibility, performance, and UX insights on demand',
    usersUsing: 'Used on here',
    customersWhy:
      'See live results on a well known website like Twitter, Github, and Dropbox below.',
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
          'Target WCAG issues spot on helping to figure out problems at hand. View detailed reports and vitals on your website indefinitely.',
        reason: 'Stop waisting time with figuring out what your ada issues are',
      },
      {
        id: 1,
        title: 'Alerts',
        detail:
          'Get notified when issues occur so you can take action immediately. Control the days of the week you want to get alerted for reports.',
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
        title: 'Patches',
        detail:
          'Get custom web accessibility fixes that you can include directly in your website pain free tailored to your content with full uptime.',
        reason: 'Basic',
      },
      {
        id: 4,
        title: 'Cloud',
        detail:
          'Add a CDN script that mitigates drastic issues for your users easily. If you accidently deploy dark text on a dark background and etc.',
        reason: 'Basic',
        icon: 'accessibility',
      },
      {
        id: 5,
        title: 'Speed Test',
        detail:
          'Test how your website does with performance and other metrics. See the comparisons against your other pages to see how to improve.',
        reason: 'Basic',
      },
      {
        id: 6,
        title: 'Secure',
        detail:
          'View your scripts with precision before you include them. Control what domains get access to your CDN to bring security in at will.',
        reason: 'Basic',
      },
      {
        id: 7,
        title: 'Simple',
        detail:
          'Just drop in one line of code and your now all your pages are handled. Works really well with frameworks like React, Angular, Svelte, and Vue.',
        reason: 'Basic',
      },
      {
        id: 8,
        title: 'Live Viewer',
        detail:
          'View the issues in the browser and experiment with fixes in real time. Adjust colors and a11y properties to leverage productivity.',
        reason: 'Basic',
      },
      {
        id: 9,
        title: 'AI',
        detail:
          'With AI and machine learning we tailor custom needs for your website rapidly. Determine missing alts with high proximity ratios, css style issues, and more.',
        reason: 'Basic',
      },
      {
        id: 10,
        title: 'Lighthouse',
        detail:
          'Get Lighthouse metrics by google on all of your pages at once. Get rapid results utilizing the power of our lightning fast crawler.',
        reason: 'Basic',
      },
      {
        id: 11,
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
        'You can modify which days of the week you receive emails by going to the alerts page and making the appropriate selections.',
    },
    getSupport: 'Get Professional Support',
    trySearch: 'Free website accessibility scan',
    tryOutCdn:
      'after sign in. Get your secure custom cdn script and insert it at the end of your html body',
    subTitle: 'Elevating accessibility for every website',
  }
}
