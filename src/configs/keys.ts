const PUBLIC_KEY =
  process.env.PUBLIC_KEY &&
  String(process.env.PUBLIC_KEY).replace(/\\n/gm, '\n')

const PRIVATE_KEY =
  process.env.PRIVATE_KEY &&
  String(process.env.PRIVATE_KEY).replace(/\\n/gm, '\n')

export { PRIVATE_KEY, PUBLIC_KEY }
