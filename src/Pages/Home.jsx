import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AiFillPlusCircle } from "react-icons/ai";
import './Home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

import Cart from './Cart';

AOS.init();
const Home = () => {
    const taskAllData = useLoaderData();
    const [task, setTask] = useState(taskAllData)
    var [date, setDate] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    })
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
        fetch(`http://localhost:3000/alltask`, {
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
                console.log(data);
                console.log(inputField);
            }

        })

    }

    return (
        <div className="w-[50%] h-[90%] mx-auto m-4 rounded-lg shadow-lg border-2">
            <div className='relative '>
                <h1 className='mt-2 p-1 text-center text-2xl font-semibold text-blue-400'>Focus on your future</h1>
                <div className="text-end mx-2">
                    <p>{date.toLocaleDateString()}</p> 
                    <p>{date.toLocaleTimeString()}</p>
                </div>
                <div className="divider"></div>
                <div className=" ">
                    <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 px-2 h-[calc(100vh - 5rem)] scrollbar-hide overflow-y-auto h-[70vh]">
                        {
                            task.map(taskData => <Cart taskData={taskData} setTask={setTask}></Cart>)
                        }
                    </div>
                </div>

                {/* Open the modal using ID.showModal() method */}
                <div className=" ">
                    <button className="btn btn-circle w-11 p-0 absolute  bottom-2 right-2 " onClick={() => window.my_modal_1.showModal()}>
                        <AiFillPlusCircle className=' text-4xl text-blue-600'></AiFillPlusCircle>
                    </button>
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