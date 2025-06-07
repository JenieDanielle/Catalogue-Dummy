import axios from 'axios'
import { ref, watch, onMounted, isRef } from 'vue'

export function useProducts(searchTerm, selectedCategory) {
    if (!isRef(searchTerm)) {
        searchTerm = ref('')
    }
    if (!isRef(selectedCategory)) {
        selectedCategory = ref('all')
    }

    const products = ref([])
    const productsAll = ref([])
    const offset = ref(0)
    const allProducts = ref(0)
    const limit = 12
    const sortOption = ref('none')

    const fetchProducts = async () => {
        try {
            if (searchTerm.value) {
                const res = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm.value}`)
                const data = res.data.products || []
                productsAll.value = data
                allProducts.value = data.length

            } else if (selectedCategory.value && selectedCategory.value !== 'all') {
                const res = await axios.get(`https://dummyjson.com/products/category/${selectedCategory.value}`)
                const data = res.data.products || []
                productsAll.value = data
                allProducts.value = data.length

            } else {
                productsAll.value = []
                let skip = 0
                const maxPerRequest = 30
                let fetchedTotal = 0
                let finished = false

                while (!finished) {
                    const res = await axios.get(`https://dummyjson.com/products?limit=${maxPerRequest}&skip=${skip}`)
                    const data = res.data.products || []
                    productsAll.value.push(...data)
                    skip += maxPerRequest
                    fetchedTotal += data.length
                    if (fetchedTotal >= res.data.total) {
                    finished = true
                    }
                }
                allProducts.value = productsAll.value.length
            }

            offset.value = 0
            sortProducts()

        } catch (error) {
            console.error('Erro ao buscar todos os produtos:', error)
        }
    }


    const sortProducts = () => {
        let sorted = [...productsAll.value]

        switch (sortOption.value) {
            case 'priceAsc':
                sorted.sort((a, b) => a.price - b.price)
                break
            case 'priceDesc':
                sorted.sort((a, b) => b.price - a.price)
                break
            case 'nameAsc':
                sorted.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'nameDesc':
                sorted.sort((a, b) => b.title.localeCompare(a.title))
                break
            default:
                break  
        }

        productsAll.value = sorted
        paginateProducts()
    }

    const paginateProducts = () => {
        products.value = productsAll.value.slice(offset.value, offset.value + limit)
    }

    const nextPage = () => {
        if (offset.value + limit < allProducts.value) {
            offset.value += limit
            paginateProducts()
        }
    }

    const previousPage = () => {
        if (offset.value >= limit) {
            offset.value -= limit
            paginateProducts()
        }
    }

    watch([searchTerm, selectedCategory], () => {
        offset.value = 0
        fetchProducts()
    })

    watch(sortOption, () => {
        sortProducts()
    })

    onMounted(fetchProducts)

    return {
        products,
        offset,
        allProducts,
        limit,
        sortOption,
        nextPage,
        previousPage,
    }
}
