import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modules/displayStore";
import "./css/Introduce.css";

const Introduce = () => {
  const buildings = useSelector((state) => state.builder.buildings); // 获取对应建筑的数据

  const display = useSelector((state) => state.displayer.display); // 获取当前显示的建筑名

  const buildingData = buildings[display]; // 获取当前显示的建筑数据

  const isModalOpen = useSelector((state) => state.displayer.isModalOpen);

  const dispatch = useDispatch();

  return (
    <>
      {/* 仅当 isModalOpen 为 true 时渲染弹窗和遮罩 */}
      <div
        className={`modal-overlay ${isModalOpen ? "show" : ""}`}
        onClick={() => dispatch(closeModal())}
      >
        <div
          id="introduce"
          className={`modal-content ${isModalOpen ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 检查 buildingData 是否存在，然后渲染数据 */}
          {buildingData ? (
            <>
              <div className="title">
                <h2>{buildingData.name}</h2>
              </div>
              <div className="article">
                <p>{buildingData.description}</p>
              </div>
            </>
          ) : (
            <p>没有找到建筑数据</p>
          )}
          <span className="close-button" onClick={() => dispatch(closeModal())}>
            x
          </span>
        </div>
      </div>
    </>
  );
};

export default Introduce;
