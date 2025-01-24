import "./button.css";

interface Props {
  title: string;
  disabled?: boolean;
}

const SubmitButton = ({ title, disabled }: Props) => {
  return (
    <div className="buttonContainer">
      <button type="submit" className="button" disabled={disabled}>
        {title}
      </button>
    </div>
  );
};

export default SubmitButton;
