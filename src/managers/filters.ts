import { observable, action, computed } from 'mobx'

export interface FilterItem {
  checked?: boolean
}

class FilterManager {
  @observable
  visible = false

  filters = observable<string, FilterItem>(new Map())

  @action
  toggleVisibility = () => {
    this.visible = !this.visible
  }

  @action clearFilters = () => {
    this.filters.clear()
  }

  @action
  addFilter = (item: string) => {
    if (!this.filters.has(item)) {
      this.filters.set(item, { checked: false })
    }
  }

  @action
  toggleFilter = (item: string) => {
    if (this.filters.has(item)) {
      const findItem = this.filters.get(item)

      if (findItem) {
        findItem.checked = !findItem.checked
      }
    }
  }

  @computed
  get filterList() {
    return [...this.filters.keys()]
  }
}

const manager = new FilterManager()

export { manager as FilterManager }
