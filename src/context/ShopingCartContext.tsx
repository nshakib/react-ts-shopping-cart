import { createContext, useContext, useState } from "react";

type ShopingCartProviderProps = {
    children: React.ReactNode;
}

type CartItem ={
    id:number,
    quantity:number,
}

type ShopingCartContext = {
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    dcreaseCartuantity: (id:number) => void
    removeFromCart: (id:number) => void
}

const ShopingCartContext = createContext({} as ShopingCartContext);

export function useShopingCart(){
    return useContext(ShopingCartContext);
}


export function ShopingCartProvider({children}: ShopingCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id:number){
        setCartItems(currentItems => {
            if(currentItems.find(item => item.id === id) === null){
                return [...currentItems, {id, quantity: 1}]
            }
            else{
                return currentItems.map((item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item;
                    }
                }))
            }
        })
    }

    function dcreaseCartuantity(id:number){
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
            <ShopingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, dcreaseCartuantity, removeFromCart}}>
                {children}
            </ShopingCartContext.Provider>
            )
}