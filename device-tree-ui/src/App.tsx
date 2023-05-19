import { useState, useEffect } from "react";
import Tree from "./components/Tree";
import IDevice from "./interfaces/IDevice";
import "./App.css";
import { WebSocketConnection } from "./server/connections/WebSocketConnection";

function App() {
  const [devices, setDevices] = useState<IDevice[]>([]);

  const handleDeviceStateChange = (data: IDevice[]) => {
    setDevices(data);
  };

  useEffect(() => {
    const connection = new WebSocketConnection({ url: "ws://localhost:3034" });

    connection.connect(handleDeviceStateChange);

    return () => {
      connection.closeWebSocket();
    };
  }, []);

  return <>{devices.length > 0 && <Tree rootNodes={devices} />}</>;
}

export default App;
