import Input, { InputProps } from "./Input";
import Label from "./Label";

interface FormInputProps extends InputProps {
  label: string;
}

export default function FormInput(props: FormInputProps) {
  const { label, name, type, placeholder } = props;
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} />
    </div>
  );
}
