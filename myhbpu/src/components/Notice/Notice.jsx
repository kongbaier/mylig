import React from "react";
import "./css/notice.css";

export default function Notice() {
  return (
    <div className="notice-container">
      <h1 className="notice-title">注意事项</h1>
      <div className="notice-content">
        <p>请仔细阅读以下重要信息：</p>
        <ul className="notice-list">
          <li className="notice-item">
            <div className="notice-item-title">校园安全</div>
            <div className="notice-item-content">
              请注意保管好个人财物，不要将贵重物品单独留在公共场所。
            </div>
          </li>
          <li className="notice-item">
            <div className="notice-item-title">校园交通</div>
            <div className="notice-item-content">
              学校在腾龙公寓-议程公寓-中门（J楼）-东门（X楼）-智慧大楼之间有校园巴士，1元/人，合理使用能方便交通。
            </div>
          </li>
          <li className="notice-item">
            <div className="notice-item-title">学习资源</div>
            <div className="notice-item-content">
              图书馆和在线学习平台提供丰富的学习资源，请充分利用这些资源提高学习效率。
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
