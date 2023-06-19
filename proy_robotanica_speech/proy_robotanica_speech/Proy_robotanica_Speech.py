
import rclpy
import sys
import time
#import colored
import platform
import flet as ft
import configparser
#from colored import stylize
#from AI.AIManager import AIManager
from Audio.Algo import AudioManager
from Audio.SoundManager import SoundManager
from Logger.SimpleLogger import SimpleLogger
from Audio.VoiceOutputManager import VoiceOutputManager

import logging
import threading
import time

import flet as ft
import threading
import base64
 
   
from rclpy.node import Node
from std_msgs.msg import String

from proy_robotanica_custom_interface.srv import MyMoveMsg
    
class RobotanicaSpeechNode(Node):

    def __init__(self):
        super().__init__('proy_robotanica_speech')
        
        self.client = self.create_client(MyMoveMsg, 'waypoint_server')
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info("El servicio no esta activo")
        
        self.req = MyMoveMsg.Request()

        self.publisher_ = self.create_publisher(String, 'text_response', 10)
        
        timer_period = 0.5  # seconds
        
        self.timer = self.create_timer(timer_period, self.timer_callback)

        self.config_file = "config.ini"
        self.config = configparser.ConfigParser()
        self.config.read(self.config_file)
        self.display_man = None

        self.donde_ir = ""
    
        self.l = SimpleLogger("DEBUG")
        
        if self.l is None:
            print("Exit...")
            exit()
            
        self.init_system()
        
    
    def cognibot(self):
        try:
            while True:
                if not self.audio_man.output_queue.empty():
                    transcription = self.audio_man.output_queue.get()

                    transcription_string = str(transcription)
                    if "tomates" in transcription_string:
                        print("me voy pa las bolas rojas'")
                        self.donde_ir = "waypoints"
                        self.publicar()
                    elif "calabazas" in transcription_string:
                        self.donde_ir = "waypoints_sim"
                    elif "berenjenas" in transcription_string:
                        print("me voy pa las bolas mora'")
                                        


                
        except KeyboardInterrupt:
            # AudioManager is the only module with a separate loop that needs
            # to stop in order to have a clean exit
            self.audio_man.stop()
            
    def publicar(self):
        #msg = String()
        #msg.data = topic
        #self.publisher_.publish(msg)
        #self.get_logger().info('Publishing: "%s"' % msg.data)

        self.req.move = self.donde_ir
        self.get_logger().info("Publishing")
        self.future = self.client.call_async(self.req)

    
    def init_system(self):
        self.sound_man = SoundManager(self.l, self.config_file)
        self.display_man = None
        self.audio_man = AudioManager(self.l, self.config_file, self.display_man, self.sound_man)
        #self.ai_man = AIManager(self.l, self.config_file, self.display_man, self.sound_man)
        self.voice_man = VoiceOutputManager(self.l, self.config_file, self.display_man)
    
    
    def timer_callback(self):
        self.cognibot()
      



def main(args=None):
    rclpy.init(args=args)

    proy_robotanica_speech = RobotanicaSpeechNode()

    

    rclpy.spin(proy_robotanica_speech)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    proy_robotanica_speech.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
    
        
