import os
from ament_index_python.packages import get_package_share_directory
from launch.actions import SetEnvironmentVariable
from launch_ros.actions import Node
from launch import LaunchDescription
from launch.substitutions import LaunchConfiguration
from launch.actions import DeclareLaunchArgument

def generate_launch_description():

    nav2_yaml = os.path.join(get_package_share_directory('proy_robotanica_nav2_system'), 'config', 'my_nav2_params.yaml')
    map_file = os.path.join(get_package_share_directory('proy_robotanica_nav2_system'), 'config', 'robotanica_my_map.yaml')
    rviz_config_dir = os.path.join(get_package_share_directory('proy_robotanica_nav2_system'), 'config', 'config_proyecto.rviz')

    return LaunchDescription([
        Node(
            package = 'nav2_map_server',
            executable = 'map_server',
            name = 'map_server',
            output = 'screen',
            parameters=[nav2_yaml,
                        {'yaml_filename':map_file}]
        ),

        Node(
            package='nav2_amcl',
            executable='amcl',
            name='amcl',
            output='screen',
            parameters=[nav2_yaml]
        ),

        Node(
            package='nav2_lifecycle_manager',
            executable='lifecycle_manager',
            name='lifecycle_manager_localization',
            output='screen',
            parameters=[{'use_sim_time': False},
                        {'autostart': True},
                        {'node_names': ['map_server', 'amcl']}]
        ),
       
         Node(
            package = 'nav2_planner',
            executable = 'planner_server',
            name = 'planner_server',
            output = 'screen',
            parameters=[nav2_yaml]
        ),

        Node(
            package='nav2_controller',
            executable='controller_server',
            name='controller_server',
            output='screen',
            parameters=[nav2_yaml, {'use_sim_time': False}]
        ),
        Node(
            package='nav2_bt_navigator',
            executable='bt_navigator',
            name='bt_navigator',
            output='screen',
            parameters=[nav2_yaml, {'use_sim_time': False}]
        ),
        Node(
            package='nav2_recoveries',
            executable='recoveries_server',
            name='recoveries_server',
            output='screen',
            parameters=[nav2_yaml, {'use_sim_time': False}]
        ),
         
        Node(
            package='nav2_waypoint_follower',
            executable='waypoint_follower',
            name='waypoint_follower',
            output='screen',
            parameters=[nav2_yaml, {'use_sim_time': False}]
        ),
        
        Node(
            package='nav2_lifecycle_manager',
            executable='lifecycle_manager',
            name='lifecycle_manager_pathplanner',
            output='screen',
            parameters=[nav2_yaml,{'use_sim_time': False},
                        {'autostart': True},
                        {'node_names':['map_server', 'amcl', 'planner_server', 'controller_server', 'recoveries_server', 'bt_navigator', 'waypoint_follower']}]
        ),
        Node(
            package='rviz2',
            executable='rviz2',
            name='rviz2',
            arguments=['-d', rviz_config_dir],
            parameters=[{'use_sim_time': False}],
            output='screen'
        ),
    ])