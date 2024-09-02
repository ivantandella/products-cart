import Button from "./Button";

export default function Navbar() {
  function handleClickLogout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="h-10 bg-blue-600 text-end">
      <span className="text-sm font-semibold text-white">
        {localStorage.getItem("email")}
      </span>
      <Button onClick={handleClickLogout}>Logout</Button>
    </div>
  );
}
