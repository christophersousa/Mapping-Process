import { useNavigate } from "react-router-dom";
import { PropsSendDataProcess } from "../interfaces/Process";
import api from "../lib/api";
import { capitalize } from "../util/util";

export default function useProcess(){

  const navigate = useNavigate()

  async function getProcess(){
    try {
      const response = await api.get('/process', {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
      }
      });

      return response.data

    } catch (error) {
      throw new Error("email or password are incorrect.");
    }
  }

  async function getProcessById(id: string){
    try {
      const response = await api.get(`/process/${id}`, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
      },
  
      });

      return response.data

    } catch (error) {
      throw new Error("email or password are incorrect.");
    }
  }

  async function handleRegisterProcess(data:PropsSendDataProcess) {
    console.log(data.name)
    try {
        const response = await api.post('/process', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
        },
          name: capitalize(data.name),  
          description: data.description,
          documentation: data.documentation,
          system_used: data.system_used,
          name_area: data.name_area,
          responsibles: data.responsibles
        });
    
        return response
      } catch (error:any) {
        throw new Error(error.message);
      }
  }

  async function handleUpdateProcess(data:PropsSendDataProcess) {
    try {
      const response = await api.put(`/process/${data.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
        },
          name: capitalize(data.name),  
          description: data.description,
          documentation: data.documentation,
          system_used: data.system_used,
          name_area: data.name_area,
          responsibles: data.responsibles
        });
    
        return response
      } catch (error:any) {
        throw new Error(error.message);
      }
  }

  async function deleteProcess(id:string){
    try {
      const response = await api.delete(`/process/${id}`, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
      }
      });

      navigate('/home')

    } catch (error) {
      throw new Error("email or password are incorrect.");
    }
  }

  return {getProcess, getProcessById, handleRegisterProcess, handleUpdateProcess, deleteProcess}
}