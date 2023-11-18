import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../auth/services/api';

export const getCategory = createAsyncThunk('apps/categoryDetail/getCategory', async (id) => {
    const response = await api.get(`categories/${id}`);
    const data = await response.data;

    return data === undefined ? null : data[0];
});
export const getCategoryByParent = createAsyncThunk('apps/categoryDetail/getCategoryByParent', async (parentId) => {
    const response = await api.get(`categories/${parentId}/edit`);
    const data = await response.data;
    return data === undefined ? null : data;
});

export const saveCategory = createAsyncThunk(
    'apps/categoryDetail/saveCategory',
    async (categoryData, { getState, rejectWithValue }) => {
        const { id } = getState().apps.categoryDetail;
        try {
            const response = (id) ? await api.put(`categories/${id}`, categoryData) : await api.post('categories', categoryData);
            const data = await response.data;
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const categoriesDetailSlice = createSlice({
    name: 'apps/categoryDetail',
    initialState: {
        id: '',
        name: '',
        order: '',
        parent_id: '',
        category_panel: []
    },
    reducers: {
        resetCategory: () => null,
        newCategory: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    id: '',
                    name: '',
                    order: '',
                    parent_id: '',
                    category_panel: []
                },
            }),
        },
    },
    extraReducers: {
        [getCategory.fulfilled]: (state, action) => action.payload,
        [getCategoryByParent.fulfilled]: (state, action) => { state.category_panel = action.payload || [] },
    },
});

export const { newCategory, resetCategory } = categoriesDetailSlice.actions;

export const selectCategory = ({ apps }) => apps.categoryDetail;

export default categoriesDetailSlice.reducer;
