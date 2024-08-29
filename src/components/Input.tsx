export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
};

export default function Input(props: InputProps) {
  const { name, type, placeholder } = props;
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="text-sm border rounded w-full py-2 px-3 text-slate-700"
    />
  );
}
