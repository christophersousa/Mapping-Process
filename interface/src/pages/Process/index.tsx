import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/authContext"
import { PropsDataProcess } from "../../interfaces/Process"
import { Menu } from "../../components/Menu"
import { Paginated } from "../../components/Paginated"


export function Process(){
  const [readProcess, setReadProcess] = useState<PropsDataProcess>()
  const {process, getSubprocessId} = useContext(Context)

  async function handleClick(id: string){
    try {
     await getSubprocessId(id)
    } catch (error:any) {
      alert(error.message)
    }
  }

  function readGetProcess(){
    setReadProcess(process)
    console.log(readProcess)
  }

  function passedDate(date: string){
    return new Date(date).toLocaleDateString('BRL', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  useEffect(()=>{
    readGetProcess()
  },[process])

  return(
    <div className="flex">
      {/* List process */}
      <div className="flex flex-col items-center h-screen w-screen gap-6 pt-14 overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col items-center gap-2 w-1/2">
              <h1 className="font-bold text-violet-500 text-4xl">{readProcess?.name}</h1>              
          </div>
          <div className=" flex flex-col gap-4 px-12 py-6 w-full h-full">
            <h1 className="text-slate-600">Published {passedDate(readProcess?.created_at||'')}</h1>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl">Description:</h1>
              <p className="px-10 text-slate-600" >{readProcess?.description}</p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl">Documentation:</h1>
              <p className="px-10 text-slate-600" >{readProcess?.documentation}</p>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-xl">Responsable:</h1>
              <div className="px-10 text-slate-600">
                {readProcess?.Responsible?.map((response, index)=>(
                  <span key={index} className="font-semibold py-2 px-4 bg-gray-100 rounded capitalize">{response.name}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-xl">Area:</h1>
              <div className="px-10 text-slate-600">
                {readProcess?.Area?.name && 
                <span className="font-semibold py-2 px-4 bg-gray-100 rounded capitalize" >
                  {readProcess?.Area?.name}
                </span>}
                
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl">Subprocess:</h1>
              <div className="px-10 text-slate-600">
              <div className=" flex flex-col gap-4 items-center py-6 w-full h-full">

                <Paginated
                  itemsPerPage={3}
                  cardsProcessed={readProcess?.Subprocess || []}
                  handleClick={handleClick}
                />
              </div>
              </div>
            </div>
          </div>
          
      </div>
      {/* Menu */}
        <Menu
          title={readProcess?.name || ''}
          text={readProcess?.description || ''}
          text_button="Register subprocess"
          type_interaction="home"
        />
      
    </div>
  )
}