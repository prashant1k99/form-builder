import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Form, ModifyForm } from '@/types/forms';
import Forms from '@/data/forms';
import { FormElementInstance } from '@/components/FormBuilder/FormElements';

type FormState = {
  activeForm?: Form;
  forms: Form[];
  lastForm: string | null;
  hasMore: boolean;
  sort: 'asc' | 'desc';
  limit: number;
}

const initialState: FormState = {
  activeForm: undefined,
  forms: [],
  lastForm: null,
  hasMore: true,
  sort: 'desc',
  limit: 10,
}

export const fetchForms = createAsyncThunk('forms/fetchForms',async ({ uid, lastDoc, limitDoc, sort }: { uid: string, lastDoc?: string, limitDoc: number, sort: 'asc' | 'desc' }) => {
  const { forms, lastDoc: lastForm } = await Forms.getForms({
    uid,
    limitDoc,
    after: lastDoc,
    order: sort,
  });
  return {
    data: forms,
    lastDoc: lastForm,
  };
})

export const fetchForm = createAsyncThunk('forms/fetchForm',async ({ formId }: { formId: string }) => {
  const form = await Forms.getFormById(formId);
  return form;
})

export const createForm = createAsyncThunk('forms/createForm',async ({ uid, form }: { uid: string, form: ModifyForm }) => {
  const newForm = await Forms.createForm(uid, form);
  return newForm;
})

export const updateForm = createAsyncThunk('forms/updateForm',async ({ formId, form }: { formId: string, form: ModifyForm }) => {
  const updatedForm = await Forms.updateForm(formId, form);
  return updatedForm;
})

export const updateFormElements = createAsyncThunk('forms/updateFormElements',async ({ formId, elements }: { formId: string, elements: FormElementInstance[] }) => {
  console.log(formId, elements)
  const {
    fields,
    id,
    updatedAt
  } = await Forms.updateElements(formId, elements);
  return {
    fields,
    id,
    updatedAt
  };
})
export const deleteForm = createAsyncThunk('forms/deleteForm',async ({ formId }: { formId: string }) => {
  await Forms.deleteForm(formId);
  return {formId};
})

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { data,
        limit,
        lastDoc } = action.payload;
      state.forms = [...state.forms, ...data];
      state.lastForm = lastDoc
      state.limit = limit
    },
    setActiveForm: (state, action) => {
      state.activeForm = action.payload;
    },
    setForms: (state, action) => {
      state.forms = action.payload;
    },
    setSort: (state, action) => {
      if (action.payload !== state.sort) {
        state.forms = [];
        state.lastForm = null;
        state.hasMore = true;
        state.sort = action.payload;
      }
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      const { data, lastDoc } = action.payload;
      if (state.forms.length < state.limit) {
        state.forms = data;
      } else {
        state.forms = [...state.forms, ...data];
      }
      state.lastForm = lastDoc;
      const hasMore = data.length < state.limit ? false : true;
      state.hasMore = hasMore
    }),
    builder.addCase(createForm.fulfilled, (state, action) => {
      const data = action.payload;
      state.forms = [...state.forms, data];
    }),
    builder.addCase(updateForm.fulfilled, (state, action) => {
      const data = action.payload;
      const existingDataIndex = state.forms.findIndex(form => form.id === data.id)
      if (existingDataIndex >= 0) {
        state.forms[existingDataIndex] = data
      }
      if (state.activeForm?.id === data.id)
        state.activeForm = data;
    }),
    builder.addCase(updateFormElements.fulfilled, (state, action) => {
      const { id, fields, updatedAt } = action.payload;
      const existingDataIndex = state.forms.findIndex(form => form.id === id)
      if (existingDataIndex >= 0) {
        state.forms[existingDataIndex].fields = fields;
        state.forms[existingDataIndex].updatedAt = updatedAt;
      }
      if (state.activeForm?.id === id) {
        state.activeForm.fields = fields;
        state.activeForm.updatedAt = updatedAt;
      }
    }),
    builder.addCase(deleteForm.fulfilled, (state, action) => {
      const { formId } = action.payload;
      const existingDataIndex = state.forms.findIndex(form => form.id === formId)
      state.forms.splice(existingDataIndex, 1);
      if (state.activeForm?.id === formId) {
        state.activeForm = undefined;
      }
    })
  }
});

export const {
  setSort,
  setLimit,
  setActiveForm
} = formSlice.actions;

export default formSlice.reducer;