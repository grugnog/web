export function domInteractive() {
  try {
    if ('performance' in window) {
      const perfEntries = performance?.getEntriesByType('navigation')
      // @ts-ignore
      return perfEntries?.length ? perfEntries[0]['domInteractive'] || 0 : 0
    }
    return 0
  } catch (e) {
    console.error(e)
    return 0
  }
}
