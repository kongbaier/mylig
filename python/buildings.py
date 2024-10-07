from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import networkx as nx
from flask import send_file
import folium
import os
import time
app = Flask(__name__)
CORS(app)
def get_connection():
    return mysql.connector.connect(
        user='root', password='root', host='localhost', database='mydb', auth_plugin='mysql_native_password'
    )
@app.route('/building', methods=['POST'])
def building():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    data = request.get_json()
    name = data.get('name')
    
    # 使用参数化查询
    query = 'SELECT * FROM buildings WHERE name = %s'
    
    cursor.execute(query, (name,))
    result = cursor.fetchone()
    print(result)
    cursor.close()
    conn.close()
    return jsonify(result)
class Building:
    def __init__(self, name):
        self.name = name
class Path:
    def __init__(self, start_building, end_building, distance):
        self.start = start_building
        self.end = end_building
        self.distance = distance
class MapNavigator:
    def __init__(self):
        self.buildings = {}
        self.paths = []
        self.graph = nx.Graph()
    def add_building(self, name):
        building = Building(name)
        self.buildings[name] = building
        self.graph.add_node(building)
        return building
    def add_path(self, start_building_name, end_building_name, distance):
        start_building = self.buildings[start_building_name]
        end_building = self.buildings[end_building_name]
        path = Path(start_building, end_building, distance)
        self.paths.append(path)
        self.graph.add_edge(start_building, end_building, weight=distance)
    def find_shortest_path(self, start_name, end_name):
        start_building = self.buildings[start_name]
        end_building = self.buildings[end_name]
        shortest_path = nx.dijkstra_path(self.graph, start_building, end_building, weight='weight')
        path_length = nx.dijkstra_path_length(self.graph, start_building, end_building, weight='weight')
        return shortest_path, path_length
navigator = MapNavigator()
# 添加建筑物
buildings = ['腾龙', '议程', '西门体育馆', 'J栋教学楼', '东门', '静园食堂', '东门体育馆', '智慧大楼']
for building in buildings:
    navigator.add_building(building)
# 添加路径
paths = [
    ("腾龙", "议程", 4.45),
    ("腾龙", "西门体育馆", 8.78),
    ("议程", "西门体育馆", 2.07),
    ("议程", "J栋教学楼", 0.661),
    ("J栋教学楼", "东门", 6.67),
    ("J栋教学楼", "静园食堂", 4.33),
    ("静园食堂", "东门", 4.93),
    ("静园食堂", "东门体育馆", 1.49),
    ("静园食堂", "智慧大楼", 6.90),
    ("东门", "智慧大楼", 5.62),
    ("东门体育馆", "智慧大楼", 5.27)
]
for start, end, distance in paths:
    navigator.add_path(start, end, distance)
# 建筑物坐标
building_coordinates = {
    "腾龙": [30.208527, 115.012572],
    "议程": [30.211396, 115.015260], 
    "西门体育馆": [30.208584, 115.015261],  
    "J栋教学楼": [30.214220, 115.020607], 
    "东门": [30.211936, 115.027152],  
    "静园食堂": [30.211736, 115.022302], 
    "东门体育馆": [30.210486, 115.022802],  
    "智慧大楼": [30.209486, 115.026802], 
}
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
def create_map(shortest_path, filename):
    map_center = [30.210785299999998, 115.02453711413628]  # 地图中心
    folium_map = folium.Map(location=map_center, zoom_start=16)
    
    # 在地图上标注建筑物
    for building in building_coordinates.keys():
        folium.Marker(location=building_coordinates[building], popup=building).add_to(folium_map)
    
    # 高亮显示路径
    path_coordinates = [building_coordinates[building.name] for building in shortest_path]
    folium.PolyLine(locations=path_coordinates, color='blue', weight=5).add_to(folium_map)
    
    # 确保 maps 文件夹存在
    maps_dir = os.path.join(BASE_DIR, 'maps')
    if not os.path.exists(maps_dir):
        os.makedirs(maps_dir)
    
    # 保存地图到 HTML 文件
    map_file_path = os.path.join(maps_dir, filename)
    folium_map.save(map_file_path)
    return map_file_path
def delete_old_map_files(directory='maps', age_limit=3600):
    """
    删除指定目录中超过 age_limit 秒的文件
    :param directory: 文件目录
    :param age_limit: 文件年龄限制（秒）
    """
    directory = os.path.join(BASE_DIR, directory)
    if not os.path.exists(directory):
        return  # 如果目录不存在，则无需删除文件
    current_time = time.time()
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            file_age = current_time - os.path.getmtime(file_path)
            if file_age > age_limit:
                os.remove(file_path)
@app.route('/shortest_path', methods=['POST'])
def get_shortest_path():
    data = request.json
    start = data.get('start')
    end = data.get('end')
    shortest_path, path_length = navigator.find_shortest_path(start, end)
    
    # 删除旧的地图文件
    delete_old_map_files()
    
    # 使用时间戳生成唯一的文件名
    timestamp = int(time.time())
    map_file_name = f'map_{timestamp}.html'
    map_file_path = create_map(shortest_path, map_file_name)
    
    return jsonify({
        'shortest_path': [building.name for building in shortest_path],
        'path_length': path_length,
        'map_url': f'/map/{map_file_name}'  # 修正：只返回 /map/ 文件名，不要重复添加 /map/
    })

@app.route('/map/<filename>')
def get_map(filename):
    # 正确拼接文件路径
    file_path = os.path.join(BASE_DIR, 'maps', filename)
    return send_file(file_path)

if __name__ == '__main__':
    app.run(port=5000)