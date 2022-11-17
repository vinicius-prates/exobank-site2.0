import axios from "axios";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useUserStore } from "../userStore"



export const UserPage = () => {


    const account = useUserStore(state => state.userAccount)

    const navigate = useNavigate()
    useEffect(() => {
        
        if (!account){
            Notify.failure("You need to loggin first!")
            navigate("/login")
            return
        }
        
    },[])
    
    const [accData, setAccData] = useState<{}>({})
    return(
        <div>
            
        </div>
    )
    }