import { Reducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../@types';
import { UserService } from '../../services/userService';
import { AxiosError } from 'axios';

const initialState = {
	users: [] as IUser[],
	filteredUsers: [] as IUser[],
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
		filterUsers(state, action) {
			if (action.payload === '') {
				state.filteredUsers = [...state.users];
			} else {
				state.filteredUsers = state.users.filter(
					(user) =>
						user.name
							.toLowerCase()
							.includes(action.payload.toLowerCase()) ||
						user.address.city
							.toLowerCase()
							.includes(action.payload.toLowerCase()) ||
						user.email
							.toLowerCase()
							.includes(action.payload.toLowerCase())
				);
			}			
		},
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
			state.filteredUsers = action.payload;
		});
		builder.addCase(getUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = (action.payload as AxiosError).message;
			state.users = [...state.users];
			state.filteredUsers = [...state.users];
		});
	},
});

export const { setError, filterUsers } = usersSlice.actions;

export const usersReducer = usersSlice.reducer as Reducer<typeof initialState>;
