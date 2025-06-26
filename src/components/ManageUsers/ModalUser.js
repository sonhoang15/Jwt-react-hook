import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { fetchGroups } from '../../Services/userService';
import { toast } from 'react-toastify';

function ModalUser(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);
    const getGroups = async () => {
        let res = await fetchGroups();
        if (res && res.data && +res.data.EC === 0) {
            setGroups(res.data.DT);
        } else {
            toast.error(res.data.EM);
        }
    }
    return (
        <>
            <Modal size='lg' show={true} className='modal-user' >
                <Modal.Header closeButton>
                    <Modal.Title><span>{props.Title}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-user-container row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email</label>
                            <input type='email' className='form-control' value={props.email} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username</label>
                            <input type='text' className='form-control' value={props.username} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone</label>
                            <input type='text' className='form-control' value={props.phone} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>password</label>
                            <input type='password' className='form-control' value={props.password} />
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address</label>
                            <input type='text' className='form-control' value={props.address} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender</label>
                            <select className='form-select' >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group</label>
                            <select className='form-select' >
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
                    {/* <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.ConfirmDelete}>
                        Confirm
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;