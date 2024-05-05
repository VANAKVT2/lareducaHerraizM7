import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name} from the Database?`)) {
            axiosClient.delete(`/users/${user.id}`)
                .then(() => {
                    getUsers();
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }
    };

    const getUsers = (page = 1) => {
        setLoading(true);
        axiosClient.get(`/users?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                console.log("USERS", data);
                setUsers(data.data);
                setPages(data.meta);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err.response.data);
            });
    };

    return (
        <div className="Users">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>TYPE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        </tbody>}

                    {!loading &&
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.user_type}</td>
                                        <td>
                                            <Link className="btn-edit mx-2" to={`/users/${user.id}`}>Edit</Link>
                                            <button onClick={ev => onDelete(user)} className="btn-delete mx-2">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>}
                </table>
            </div>
            <div className="pagination">
                {pages && pages.links.map((link, index) => (
                    <button
                        className={`btn ${link.active ? 'active' : ''}`}
                        key={index}
                        onClick={() => getUsers(new URL(link.url).searchParams.get('page'))}
                        disabled={link.url === null}
                    >
                        {index === 0 ? '«' : index === pages.links.length - 1 ? '»' : link.label}
                    </button>
                ))}
            </div>
        </div>
    );
}