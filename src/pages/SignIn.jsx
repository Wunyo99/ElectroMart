import {
  Eye,
  EyeClosed,
  Lock,
  Mail,
  MoveRight,
  User,
  Phone,
} from "lucide-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const [mode, setMode] = useState("signin");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVissible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);

  const navigate = useNavigate();

  const { handleLogin, handleSignup } = useContext(AuthContext);

  const isSignIn = mode === "signin";

  const switchToSignIn = () => {
    setMode("signin");
    setForgotPassword(false);
  };

  const switchToSignUp = () => {
    setMode("signup");
    setForgotPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    const name = data.name
    const email = data.email;
    const phone = data.phone
    const password = data.password;

    if (!isSignIn && password !== data.confirmPassword) {
      setPasswordNotEqual(true);
      return;
    }

    if (forgotPassword) {
      toast.success("Wait a minute");
      return;
    }

    try {
      if (isSignIn) {
        await handleLogin(email, password);
        navigate("/");
      } else {
        await handleSignup(name, email, phone , password);
        setMode("signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVissible(!isPasswordVisible);
  };
  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const logo = (
    <p className="font-bold text-black">
      <span className="text-teal-500">Electro</span>Mart
    </p>
  );

  return (
    <>
      <div>
        <div className="p-5 bg-white shadow-sm sticky top-0 w-full z-50">
          <Link className="text-2xl" to="/">
            {logo}
          </Link>
        </div>

        <div className="py-10 px-4">
          <div className="max-w-xl lg:w-1/3 mx-auto mt-10 border border-gray-300 rounded-4xl bg-white shadow-2xl py-5 px-10">
            <h1 className="text-2xl text-center mb-6">
              {forgotPassword ? (
                <p className="font-medium">
                  We'll send you a verification code to the email
                </p>
              ) : (
                <p className="text-2xl font-bold">
                  {isSignIn ? "Welcome Back" : "Create your account"}
                </p>
              )}
            </h1>

            {!forgotPassword && (
              <div className="flex w-fit mx-auto items-center gap-10 justify-center rounded-full bg-gray-100">
                <button
                  onClick={switchToSignIn}
                  className={`py-3 px-5 font-medium rounded-full cursor-pointer ${
                    isSignIn ? "bg-teal-500 text-white" : "text-black"
                  }`}
                >
                  Sign In
                </button>

                <button
                  onClick={switchToSignUp}
                  className={`py-3 px-5 font-medium rounded-full cursor-pointer ${
                    !isSignIn ? "bg-teal-500 text-white" : "text-black"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="mt-6">
              <form onSubmit={handleSubmit}>
                {!isSignIn && (
                  <div className="flex flex-col gap-2 mb-6">
                    <label className="text-sm text-gray-800 font-medium">
                      Full Name
                    </label>

                    <div className="relative">
                      <input
                        className="py-4 px-10 w-full bg-gray-200 border-0 focus:outline-teal-500 rounded-2xl"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        required
                      />

                      <User
                        className="absolute top-5 left-2.5 text-gray-500"
                        size={20}
                      />
                    </div>
                  </div>
                )}

                {isSignIn | !isSignIn | forgotPassword && (
                  <div className="flex flex-col gap-2 mb-6">
                    <label className="text-sm text-gray-800 font-medium">
                      Email Address
                    </label>

                    <div className="relative">
                      <input
                        className="py-4 px-10 w-full bg-gray-200 border-0 focus:outline-teal-500 rounded-2xl"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />

                      <Mail
                        className="absolute top-5 left-2.5 text-gray-500"
                        size={20}
                      />
                    </div>
                  </div>
                )}
                {!isSignIn && (
                  <div className="flex flex-col gap-2 mb-6">
                    <label className="text-sm text-gray-800 font-medium">
                      Phone
                    </label>

                    <div className="relative">
                      <input
                        className="py-4 px-10 w-full bg-gray-200 border-0 focus:outline-teal-500 rounded-2xl"
                        type="phone"
                        name="phone"
                        autoComplete="phone"
                        required
                      />

                      <Phone
                        className="absolute top-5 left-2.5 text-gray-500"
                        size={20}
                      />
                    </div>
                  </div>
                )}

                {!forgotPassword && (
                  <div className="flex flex-col gap-2 mb-8">
                    <label className="text-sm text-gray-800 font-medium">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        className="py-4 px-10 w-full bg-gray-200 border-0 focus:outline-teal-500 rounded-2xl"
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        autoComplete="current-password"
                        required
                      />

                      <Lock
                        className="absolute top-5 left-2.5 text-gray-500"
                        size={20}
                      />
                      <button type="button" onClick={handlePasswordVisibility}>
                        {isPasswordVisible ? (
                          <Eye
                            className="absolute top-5 end-2.5 text-gray-500"
                            size={18}
                          />
                        ) : (
                          <EyeClosed
                            className="absolute top-5 end-2.5 text-gray-500"
                            size={18}
                          />
                        )}
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {isSignIn ? "" : " Must be at least 6 characters"}
                    </p>
                  </div>
                )}

                {!isSignIn && (
                  <div className="flex flex-col gap-2 mb-8">
                    <label className="text-sm text-gray-800 font-medium">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        className="py-4 px-10 w-full bg-gray-200 border-0 focus:outline-teal-500 rounded-2xl"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        required
                      />

                      <Lock
                        className="absolute top-5 left-2.5 text-gray-500"
                        size={20}
                      />
                      <button
                        type="button"
                        onClick={handleConfirmPasswordVisibility}
                      >
                        {isConfirmPasswordVisible ? (
                          <Eye
                            className="absolute top-5 end-2.5 text-gray-500"
                            size={18}
                          />
                        ) : (
                          <EyeClosed
                            className="absolute top-5 end-2.5 text-gray-500"
                            size={18}
                          />
                        )}
                      </button>
                    </div>

                    {passwordNotEqual && (
                      <p className="text-red-500 text-sm">
                        Passwords do not match!
                      </p>
                    )}
                  </div>
                )}

                <button className="bg-teal-500 text-white hover:bg-teal-600 transition-colors font-medium py-4 px-10 w-full rounded-full flex items-center justify-center gap-2 cursor-pointer">
                  <span>
                    {forgotPassword
                      ? "Send code"
                      : isSignIn
                        ? "Sign In"
                        : "Create account"}
                  </span>

                  <MoveRight size={15} />
                </button>

                <div className="text-center text-sm mt-8">
                  {isSignIn ? (
                    <button
                      type="button"
                      onClick={() => setForgotPassword(!forgotPassword)}
                      className="text-teal-500 font-medium cursor-pointer hover:bg-teal-100 duration-300 px-2 rounded-full"
                    >
                      {forgotPassword ? "<< Go back" : "Forgot your password?"}
                    </button>
                  ) : (
                    <p className="text-gray-500">
                      By creating an account, you agree to our{" "}
                      <span className="text-teal-500">Terms of Service</span>{" "}
                      and <span className="text-teal-500">Privacy Policy</span>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
