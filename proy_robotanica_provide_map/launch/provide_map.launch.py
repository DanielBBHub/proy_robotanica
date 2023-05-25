# provide_map.launch.py
import os

import launch.actions
import launch_ros.actions
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.actions import TimerAction

def generate_launch_description():
    
    map_file = os.path.join(get_package_share_directory('proy_robotanica_provide_map'), 'map', 'warehouse.yaml')

    return LaunchDescription([
        TimerAction(
            period=12.0,
            actions=[
                Node(
                    package='nav2_map_server',
                    executable='map_server',
                    name='map_server',
                    output='screen',
                    parameters=[{'use_sim_time': True}, 
                                {'yaml_filename':map_file} 
                            ]),
            ]),
            
        Node(
            package='nav2_lifecycle_manager',
            executable='lifecycle_manager',
            name='lifecycle_manager_pathplanner',
            output='screen',
            parameters=[{'use_sim_time': True},
                        {'autostart': True},
                        {'node_names':['map_server', 'amcl', 'planner_server', 'controller_server', 'recoveries_server', 'bt_navigator']}]
        ),
              
        ])
