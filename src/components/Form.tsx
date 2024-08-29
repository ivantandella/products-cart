import { Link } from "react-router-dom";
import Button from "./Button";
import FormInput from "./FormInput";

type FormProps = {
  title: string;
  btnText: string;
  type: "login" | "register";
};

export default function Form(props: FormProps) {
  const { title, btnText, type } = props;

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("email", e.target.email.value);
    localStorage.setItem("password", e.target.password.value);
    window.location.href = "/products";
  }

  return (
    <div className="p-5 border rounded shadow border-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{title}</h1>
      <form onSubmit={handleSubmit}>
        {type === "register" && (
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Your Name"
          />
        )}
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="example@mail.com"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="******"
        />
        {type === "register" && (
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="******"
          />
        )}
        <Button type="submit">{btnText}</Button>
      </form>

      <p className="text-sm mt-5 text-center">
        {type === "login"
          ? "Don't have an account? "
          : "Already have an account? "}

        {type === "login" && (
          <Link to="/register" className="font-bold text-blue-600">
            Register
          </Link>
        )}

        {type === "register" && (
          <Link to="/login" className="font-bold text-blue-600">
            Login
          </Link>
        )}
      </p>
    </div>
  );
}
