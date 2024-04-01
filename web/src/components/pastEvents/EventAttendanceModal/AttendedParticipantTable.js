import React from 'react';
import { Table } from 'antd';


const ParticipantTable = ({ data }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <Table dataSource={data} columns={columns} />
    );
};

export default ParticipantTable;