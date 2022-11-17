import axios from 'axios'
import { useEffect, useState } from 'react'
import { UserProps } from '../props/userProps'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { useUserStore } from '../userStore';
import { Account } from '../props/ClientProps';

export const Login = () => {
    const [userLogin, setUserLogin]  = useState({
        cpf: "",
        password:""
    })
    const setAccount = useUserStore(state => state.setAccount)
    const userUrl = "http://localhost:8000/api/user"
    const navigate =  useNavigate();

   
   const verifyLogin = async  (event: any) => {
        event.preventDefault()
        const { data } = await axios.post('http://localhost:8000/api/auth-via-cpf/', userLogin)
        
        if (!data.account_id) {
            Notify.failure('You need to log in first!')
            return
        }
        
        const account = await axios.get('http://localhost:8000/api/account/' + data.account_id)
        
        const accData = account.data as Account
        setAccount(accData)
        navigate(`/${accData.client.user}/home`)
   }

   const onInputChange = (evt:any) => {
        setUserLogin({...userLogin, [evt.target.name]: evt.target.value})

   }
    return(
        <div className="flex flex-col justify-center align-center h-screen items-center my-auto   bg-center w-full ">

            <div className="flex gap-1 text-center align-center justify-center bg-transparent">

                 <h1 className=" font-bold text-blue-600 text-3xl">Welcome</h1>
                 <h1 className="text-black font-bold text-3xl"> back!</h1>
            </div>
    <form className="grid gap-4 mb-6 my-10 md:mx-[20rem] bg-transparent" onSubmit={verifyLogin}>

        <div>
            <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
            <input type="text" name="cpf" onChange={onInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000.000.000-00" />
        </div>  

    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" onChange={onInputChange}  name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
    </div> 
    
    <div className="flex items-start mb-6">
        
        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">New here? <a href="/register" className="text-blue-600 hover:underline dark:text-blue-500 font-bold">Click Here</a>.</label>
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

        </div>
    )
}