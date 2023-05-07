from http import client
from nav2_msgs.action import NavigateToPose
from action_msgs.msg import GoalStatus

import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
import sys



class NavToPoseActionClient(Node):

    puntos_recorridos = 0

    def __init__(self):
    
        super().__init__('action_client')
        self._action_client = ActionClient(self, NavigateToPose, 'navigate_to_pose')


    def send_goal(self,punto):
        
        goal_poses = []

        goal_pose = NavigateToPose.Goal()

        goal_pose.pose.header.frame_id = 'map'
        goal_pose.pose.pose.position.x = 2.0
        goal_pose.pose.pose.position.y = 0.0
        goal_pose.pose.pose.position.z = 0.0
        goal_pose.pose.pose.orientation.x = 0.0
        goal_pose.pose.pose.orientation.y = 0.0
        goal_pose.pose.pose.orientation.z = 0.0
        goal_pose.pose.pose.orientation.w = 1.0

        goal_poses.append(goal_pose)

        goal_pose2 = NavigateToPose.Goal()

        goal_pose2.pose.header.frame_id = 'map'
        goal_pose2.pose.pose.position.x = 4.0
        goal_pose2.pose.pose.position.y = 0.0
        goal_pose2.pose.pose.position.z = 0.0
        goal_pose2.pose.pose.orientation.x = 0.0
        goal_pose2.pose.pose.orientation.y = 1.0
        goal_pose2.pose.pose.orientation.z = 0.0
        goal_pose2.pose.pose.orientation.w = 1.0

        goal_poses.append(goal_pose2)

        goal_pose3 = NavigateToPose.Goal()

        goal_pose3.pose.header.frame_id = 'map'
        goal_pose3.pose.pose.position.x = 1.0
        goal_pose3.pose.pose.position.y = 0.0
        goal_pose3.pose.pose.position.z = 0.0
        goal_pose3.pose.pose.orientation.x = 0.0
        goal_pose3.pose.pose.orientation.y = 1.0
        goal_pose3.pose.pose.orientation.z = 0.0
        goal_pose3.pose.pose.orientation.w = 1.0

        goal_poses.append(goal_pose3)

        self.get_logger().info('Goal creado')

        self._action_client.wait_for_server()

        self.get_logger().info('Acción activa')

        self._send_goal_future = self._action_client.send_goal_async(goal_poses[punto],feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback)
        self.get_logger().info('Goal lanzado')

    def goal_response_callback(self, future):
        goal_handle = future.result()

        if not goal_handle.accepted:
            self.get_logger().info('Goal no aceptado')
            return
            
        self.get_logger().info('Goal aceptado')

        self._get_result_future = goal_handle.get_result_async()

        self._get_result_future.add_done_callback(self.get_result_callback)

     #definimos la funcion de respuesta al resultado
    def get_result_callback(self, future):
        result = future.result().result
        status = future.result().status
        
        if status == GoalStatus.STATUS_SUCCEEDED:
            self.get_logger().info('Navigation succeeded! ')
            self.puntos_recorridos = self.puntos_recorridos + 1

            if self.puntos_recorridos < 3:
                self.send_goal(self.puntos_recorridos)
                self.get_logger().info('Comenzamos con el siguiente punto')
            else:
                rclpy.shutdown()
        else:
            self.get_logger().info('Navigation failed with status: {0}'.format(status))
        #self.get_logger().info('Result: {0}'.format(result))
        #rclpy.shutdown()

    #definimos la funcion de respuesta al feedback
    def feedback_callback(self, feedback_msg):
        
        feedback = feedback_msg.feedback
        self.get_logger().info('Received feedback: {0}'.format(feedback))

def main(args=None):
    rclpy.init(args=args)

    action_client = NavToPoseActionClient()

    action_client.send_goal(0)

    rclpy.spin(action_client)


if __name__ == '__main__':
    main()