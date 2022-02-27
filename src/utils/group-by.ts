// SHOULD only use for dynamic client changes. TODO: move filter group to ss
export const groupBy = (key: any) => (array: any[]) =>
  array.reduce((kv: any, obj: any) => {
    const value = obj[key]
    kv[value] = (kv[value] || []).concat(obj)
    return kv
  }, {})
