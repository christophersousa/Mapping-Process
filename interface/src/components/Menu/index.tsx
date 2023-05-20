import Logo from "../../assets/logo.png"
export function Menu(){
  return(
      <div className="flex flex-col items-center justify-center w-2/5 bg-violet-500 h-screen gap-4">
          <img src={Logo} alt="Logo" />
          <h1 className="font-bold text-white text-5xl">Mapping Process</h1>
          <p className="font-semibold italic text-white">Prioritize your processes and have better control of your activities</p>
          <button
            className="py-3 px-6 bg-transparent rounded-full text-center 
            text-white font-bold uppercase ring-2 ring-white active:scale-110 
            transition-transform ease-in mt-4"
          >
          Register
        </button>
        <span className="font-semibold text-white cursor-pointer uppercase">Exit</span>
      </div>
  )
}