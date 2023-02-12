import { useEffect, useState } from "react";

import { actions } from "src/store/actions";

import { Box } from "src/components/general/box";

import LeftSide from "src/containers/leftSide";
import RightSide from "src/containers/rightSide";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useSelector } from "src/hooks/useThunkReducer";

import { stateStatics } from "src/store/stateStatics";

const Messenger = () => {
  const state = useSelector();

  const {
    hooksOutput: { dispatchAsync, dispatch },
    others: { socket },
  } = useMainContext();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom");
    socket.on("newPrivateChatMessage", ({ chatId, newMessage }) => {
      dispatch(actions.addNewMessage({ chatId, newMessage }));
    });
    const fn = async () => {
      await dispatchAsync(controllers.getCurrentUserData());

      if (state.global.viewMode === stateStatics.VIEW_MODES.MESSENGER) {
        await dispatchAsync(controllers.getAllPrivateChats());
      }
    };

    fn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fn = async () => {
      const participantsFromPrivateChats =
        extractParticipantsFromPrivateChats();
      const newParticipants = getNewParticipants(participantsFromPrivateChats);

      for (let i = 0; i < newParticipants.length; i++) {
        const participant = newParticipants[i];

        const publicUserInfo = await controllers.getPublicUserData(
          participant.participantId
        );

        newParticipants.splice(i, 1, {
          ...participant,
          ...publicUserInfo,
        });
      }

      updateParticipants(newParticipants);
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.privateChats]);

  useEffect(() => {
    updateParticipants(
      state.user.contacts.map((contact) => ({
        ...contact,
        participantId: contact.userId,
      }))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user.contacts]);

  const updateParticipants = (newParticipants) => {
    setParticipants([...participants, ...newParticipants]);
  };

  const extractParticipantsFromPrivateChats = () =>
    state.message.privateChats.map((pc) => {
      const { participantId, ...p } = pc.participants.find(
        (p) => p.participantId !== state.user.userId
      );

      return { ...p, participantId };
    });

  const getNewParticipants = (participantsFromPrivateChats) =>
    participantsFromPrivateChats.filter((p1) =>
      participants.every((p2) => p2.participantId !== p1.participantId)
    );

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <LeftSide participants={participants} />
      <RightSide participants={participants} />
    </Box.Grid>
  );
};

export default Messenger;
