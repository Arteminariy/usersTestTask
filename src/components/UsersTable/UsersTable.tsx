import Table, { ColumnsType } from 'antd/es/table';
import { FC } from 'react';
import { IUser } from '../../@types';

type Props = {
	users: IUser[];
};

const UsersTable: FC<Props> = ({ users }) => {
	const columns: ColumnsType<IUser> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'City',
			dataIndex: 'city',
			key: 'city',
			render: (_, record) => record.address.city,
			filters: users.map((user) => {
				return {
					text: user.address.city,
					value: user.address.city,
				};
			}),
			onFilter: (value, record) => record.address.city === value,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={users}
			pagination={{ pageSize: 5 }}
		/>
	);
};

export default UsersTable;
