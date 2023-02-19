# February 5, 2023
# Created by Ozayr Raazi
# Based on code by Marcelo Rovai -> https://github.com/Mjrovai/OpenCV-Face-Recognition
# Program to train a recognition model

import cv2, os, argparse
import numpy as np
from PIL import Image

def arg_parser():
    parser = argparse.ArgumentParser()
    
    parser.add_argument("-d", "--data", default="data", help="Path to folder with user images")
    parser.add_argument("-c", "--classifier", default="haarcascade_frontalface_default.xml", help="Path to the XML Cascade Classifier file")
    parser.add_argument("-t", "--trainer", default="trainer", help="Path to folder where trainer.yaml will be created")

    args = parser.parse_args()

    return args

# function to get the images and label data
def getImagesAndLabels(detector, path):

    imagePaths = [os.path.join(path,f) for f in os.listdir(path)]     
    faceSamples=[]
    ids = []

    for imagePath in imagePaths:
        if "Blank.jpg" in imagePath:
            continue
        
        PIL_img = Image.open(imagePath).convert('L') # convert it to grayscale
        img_numpy = np.array(PIL_img,'uint8')

        id = int(os.path.split(imagePath)[-1].split(".")[1])
        faces = detector.detectMultiScale(img_numpy)

        for (x,y,w,h) in faces:
            faceSamples.append(img_numpy[y:y+h,x:x+w])
            ids.append(id)

    return faceSamples,ids

def train(data, classifier, trainer):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    detector = cv2.CascadeClassifier(classifier);


    print ("Please wait, training model...")
    faces,ids = getImagesAndLabels(detector, data)
    recognizer.train(faces, np.array(ids))

    # Save the model into trainer folder
    recognizer.write(f"{trainer}/trainer.yml") 

    # Print the numer of faces trained and end program
    print(f"{len(np.unique(ids))} face{'s' if len(np.unique(ids)) > 1 else ''} trained. Exiting...")

if __name__ == "__main__":
    args = arg_parser()

    train(args.data, args.classifier, args.trainer)