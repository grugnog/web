export const getErrorColor = (name: string) => {
  if (name === 'error') {
    return 'bg-red-500'
  }
  if (name === 'warning') {
    return 'bg-yellow-500'
  }
  return 'bg-gray-500'
}
