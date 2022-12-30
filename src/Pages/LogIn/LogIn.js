import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/Authprovider/AuthProvider';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GoogleAuthProvider } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SmallLoading from '../../component/SmallLoading/SmallLoading';

const LogIn = () => {

    const {logIn, googleSignIn, loading,setLoading, googleLoading, setGoogleLoading} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    const provider = new GoogleAuthProvider()
    const googleSigning = () => {
        googleSignIn(provider)
        .then(result => {
            const user = result.user
            navigate(from, {replace: true})
            console.log(user)
        })
        .catch(error => {
            console.log(error)
            setGoogleLoading(false)
        })
    }


    const handleLogIn = data => {
        logIn(data.email, data.password)
        .then(result => {
            const user = result.user
            console.log(user)
            navigate(from, {replace: true})
           
        })
        .catch(error => {
            console.log(error)
           
            setLoading(false)
        })
    } 

    return (
        <div className='container'>
        <div className='row'>
            <div className='col-12 col-md-2 col-lg-3'></div>
            <div className='col-12 col-md-8 col-lg-6'>
                <div className='mt-5'>
                    <Form onSubmit={handleSubmit(handleLogIn)}>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <input {...register('email', { required: 'email is required' })} type="email" placeholder="email" className="form-control rounded-1" />
                            {errors.email && <span className='text-red-500'>{errors.email?.message}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <input {...register('password', {
                                required: 'password is required',
                                minLength: { value: 6, message: "must be at least 6 character" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password pattern must be strong' }
                            })} type="password" placeholder="password" className="form-control rounded-1" />
                            {errors.password && <span className='text-red-500'>{errors.password?.message}</span>}
                        </Form.Group>

                        <Button className='rounded-1 w-100 fw-semibold' variant="primary" type="submit">
                           {
                            loading ? <SmallLoading></SmallLoading> : 'LogIn'
                           }
                        </Button>
                        <p className='mt-1'>Please create an account <Link className='text-primary' to='/signUp'>SignUp</Link></p>
                    </Form>
                    <div>
                            <button onClick={googleSigning} className='btn btn-secondary border-1 bg-white text-dark hover:bg-white fw-semibold w-100 rounded-1'>{googleLoading ? <SmallLoading></SmallLoading> : 'Google'}</button>
                        </div>
                </div>
            </div>
            <div className='col-12 col-md-2 col-lg-6'></div>
        </div>

    </div>
    );
};

export default LogIn;