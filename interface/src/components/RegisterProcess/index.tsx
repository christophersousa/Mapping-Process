import { PropsSendDataProcess } from '../../interfaces/Process';
import { FormProcess } from '../FormProcess';
import Modal from 'react-modal';
import "./style.css"
import { FormSubprocess } from '../FormSubprocess';

interface PropsRegister{
  modalIsOpen: boolean;
  closeModal: ()=>void;
  resgisterProcess: (data:any)=>void;
  tag: string;
  id?: string;
  data?: any;
}


export function RegisterProcess({modalIsOpen, closeModal, resgisterProcess, tag, id, data}:PropsRegister){

  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de exemplo"
        ariaHideApp={false}
      >
        <div className="flex flex-col items-center gap-2 pt-4">
            <button className='absolute right-4 top-4' onClick={closeModal}>✖️</button>

              <h1 className="font-bold text-violet-500 text-4xl">
                {tag == 'process' ? (
                    "Register your process"
                ):(
                  "Register your subprocess"
                )}
                
              
              </h1>
              <p className="text-slate-500 text-xl">Record your activities and follow your development</p>
              {tag == 'process' ? (
                  <FormProcess
                  resgisterProcess={resgisterProcess}
                  data={data}
                />
              ):(
                <FormSubprocess
                  id_process={id}
                  resgisterProcess={resgisterProcess}
                  data={data}
                />
              )}
              
        </div>
      </Modal>
    )
}