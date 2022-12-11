import { createContext, ReactNode, useContext, useState } from "react";

type ShopingCartProviderProps = {
    children: ReactNode;
}

type CartItem ={
    id:number,
    quantity:number,
}

type ShoppingCartContextt = {
    getItemTotalCards: CartItem[]
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContextt); //for using array{}

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}: ShopingCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id:number){
        console.log(id);
        setCartItems(currentItems => {
           const findCuremItem = currentItems.find(item => item.id === id);
           if(!findCuremItem){
            return [...currentItems, {id, quantity: 1}]
           }
           findCuremItem.quantity =  findCuremItem.quantity  +1;
           return [...currentItems]
        })
    }

    function decreaseCartQuantity(id:number){
        setCartItems(currentItems => {
            if(currentItems.find(item => item.id === id)?.quantity === 1){
                return currentItems.filter(item => item.id === id)   
            }
            else{
                return currentItems.map((item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item;
                    }
                }))
            }
        })
    }

    function removeFromCart(id:number){
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id === id);
        })
    }
    return (
            <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, getItemTotalCards: cartItems}}>
                {children}
            </ShoppingCartContext.Provider>
            )
}