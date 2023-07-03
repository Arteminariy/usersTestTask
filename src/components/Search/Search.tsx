import { Input } from 'antd';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { filterUsers } from '../../store/slices/usersReducer';

const Search: FC = () => {
	const [text, setText] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();

	const handleFilter = () => {
			dispatch(filterUsers(text));
	};

	return (
		<div>
			<Input.Search value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleFilter} placeholder='Введите запрос' />
		</div>
	);
};

export default Search;
