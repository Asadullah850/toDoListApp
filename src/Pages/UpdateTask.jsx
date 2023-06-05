import React from 'react';
import { Link } from "react-router-dom";
import { useLoaderData } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const UpdateTask = () => {
    const taskData = useLoaderData();
    const { Title, Description, Status } = taskData
    console.log(taskData);

    const handelUpdate = (e) => {
        e.preventDefault()
        const form = e.target
        const Title = form.Title.value
        const Description = form.Description.value
        const Status = form.Status.value
        const updateData = { Title, Description, Status }

        fetch(`http://localhost:3000/alltask/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

    }
    return (
        <div className="w-[50%] h-[95%] mx-auto m-4 rounded-lg shadow-lg border-2">
            <form onSubmit={handelUpdate} className="modal-box">
                <h3 className="font-bold text-lg">Title</h3>
                <input type="text" name='Title' defaultValue={Title} placeholder="Type here Description" className="input input-bordered input-accent w-full" />
                <h3 className="font-bold text-lg mt-2">Description</h3>
                <textarea defaultValue={Description} name='Description' className="textarea textarea-success w-full" placeholder="Bio"></textarea>
                <h3 className="font-bold text-lg">Status</h3>
                <div className="form-control">
                    <div className="input-group ">
                        <select defaultValue={Status} name='Status' className="select select-bordered rounded-lg">
                            <option disabled className='disabled' selected>Pick category</option>
                            <option>Most-Important</option>
                            <option>Important</option>
                            <option>General</option>
                        </select>
                    </div>
                </div>
                <div className=" flex justify-around mt-2">
                    <button type='submit' className="btn btn-outline btn-info">Submit</button>
                    <Link className='p-2 bg-slate-400 rounded-md' to={'/'}>
                        <button>Home</button>
                    </Link>
                
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;