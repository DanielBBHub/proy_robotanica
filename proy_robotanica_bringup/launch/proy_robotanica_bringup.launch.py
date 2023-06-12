import os
import random
import launch
import sys
import launch.actions
import launch_ros.actions
from launch_ros.actions import Node
from launch import LaunchDescription
from ament_index_python import get_package_share_directory
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource

def generate_launch_description():
    res = []

   
   
    launch_robot_world = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(get_package_share_directory("proy_robotanica_my_world"), 'launch/turtlebot3_my_world.launch.py'))
    )      
    res.append(launch_robot_world)
    
    launch_robot_nav2 = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(get_package_share_directory("proy_robotanica_nav2_system"), 'launch/my_tb3_sim_nav2.launch.py'))
    )      
    res.append(launch_robot_nav2)

    """ launch_provide_map = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(get_package_share_directory("proy_robotanica_provide_map"), 'launch/provide_map.launch.py'))
    )      
    res.append(launch_provide_map) """
    
    launch_robot_movement_server = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(get_package_share_directory("proy_robotanica_service"), 'movement_server_launch.launch.py'))
    )      
    res.append(launch_robot_movement_server)

    launch_movement_server = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(get_package_share_directory("proy_robotanica_service"), 'waypoint_server_launch.launch.py'))
    )      
    res.append(launch_movement_server)
       
     
    


    return LaunchDescription(res)  
      