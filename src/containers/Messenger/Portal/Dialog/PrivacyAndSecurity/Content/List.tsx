import { DialogName, VoidWithArg } from "~/types";

import ListItem from "./ListItem";
import { privacyAndSecurityList } from "./data";

interface Props {
  onItemClick: VoidWithArg<DialogName>;
}

const List: React.FC<Props> = ({ onItemClick }) =>
  privacyAndSecurityList.map((item, index) => (
    <ListItem key={index} onItemClick={onItemClick} item={item} />
  ));

export default List;
