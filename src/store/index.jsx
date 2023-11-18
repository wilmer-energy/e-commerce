import { configureStore } from '@reduxjs/toolkit'
import categoriesListSlice from './slices/categories/categoriesListSlice'
import categoryDetailSlice from './slices/categories/categoryDetailSlice'
import itemsListSlice from './slices/items/itemsListSlice'
import itemDetailSlice from './slices/items/itemDetailSlice'

export default configureStore({
    reducer: {
        categoriesList: categoriesListSlice,
        categoryDetail: categoryDetailSlice,
        itemsList: itemsListSlice,
        itemDetail: itemDetailSlice,
    }
})
