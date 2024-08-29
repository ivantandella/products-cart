type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Button(props: ButtonProps) {
  const { children, type = "button", onClick } = props;
  return (
    <button
      type={type}
      className="h-10 px-6 font-semibold bg-blue-600 text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
