type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: string;
};

export default function Button(props: ButtonProps) {
  const { children, type = "button", onClick, variant = "bg-blue-600" } = props;
  return (
    <button
      type={type}
      className={"h-10 px-6 font-semibold text-white rounded" + " " + variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
