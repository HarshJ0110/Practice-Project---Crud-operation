import React, { useEffect, useState } from 'react'
import Modal from './Modal'


const User = ({ users, setUsers, modal, setModal }) => {

    const [currentUser, setCurrentUser] = useState("")
    const updateUser = async (user) => {

        setCurrentUser(user);
        setModal(true);
    }

    const deleteUsers = async (id) => {
        const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
            method: "DELETE",
            header: {
                "Content-type": "application/json",
            }
        })
        const res = response.json();
        console.log(res)

        const newUser = users.filter(user => id !== user._id);
        setUsers(newUser);
    }

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("http://localhost:4000/api/v1/user", {
                method: "GET",
                header: {
                    "Content-type": "application/json",
                }
            })

            const userData = await response.json()
            setUsers(userData.users);
        }
        getData()
    }, [])
    return (

        <div className='container'>
            {modal ? <Modal users={users} setUsers={setUsers} currentUser={currentUser} modal={modal} setModal={setModal}/> : <>
                {users.map((user, index) => {
                    return <div key={index} className='user_container'>
                        {/* {console.log(user._id)} */}
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.gender}</span>
                        <div>
                            <span>{user.hobby[0] + " "}</span>
                            <span>{user.hobby[1]}</span>
                        </div>
                        <span>{user.password}</span>
                        <span>{user.course}</span>
                        <span>{user.address}</span>
                        <button onClick={() => updateUser(user)}>Update</button>
                        <button onClick={() => deleteUsers(user._id)}>delete</button>
                    </div>
                })}
            </>
            }
        </div>
    )
}

export default User