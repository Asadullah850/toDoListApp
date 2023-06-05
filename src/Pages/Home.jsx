import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AiFillPlusCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import './Home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

import Cart from './Cart';
import { AuthContext } from './AuthProvider';

AOS.init();
const Home = () => {
    const taskAllData = useLoaderData();
    const { user, googleSingInUser, userSingOut } = useContext(AuthContext)
    const [task, setTask] = useState(taskAllData)
    var [date, setDate] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    })
    const logout = () => {
        userSingOut()
            .then(() => {
                // Sign-out successful.
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Your are logout',
                    showConfirmButton: false,
                    // timer: 1500
                })
            })
            .catch((error) => {
                // An error happened.
            });
    }
    const googleSingIn = () => {
        googleSingInUser()
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    const handelSubmit = (event) => {

        const form = event.target;
        const title = form.Title.value;
        const Status = form.Status.value;
        const Description = form.Description.value;
        const inputField = {
            Title: title,
            Status: Status,
            Description: Description,
        }
        fetch(`https://task-management-server-lilac-one.vercel.app/alltask`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(inputField)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Your work saved',
                    showConfirmButton: false,
                    timer: 1000
                })
            }

        })

    }

    return (
        <div className="w-[50%] h-[90%] mx-auto m-4 rounded-lg shadow-lg border-2">
            <div className='relative '>
                <h1 className='mt-2 p-1 text-center text-2xl font-semibold text-blue-400'>Focus on your future</h1>
                <div className="flex justify-between mx-2">
                    <div className="">
                        {
                            user ?
                                <>
                                    <p>{user.displayName}</p>
                                    <button className='btn bg-blue-500 p-1 my-2' onClick={logout}>Logout</button>
                                </>
                                :
                                <>

                                </>
                        }
                    </div>
                    <div className="">
                        <p>{date.toLocaleDateString()}</p>
                        <p>{date.toLocaleTimeString()}</p>
                    </div>
                </div>
                <div className="divider"></div>
                <div className=" ">
                    <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 px-2 h-[calc(100vh - 5rem)] scrollbar-hide overflow-y-auto h-[70vh]">
                        {
                            task.map(taskData => <Cart taskData={taskData}></Cart>)
                        }
                    </div>
                </div>

                {/* Open the modal using ID.showModal() method */}
                <div className=" ">
                    {
                        user ?
                            <>
                                <button className="btn btn-circle w-11 p-0 absolute  bottom-2 right-2 " onClick={() => window.my_modal_1.showModal()}>
                                    <AiFillPlusCircle className=' text-4xl text-blue-600'></AiFillPlusCircle>
                                </button>
                            </>
                            :
                            <>
                                <button className="btn btn-circle w-11 p-0 absolute  bottom-2 right-2 " onClick={googleSingIn}>
                                    <FcGoogle className=' text-4xl text-blue-600'></FcGoogle>
                                </button>
                            </>
                    }
                </div>
                <dialog id="my_modal_1" className="modal">
                    <form onSubmit={handelSubmit} method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Title</h3>
                        <input type="text" name='Title' placeholder="Type here Description" className="input border-blue-300 border-2 w-full" />
                        <h3 className="font-bold text-lg mt-4">Description</h3>
                        <textarea name='Description' className="textarea border-blue-300 border-2 w-full" placeholder="Bio"></textarea>
                        <h3 className="font-bold text-lg">Status</h3>
                        <div className="form-control">
                            <div className="input-group ">
                                <select name='Status' className="select select-bordered rounded-lg">
                                    <option>Most-Important</option>
                                    <option>Important</option>
                                    <option>General</option>
                                </select>
                            </div>
                        </div>
                        <div className=" flex justify-end modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button type='submit' className="btn btn-outline btn-info">Submit</button>
                            <button className="btn border-2 border-blue-400">Close</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Home;