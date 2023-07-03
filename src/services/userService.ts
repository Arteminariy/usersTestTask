import axios, { AxiosResponse } from "axios";
import { IUser } from "../@types";

export class UserService {
	static async getUsers(limit = 10, offset = 0): Promise<AxiosResponse<IUser[]>> {
		return axios.get<IUser[]>(`${import.meta.env.VITE_API_URL}/users?_start=${offset}&_limit=${limit}`);
	}
}