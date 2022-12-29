import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MyTaskDetails = () => {
    const myTask = useLoaderData()
    const {name, description, image} = myTask
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-1 col-lg-2'></div>
                <div className='col-12 col-md-10 col-lg-8'>
                    <div className='d-flex justify-content-center mt-5'>
                        <Card style={{ width: '18rem' }}>
                           <div className='w-100 d-flex justify-content-center'>
                           <Card.Img style={{width: '150px', height: '150px', borderRadius: '100%', objectFit: 'cover'}} variant="top" src={image} />
                           </div>
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>
                                    {
                                        description
                                    }
                                </Card.Text>
                               <Link to='/myTask'> <Button variant="primary">Go Back</Button></Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='col-12 col-md-1 col-lg-2'></div>
            </div>
        </div>
    );
};

export default MyTaskDetails;