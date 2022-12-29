import { useQuery } from '@tanstack/react-query';
import React from 'react';
import EditModal from '../../component/EditModal/EditModal';
import Loading from '../../component/Loading/Loading';
import CompletedTaskSingle from './CompletedTaskSingle';

const CompletedTasks = () => {

    const { data: completedTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completedTasks'],
        queryFn: async () => {

            const res = await fetch('https://task-site-server-wdsumayer.vercel.app/completedTasks')
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
                <div className='col-12 col-md-12 col-lg-2'></div>
                <div className='col-12 col-md-12 col-lg-8'>
                    <div>
                        { completedTasks.length === 0 ? <h1>No completed task here.</h1>
                        :
                            completedTasks.map(completedTask => <CompletedTaskSingle key={completedTask._id} completedTask={completedTask} refetch={refetch}></CompletedTaskSingle>)
                        }
                    </div>
                </div>
                <div className='col-12 col-md-12 col-lg-2'></div>
                
            </div>

        </div>
    );
};

export default CompletedTasks;