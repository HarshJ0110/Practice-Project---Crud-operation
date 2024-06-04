import React, { useState } from 'react'

const Modal = ({ users, setUsers ,currentUser, modal, setModal}) => {
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [hobby, setHobby] = useState(currentUser.hobby);
    const [gender, setGender] = useState(currentUser.gender);
    const [course, setCourse] = useState(currentUser.course);
    const [address, setAddress] = useState(currentUser.address);
 
    const userData = {
        name: name,
        email: email,
        password: password,
        hobby: hobby,
        gender: gender,
        course: course,
        address: address,
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:4000/api/v1/users/${currentUser._id}`,{
            method: "POST",
            headers:{
                "Content-type":"application/json", 
            },
            body: JSON.stringify(userData)
        })        

        let updatedUser = JSON.parse(JSON.stringify(users))
        for(let i = 0; i < users.length; i++){
            const element = users[i];
            if(element._id === currentUser._id){
                updatedUser[i].name = name;
                updatedUser[i].email = email;
                updatedUser[i].hobby = hobby;
                updatedUser[i].gender = gender;
                updatedUser[i].course = course;
                updatedUser[i].password = password;
                updatedUser[i].address = address;
                // console.log(updatedUser[i]);
                break;
            }
        }
        setUsers(updatedUser)
        setModal(!modal);
    }

    const hobbyHandler = (e) => {
        const { name, checked } = e.target;
        setHobby((prev) => {
            if (checked) {
                return [...prev, name]
            } else {
                return prev.filter((hobby) => name !== hobby)
            }
        })
    }

    return (
        <div className='container'>
            <div className='inner_container'>
                <p>Enter Your Name</p>
                <input type='text' placeholder='John' value={name} onChange={(e) => setName(e.target.value)}></input>
                <p>Enter Your Email</p>
                <input type='email' placeholder='John123@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <p>Select Your Hobby</p>
                <div>
                    <label>Cricket</label>
                    <input type='checkbox' checked={hobby.includes("cricket")} name="cricket" onChange={hobbyHandler}></input>
                    <label>Football</label>
                    <input type='checkbox' checked={hobby.includes("football")} name="football" onChange={hobbyHandler}></input>
                </div>
                <p>Select Your Gender</p>
                <div>
                    <label>male</label>
                    <input type='radio' value={"male"} name="gender" checked={gender === "male"} onChange={(e) => setGender(e.target.value)}></input>
                    <label>female</label>
                    <input type='radio' value={"female"} name="gender" checked={gender === "female"} onChange={(e) => setGender(e.target.value)}></input>
                </div>
                <p>Select Course</p>
                <select name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="NodeJS">NodeJS</option>
                </select>
                <p>Enter Your Password</p>
                <input type='password' placeholder='John@123' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <p>Enter Your Address</p>
                <textarea name="address" value={address} placeholder='surat, gujarat...' onChange={(e) => setAddress(e.target.value)}></textarea>
                <button type="submit" onClick={handleUpdate}>Update</button>
                <button type="button" onClick={()=>(setModal(!modal))} >Cancel</button>
            </div>
        </div>
    )
}

export default Modal