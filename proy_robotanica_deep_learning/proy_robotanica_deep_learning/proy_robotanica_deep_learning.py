import os
import cv2
import rclpy
import time
import sys, getopt
import numpy as np
from rclpy.node import Node
from cv_bridge import CvBridge # Paquete para convertir entre ROS y OpenCV Images
from std_msgs.msg import String
from sensor_msgs.msg import Image # Image es el tipo de mensaje
from edge_impulse_linux.image import ImageImpulseRunner





class ProyRobotanicaDeepLearningNode(Node):

    def __init__(self):
        super().__init__('proy_robotanica_deep_learning')
        
        self.edgeimpulse_model = 'edgeimpulse_model/robotanica_model.eim'

        # Subscriber
        
        # Crear el suscriptor. Este suscriptor recibirá una imagen
        # del tema video_frames. El tamaño de la cola es de 10 mensajes.
        self.subscription = self.create_subscription(Image, '/image', self.listener_callback, 10)
        self.subscription # evitar advertencia de variable no utilizada
       
        # Se utiliza para convertir entre ROS y OpenCV imágenes
        self.br = CvBridge()
        
        # Publisher    
        self.publisher_ = self.create_publisher(String, '/class_name', 10)
        self.fomo_image_publisher = self.create_publisher(Image, '/fomo_image', 20)

        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        
        self.label_name = "---"
        
       

    def edgeImpulseModel(self, frame):
        # print('MODEL: ' + modelPath)

        with ImageImpulseRunner(self.edgeimpulse_model) as runner:
            
            try:
                
                model_info = runner.init()
                # print('Loaded runner for "' + model_info['project']['owner'] + ' / ' + model_info['project']['name'] + '"')
                labels = model_info['model_parameters']['labels']
               
                label_name = ""
                img = frame
                sec = 0
                start_time = time.time()

                while frame.size != 0:
                    
                    
                    # imread returns images in BGR format, so we need to convert to RGB
                    img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                    # get_features_from_image also takes a crop direction arguments in case you don't have square images
                    features, cropped = runner.get_features_from_image(img)

                    # the image will be resized and cropped, save a copy of the picture here
                    # so you can see what's being passed into the classifier
                    # cv2.imwrite('debug.jpg', cv2.cvtColor(cropped, cv2.COLOR_RGB2BGR))

                    res = runner.classify(features)

                    bb_x = 0
                    bb_y = 0
                    bb_width = 0
                    bb_height = 0

                    boundingBoxColor = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]
                    tempLabel = ""

                    if "classification" in res["result"].keys():
                        # print('Result (%d ms.) ' % (res['timing']['dsp'] + res['timing']['classification']), end='')
                        for label in labels:
                            score = res['result']['classification'][label]
                            # print('%s: %.2f\t' % (label, score), end='')

                        # print('', flush=True)

                    elif "bounding_boxes" in res["result"].keys():
                        # print('Found %d bounding boxes (%d ms.)' % (len(res["result"]["bounding_boxes"]), res['timing']['dsp'] + res['timing']['classification']))
                        for bb in res["result"]["bounding_boxes"]:
                            bb_x = bb['x']
                            bb_y = bb['y']
                            bb_width = bb['width']
                            bb_height = bb['height']
                            # print('\t%s (%.2f): x=%d y=%d w=%d h=%d' % (bb['label'], bb['value'], bb['x'], bb['y'], bb['width'], bb['height']))
                            # org
                            org = (bb['x'], bb['y'])

                            font = cv2.FONT_HERSHEY_SIMPLEX
                            # fontScale
                            fontScale = 0.3
                            # Blue color in BGR
                            color = (255, 0, 0)
                            # Line thickness of 2 px
                            thickness = 1
                            # Using cv2.putText() method
                            cropped = cv2.putText(cropped, bb['label'], org, font, fontScale, color, thickness,
                                                  cv2.LINE_AA)

                            label_name = bb['label']

                            img = cv2.rectangle(cropped, (bb['x'], bb['y']),
                                                (bb['x'] + bb['width'], bb['y'] + bb['height']), boundingBoxColor[1], 1)

                    sec = time.time() - start_time
                    sec = round(sec, 2)
                    #self.get_logger().info("Getting frame at: %.2f sec" % sec)

                    return img, bb_x, bb_y, bb_width, bb_height, label_name

            finally:

                if (runner):
                    runner.stop()
                    
        self.get_logger().info("End...")                    

    def listener_callback(self, data):
        """
        Función callback.
        """
        self.get_logger().info("Read Img..")
        # Convertir mensaje de imagen ROS a imagen OpenCV
        current_frame = self.br.imgmsg_to_cv2(data)
        
        img, bb_x, bb_y, bb_width, bb_height, self.label_name = self.edgeImpulseModel(current_frame)
        
        self.fomo_image_publisher.publish(self.br.cv2_to_imgmsg(img, encoding='bgr8'))
    
    def timer_callback(self):
        msg = String()
        msg.data = self.label_name
        self.publisher_.publish(msg)


def main(args=None):
    rclpy.init(args=args)

    proy_robotanica_deep_learning = ProyRobotanicaDeepLearningNode()

    rclpy.spin(proy_robotanica_deep_learning)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    proy_robotanica_deep_learning.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()

