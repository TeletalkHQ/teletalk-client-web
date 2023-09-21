import type { AvatarSrc } from "teletalk-type-store";

import { Box } from "~/components";

interface Props {
  avatarSrc: AvatarSrc;
}

const Content: React.FC<Props> = ({ avatarSrc }) => {
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
        <Box.Avatar
          style={{
            borderRadius: "10px",
            height: 200,
            width: 200,
          }}
          src={avatarSrc}
          alt="avatar"
        />
      </Box.Flex>
    </>
  );
};

export default Content;
