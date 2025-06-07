import {ref, watch, onMounted} from 'vue'
import axios from 'axios'

export function useProducts(searchTerm){
    const products = ref([])
    const productsAll = ref([])
    const offset = ref(0)
    const allProducts = ref(0)
    const limit = 12
    const sortOption = ref('none')

    const fetchProducts = async () =>{
        let url = ''

        if (searchTerm.value) {
            url = `https://dummyjson.com/products/search?q=${searchTerm.value}`
        } else {
            url = `https://dummyjson.com/products`
        }

        const response = await axios.get(url)
        productsAll.value = response.data.products || response.data
        allProducts.value = response.data.total || response.data.length || response.data.products.length
        sortProducts()
        paginateProducts()
    }

    const sortProducts = () => {
        if (!products.value) return

        let sorted = []

        switch(sortOption.value) {
            case 'priceAsc':
                sorted = [...productsAll.value].sort((a, b) => a.price - b.price)
                break
            case 'priceDesc':
                sorted = [...productsAll.value].sort((a, b) => b.price - a.price)
                break
            case 'nameAsc':
                sorted = [...productsAll.value].sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'nameDesc':
                sorted = [...productsAll.value].sort((a, b) => b.title.localeCompare(a.title))
                break
            default:
                sorted = [...productsAll.value]
        }
        productsAll.value = sorted
        paginateProducts()
    }

    const paginateProducts = () => {
        products.value = productsAll.value.slice(offset.value, offset.value + limit)
    }

    const nextPage = async () => {
        if (offset.value + limit < allProducts.value) {
            offset.value += limit
            paginateProducts()
        }
    }

    const previousPage = async () => {
        if (offset.value >= limit) {
            offset.value -= limit
            paginateProducts()
        }
    }

    watch(searchTerm, () => {
        offset.value = 0
        fetchProducts()
    })

    watch(sortOption, () => {
        sortProducts()
        paginateProducts()
    })

    onMounted(fetchProducts)

    return {
        products,
        offset,
        allProducts,
        limit,
        sortOption,
        nextPage,
        previousPage
    }
}