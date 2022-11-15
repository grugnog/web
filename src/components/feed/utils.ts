// get dynamic list height
export const getListHeight = ({
  fullScreen,
  issueCount = 0,
}: {
  fullScreen?: boolean
  issueCount: number
}) => {
  // full height of screen for window
  const list = typeof window !== 'undefined' ? window.innerHeight : 500
  const size = Math.max(list / 6, 200) // try to fit 6 items per screen viewport

  let height = 0

  if (fullScreen) {
    height = list
  } else if (issueCount <= 4) {
    height = size * issueCount
  } else {
    height = list / 2
  }

  return { size, height }
}
