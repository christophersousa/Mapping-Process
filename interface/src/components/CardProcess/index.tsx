import { PropsProcess } from "../../interfaces/Process";

export function CardProcess({id,name, documentation, diffd_ays, handleClick}:PropsProcess){

  return(
    <div className="w-4/5 bg-gray-100 px-8 py-4 flex flex-col gap-2 rounded text-slate-700">
      <h1 className="font-bold text-xl">{name}</h1>
      <span className="text-slate-600 text-xs">Published {diffd_ays} days ago</span>
      <p className="text-slate-600">{documentation}</p>
      <span 
        onClick={()=>handleClick(id)}
        className="text-lime-500 text-ms cursor-pointer"
      >
        Read more →
      </span>
    </div>
  )
}