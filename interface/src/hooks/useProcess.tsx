import api from "../lib/api";

export default function useProcess(){
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
      const response = await api.get('/process', {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
      },
      params: id
      });

      return response.data

    } catch (error) {
      throw new Error("email or password are incorrect.");
    }
  }

  return {getProcess, getProcessById}
}