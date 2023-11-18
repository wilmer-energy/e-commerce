import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../auth/services/api';

export const getItem = createAsyncThunk('apps/itemDetail/getItem', async (id) => {
    const response = await api.get(`items/${id}`);
    const data = await response.data;

    return data === undefined ? null : data[0];
});

export const saveItem = createAsyncThunk(
    'apps/itemDetail/saveItem',
    async (itemData, { getState, rejectWithValue }) => {
        const { id } = getState().apps.itemDetail;
        try {
            const response = (id) ? await api.put(`items/${id}`, itemData) : await api.post('items', itemData);
            const data = await response.data;
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const itemsDetailSlice = createSlice({
    name: 'apps/itemDetail',
    initialState: {
        id: '',
        name: '',
        order: '',
        parent_id: '',
        item_panel: []
    },
    reducers: {
        resetItem: () => null,
        newItem: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    id: '',
                    name: '',
                    order: '',
                    parent_id: '',
                    item_panel: []
                },
            }),
        },
    },
    extraReducers: {
        [getItem.fulfilled]: (state, action) => action.payload,
    },
});

export const { newItem, resetItem } = itemsDetailSlice.actions;

export const selectItem = ({ apps }) => apps.itemDetail;

export default itemsDetailSlice.reducer;
