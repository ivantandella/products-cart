import Button from "./Button";

type NavbarProps = {
  handleClickLogout: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export default function Navbar(props: NavbarProps) {
  const { handleClickLogout } = props;

  return (
    <div className="h-10 bg-blue-600 text-end">
      <span className="text-sm font-semibold text-white">
        {localStorage.getItem("email")}
      </span>
      <Button onClick={handleClickLogout}>Logout</Button>
    </div>
  );
}
