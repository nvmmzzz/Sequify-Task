import React, { useState } from "react";
import PlaceField from "./pages/PlaceField";
import TypeAndDownload from "./pages/TypeAndDownload";

function App() {
  const [placedFields, setPlacedFields] = useState([]);
  const [screen, setScreen] = useState(1);

  return (
    <>
      {screen === 1 && (
        <PlaceField
          placedFields={placedFields}
          setPlacedFields={setPlacedFields}
          goNext={() => setScreen(2)}
        />
      )}

      {screen === 2 && (
        <TypeAndDownload
          placedFields={placedFields}
          reset={() => {
            setPlacedFields([]);
            setScreen(1);
          }}
        />
      )}
    </>
  );
}

export default App;
