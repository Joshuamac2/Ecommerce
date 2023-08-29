const productsArray = [
    {
        id: process.env.REACT_APP_CHOCOLATE,
        title: "Chocolate  Cookie",
        price: 4.99,
        pic: 'cookie1.png'
    },
    {
        id: process.env.REACT_APP_DARK,
        title: "Tripple Chocolate Cookie",
        price: 9.99,
        pic: 'cookie2.png'
    },
    {
        id: process.env.REACT_APP_WHITE,
        title: "White Chocolate Cookie",
        price: 39.99,
        pic: 'cookie3.png'
    }
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id)

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData; 
}

export { productsArray, getProductData };