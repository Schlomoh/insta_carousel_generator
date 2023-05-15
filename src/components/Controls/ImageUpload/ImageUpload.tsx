import { ContentContext } from "@/contexts";
import { ControlsButton } from "@/components/FormElements";
import { ChangeEvent, useContext, useRef } from "react";

const ImageUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { updatePostProperty, setSelectedCarouselImage } = useContext(
    ContentContext
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updatePostProperty(reader.result as string, "titleImageSrc");
      setSelectedCarouselImage(0);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <>
      <ControlsButton onClick={handleClick}>
        🙈 Upload title image
      </ControlsButton>
      <input
        onChange={handleUpload}
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        accept="image/png, image/gif, image/jpeg"
      />
    </>
  );
};

export default ImageUpload;
