import React, { useState, useEffect } from 'react';
import { fetchAllUsers, deleteUser } from '../../Services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';


function User(props) {
    const [listUser, setListUser] = useState([]);
    const [itemOffset, setItemOffset] = useState(1);
    const [itemLimit, setItemLimit] = useState(2);
    const [pageCount, setPageCount] = useState(0);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState({});
    const [isShowModalUser, setShowModalUser] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [itemOffset]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(itemOffset, itemLimit);
        if (response && response.data && response.data.EC === 0) {
            console.log(response.data.DT);
            setPageCount(+response.data.DT.totalPage);
            setListUser(response.data.DT.users);
        } else {
            console.error("Failed to fetch users");
        }
    }
    const handlePageClick = async (event) => {
        setItemOffset(+event.selected + 1);
        await fetchUsers()
    };
    const handleDeleteUser = async (user) => {
        setUserToDelete(user);
        setShowModalDelete(true);
    }
    const handleClose = () => {
        setShowModalDelete(false);
        setUserToDelete({});
    }

    const ConfirmDelete = async () => {
        let response = await deleteUser(userToDelete);
        if (response && response.data && +response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUsers();
            setShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    }
    const onHideModalUser = () => {
        setShowModalUser(false)
    }
    return (
        <>
            <div className=' container'>
                <div className='manage-user-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table User</h3>
                        </div>
                        <div className='user-actions'>
                            <button className='btn btn-secondary'>Edit</button>
                            <button className='btn btn-primary' onClick={() => setShowModalUser(true)}>Add User</button>
                        </div>
                    </div>
                    <div className='user-table'>
                        <div className='table'>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Id</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">User name</th>
                                        <th scope="col">Group</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUser && listUser.length > 0 ?
                                        <>
                                            {listUser.map((item, index) => {
                                                return (
                                                    <tr key={`user-${index}`}>
                                                        <th>{index + 1}</th>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.Group ? item.Group.name : 'N/A'}</td>
                                                        <td>
                                                            <button className='btn btn-warning mx-3'>Edit</button>
                                                            <button className='btn btn-danger'
                                                                onClick={() => handleDeleteUser(item)}
                                                            >Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )}
                                        </>
                                        :
                                        <>
                                            <tr><td><span>not found user</span></td></tr>
                                        </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {pageCount > 0 &&
                        <div className='footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <ModalDelete
                show={showModalDelete}
                handleClose={handleClose}
                ConfirmDelete={ConfirmDelete}
                userToDelete={userToDelete}
            />
            <ModalUser
                Title={'Create new user'}
                hide={onHideModalUser}
                show={isShowModalUser}
            />
        </>
    );
}

export default User;