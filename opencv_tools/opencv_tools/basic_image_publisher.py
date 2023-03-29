# Importar las librerías necesarias
import rclpy # Librería Cliente Python para ROS 2
from rclpy.node import Node # Maneja la creación de nodos
from sensor_msgs.msg import Image # Image es el tipo de mensaje
from cv_bridge import CvBridge # Paquete para convertir entre ROS y OpenCV Images
import cv2 # Librería OpenCV

class ImagePublisher(Node):
  """
  Crear una clase ImagePublisher, que es una subclase de la clase Node.
  """
  def __init__(self):
    """
    Constructor de clase para configurar el nodo
    """
    # Inicia el constructor de la clase Nodo y dale un nombre
    super().__init__('publicador_imagen')
       
    # Crear el editor. Este editor publicará una imagen
    # en el tema video_frames. El tamaño de la cola es de 10 mensajes.
    self.publisher_ = self.create_publisher(Image, 'video_frames', 10)
       
    # Publicaremos un mensaje cada 0.1 segundos
    timer_period = 0.1 # segundos
       
    # Crear el temporizador
    self.timer = self.create_timer(timer_period, self.timer_callback)
          
    # Crear un objeto VideoCapture
    # El argumento '0' obtiene la webcam por defecto.
    self.cap = cv2.VideoCapture(0)
          
    # Se utiliza para convertir entre ROS y OpenCV imágenes
    self.br = CvBridge()
    
  def timer_callback(self):
    """
    Función callback.
    Esta función es llamada cada 0.1 segundos.
    """
    # Captura fotograma a fotograma
    # Este método devuelve True/False así
    # como el fotograma de vídeo.
    ret, frame = self.cap.read()
           
    if ret == True:
      # Publica la imagen.
      # El método 'cv2_to_imgmsg' convierte una imagen OpenCV
      # una imagen OpenCV a un mensaje de imagen ROS 2
      self.publisher_.publish(self.br.cv2_to_imgmsg(frame))
  
    # Muestra el mensaje en la consola
    self.get_logger().info('Publicando fotograma de vídeo')
   
def main(args=None):
   
  # Inicializa la librería rclpy
  rclpy.init(args=args)
   
  # Crear el nodo
  image_publisher = ImagePublisher()
   
  # Gira el nodo para que la función callback sea llamada.
  rclpy.spin(image_publisher)
   
  # Destruye el nodo explícitamente
  # (opcional - de lo contrario se hará automáticamente
  # cuando el recolector de basura destruya el objeto nodo)
  image_publisher.destroy_node()
   
  # Apagar la librería cliente ROS para Python
  rclpy.shutdown()
   
if __name__ == '__main__':
  main()
