export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || []
}

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const addToCart = (product) => {

  let cart = getCart()

  const existing = cart.find(item => item.id === product.id)

  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ ...product, qty: 1 })
  }

  saveCart(cart)
}

export const increaseQty = (id) => {

  let cart = getCart()

  cart = cart.map(item =>
    item.id === id ? { ...item, qty: item.qty + 1 } : item
  )

  saveCart(cart)

  return cart
}

export const decreaseQty = (id) => {

  let cart = getCart()

  cart = cart.map(item =>
    item.id === id ? { ...item, qty: item.qty - 1 } : item
  )

  cart = cart.filter(item => item.qty > 0)

  saveCart(cart)

  return cart
}

export const removeItem = (id) => {

  let cart = getCart()

  cart = cart.filter(item => item.id !== id)

  saveCart(cart)

  return cart
}