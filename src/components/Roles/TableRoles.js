import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { fetchAllRole, deleteRole } from '../../Services/roleService'
import { toast } from 'react-toastify';
import Roles from './Roles';
import './Roles.scss'

const TableRoles = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRoles()
    }, [])

    useImperativeHandle(ref, () => ({

        fecthListRole() {
            getAllRoles()
        }

    }));

    const getAllRoles = async () => {
        let data = await fetchAllRole()
        if (data && data.EC === 0) {
            setListRoles(data.DT)
        }
    }
    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role)
        if (data && data.EC === 0) {
            setListRoles(data.DT)
            toast.success(data.EM)
            await getAllRoles()
        }
    }
    return (
        <div className=' mt-3 table-role'>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ?
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            {/* <span className='edit'
                                                onClick={() => handleEditUser(item)}
                                            >
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </span> */}
                                            <span className='delete'
                                                onClick={() => handleDeleteRole(item)}
                                            ><i className="fa fa-trash" aria-hidden="true"></i>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </>
                        :
                        <>
                            <tr><td colSpan={4}>not found roles</td></tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
})

export default TableRoles;