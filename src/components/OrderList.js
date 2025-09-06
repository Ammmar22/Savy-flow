import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import {
    useGetOrdersQuery,
} from "../store/api/useSubscriptions";
import * as moment from "moment/moment";

const OrderList = ({ userId }) => {

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const  { data: orders = [], isLoading , isFetching} = useGetOrdersQuery({
        userId: userId,
        limit: limit,
        page: page
    });


    const columns = [
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text) => moment(text).format('DD/MM/YYYY')+ ' '+ moment(text).format('hh:mm:ss'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
        },
        {
            title: 'Stripe Transaction',
            dataIndex: 'paymentTansactionRef',
            key: 'paymentIntentRef',
            render: (text) => (
                <a href={`https://dashboard.stripe.com/payments/${text}`} target="_blank" rel="noopener noreferrer">
                    View Transaction
                </a>
            ),
        },
    ];

    // Remove user-specific columns if userId is provided
    if (!userId) {
        columns.unshift({
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (text) => (
                <a href={`/app/users/subscriptions/details/${text.id}`} target="_blank" rel="noopener noreferrer">
                    {text.firstName} {text.lastName}
                </a>
            ),
        });
    }

    return (
        <Table
            columns={columns}
            dataSource={orders?.data}
            pagination={{
                current:orders.page,
                pageSize: limit,
                total: orders.total,
                onChange: (page, pageSize) => {
                    setLimit(pageSize);
                    setPage(page);
                    console.log('isFetching ==> ', isFetching)
                    // isFetching();
                },
            }}
            loading={isLoading}
            rowKey={(record) => record.id}
        />
    );
};

export default OrderList;
