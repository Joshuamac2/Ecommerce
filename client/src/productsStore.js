export async function fetchProductDataFromAPI() {
    try {

        const response = await fetch(`http://localhost:4000/api/products`);
  
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
  
        const productData = await response.json();

        return productData;
    } catch (error) {
        console.error('Error fetching product data from API:', error);
        return null; 
    }
  }
  
  async function getProductData(product_id) {
    
      const allProductData = await fetchProductDataFromAPI();
  
      let foundProduct = allProductData.find(product => product.product_id === product_id);
  
      if (foundProduct === undefined) {
          console.log("Product data does not exist for ID: " + product_id);
          return undefined;
      }
  
      return foundProduct; 
  }
  
  export { getProductData };
  