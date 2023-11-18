import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import api from '../../../auth/services/api';

export const getCategories = createAsyncThunk('apps/getCategories', async (_, { dispatch }) => {
  const response = await api.get('categories');
  const data = await response.data.categories;
  return data;
});
export const removeItem = createAsyncThunk(
  'apps/removeItem',
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await api.delete(`categories/${id}`);
      return { message: response.data.message, id: id };
    }
    catch (err) {
      return rejectWithValue({ message: err.response.data[0].message });
    }
  }
);

const categoryAdapter = createEntityAdapter({});

export const { selectAll: selectCategories } =
  categoryAdapter.getSelectors((state) => state.apps.categoriesList);

const categoriesSlice = createSlice({
  name: 'apps/categoriesList',
  initialState: categoryAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCategoriesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setCategoriesList: categoryAdapter.setAll
  },
  extraReducers: {
    [getCategories.fulfilled]: categoryAdapter.setAll,
    [removeItem.fulfilled]: (state, action) =>
      categoryAdapter.removeOne(state, action.payload.id),
  },
});

export const { setCategoriesSearchText, setCategoriesList } = categoriesSlice.actions;

export const selectCategoriesSearchText = ({ apps }) => apps.categoriesList.searchText;

export default categoriesSlice.reducer;
