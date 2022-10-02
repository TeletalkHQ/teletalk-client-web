import CustomList from "components/generals/boxes/CustomList";

const ChatList = () => {
  return (
    <>
      <CustomList
        sx={{
          width: "80%",
          height: "100%",
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      ></CustomList>
    </>
  );
};

export default ChatList;
