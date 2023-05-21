import { useContext } from "react";
import Logo from "../../assets/logo.png"
import { Context } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

interface PropsMenu{
  title: string;
  text: string;
  text_button: string;
  type_interaction: string;
}

export function Menu({title, text, text_button, type_interaction}:PropsMenu){

  const navigate = useNavigate()

  const {handleLogout} = useContext(Context)

  function handleNavigate(){
    navigate("/home")
  }

  return(
      <div className="flex flex-col items-center justify-center w-2/5 bg-violet-500 h-screen gap-4">
          <img src={Logo} alt="Logo" />
          <h1 className="font-bold text-white text-4xl">{title}</h1>
          <p className="font-semibold italic text-white">{text}</p>
          <button
            className="py-3 px-6 bg-transparent rounded-full text-center 
            text-white font-bold uppercase ring-2 ring-white active:scale-110 
            transition-transform ease-in mt-4"
            
          >
          {text_button}
        </button>

        {type_interaction === 'exit'?(
          <span 
          onClick={()=>handleLogout()}
          className="font-semibold text-white cursor-pointer uppercase"
          >
            Exit
          </span>
        ):(
          <span 
            onClick={()=>handleNavigate()}
            className="font-semibold text-white cursor-pointer uppercase"
            >
              Home
            </span>
        )}
      </div>
  )
}