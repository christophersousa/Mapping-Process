import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";



export function SignupForm(){

  const {handleRegisterUser} = useAuth()

  const notifySucess = () => toast.success('Successfully registered user.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    const notifyError = (name: string) => toast.error(`🚨 Sorry, ${name}.`, {
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
  } = useForm({ mode: "onChange",
  defaultValues : {
    name: "",
    email: '',
    password: '',
  } });
  const onSubmit = async (data: any) => {
    try {
      await handleRegisterUser(data)
      notifySucess()
    } catch (error:any) {
      notifyError(error)
    }
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Create account
              </h1>

              <form className="mt-12" action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    required
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    required
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    required
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign up"
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}