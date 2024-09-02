import { useContext } from "react";
import Form from "../components/Form";
import { DarkModeContext } from "../context/DarkMode";

export default function LoginPage() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  console.log(isDarkMode);

  return (
    <div
      className={`flex justify-center min-h-screen items-center ${
        isDarkMode && "bg-slate-800"
      }`}
    >
      <div className="w-full max-w-xs">
        <button
          className="absolute right-2 top-2 bg-blue-600 p-2 text-white rounded"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <Form title="Login" btnText="Login" type="login" />
      </div>
    </div>
  );
}
