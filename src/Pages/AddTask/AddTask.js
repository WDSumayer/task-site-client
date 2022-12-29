import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import './AddTask.css'

const AddTask = () => {

    const [error, setError] = useState(null)
   

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleAddTask = (data) => {
       
        const name = data.name;
        const description = data.description;
        const image = data.image[0];
        

        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData,
          })
            .then((res) => res.json())
            .then(imgData => {
                console.log(imgData)
                if(imgData.success){
                    const product = {
                       name, description, image: imgData.data.url
                    }
                    fetch('https://task-site-server-wdsumayer.vercel.app/myTask', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
            
            
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            reset()
                        })
            
                
                }
                })
    
            }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-3'></div>
                <div className='col-12 col-md-6'>
                   <div className='add-task-form'>
                   <Form onSubmit={handleSubmit(handleAddTask)}>
                        <Form.Group className="mb-3">
                            <Form.Label className='fw-semibold'>Task Name</Form.Label>
                            <Form.Control type="text" className={error ? 'rounded-1 bg-danger' : 'rounded-1'} placeholder='Your Task Name' {...register("name", { required: 'name is required' })} />
                            {errors.name && <p className='text-danger'>{errors.name?.message}</p>}
                           
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='fw-semibold'>Image</Form.Label>
                            <Form.Control type="file" className='rouneded-1' {...register("image", { required: 'image is required' })} />
                            {errors.image && <p className='text-darnger'>{errors.image?.message}</p>}
                        </Form.Group>
                      
                        <Form.Group className="mb-3">
                            <Form.Label className='fw-semibold'>Description</Form.Label>
                            <Form.Control as="textarea" className='rouneded-1' placeholder='Write Something' {...register("description", { required: 'description is required' })} rows={3} />
                            {errors.description && <p className='text-danger'>{errors.description?.message}</p>}
                        </Form.Group>
                       
                        <Button className='w-100 rounded-1 fw-semibold' type="submit">Add task</Button>
                    </Form>
                   </div>
                </div>
                <div className='col-12 col-md-3'></div>
            </div>

        </div>
    );
};

export default AddTask;