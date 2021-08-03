interface Login {
  email: string
  password: string
}

interface Register {
  email: string
  password: string
  firstName: string
  lastName: string
}

declare module '@vue/test-utils' {
  interface VueWrapper {
    findByTestId(el: string): DOMWrapper<HTMLElementTagNameMap[K]>
  }
}
