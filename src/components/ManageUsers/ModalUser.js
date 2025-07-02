import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { fetchGroups, createNewUser, updateUser } from '../../Services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ModalUser(props) {
    const { action, dataModalUser } = props;

    const defaultUserdata = {
        email: '',
        username: '',
        phone: '',
        password: '',
        sex: '',
        address: '',
        group: '',
    }
    const validInputsDefault = {
        email: true,
        username: true,
        phone: true,
        password: true,
        sex: true,
        address: true,
        group: true,
    }
    const [userData, setUserData] = useState(defaultUserdata);
    const [groups, setGroups] = useState([]);
    const [validInputs, setValidInput] = useState(validInputsDefault)

    useEffect(() => {
        getGroups();
    }, []);
    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : "" })
        }
    }, [dataModalUser]);
    useEffect(() => {
        if (action === "CREATE" && groups.length > 0) {
            setUserData({ ...defaultUserdata, group: groups[0].id });
        }
    }, [action, groups]);
    const getGroups = async () => {
        let res = await fetchGroups();
        if (res && +res.EC === 0) {
            setGroups(res.DT);
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.EM);
        }
    }
    const handleChange = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidInput = () => {
        if (action === 'UPDATE') return true
        setValidInput(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {

                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInput(_validInputs)
                toast.error(`Empty input ${arr[i]}`)
                check = false;
                break;
            }
        }
        return check;
    }
    const ConfirmUser = async () => {
        let check = checkValidInput()
        if (check === true) {
            let res = action === 'CREATE' ?
                toast.success('Create succsed...') &&
                await createNewUser({ ...userData, groupId: userData['group'] })
                : toast.success('Update succsed...') && await updateUser({ ...userData, groupId: userData['group'] });

            if (res && res.EC === 0) {
                props.hide();
                setUserData({ ...defaultUserdata, group: groups && groups.length > 0 ? groups[0].id : '' })
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM)
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInput(_validInputs)
            }
        }
    }
    const handleCloseModalUser = () => {
        props.hide()
        setUserData(defaultUserdata)
        setValidInput(validInputsDefault)
    }
    return (
        <>
            <Modal size='lg' show={props.show} className='modal-user' >
                <Modal.Header >
                    <Modal.Title id='contained-modal-title-vcenter'>
                        <span>{action === 'CREATE' ? 'Create new user' : 'Edit user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-user-container row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email</label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                type='email' className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                value={userData.email}
                                onChange={(e) => handleChange(e.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username</label>
                            <input type='text' className={validInputs.username ? 'form-control' : 'form-control is-invalid'} value={userData.username}
                                onChange={(e) => handleChange(e.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone</label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                type='text' className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                value={userData.phone}
                                onChange={(e) => handleChange(e.target.value, 'phone')}
                            />
                        </div>
                        {action === 'CREATE' &&
                            <div className='col-12 col-sm-6 form-group'>
                                <label>password</label>
                                <input type='password' className={validInputs.password ? 'form-control' : 'form-control is-invalid'} value={userData.password}
                                    onChange={(e) => handleChange(e.target.value, 'password')}
                                />
                            </div>
                        }
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address</label>
                            <input type='text' className={validInputs.address ? 'form-control' : 'form-control is-invalid'} value={userData.address}
                                onChange={(e) => handleChange(e.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender</label>
                            <select
                                className='form-select'
                                onChange={(e) => handleChange(e.target.value, "sex")}
                                value={userData.sex}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group</label>
                            <select
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleChange(e.target.value, "group")}
                                value={userData.group}
                            >
                                {groups && groups.length > 0 &&
                                    groups.map((group, index) => {
                                        return (
                                            <option key={index} value={group.id}>{group.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => ConfirmUser()}>
                        {action === "CREATE" ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUser;