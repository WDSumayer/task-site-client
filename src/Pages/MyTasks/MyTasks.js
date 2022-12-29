import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../component/Loading/Loading';
import MyTaskSingle from './MyTaskSingle';

const MyTasks = () => {

    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['myTasks'],
        queryFn: async () => {

            const res = await fetch('https://task-site-server-wdsumayer.vercel.app/myTasks')
            const data = await res.json()

            return data



        }

    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-12 col-lg-1 col-xl-2'></div>
                <div className='col-12 col-md-12 col-lg-10 col-xl-8'>
                    <div>
                        { myTasks.length === 0 ? <h1>No task here.</h1>
                        :
                            myTasks.map(myTask => <MyTaskSingle key={myTask._id} myTask={myTask} refetch={refetch}></MyTaskSingle>)
                        }
                    </div>
                </div>
                <div className='col-12 col-md-12 col-lg-1 col-xl-2'></div>
            </div>

        </div>
    );
};

export default MyTasks;