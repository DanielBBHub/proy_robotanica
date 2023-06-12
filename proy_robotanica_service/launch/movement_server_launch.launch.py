from launch import LaunchDescription
from launch_ros.actions import Node
from launch.actions import TimerAction


def generate_launch_description():
    return LaunchDescription([

        TimerAction(
            period=15.0,
            actions=[
                 Node(
                    package='proy_robotanica_service',
                    executable='movement_server',
                    output='screen',
                    parameters=[{'use_sim_time': False}]

                ),
            ]),

       
    ])