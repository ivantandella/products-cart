import Form from "../components/Form";

export default function LoginPage() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-xs">
        <Form title="Login" btnText="Login" type="login" />
      </div>
    </div>
  );
}
