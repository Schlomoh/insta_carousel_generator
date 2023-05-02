import { ContentContext } from "@/ContentContext";
import { Label, Textarea } from "@/components/FormElements";
import { useContext } from "react";

const CaptionTextarea = () => {
  const { posts, selectedPost, updatePostProperty } = useContext(ContentContext); // prettier-ignore
  const caption = posts?.[selectedPost || 0].caption;

  return (
    <>
      <Label>Caption</Label>
      <Textarea
        rows={5}
        placeholder="Caption"
        value={caption}
        onChange={({ target: { value } }) =>
          updatePostProperty(value, "caption")
        }
      />
    </>
  );
};

export default CaptionTextarea;
