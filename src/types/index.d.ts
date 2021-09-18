import '@vue/test-utils'

declare module '@vue/test-utils' {
  interface VueWrapper {
    findByTestId(
      el: string,
      multiple?: boolean
    ): DOMWrapper<HTMLElementTagNameMap[K]>
  }
}
