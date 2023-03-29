# Importar las librerías necesarias
import rclpy # Librería Python para ROS 2
from rclpy.node import Node # Maneja la creación de nodos
from sensor_msgs.msg import Image # Image es el tipo de mensaje
from cv_bridge import CvBridge # Paquete para convertir entre ROS y OpenCV Images
import cv2 # Libreria OpenCV
  
class ImageSubscriber(Node):
  """
  Crea una clase ImageSubscriber, que es una subclase de la clase Node.
  """
  def __init__(self):
    """
    Constructor de la clase para configurar el nodo
    """
    # Inicia el constructor de la clase Nodo y dale un nombre
    super().__init__('image_subscriber')
       
    # Crear el suscriptor. Este suscriptor recibirá una imagen
    # del tema video_frames. El tamaño de la cola es de 10 mensajes.
    self.subscription = self.create_subscription(
      Image, 
      'video_frames', 
      self.listener_callback, 
      10)
    self.subscription # evitar advertencia de variable no utilizada
       
    # Se utiliza para convertir entre ROS y OpenCV imágenes
    self.br = CvBridge()
    
  def listener_callback(self, data):
    """
    Función callback.
    """
    # Muestra el mensaje en la consola
    self.get_logger().info('Recibiendo fotograma de vídeo')
  
    # Convertir mensaje de imagen ROS a imagen OpenCV
    current_frame = self.br.imgmsg_to_cv2(data)
     
    # Mostrar imagen
    cv2.imshow("cámara", current_frame)
     
    cv2.waitKey(1)
   
def main(args=None):
   
  # Inicializa la librería rclpy
  rclpy.init(args=args)
   
  # Crear el nodo
  image_subscriber = ImageSubscriber()
   
  # Gira el nodo para que la función callback sea llamada.
  rclpy.spin(image_subscriber)
   
  # Destruye el nodo explícitamente
  # (opcional - de lo contrario se hará automáticamente
  # cuando el recolector de basura destruya el objeto nodo)
  image_subscriber.destroy_node()
   
  # Apagar la librería cliente ROS para Python
  rclpy.shutdown()
   
if __name__ == '__main__':
  main()
