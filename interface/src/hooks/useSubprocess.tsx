import api from "../lib/api";

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

  return {getSubprocess, getSubprocessById}
}