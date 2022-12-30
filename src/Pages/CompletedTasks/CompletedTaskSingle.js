import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SmallLoading from '../../component/SmallLoading/SmallLoading';

const CompletedTaskSingle = ({ completedTask, refetch }) => {
    const { _id, name, description, image } = completedTask
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleUncompleteTask = (_id) => {
        setLoading(true)
        const myTask = { name, description, image }

        fetch('https://task-site-server-wdsumayer.vercel.app/myTask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',


            },
            body: JSON.stringify(myTask)
        })
            .then(res => res.json())
            .then(data => {
               navigate('/myTask')
            })

        fetch(`https://task-site-server-wdsumayer.vercel.app/completedTasks/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch()

                }
            })
    }

    const updateCompletedTask = (e) => {
        e.preventDefault()
        const form = e.target;
        const comment = form.comment.value;
        const updatedCompletedTask = {
            comment, name, description, image
        }
       
        fetch(`https://task-site-server-wdsumayer.vercel.app/completedTask/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCompletedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                   refetch()
                   form.reset()
                }
                console.log(data)
            })
    }

    const deleteCompletedTask = (_id) => {
        fetch(`https://task-site-server-wdsumayer.vercel.app/completedTasks/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch()

                }
            })
    }



    return (
        <div className='border p-4 my-4 rounded-1'>
            <div className='row d-flex align-items-md-center'>
                <div className='col-md-3 col-xl-2 d-flex justify-content-center justify-content-md-start'><img style={{ width: '77px', height: '77px', objectFit: 'cover', borderRadius: '100%' }} src={image} alt=''></img></div>
                <div className='col-md-3 col-xl-5 d-flex justify-content-center justify-content-md-start my-3'>{name}</div>
                <div className='col-md-4 col-xl-3'><button onClick={() => handleUncompleteTask(_id)} className='btn btn-secondary rounded-1 w-100 my-2 fw-semibold'>{loading ? <SmallLoading></SmallLoading> : 'Not Completed'}</button></div>
                <div className='col-md-2 col-xl-2'><button onClick={() => deleteCompletedTask(_id)} className='btn btn-secondary w-100 my-2 rounded-1 fw-semibold'>Delete</button></div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='pt-3'>
                       
                      <Form onSubmit={updateCompletedTask}>
                      <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                name='comment'
                                className='rounded-1'
                            />
                            <button className='btn btn-primary mt-3 rounded-1 fw-semibold' type='submit'>Submit</button>
                      </Form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedTaskSingle;