// determine account type off role
export const roleMap = (role?: number) => {
  let r = ''

  if (!role) {
    r = 'Free'
  } else if (role < 5) {
    r = `L${role - 1}`
  } else if (role > 5) {
    r = `H${role - 5}`
  }

  return r
}
