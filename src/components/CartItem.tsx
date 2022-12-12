import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from '../data/Items.json'
import { formatCurrencies } from '../utilities/FormatCurrency'

type CartItemProps = {
    id:number,
    quantity:number
}
const CartItem = ({id, quantity}: CartItemProps)  => {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id ===id)
    if(item == null) return null
    
  return (
    <Stack direction='horizontal' gap={2} className="d-flex align-items-center">
        <img src={item.imgUrl} style={{width:"125px", height: "75px", objectFit:"cover"}} alt="" />

        <div className='me-auto'>
            <div>
                {item.name} {" "} 
                {quantity > 1 && (
                <span className='text-muted' style={{fontSize:".65rem"}}> x{quantity}
                </span>)}
            </div>
            {/* currency */}
            <div className='text-muted' style={{fontSize:".75rem"}}>{formatCurrencies(item.price)}</div>
            <div>{formatCurrencies(item.price * quantity)}</div>
            <Button variant='outline-danger' size='sm' onClick={() => removeFromCart(item.id)}>&times;</Button>
        </div>
    </Stack>
  )
}

export default CartItem