// determine the price for a plan
export const priceHandler = (plan: string) => {
  let price = 0
  let q = (plan && typeof plan === 'string' && plan.toUpperCase()) || ''

  switch (q) {
    case 'L1': {
      price = 1400
      break
    }
    case 'L2': {
      price = 2400
      break
    }
    case 'L3': {
      price = 4400
      break
    }
    case 'L4': {
      price = 5400
      break
    }
    case 'L5': {
      price = 8400
      break
    }
    // high
    case 'H1': {
      price = 9400
      break
    }
    case 'H2': {
      price = 13400
      break
    }
    case 'H3': {
      price = 19400
      break
    }
    case 'H4': {
      price = 33400
      break
    }
    case 'H5': {
      price = 54400
      break
    }

    default: {
      price = 0
      break
    }
  }

  return price
}

// determine the selected index of plan via plan name
export const getSelectedIndex = (plan: string) => {
  let index = 0
  let q = (plan && typeof plan === 'string' && plan.toUpperCase()) || ''

  switch (q) {
    case 'H1':
    case 'L1': {
      index = 0
      break
    }
    case 'H2':
    case 'L2': {
      index = 1
      break
    }
    case 'H3':
    case 'L3': {
      index = 2
      break
    }
    case 'H4':
    case 'L4': {
      index = 3
      break
    }
    case 'H5':
    case 'L5': {
      index = 4
      break
    }
    default: {
      index = 0
      break
    }
  }

  return index
}
