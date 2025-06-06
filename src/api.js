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