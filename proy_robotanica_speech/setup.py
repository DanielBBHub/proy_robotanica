import os
from glob import glob
from setuptools import setup

package_name = 'proy_robotanica_speech'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, "proy_robotanica_speech/AI"), glob('proy_robotanica_speech/AI/*')),
        (os.path.join('share', package_name, "proy_robotanica_speech/Audio"), glob('proy_robotanica_speech/Audio/*')),
        (os.path.join('share', package_name, "proy_robotanica_speech/Logger"), glob('proy_robotanica_speech/Logger/*')),
        (os.path.join('share', package_name, "proy_robotanica_speech/prompts"), glob('proy_robotanica_speech/prompts/*')),
        (os.path.join('share', package_name, "proy_robotanica_speech/sounds"), glob('proy_robotanica_speech/sounds/*'))

    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='jarain78',
    maintainer_email='jrincon@dsic.upv.es',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'Proy_robotanica_Speech=proy_robotanica_speech.Proy_robotanica_Speech:main'#incluir
        ],
    },
)
