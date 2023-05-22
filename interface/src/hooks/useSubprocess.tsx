import { PropsSendDataSubprocess } from "../interfaces/Process";
import api from "../lib/api";
import { capitalize } from "../util/util";

export default function useSubprocess(){
  async function getSubprocess(){
    try {
      const response = await api.get('/subprocess', {
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

  async function getSubprocessById(id: string){
    try {
      const response = await api.get(`/subprocess/${id}`, {
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

  async function handleRegisterSubprocess(data:PropsSendDataSubprocess) {
    console.log(data.name)
    try {
        const response = await api.post('/subprocess', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
        },
          id_process: data.id_process,
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

  async function handleUpdateSubprocess(data:PropsSendDataSubprocess) {
    try {
      const response = await api.put(`/subprocess/${data.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
        },
          name: capitalize(data.name),
          id_process: data.id_process,  
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

  return {getSubprocess, getSubprocessById, handleRegisterSubprocess, handleUpdateSubprocess}
}