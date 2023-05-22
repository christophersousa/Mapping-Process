import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PropsDataProcess, PropsSendDataProcess } from "../../interfaces/Process";
import { capitalize } from "../../util/util";

import { WithContext as ReactTags } from 'react-tag-input';
import { ToastContainer, toast } from "react-toastify";

interface PropsTag{
  id:string;
  text:string;
}

interface PropsForm{
  resgisterProcess: (data:PropsSendDataProcess)=>void;
  data?: PropsDataProcess
}

export function FormProcess({resgisterProcess, data}:PropsForm){
  const [tags, setTags] = useState<PropsTag[]>([]);

  const handleDelete = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleAddition = (tag: PropsTag) => {
    setTags([...tags, tag]);
  };

  // function opne toast
  const notifySucess = () => toast.success('Process created successfully.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    const notifyError = () => toast.error('🚨 Sorry, could not delete.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState:{isValid, errors}
  } = useForm({ mode: "onChange",
  defaultValues : {
    id: '',
    name: '',
    description: '',
    documentation: '',
    system_used: '',
    name_area: '',
    responsibles: tags
  } });
  const onSubmit = async (data:any) => {
    try {
      data.responsibles = tags.map((response) => capitalize(response.text))
      const response = await resgisterProcess(data);
      notifySucess()
    } catch (error:any) {
      notifyError()
    }
  };

  useEffect(() => {
    if(data) {
      setValue('id', data.id);
      setValue('name', data.name),
      setValue('description', data.description)
      setValue('documentation', data.documentation)
      setValue('system_used', data.system_used)
      setValue('name_area', data.Area.name)
      data.Responsible.forEach((response) =>{
        const tag: PropsTag = {
          id : response.name,
          text: response.name
        }
        handleAddition(tag)
      })
    }
  },[data])

  return (
    <form className="mt-12 w-1/2" action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={getValues('name')}
                    onChange={(e)=>{
                      setValue('name', e.target.value, {shouldValidate: true});
                    }}
                    
                    className="capitalize peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="name"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Title
                  </label>
                </div>

                <div className="mt-10 relative">
                  <input
                    id="description"
                    value={getValues('description')}
                    onChange={(e)=>{
                      setValue('description', e.target.value, {shouldValidate: true});
                    }}
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="description"
                    required
                  />
                  <label
                    htmlFor="description"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Description
                  </label>
                </div>

                <div className="mt-10 relative">
                  <label htmlFor="documentation" 
                    className="block mb-2 text-gray-400 dark:text-white">
                    Documentation
                  </label>
                  <textarea 
                    id="documentation" 
                    rows={4} 
                    value={getValues('documentation')}
                    onChange={(e)=>{
                      setValue('documentation', e.target.value, {shouldValidate: true});
                    }}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                      rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                      dark:focus:border-blue-500" 
                    placeholder="Write your documentation here..."
                    required
                    >
                  </textarea>
      
                </div>

                <div className="mt-10 relative">
                  <input
                    id="system_used"
                    type="text"
                    value={getValues('system_used')}
                    onChange={(e)=>{
                      setValue('system_used', e.target.value, {shouldValidate: true});
                    }}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="system_used"
                    required
                  />
                  <label
                    htmlFor="system_used"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    
                  >
                    Used System 
                  </label>
                </div>

                <div className="mt-10 relative">
                  <input
                    id="name_area"
                    type="text"
                    value={getValues('name_area')}
                    onChange={(e)=>{
                      setValue('name_area', e.target.value, {shouldValidate: true});
                    }}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="name_area"
                  />
                  <label
                    htmlFor="name_area"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Area 
                  </label>
                </div>

                <ReactTags
                      tags={tags}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      placeholder="Responsibles"
                    />

                <input
                  type="submit"
                  value="Rigister"
                  className="mt-10 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />

                {/* Toast */}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
              </form>
  )
}