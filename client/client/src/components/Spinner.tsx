import { useState, CSSProperties } from "react";
import { ClimbingBoxLoader, PacmanLoader, HashLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "auto",
  borderColor: "#00ED64",
};

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      {/* <ClimbingBoxLoader
        color="rgba(28, 49, 122, 1)"
        size={28}
      /> */}
      <HashLoader color="#00ED64" />
    </div>
  );
};

export default Spinner;
