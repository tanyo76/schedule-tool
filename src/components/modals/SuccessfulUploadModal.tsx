import { ActionsTypes, useAppContext } from "../../context/AppContext";
import ActionButton from "../buttons/ActionButton";

const SuccessfulUploadModal = () => {
  const { dispatch } = useAppContext() as any;

  const resetState = () => {
    dispatch({ type: ActionsTypes.TOGGLESUCCESSMODAL });
    dispatch({ type: ActionsTypes.CLEARSTATE });
  };
  return (
    <div className="uploadModal">
      <div className="modalInnerContainer">
        <h1>Schedule successfully created.</h1>
        <ActionButton
          text="Create another plan"
          color="#E11BB6"
          onClickHandler={resetState}
        />
      </div>
    </div>
  );
};

export default SuccessfulUploadModal;
