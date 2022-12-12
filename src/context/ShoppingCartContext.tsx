import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShopingCartProviderProps = {
    children: ReactNode;
}

type CartItem ={
    id:number,
    quantity:number,
}

type ShoppingCartContextt = {
    openCart: () => void
    closeCart: () => void
    getItemTotalCards: CartItem[]
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextt); //for using array{}

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}: ShopingCartProviderProps){

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

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
            return currentItems.filter(item => item.id !== id);
        })
    }

    
    return (
            <ShoppingCartContext.Provider value={{
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity, 
                removeFromCart, 
                getItemTotalCards: cartItems,
                openCart,
                closeCart,
                cartQuantity,
                cartItems,
                }}>
                {children}
                <ShoppingCart isOpen={isOpen}/>
            </ShoppingCartContext.Provider>
            )
}