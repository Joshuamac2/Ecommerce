import { createContext, useState } from "react";
import { fetchProductDataFromAPI } from "./productsStore";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    console.log('Cart Products:', cartProducts);

    

    function getProductQuantity(product_id) {
        const quantity = cartProducts.find(product => product.product_id === product_id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    async function addOneToCart(product_id) {
        const quantity = getProductQuantity(product_id);
        console.log("Adding item with ID:", product_id);
    
        const productData = await fetchProductDataFromAPI(); // Fetch all product data
    
        if (quantity === 0 && productData) {
            const selectedProduct = productData.find(product => product.product_id === product_id);
    
            if (!selectedProduct) {
                console.log("Product data does not exist for ID:", product_id);
                return;
            }
    
            setCartProducts([
                ...cartProducts,
                {
                    product_id: selectedProduct.product_id,
                    title: selectedProduct.title,
                    description: selectedProduct.description,
                    price: selectedProduct.price,
                    image_url: selectedProduct.image_url,
                    available_quantity: selectedProduct.available_quantity,
                    api_key: selectedProduct.api_key,
                    quantity: 1,
                },
            ]);
        } else if (productData) {
            setCartProducts(
                cartProducts.map((product) =>
                    product.product_id === product_id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        }
    }
    
    

    function removeOneFromCart(product_id) {
        const quantity = getProductQuantity(product_id);

        if(quantity === 1) {
            deleteFromCart(product_id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.product_id === product_id                                
                    ? { ...product, quantity: product.quantity - 1 } 
                    : product                                        
                )
            )
        }
    }

    function deleteFromCart(product_id) {

        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.product_id !== product_id;
            })  
        )
    }

    async function getTotalCost() {
        const totalCost = cartProducts.reduce(async (accPromise, cartItem) => {
            const acc = await accPromise;
            return acc + cartItem.price * cartItem.quantity;
        }, Promise.resolve(0));
    
        return totalCost;
    }
    

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    console.log('Context Value:', contextValue); 

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

