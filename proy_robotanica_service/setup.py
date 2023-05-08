from setuptools import setup
import os #incluir
from glob import glob #incluir

package_name = 'proy_robotanica_service'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name), glob('launch/*.launch.py')) #incluir
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='danielb',
    maintainer_email='danielb@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'movement_server = proy_robotanica_service.movement_server:main', #incluir
            'movement_client = proy_robotanica_service.movement_client:main',
            'circular_movement_client = my_first_service.circle_movement:main', #incluir
            'waypoint_server = proy_robotanica_service.waypoint_server:main'
        ],
    },
)
