import React, { useState } from "react";
import ComboBox from "../../ui/Autocomplete";
import Button from "@mui/material/Button";
import "./css/mapnavigator.css";
import Card from "../Card/Card";
import axios from "axios";

const MapNavigator = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://127.0.0.1:5000/shortest_path", {
      start,
      end,
    });
    console.log(response.data);
    setResult(response.data);
  };
  const handleStartChange = (e, value) => {
    setStart(value);
  };
  const handleEndChange = (e, value) => {
    setEnd(value);
  };
  return (
    <div className="navigation">
      <h1>校园导航</h1>
      <form onSubmit={handleSubmit}>
        <div className="forminput">
          <ComboBox inputname={"起点建筑名"} onChange={handleStartChange} />
        </div>
        <div className="forminput">
          <ComboBox inputname={"终点建筑名"} onChange={handleEndChange} />
        </div>
        <Button type="submit" variant="contained">
          计算最短路径
        </Button>
      </form>
      {/* {result && (
        <div className="result-container">
          <h2 className="result-title">
            最短路径: {result.shortest_path.join(" -> ")}
          </h2>
          <p className="result-length">
            路径长度（百米）: {result.path_length}
          </p>
          <Button
            href={`http://127.0.0.1:5000/${result.map_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="result-button"
          >
            <h2>查看路径地图</h2>
          </Button>
        </div>
      )} */}
      {result && <Card result={result} />}
    </div>
  );
};

export default MapNavigator;
