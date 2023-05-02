import { ContentContext } from "@/ContentContext";
import { ControlsButton } from "@/components/FormElements";
import { ChangeEvent, useContext, useRef } from "react";

const JsonUpload = () => {
  const { addPost } = useContext(ContentContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    const { current } = inputRef;
    current && current.click();
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        addPost(reader.result as string);
      };

      reader.readAsText(files[0]);
    }
  };

  return (
    <>
      <ControlsButton onClick={handleButtonClick}>
        Upload posts data (JSON)
      </ControlsButton>
      <input
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleUpload}
      />
    </>
  );
};

export default JsonUpload;
