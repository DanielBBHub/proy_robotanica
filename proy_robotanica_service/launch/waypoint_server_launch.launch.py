from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='proy_robotanica_service',
            executable='waypoint_server',
            output='screen'
        ),
    ])