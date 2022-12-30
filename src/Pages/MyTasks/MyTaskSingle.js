import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditModal from '../../component/EditModal/EditModal';
import Button from 'react-bootstrap/Button';
import { FaEdit,FaTrash } from "react-icons/fa";
import SmallLoading from '../../component/SmallLoading/SmallLoading';
import { AuthContext } from '../../contexts/Authprovider/AuthProvider';

const MyTaskSingle = ({myTask, refetch}) => {
    const {_id, name, description, image} = myTask
    const [modalShow, setModalShow] = React.useState(false);
    const [loading, setLoading] = useState(false)
     const navigate = useNavigate()

    const handleCompleteTask = _id => {
       setLoading(true)
       
        const completedTask = {name, description, image}
        
        fetch('https://task-site-server-wdsumayer.vercel.app/completedTasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',


            },
            body: JSON.stringify(completedTask)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/completedTask')
                console.log(data)
            })

            fetch(`https://task-site-server-wdsumayer.vercel.app/myTask/${_id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                 
                   
                    refetch()
                }
            })
    }


    const handleDelete = (_id) => {
        fetch(`https://task-site-server-wdsumayer.vercel.app/myTask/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
             
                refetch()
            }
        })
    }



    return (
       <div className='border rounded-1 p-4 my-4'>
         <div className='row d-flex align-items-md-center'>
            <div className='col-12 col-md-2 col-xl-2 d-flex justify-content-center justify-content-md-start'><img style={{width:'65px', height: '65px', objectFit: 'cover', borderRadius: '100%'}} src={image} alt=''></img></div>
            <div className='col-12 col-md-3 col-xl-4 d-flex justify-content-center justify-content-md-start my-3'>{name}</div>
            <div className='col-12 col-md-2 col-xl-2 d-flex justify-content-center justify-content-md-start'><Link to={`/myTaskDetails/${_id}`} className='w-100 my-2'><button className='btn btn-primary w-100 rounded-1 fw-semibold'>Details</button></Link></div>
            <div className='col-12 col-md-3 col-xl-2 d-flex justify-content-center justify-content-md-start'><button onClick={() => handleCompleteTask(_id)} className='btn btn-primary w-100 rounded-1 fw-semibold'>{loading ? <SmallLoading></SmallLoading> : 'Complete'}</button></div>
            <div className='col-12 col-md-1 col-xl-1 d-flex justify-content-center justify-content-md-start'><Button variant='outline-secondary' className='w-100 my-2 rounded-1 fw-semibold' onClick={() => setModalShow(true)}><FaEdit /></Button></div>
            <div className='col-12 col-md-1 col-xl-1 d-flex justify-content-center justify-content-md-start'><Button variant='outline-secondary' className='w-100 my-2 rounded-1 fw-semibold' onClick={() => handleDelete(_id)}><FaTrash /></Button></div>
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        myTask={myTask}
        refetch={refetch}
        button={'Edit'}
      />
        </div>
       
       </div>
    );
};

export default MyTaskSingle;