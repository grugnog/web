// wasm mock feed
class FeedMock {
  #data: Map<string, Map<string, Record<string, unknown>>>
  open = false

  new() {
    this.#data = new Map()
  }

  insert_website(target) {
    const domain = target.domain ?? ''
    return this.#data.set(domain, target)
  }
  // get website page
  get_website({ domain, target }) {
    const item = this.#data.get(domain)
    return item?.get(target)
  }
  // get website
  get_data_item(domain) {
    return this.#data.get(domain)
  }
}

export const Feed = new FeedMock()
