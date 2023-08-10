import { Input } from "~/components";
import Box from "~/components/general/box";
import ServerStatus from "~/components/initialSetup/ServerStatus";
import { Status, Url, VoidNoArgsFn } from "~/types";

import AddServerButton from "./AddServerButton";
import ServerSelect from "./ServersSelect";
import SetupButton from "./SetupButton";

interface Props {
  loading: boolean;
  onAddServerClick: VoidNoArgsFn;
  onAuthenticateClick: VoidNoArgsFn;
  onServersClick: VoidNoArgsFn;
  onServerSelectChange: (url: Url) => void;
  onSetup: VoidNoArgsFn;
  selectedServer: string;
  status: Status;
}

const InitialSetupContent: React.FC<Props> = ({
  loading,
  onAddServerClick,
  onAuthenticateClick,
  onServersClick,
  onServerSelectChange,
  onSetup,
  selectedServer,
  status,
}) => {
  return (
    <Box.Div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
        width: "100%",
      }}
    >
      <Box.Div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <ServerStatus onClick={onSetup} loading={loading} status={status} />

        <div style={{ marginTop: "10px" }}></div>

        <Input.PrimaryButton onClick={onServersClick}>
          Servers
        </Input.PrimaryButton>

        <div style={{ marginTop: "10px" }}></div>

        <ServerSelect
          onServerSelectChange={onServerSelectChange}
          selectedServer={selectedServer}
        />

        <div style={{ marginTop: "10px" }}></div>

        <AddServerButton onAddServerClick={onAddServerClick} />

        <div style={{ marginTop: "10px" }}></div>

        <SetupButton
          indicatorText={status === "online" ? "Forwarding..." : "Trying..."}
          loading={loading}
          onSetup={onSetup}
        />

        <div style={{ marginTop: "10px" }}></div>

        <Input.PrimaryButton
          onClick={onAuthenticateClick}
          disabled={status !== "online"}
        >
          Authenticate
        </Input.PrimaryButton>
      </Box.Div>
    </Box.Div>
  );
};

export default InitialSetupContent;
