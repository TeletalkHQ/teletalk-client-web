import { useEffect, useState } from "react";

import GridContainer from "components/general/box/GridContainer";

import LeftSide from "containers/leftSide";
import RightSide from "containers/rightSide";
import { useMainContext } from "hooks/useMainContext";
import { controllers } from "controllers";
import { apiManager } from "classes/api/ApiManager";
import { actions } from "store/actions";
import { stateStatics } from "store/stateStatics";

const Messenger = () => {
  const {
    hooksOutput: { dispatch, dispatchAsync },
    state,
  } = useMainContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let timeoutId;
    const fn = async () => {
      await dispatchAsync(controllers.getUserData());
      dispatch(actions.globalLoadingOpenChange({ open: false }));

      const updater = () => {
        timeoutId = setTimeout(async () => {
          if (state.global.viewMode === stateStatics.VIEW_MODES.MESSENGER) {
            await dispatchAsync(controllers.getAllPrivateChats());
          }
          updater();
        }, 2000);
      };

      updater();
    };

    fn();

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fn = async () => {
      const usersWithInfo = users.filter((p) => !p.firstName);
      const usersWithoutInfo = state.message.privateChats
        .map((pc) => {
          const { participantId, ...p } = pc.participants.find(
            (p) => p.participantId !== state.user.userId
          );

          return { ...p, userId: participantId };
        })
        .filter((user) => users.every((u) => u.userId !== user.userId));

      console.log(usersWithoutInfo);

      for (let i = 0; i < usersWithoutInfo.length; i++) {
        const user = usersWithoutInfo[i];

        const response =
          await apiManager.apis.getPublicUserInfo.sendFullFeaturedRequest({
            userId: user.userId,
          });

        const { publicUserInfo } = response.data;

        usersWithInfo.splice(i, 1, {
          ...user,
          ...publicUserInfo,
        });
      }

      setUsers([...users, ...usersWithInfo]);
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.privateChats]);

  useEffect(() => {
    setUsers([...users, ...state.user.contacts]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user.contacts]);

  return (
    <GridContainer style={{ height: "100vh" }}>
      <LeftSide users={users} />
      <RightSide />
    </GridContainer>
  );
};

export default Messenger;
