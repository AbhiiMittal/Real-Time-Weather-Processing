import { useNavigate } from "react-router-dom";

export default function LogOut(){
    const handleLogout = async()=>{
        try{
            localStorage.removeItem('token');
            navigate('/login');
        }catch(err){
            console.error(err);
        }
    }
    const navigate = useNavigate();
    return (
        <div>
        <button className="logout-btn" onClick={handleLogout}>logout</button>
        </div>
    );
}