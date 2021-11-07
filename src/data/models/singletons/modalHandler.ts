export class ModalHandler {
  public onClose: Function | null = null

  bindOnClose = (onClose: Function) => {
    this.onClose = async () => {
      await onClose()
      this.clear()
    }
  }

  clear = () => {
    this.onClose = null
  }
}

export const dynamicModalHandler = new ModalHandler()
