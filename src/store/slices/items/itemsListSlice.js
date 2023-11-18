import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import api from '../../../auth/services/api';

export const getItems = createAsyncThunk('apps/getItems', async (_, { dispatch }) => {
  const response = await api.get('items');
  const data = await response.data.items;
  return data;
});
export const getItemsByParent = createAsyncThunk('apps/itemDetail/getItemByParent', async (categoryId) => {
  const response = await api.get(`items/${categoryId}/edit`);
  const data = await response.data;
  return data === undefined ? null : data;
});
export const removeItem = createAsyncThunk(
  'apps/removeItem',
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await api.delete(`items/${id}`);
      return { message: response.data.message, id: id };
    }
    catch (err) {
      return rejectWithValue({ message: err.response.data[0].message });
    }
  }
);

const itemAdapter = createEntityAdapter({});

export const { selectAll: selectItems } =
  itemAdapter.getSelectors((state) => state.apps.itemsList);

const itemsSlice = createSlice({
  name: 'apps/itemsList',
  initialState: itemAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setItemsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setItemsList: itemAdapter.setAll
  },
  extraReducers: {
    [getItems.fulfilled]: itemAdapter.setAll,
    [getItemsByParent.fulfilled]: itemAdapter.setAll,
    [removeItem.fulfilled]: (state, action) =>
      itemAdapter.removeOne(state, action.payload.id),
  },
});

export const { setItemsSearchText, setItemsList } = itemsSlice.actions;

export const selectItemsSearchText = ({ apps }) => apps.itemsList.searchText;

export default itemsSlice.reducer;
