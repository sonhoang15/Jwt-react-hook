import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { fetchGroups, createNewUser } from '../../Services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ModalUser(props) {
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
    const getGroups = async () => {
        let res = await fetchGroups();
        if (res && res.data && +res.data.EC === 0) {
            setGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM);
        }
    }
    const handleChange = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidInput = () => {
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
            let res = await createNewUser({ ...userData, groupId: userData['group'] })
            if (res.data && res.data.EC === 0) {
                props.hide();
                setUserData({ ...defaultUserdata, group: groups[0].id })
            } else {
                toast.error(`Error create user`)
            }
        }
    }
    return (
        <>
            <Modal size='lg' show={props.show} className='modal-user' >
                <Modal.Header >
                    <Modal.Title id='contained-modal-title-vcenter'>
                        <span>{props.Title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-user-container row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email</label>
                            <input type='email' className={validInputs.email ? 'form-control' : 'form-control is-invalid'} value={userData.email}
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
                            <input type='text' className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} value={userData.phone}
                                onChange={(e) => handleChange(e.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>password</label>
                            <input type='password' className={validInputs.password ? 'form-control' : 'form-control is-invalid'} value={userData.password}
                                onChange={(e) => handleChange(e.target.value, 'password')}
                            />
                        </div>
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
                    <Button variant="secondary" onClick={props.hide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => ConfirmUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUser;