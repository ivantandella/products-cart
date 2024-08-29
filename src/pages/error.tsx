import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-3xl font-bold">Oopss!</h1>
      <p className="text-xl my-5">An error has occurred.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
