import Search from 'antd/es/transfer/search';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import UsersTable from './components/UsersTable/UsersTable';
import { AppDispatch, RootState } from './store';
import { getUsers } from './store/slices/usersReducer';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { filteredUsers, isLoading, error } = useSelector((state: RootState) => state.users);
	useEffect(() => {
		dispatch(getUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
      {error && <h1>An error occurred</h1>}
			{isLoading && !error ? <p>Loading...</p> : <>
			<Search/>
			<UsersTable users={filteredUsers} />
			</>}
		</main>
	);
}

export default App;
