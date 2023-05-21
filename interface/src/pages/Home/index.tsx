import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/authContext"

import useProcess from "../../hooks/useProcess";
import { Paginated } from "../../components/Paginated";
import { PropsProcess } from "../../interfaces/Process";
import { Menu } from "../../components/Menu";

const menu_label = {
  title: "Mapping Process",
  text: "Prioritize your processes and have better control of your activities",
  text_button: "Register"
}

export function Home(){
  const [process, setProcess] = useState<PropsProcess[]>([])
  const {getProcessId} = useContext(Context)
  const {getProcess} = useProcess()

  async function handleClick(id: string){
    try {
     await getProcessId(id)
    } catch (error:any) {
      alert(error.message)
    }
  }

  async function getData(){

    try {
      const response = await getProcess()
      setProcess(response)
    } catch (error:any) {
      console.log("Debug",error.message)
    }
    
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <div className="flex">
      {/* Menu */}
        <Menu
          title={menu_label.title}
          text={menu_label.text}
          text_button={menu_label.text_button}
          type_interaction="register"
        />
      {/* List process */}
      <div className="flex flex-col items-center h-screen w-screen gap-6 pt-14">
          <div className="flex flex-col items-center gap-2 w-1/2">
              <h1 className="font-bold text-violet-500 text-4xl">Processes - list of your records</h1>
              <p className="text-slate-500 text-xl">Remember your registration processes and monitor your activities</p>
              <div className="w-full flex justify-center gap-2 mt-6">
                 <div className="relative w-full">
                    <input
                      id="search"
                      type="text"
                      name="search"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                      placeholder="Search process"
                    />
                    <label
                      htmlFor="search"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Search process
                    </label>
                  </div>
                  <button
                    className="py-2 px-8 uppercase rounded-full 
                    bg-indigo-600 hover:bg-indigo-500 text-white font-semibold 
                    text-center block focus:outline-none focus:ring 
                    focus:ring-offset-2 focus:ring-indigo-500 
                    focus:ring-opacity-80"
                  >
                    Search
                  </button>
    
              </div>
          </div>
          <div className=" flex flex-col gap-4 items-center py-6 w-full h-full">

            <Paginated
              itemsPerPage={3}
              cardsProcessed={process}
              handleClick={handleClick}
            />
          </div>
          
      </div>
    </div>
  )
}