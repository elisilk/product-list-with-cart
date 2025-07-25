import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    /** @type {{ name: string, price: number, quantity: number, thumbnail: string }[]} */
    items: [],
    /** @type {'in-progress' | 'confirmed'} */
    status: 'in-progress',
  }),
  getters: {
    isEmpty(state) {
      return state.items.length === 0
    },
    isInProgress(state) {
      return state.status === 'in-progress'
    },
    getTotalItemCount(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    getTotalPrice(state) {
      return state.items.reduce((total, item) => total + item.quantity * item.price, 0)
    },
    isItemInCart: (state) => {
      return (itemName) => state.items.some((item) => item.name === itemName)
    },
    getItemCount: (state) => {
      return (itemName) => {
        const foundItem = state.items.find((item) => item.name === itemName)
        if (!foundItem) return 0
        return foundItem.quantity
      }
    },
  },
  actions: {
    addItem(name, price, thumbnail) {
      if (!this.isInProgress) return
      const index = this.items.findIndex((item) => item.name === name)
      if (index === -1)
        this.items.push({ name: name, price: price, quantity: 1, thumbnail: thumbnail })
      else this.items[index].quantity++
    },
    removeItem(name) {
      if (!this.isInProgress) return
      const index = this.items.findIndex((item) => item.name === name)
      if (index === -1) return
      this.items.splice(index, 1)
    },
    decrementItemQuantity(name) {
      if (!this.isInProgress) return
      const index = this.items.findIndex((item) => item.name === name)
      if (index === -1) return
      this.items[index].quantity--
      // If new quantity is zero, then remove the item entirely
      if (this.items[index].quantity === 0) this.items.splice(index, 1)
    },
    incrementItemQuantity(name) {
      if (!this.isInProgress) return
      const index = this.items.findIndex((item) => item.name === name)
      if (index === -1) return
      this.items[index].quantity++
      // If item not found, should we just add it? Don't have the price, through???
    },
  },
})
