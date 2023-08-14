import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number,
  cartProducts: CartProductType[] | null,
  handleAddProductToCart : (product: CartProductType) => void
  handleRemoveProductFromCart : (product: CartProductType) => void
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

  useEffect(() => {
    const cartItem :any = localStorage.getItem('eShopCartItem');
    const cProducts: CartProductType[] | null = JSON.parse(cartItem)

    setCartProducts(cProducts)
  },[])

  const handleAddProductToCart = useCallback((product:CartProductType) => [
       setCartProducts((prev) => {
        let updatedCart;

        if(prev) {
          updatedCart = [...prev, product];
        }else{
          updatedCart = [product];
        }

        toast.success("Product added to cart");
        localStorage.setItem("eShopCartItem" , JSON.stringify(updatedCart))
        return updatedCart;
       })
  ] ,[])

  const handleRemoveProductFromCart = useCallback((product:CartProductType) => {
  if(cartProducts){
    const filterdProducts = cartProducts.filter((item) => item.id !== product.id);

    setCartProducts(filterdProducts);
    toast.success('Product removed');
    localStorage.setItem('eShopCartItem', JSON.stringify(filterdProducts));
  }
  } ,[cartProducts])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
