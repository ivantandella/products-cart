type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export default function Label(props: LabelProps) {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block text-slate-700 text-sm font-bold mb-2"
    >
      {children}
    </label>
  );
}
