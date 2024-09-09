import { createSlice } from '@reduxjs/toolkit';

// export const fetchBoard = createAsyncThunk('users/fetchBoard', async () => {
//     const res = await axios.get('http://localhost:8080/users/all');
//     return res.data;
// });

const initialState = {
    data: {
        id: '',
        title: '',
        description: '',
        type: '',
        ownerIds: [],
        members: [],
        columnOrderIds: [],
        columns: [],
    },
};

export const boardSlide = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addBoardData: (state, action) => {
            state.data = { ...action.payload };
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchAllUsers.pending, (state, action) => {
    //             state.isLoading = true;
    //             state.isError = false;
    //         })
    //         .addCase(fetchAllUsers.fulfilled, (state, action) => {
    //             state.listUsers = action.payload;
    //             state.isLoading = false;
    //             state.isError = false;
    //         })
    //         .addCase(fetchAllUsers.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.isError = true;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { addBoardData } = boardSlide.actions;

export default boardSlide.reducer;
