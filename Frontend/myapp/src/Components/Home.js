import React, { useState } from 'react'

const Home = ({ users, setUsers, modal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hobby, setHobby] = useState([]);
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("Java");
    const [address, setAddress] = useState("");

    const userData = {
        name: name,
        email: email,
        password: password,
        hobby: hobby,
        gender: gender,
        course: course,
        address: address,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/v1/user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json();
        setUsers(users.concat(data.user));

        setEmail("");
        setName("");
        setPassword("");
        setCourse("");
        setAddress("")
        setGender("");
        setHobby([]);
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

    return (<>
        {!modal &&
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='inner_container'>
                        <p>Enter Your Name</p>
                        <input type='text' placeholder='John' value={name} onChange={(e) => setName(e.target.value)} required={true}></input>
                        <p>Enter Your Email</p>
                        <input type='email' placeholder='John123@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} required={true}></input>
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
                        <select name="course" value={course} onChange={(e) => setCourse(e.target.value)} required={true}>
                            <option value="Java">Java</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="NodeJS">NodeJS</option>
                        </select>
                        <p>Enter Your Password</p>
                        <input type='password' placeholder='John@123' value={password} onChange={(e) => setPassword(e.target.value)} required={true}></input>
                        <p>Enter Your Address</p>
                        <textarea name="address" value={address} placeholder='surat, gujarat...' onChange={(e) => setAddress(e.target.value)} required={true}></textarea>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        }
    </>
    )
}

export default Home