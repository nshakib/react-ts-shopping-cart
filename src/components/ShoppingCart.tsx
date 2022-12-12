import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrencies } from '../utilities/FormatCurrency'
import storeItems from '../data/Items.json'
import CartItem from './CartItem'

type ShoppingCartProps = {
    isOpen : boolean
    //loseCart?: JSX.Element|JSX.Element[];
}
const ShoppingCart = ({isOpen}: ShoppingCartProps) => {
    const  {closeCart, cartItems}  = useShoppingCart()

  return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Shopping cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Stack gap={3}>

        {cartItems.map(item => (
        <CartItem key={item.id} {...item}/>
        ))}
        <div className='ms-auto fw-bold fs-5'>
          Total {" "} 
          {formatCurrencies(cartItems.reduce((total, cartItem) => {
            const item = storeItems.find(i => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
          }, 0))}
        </div>
      </Stack>
    </Offcanvas.Body>
  </Offcanvas>
}

export default ShoppingCart