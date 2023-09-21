import AvatarEditor from "react-avatar-editor";

import { Box, Button } from "~/components";
import { CommonOnChange, VoidNoArgsFn } from "~/types";

interface Props {
  avatarSrc: string;
  editor: React.MutableRefObject<AvatarEditor | null>;
  onFileChange: CommonOnChange;
  onOpenFileSelector: VoidNoArgsFn;
  fileInputRef: React.LegacyRef<HTMLInputElement>;
}

const Content: React.FC<Props> = ({
  avatarSrc,
  editor,
  fileInputRef,
  onFileChange,
  onOpenFileSelector,
}) => {
  return (
    <>
      <Box.Flex
        col
        jc="center"
        ai="center"
        style={{
          width: "100%",
          minWidth: "300px",
          height: "300px",
        }}
      >
        {avatarSrc ? (
          <AvatarEditor
            ref={editor}
            style={{
              borderRadius: "10px",
            }}
            image={avatarSrc}
            width={200}
            height={200}
            border={25}
            borderRadius={222}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
        ) : (
          <>
            <Button.Primary
              style={{
                width: "max-content",
              }}
              onClick={onOpenFileSelector}
            >
              Select
            </Button.Primary>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
      </Box.Flex>
    </>
  );
};

export default Content;
