import '@vue/test-utils'

declare module '@vue/test-utils' {
  interface VueWrapper {
    findByTestId(el: string): DOMWrapper<HTMLElementTagNameMap[K]>
  }
}
