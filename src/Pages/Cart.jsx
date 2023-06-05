import React from 'react';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Cart = ({ taskData }) => {
    // console.log(taskData);
    const { Description, Status, Title, _id } = taskData
    
    const handelDelete = (id) =>{
              fetch(`http://localhost:3000/alltask/${id}`, {
                method:'DELETE'
              })
              .then( res => res.json())
              .then( data =>{
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Delete',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
              })
    }

    AOS.init();
    return (
        <div className="">
            <div className="card w-full bg-base-100 drop-shadow-lg shadow-2xl">
                <div className="p-2" >
                    <h2 className="card-title mt-1">{Title}</h2>
                    <p className='my-2'>{Description}</p>
                    <p className=' border-2 border-blue-200 p-1 rounded-md'>{Status}</p>
                </div>
                <div className=" flex justify-around">
                    <Link to={`update/${_id}`}>
                        <FaEdit className='btn text-6xl text-blue-400'></FaEdit>
                    </Link>
                    <AiFillDelete onClick={()=>handelDelete(_id)} className='btn text-blue-400 text-6xl'></AiFillDelete>
                </div>
            </div>
        </div>
    );
};

export default Cart;