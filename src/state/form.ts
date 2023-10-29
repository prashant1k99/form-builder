import { createSlice } from '@reduxjs/toolkit';
import { Form } from '@/types/forms';

type FormState = {
  activeForm: Form | null;
  forms: Form[];
  lastForm: string | null;
  hasMore: boolean;
  sort: 'asc' | 'desc';
  limit: number;
}

const initialState: FormState = {
  activeForm: null,
  forms: [],
  lastForm: null,
  hasMore: true,
  sort: 'desc',
  limit: 10,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateActiveForm: (state, action) => {
      state.activeForm = action.payload;
    },
    setActiveForm: (state, action) => {
      state.activeForm = action.payload;
    },
    setForms: (state, action) => {
      state.forms = action.payload;
    },
    addForms: (state, action) => {
      state.forms = [...state.forms, ...action.payload];
    },
    setLastForm: (state, action) => {
      state.lastForm = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const {
  setActiveForm,
  setForms,
  addForms,
  setLastForm,
  setHasMore,
  setSort,
  setLimit,
  updateActiveForm
} = formSlice.actions;

export default formSlice.reducer;