import axios from 'axios';
import React, { createContext, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

interface VerifyUserProps {
    children : React.ReactNode;
}

interface VerifyUserValue {
    user : string;
    setUser?: React.Dispatch<React.SetStateAction<string>>;
    verifyUser: () => Promise<void>;
}

const VerifyUserContext = createContext<VerifyUserValue | null>(null);

export const VerifyUserProvider : React.FC<VerifyUserProps> = (props) => {
    const navigate = useNavigate();
    const [user,setUser] = useState<string>("")
    const axiosConfig = {
        headers: {
          'authtoken': localStorage.getItem("authtoken")
        }
    };
    const verifyUser = async () => {
        if(localStorage.getItem("authtoken"))
        {
            await axios.get("http://localhost:5000/verify/verifyapi",axiosConfig)
            .then((response : any) => {
                if(response.data.role)
                {
                    let l = response.data.role;
                    setUser(response.data.name);
                    navigate(`/${l.toLowerCase()}_home`)
                }
            })
        }
        else {
            navigate("/")
        }
    };
    return (
        <VerifyUserContext.Provider value={{user,verifyUser}}>
            {props.children}
        </VerifyUserContext.Provider>
    )
}

export const useUrlShortener = () => {
    const context = useContext(VerifyUserContext);
    if (!context) {
      throw new Error('useUrlShortener must be used within a VerifyUserProvider');
    }
    return context;
};