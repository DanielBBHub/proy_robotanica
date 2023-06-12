# Importar mensajes
from geometry_msgs.msg import Twist
from proy_robotanica_custom_interface.srv import MyMoveMsg

#importar  biblioteca Python ROS2
import rclpy
from rclpy.node import Node

#nav_to_pose
from http import client
from nav2_msgs.action import NavigateToPose
from action_msgs.msg import GoalStatus

import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
import sys


class Service(Node):

    puntos_recorridos = 0

    def __init__(self):
        #constructor con el nombre del nodo
        super().__init__('waypoint_server') 

        self.srv = self.create_service(MyMoveMsg, 'waypoint_server', self.my_first_service_callback)

        self._action_client = ActionClient(self, NavigateToPose, 'navigate_to_pose')

    def my_first_service_callback(self, request, response):

        if request.move == "waypoints":
            # imprime mensaje informando del movimiento
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            self.get_logger().info('Ejecutando waypoints...')
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            action_client = Service()
            action_client.send_goal(0)
            rclpy.spin(action_client)
            # devuelve la respuesta
            response.success = True

        elif request.move == "waypoints_sim":
            # imprime mensaje informando del movimiento
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            self.get_logger().info('Ejecutando waypoints en simulacion...')
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            action_client = Service()
            action_client.send_goal_sim(0)
            rclpy.spin(action_client)
            # devuelve la respuesta
            response.success = True
        
        else:
            # estado de la respuesta
            # si no se ha dado ningun caso anterior
            response.success = False

        # devuelve la respuesta
        return response

    def send_goal(self,punto):
        
        goal_poses = []

        goal_pose = NavigateToPose.Goal()

        goal_pose.pose.header.frame_id = 'map'
        goal_pose.pose.pose.position.x = 2.0
        goal_pose.pose.pose.position.y = 0.5
        goal_pose.pose.pose.position.z = 0.0
        goal_pose.pose.pose.orientation.x = 0.0
        goal_pose.pose.pose.orientation.y = 0.0
        goal_pose.pose.pose.orientation.z = 0.0
        goal_pose.pose.pose.orientation.w = 1.0

        goal_poses.append(goal_pose)

        goal_pose2 = NavigateToPose.Goal()

        goal_pose2.pose.header.frame_id = 'map'
        goal_pose2.pose.pose.position.x = 2.5
        goal_pose2.pose.pose.position.y = 1.0
        goal_pose2.pose.pose.position.z = 0.0
        goal_pose2.pose.pose.orientation.x = 0.0
        goal_pose2.pose.pose.orientation.y = 1.0
        goal_pose2.pose.pose.orientation.z = 0.0
        goal_pose2.pose.pose.orientation.w = 1.0

        goal_poses.append(goal_pose2)

        goal_pose3 = NavigateToPose.Goal()

        goal_pose3.pose.header.frame_id = 'map'
        goal_pose3.pose.pose.position.x = 1.0
        goal_pose3.pose.pose.position.y = 0.5
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

    def send_goal_sim(self,punto):
        
        goal_poses_sim = []

        goal_pose = NavigateToPose.Goal()

        goal_pose.pose.header.frame_id = 'map'
        goal_pose.pose.pose.position.x = 0.65
        goal_pose.pose.pose.position.y = -2.0
        goal_pose.pose.pose.position.z = 0.0
        goal_pose.pose.pose.orientation.x = 0.0
        goal_pose.pose.pose.orientation.y = 0.0
        goal_pose.pose.pose.orientation.z = 0.0
        goal_pose.pose.pose.orientation.w = 1.0

        goal_poses_sim.append(goal_pose)

        goal_pose2 = NavigateToPose.Goal()

        goal_pose2.pose.header.frame_id = 'map'
        goal_pose2.pose.pose.position.x = -1.0
        goal_pose2.pose.pose.position.y = -2.0
        goal_pose2.pose.pose.position.z = 0.0
        goal_pose2.pose.pose.orientation.x = 0.0
        goal_pose2.pose.pose.orientation.y = 1.0
        goal_pose2.pose.pose.orientation.z = 0.0
        goal_pose2.pose.pose.orientation.w = 1.0

        goal_poses_sim.append(goal_pose2)

        goal_pose3 = NavigateToPose.Goal()

        goal_pose3.pose.header.frame_id = 'map'
        goal_pose3.pose.pose.position.x = 0.65
        goal_pose3.pose.pose.position.y = 1.0
        goal_pose3.pose.pose.position.z = 0.0
        goal_pose3.pose.pose.orientation.x = 0.0
        goal_pose3.pose.pose.orientation.y = 1.0
        goal_pose3.pose.pose.orientation.z = 0.0
        goal_pose3.pose.pose.orientation.w = 1.0

        goal_poses_sim.append(goal_pose3)

        self.get_logger().info('Goal creado')

        self._action_client.wait_for_server()

        self.get_logger().info('Acción activa')

        self._send_goal_future = self._action_client.send_goal_async(goal_poses_sim[punto],feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback_sim)
        self.get_logger().info('Goal lanzado')

    def goal_response_callback(self, future):
        goal_handle = future.result()

        if not goal_handle.accepted:
            self.get_logger().info('Goal no aceptado')
            return
            
        self.get_logger().info('Goal aceptado')

        self._get_result_future = goal_handle.get_result_async()

        self._get_result_future.add_done_callback(self.get_result_callback)

    def goal_response_callback_sim(self, future):
        goal_handle = future.result()

        if not goal_handle.accepted:
            self.get_logger().info('Goal no aceptado')
            return
            
        self.get_logger().info('Goal aceptado')

        self._get_result_future = goal_handle.get_result_async()

        self._get_result_future.add_done_callback(self.get_result_callback_sim)

     #definimos la funcion de respuesta al resultado
    def get_result_callback(self, future):
        result = future.result().result
        status = future.result().status
        
        if status == GoalStatus.STATUS_SUCCEEDED:
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            self.get_logger().info('Navigation succeeded! ')
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            self.puntos_recorridos = self.puntos_recorridos + 1

            if self.puntos_recorridos < 3:
                self.send_goal(self.puntos_recorridos)
                self.get_logger().info('-----------------------------------------------------------------------------------------')
                self.get_logger().info('Comenzamos con el siguiente punto')
                self.get_logger().info('-----------------------------------------------------------------------------------------')
            else:
                rclpy.shutdown()
                self.puntos_recorridos = 0

        else:
            self.get_logger().info('Navigation failed with status: {0}'.format(status))
        #self.get_logger().info('Result: {0}'.format(result))
        #rclpy.shutdown()

    def get_result_callback_sim(self, future):
        result = future.result().result
        status = future.result().status
        
        if status == GoalStatus.STATUS_SUCCEEDED:
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            self.get_logger().info('Navigation succeeded! ')
            self.get_logger().info('-----------------------------------------------------------------------------------------')
            self.puntos_recorridos = self.puntos_recorridos + 1

            if self.puntos_recorridos < 3:
                self.send_goal_sim(self.puntos_recorridos)
                self.get_logger().info('-----------------------------------------------------------------------------------------')
                self.get_logger().info('Comenzamos con el siguiente punto')
                self.get_logger().info('-----------------------------------------------------------------------------------------')
            else:
                rclpy.shutdown()
                self.puntos_recorridos = 0
        else:
            self.get_logger().info('Navigation failed with status: {0}'.format(status))
        #self.get_logger().info('Result: {0}'.format(result))
        #rclpy.shutdown()

    #definimos la funcion de respuesta al feedback
    def feedback_callback(self, feedback_msg):
        
        feedback = feedback_msg.feedback
        self.get_logger().info('Received feedback: {0}'.format(feedback))


def main(args=None):
    # inicializa la comunicacion ROS2
    rclpy.init(args=args)
    # creamos el nodo
    service = Service()
    try:
        #dejamos abierto el servicio
        rclpy.spin(service)
    except KeyboardInterrupt:
        service.get_logger().info('Cerrando el nodo service')
    finally:
        #destruimos el nodo
        service.destroy_node()
        #cerramos la comunicacion
        rclpy.shutdown()

#definimos el ejecutable
if __name__=='__main__':
    main()