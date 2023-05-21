export interface IBudget {
  quantity: string
  products: {
    name: string
    installment: string
    amount: string
    category: string
  }
}
