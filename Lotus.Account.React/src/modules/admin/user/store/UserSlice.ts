import { createSlice } from '@reduxjs/toolkit';
import { ReduxToolkitHelper } from 'lotus-core-react';
import { IUserState } from './UserState';
import { createUserAsyncThunk, getUserAsyncThunk, updateUserAsyncThunk, getUsersAsyncThunk } from './UserThunk';

const initialState: IUserState = {
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    //
    // CREATE_USER
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(createUserAsyncThunk.pending, (state, _) => 
    {
      state.isLoading = true;
      state.status = 'Создание пользователя...';
    });
    builder.addCase(createUserAsyncThunk.fulfilled, (state, action) => 
    {
      state.lastCreateUser = action.payload.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(createUserAsyncThunk.rejected, (state, action) => 
    {
      state.error = ReduxToolkitHelper.getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка создания пользователя';
    });

    //
    // GET_USER
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getUserAsyncThunk.pending, (state, _) => 
    {
      state.isLoading = true;
      state.status = 'Получение данных пользователя...';
    });
    builder.addCase(getUserAsyncThunk.fulfilled, (state, action) => 
    {
      state.lastViewUser = action.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(getUserAsyncThunk.rejected, (state, action) => 
    {
      state.error = ReduxToolkitHelper.getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка получение данных пользователя';
    });

    //
    // UPDATE_USER
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(updateUserAsyncThunk.pending, (state, _) => 
    {
      state.isLoading = true;
      state.status = 'Обновление данных пользователя...';
    });
    builder.addCase(updateUserAsyncThunk.fulfilled, (state, action) => 
    {
      state.lastUpdateUser = action.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(updateUserAsyncThunk.rejected, (state, action) => 
    {
      state.error = ReduxToolkitHelper.getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка обновления данных пользователя';
    });

    //
    // GET_USERS
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getUsersAsyncThunk.pending, (state, _) => 
    {
      state.isLoading = true;
      state.status = 'Получение данных пользователей...';
    });
    builder.addCase(getUsersAsyncThunk.fulfilled, (state, action) => 
    {
      state.viewUsers = action.payload;
      state.isLoading = false;
      state.status = '';
    });
    builder.addCase(getUsersAsyncThunk.rejected, (state, action) => 
    {
      state.error = ReduxToolkitHelper.getErrorText(action.error);
      state.isLoading = false;
      state.status = 'Ошибка получения данных пользователя';
    });
  }
});
