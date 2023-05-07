'''from geometry_msgs.msg import PoseStamped
#from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult
import rclpy
from rclpy.duration import Duration
from geometry_msgs.msg import PoseWithCovarianceStamped
from rclpy.node import Node
from nav2_msgs import FollowWaypoints


class Publisher(Node):

    def __init__(self):
        super().__init__('waypoint_follower')
        self.publisher_ = self.create_publisher(FollowWaypoints, 'waypoint_follower', 1)
        timer_period = 0.5  # seconds
        self.i = 0.0
        self.timer_ = self.create_timer(timer_period, self.callback)

    def callback(self):
        navigator = FollowWaypoints()
        navigator.waitUntilNav2Active()

        goal_poses = []
        goal_pose1 = PoseStamped()
        goal_pose1.header.frame_id = 'map'
        goal_pose1.header.stamp = navigator.get_clock().now().to_msg()
        goal_pose1.pose.position.x = 1.5
        goal_pose1.pose.position.y = 0.55
        goal_pose1.pose.orientation.w = 0.707
        goal_pose1.pose.orientation.z = 0.707
        goal_poses.append(goal_pose1)
    
        navigator.followWaypoints(goal_poses)

        self.publisher_.publish(navigator)

def main(args=None):
    rclpy.init(args=args)
    publisher = Publisher()
    try:
        rclpy.spin_once(publisher)
    except KeyboardInterrupt:
        publisher.destroy_node()
    finally:
        rclpy.shutdown()

if __name__ == '__main__':
    main()
'''

