import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTasks from "../../Pages/CompletedTasks/CompletedTasks";
import LogIn from "../../Pages/LogIn/LogIn";
import MyTaskDetails from "../../Pages/MyTaskDetails/MyTaskDetails";
import MyTasks from "../../Pages/MyTasks/MyTasks";
import SignIn from "../../Pages/SignIn/SignIn";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>, children: [
            {
               path: '/', element: <AddTask></AddTask> 
            },
            {
                path: '/myTask',
               
                element: <MyTasks></MyTasks>
            },
            {
                path: '/completedTask', element: <CompletedTasks></CompletedTasks>
            },
            {
                path: '/myTaskDetails/:id',
                loader: ({params}) => fetch(`https://task-site-server-wdsumayer.vercel.app/myTask/${params.id}`),
                element: <PrivateRouter><MyTaskDetails></MyTaskDetails> </PrivateRouter>
            },
            {
                path: '/signUp', element: <SignIn></SignIn>
            },
            {
                path: '/logIn', element: <LogIn></LogIn>
            }
        ]
    }
])
export default router;