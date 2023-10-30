import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Submission, SubmissionData as SubmissionBody } from "@/types/submissions";
import Submissions from "@/data/submissions";

type SubmissionData = {
  submissions: Submission[];
  lastSubmission: string | null;
  hasMore: boolean;
  limit: number;
};

type SubmissionState = {
  [key: string]: SubmissionData;
};

const initialState: SubmissionState = {};

export const fetchSubmissions = createAsyncThunk('submission/fetchSubmissions', async ({
  formId, lastDoc
}: { formId: string, lastDoc?: string }) => {
  const {
    data,
    lastDoc: lastSubmission,
  } = await Submissions.getSubmissions({
    formId,
    limitDoc: 10,
    after: lastDoc,
  });
  return {
    data: data,
    limit: 10,
    lastDoc: lastSubmission,
  };
})

export const createSubmission = createAsyncThunk('submission/createSubmission', async ({
  formId, submission
}: { formId: string, submission: SubmissionBody }) => {
    const newSubmissionId = await Submissions.createSubmission({
      formId,
      data: submission,
    });
    return newSubmissionId
})



export const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setSubmissions: (state, action) => {
      const { formId, submissions, lastSubmission, hasMore } = action.payload;
      state[formId] = {
        submissions,
        lastSubmission,
        hasMore,
        limit: 10,
      };
    },
    addSubmissions: (state, action) => {
      const { formId, submissions, lastSubmission, hasMore } = action.payload;
      state[formId] = {
        submissions: [...state[formId].submissions, ...submissions],
        lastSubmission,
        hasMore,
        limit: 10,
      };
    },
    setLastSubmission: (state, action) => {
      const { formId, lastSubmission } = action.payload;
      state[formId].lastSubmission = lastSubmission;
    },
    setHasMore: (state, action) => {
      const { formId, hasMore } = action.payload;
      state[formId].hasMore = hasMore;
    },
    setLimit: (state, action) => {
      const { formId, limit } = action.payload;
      state[formId].limit = limit;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSubmissions.fulfilled, (state, action) => {
      const { data, limit, lastDoc } = action.payload;
      const formId = data[0].formId;
      const existingData = state[formId];
      state[formId] = {
        submissions: existingData.submissions ? [...existingData.submissions, ...data] : data,
        lastSubmission: lastDoc,
        hasMore: data.length === limit,
        limit: limit,
      };
    })
  }
});

export const {
  setSubmissions,
  addSubmissions,
  setLastSubmission,
  setHasMore,
  setLimit,
} = submissionSlice.actions;

export default submissionSlice.reducer;