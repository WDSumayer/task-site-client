
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



const EditModal = (props) => {
    const { _id, name, description, image } = props.myTask

    const handleEdit = (e) => {
        e.preventDefault()
        props.onHide()

        const form = e.target;
        const updatedName = form.name.value;
        const updatedDescription = form.description.value;
    
        const updatedTask = {
            name: updatedName, description: updatedDescription
        }


        fetch(`https://task-site-server-wdsumayer.vercel.app/myTask/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    props.refetch()
                }
                console.log(data)
            })

    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

           

            <Modal.Body>
            <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={name}
                name="name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' name="description" defaultValue={description} />
            </Form.Group>
            <Form.Group
              className="mb-3">
              <Button variant='primary' className='w-100' type='submit'>{props.button}</Button>
            </Form.Group>

          </Form>

            </Modal.Body>


        </Modal>
    );
};

export default EditModal;