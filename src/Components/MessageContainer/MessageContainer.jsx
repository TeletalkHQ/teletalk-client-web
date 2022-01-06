import MessageList from "~/Components/MessageContainer/MessageList";

import { useMyContext } from "~/Hooks/useMyContext";

const MessageContainer = () => {
	const {
		state: { temp, user },
	} = useMyContext();

	return (
		<>
			<MessageList messages={temp.messages} user={user} />
		</>
	);
};

export default MessageContainer;
