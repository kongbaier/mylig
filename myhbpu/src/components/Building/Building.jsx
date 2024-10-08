import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addBuilding } from "../../store/modules/buildingStore"; // 导入 action
import { openModal, setDisplay } from "../../store/modules/displayStore"; // 导入 action
import "./css/building.css";

function BuildingButtons({ name, style }) {
  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.builder.buildings); // 获取 Redux 中保存的建筑数据
  const [currentBuilding, setCurrentBuilding] = useState(null); // 保存当前点击的建筑
  // const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹窗显示

  const fetchBuildingData = async (name) => {
    console.log(name);
    dispatch(setDisplay(name)); // 设置当前显示的建筑名
    // 检查 Redux 中是否已有数据
    if (buildings[name]) {
      setCurrentBuilding(buildings[name]); // 如果有，则直接使用
    } else {
      // 没有的话，发送请求获取数据
      try {
        const res = await axios.post("http://localhost:5000/building", {
          name,
        });
        dispatch(addBuilding({ name, data: res.data })); // 将数据保存到 Redux
        setCurrentBuilding(res.data); // 设置当前显示的建筑数据
      } catch (error) {
        console.error("Error fetching building data:", error);
      }
    }
    dispatch(openModal());
  };
  return (
    <div className="building">
      <button
        style={style}
        onClick={() => {
          fetchBuildingData(name);
        }}
      ></button>
    </div>
  );
}
export default BuildingButtons;
