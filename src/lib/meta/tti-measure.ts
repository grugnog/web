const measureCRP = (): number => {
  if (typeof window !== 'undefined') {
    const t = window.performance?.timing || { domComplete: 0, domLoading: 0 }

    return t.domComplete - t.domLoading
  }
  return 0
}

export { measureCRP }
