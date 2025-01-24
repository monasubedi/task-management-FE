import "./input.css";

interface Props {
  label?: string;
  type: string;
  value?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, value, required, onChange }: Props) => {
  return (
    <div className="inputWrapper">
      {label && <label>{label}:</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        required={required}
      />
    </div>
  );
};

export default Input;
