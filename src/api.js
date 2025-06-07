import axios from 'axios';

// const api = 'https://dummyjson.com'

export const getProducts = async () =>{
    try {
        const response = await axios.get('https://dummyjson.com/products');
        return response.data.products;
    } catch (error) {
        console.error("Erro ao buscar produto", error);
        return [];
    }
};

export const getCategories = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories')
    return response.data
  } catch (error) {
    console.error("Erro ao buscar categorias", error)
    return []
  }
}

export const searchProductsByName = async (query, limit = 12, skip = 0) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`)
    return response.data
  } catch (error) {
    console.error("Erro na busca por produtos:", error)
    return { products: [], total: 0 }
  }
}

export async function productsByCategories(category) {
    try{
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
        return response.data.products
    } catch (error){
        console.error("Erro ao buscar produtos da categoria: ", error)
        return []
    }
}

export const fetchProducts = async ({ searchTerm = '', limit = 12, offset = 0 }) =>{
  let url = ''

  if (props.searchTerm) {
    url = `https://dummyjson.com/products/search?q=${props.searchTerm}&limit=${limit}&skip=${offset.value}`
  } else {
    url = `https://dummyjson.com/products?limit=${limit}&skip=${offset.value}`
  }

  const response = await axios.get(url)
  products.value = response.data.products
  allProducts.value = response.data.total
}