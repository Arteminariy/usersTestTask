import { Reducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../@types';
import { UserService } from '../../services/userService';
import { AxiosError } from 'axios';

const initialState = {
	users: [] as IUser[],
	searchText: '' as string,
	isLoading: false as boolean,
	error: null as string | null,
};

export const getUsers = createAsyncThunk(
	'users/getUsers',
	async (): Promise<IUser[]> => {
		const response = await UserService.getUsers();
		return response.data;
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setError(state, action) {
			state.error = action.payload;
		},
		setSearchText(state, action) {
			state.searchText = action.payload;
		}
	},
	extraReducers(builder) {
		builder.addCase(getUsers.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.users = action.payload;
		});
		builder.addCase(getUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = (action.payload as AxiosError).message;
			state.users = [...state.users];
		});
	},
});

export const { setError, setSearchText } = usersSlice.actions;

export const usersReducer = usersSlice.reducer as Reducer<typeof initialState>;
