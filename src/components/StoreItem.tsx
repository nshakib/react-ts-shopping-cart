import React from 'react'
import { Button, Card} from 'react-bootstrap'
import { useShopingCart } from '../context/ShopingCartContext'
import { formatCurrencies } from '../utilities/FormatCurrency'

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
}

const StoreItem = ({id, name,price, imgUrl}: StoreItemProps) => {
    const {getItemQuantity} = useShopingCart()
    const quantity = 0
  return (
    <Card className='h-100'>
        <Card.Img variant='top' src={imgUrl}
        height="200px"
        style={{objectFit: 'cover'}}
         >

        </Card.Img>
        <Card.Body className='d-flex flex-column'>
            <Card.Title className='d-flex 
            justify-content-space-between align-item-baseline mb-4'>
                <span className='fs-2'>{name}</span>
                <span className='ms-2 text-muted'>{formatCurrencies(price)}</span>
            </Card.Title>
            <div className='mt-auto'>
                {quantity === 0 ? (
                    <Button>+ Add To Cart</Button>
                    ) : 
                    <div className='d-flex 
                        align-item-center
                        flex-column'
                        style={{gap: ".5rem"}}>
                        <div className='d-flex
                        align-items-center justify-content-center' 
                        style={{gap: ".5rem"}}>
                            <Button>+</Button>
                            <div>
                                <span className='fs-3'>{quantity}</span> in cart
                            </div>
                            <Button>-</Button>
                        </div>
                        <Button variant='danger' size='sm'>Remove</Button>
                    </div>
                }
            </div>
        </Card.Body>
    </Card>
  )
}

export default StoreItem