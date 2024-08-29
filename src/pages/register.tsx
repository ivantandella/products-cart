import Form from "../components/Form";

export default function RegisterPage() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-xs">
        <Form title="Register" btnText="Register" type="register" />
      </div>
    </div>
  );
}
