import Compressor from "compressorjs";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore } from "~/store";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";

const AvatarSelector = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("avatarSelector");
  const [avatarSrc, setAvatarSrc] = useState("");
  const { loading, handler } = useEmitter("updateAvatar");
  const editor = useRef<AvatarEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    new Compressor(file, {
      maxWidth: 350,
      maxHeight: 350,
      mimeType: "png",
      convertSize: 0.5,
      async success(file) {
        const src = await utils.convertFileToBase64(file);
        if (typeof src === "string") setAvatarSrc(src as string);
      },
    });
  };

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current.getImage();

      handler.emitFull(
        {
          avatarSrc: canvas.toDataURL(),
        },
        handleClose
      );
    }
  };

  const handleClose = () => {
    globalStore.closeDialog();
    setTimeout(() => {
      setAvatarSrc("");
      if (fileInputRef.current?.value) fileInputRef.current.value = "";
    }, 500);
  };

  return (
    <>
      <Template.Dialog
        open={dialogState.open}
        actions={
          <Actions
            isSaveDisabled={!avatarSrc}
            loading={loading}
            onClose={handleClose}
            onSave={handleSave}
          />
        }
        content={
          <Content
            onOpenFileSelector={handleOpenFileSelector}
            fileInputRef={fileInputRef}
            avatarSrc={avatarSrc}
            editor={editor}
            onFileChange={handleFileChange}
          />
        }
      />
    </>
  );
};

export default AvatarSelector;
