import { createAsyncThunk } from '@reduxjs/toolkit';
import { workspaceService } from '~/services/workspaceService';

export const fetchWorkspace = createAsyncThunk('workspace/fetchWorkspace', async () => {
    const res = await workspaceService.getWorkspace();

    return res.data;
});
