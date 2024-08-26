import { useAppContext } from "../../context/AppContext";
import ActionButton from "../buttons/ActionButton";

const SuccessfulUploadModal = () => {
  const { actions } = useAppContext() as any;

  return (
    <div className="uploadModal">
      <div className="modalInnerContainer">
        <h1>Schedule successfully created.</h1>
        <ActionButton
          text="Create another plan"
          color="#E11BB6"
          onClickHandler={actions.resetState}
        />
      </div>
    </div>
  );
};

export default SuccessfulUploadModal;
