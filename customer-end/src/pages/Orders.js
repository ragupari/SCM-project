import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCard from '../components/PageTitleCard';
import NavBar from '../components/NavBar';

const Orders = () => {
    const [username, setUsername] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const username = await getUsernameFromToken();
                if (!username) {
                    throw new Error('No username found in token');
                }
                const res = await axios.get(`/orders/${username}`);
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fecthData();
    }, []);

    const getUsernameFromToken = async () => {
        try {
            const res = await axios.get('/tokenauth', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            setUsername(res.data.username);
            return res.data.username;
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`/orders/${username}`);
            setOrders(res.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleReceive = async (orderID) => {
        try {
            await axios.put(`/orders/${orderID}`, { status: 'Received' });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div>
            <NavBar currentPage={'My Orders'} />
            <DisplayCard title={'My Orders'} />
            <div className="container-fluid p-4">
                <table className="table table-striped table-bordered table-hover table-responsive shadow-sm rounded bg-white">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Total Price</th>
                            <th>Total Capacity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.OrderID}>
                                <td>{formatDate(order.OrderDate)}</td>
                                <td>{formatDate(order.DeliveryDate)}</td>
                                <td>{order.TotalPrice}</td>
                                <td>{order.TotalCapacity}</td>
                                <td>
                                    {order.Status === 'OnTheWay' ? (
                                        <button
                                            onClick={() => handleReceive(order.OrderID)}
                                            className="btn btn-success me-2"
                                        >
                                            Recevied
                                        </button>
                                    ) : (
                                        <p>{order.Status}</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders
