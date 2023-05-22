import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/authContext"
import { PropsDataProcess } from "../../interfaces/Process"
import { Menu } from "../../components/Menu"
import { Paginated } from "../../components/Paginated"
import { RegisterProcess } from "../../components/RegisterProcess"
import useSubprocess from "../../hooks/useSubprocess"
import { useSearchParams } from "react-router-dom"
import useProcess from "../../hooks/useProcess"
import { passedDate } from "../../util/util"
import { ToastContainer, toast } from "react-toastify"
import Popup from "../../components/Popup"



export function Process(){
  const [readProcess, setReadProcess] = useState<PropsDataProcess>()
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [modalUpdateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
  const [params, setParams] = useState<string|null>()
  const [showModal, setShowModal] = useState(false);

  const {process, getSubprocessId, getProcessId} = useContext(Context)
  const{handleRegisterSubprocess, handleUpdateSubprocess, deleteSubprocess} = useSubprocess()
  const {handleUpdateProcess, deleteProcess} = useProcess()
  const [searchParams] = useSearchParams()

  //Click in card of subprocess
  async function handleClick(id: string){
    try {
     await getSubprocessId(id, 'subprocess')
    } catch (error:any) {
      alert(error.message)
    }
  }

  //set value the state read process
  function readGetProcess(){
    setReadProcess(process)
  }

  async function handleDelete(id:string){
    if(params == 'process'){
      try {
        deleteProcess(id)
      } catch (error) {
        alert(error)
      }
    }else{
      try {
        deleteSubprocess(id)
        alert('sucess')
      } catch (error) {
        alert('error')
      }
    }
  }

  // Function Open modal
  function openModal() {
    setIsOpen(true);
  }

  function openModalUpdate() {
    setUpdateIsOpen(true);
  }

  // Function close modal
  function closeModal() {
    setIsOpen(false);
    // getProcessId(readProcess?.id ?? '', params ?? '')
  }
  function closeUpdateModal() {
    setUpdateIsOpen(false);
  }

  useEffect(()=>{
    readGetProcess()
    setParams(searchParams.get('title')) 
  },[])

  return(
    <div className="flex">
      {/* List process */}
      <div className="flex flex-col items-center h-screen w-screen gap-6 pt-14 overflow-y-scroll scrollbar-hide relative">
          <span 
            className=" absolute right-12 text-xl cursor-pointer" 
            title="Edit"
            onClick={()=>openModalUpdate()}
            >
              📝
            </span>
            <span 
            className=" absolute right-5 text-xl cursor-pointer" 
            title="delete"
            onClick={()=>setShowModal(true)}
            >
              🗑️
            </span>
          <div className="flex flex-col items-center gap-2 w-1/2">
              <h1 className="font-bold text-center text-violet-500 text-4xl">{readProcess?.name}</h1>              
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
              <div className="px-10 text-slate-600 flex gap-4">
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
      
      <Popup
        showModal={showModal}
        setShowModal={setShowModal}
        handleClickPopup={()=>handleDelete(readProcess?.id || '')}
      />

      
        {/* Same as */}

      {/* Menu */}
        <Menu
          title={readProcess?.name || ''}
          text={readProcess?.description || ''}
          text_button="Register subprocess"
          type_interaction="home"
          openModal={openModal}
        />

        {/* Model */}
        <RegisterProcess
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          resgisterProcess={handleRegisterSubprocess}
          tag="subprocess"
          id={readProcess?.id}
        />

        {/* Modal Update */}
        {params == 'process' ? (
          <RegisterProcess
          modalIsOpen={modalUpdateIsOpen}
          closeModal={closeUpdateModal}
          resgisterProcess={handleUpdateProcess}
          tag="process"
          data={readProcess}
        />
        ):(
          <RegisterProcess
          modalIsOpen={modalUpdateIsOpen}
          closeModal={closeUpdateModal}
          resgisterProcess={handleUpdateSubprocess}
          tag="subprocess"
          id={readProcess?.id_process}
          data={readProcess}
        />
        )}
    </div>
  )
}