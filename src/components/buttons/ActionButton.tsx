import { ActionButtonType } from "../../types/prop.types";

const ActionButton = ({
  text,
  color = "#303030",
  onClickHandler,
  disabled = false,
}: ActionButtonType) => {
  return (
    <button
      disabled={disabled}
      className={`actionButton ${disabled ? "opacity" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => onClickHandler()}
    >
      {text}
    </button>
  );
};

export default ActionButton;
