type ActionButtonType = {
  text: string;
  color?: string;
  onClickHandler: Function;
  disabled?: boolean;
};

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
