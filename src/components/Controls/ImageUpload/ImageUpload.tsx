import { ContentContext } from "@/ContentContext";
import { ControlsButton } from "@/components/FormElements";
import { ChangeEvent, useContext, useRef } from "react";

const ImageUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTitleImageSrc, setSelectedCarouselImage } =
    useContext(ContentContext);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTitleImageSrc(reader.result as string);
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
      <ControlsButton onClick={handleClick}>Upload title image</ControlsButton>
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
