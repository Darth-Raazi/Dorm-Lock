# Dorm Lock
# Created by Ozayr Raazi
# Based on code by Marcelo Rovai -> https://github.com/Mjrovai/OpenCV-Face-Recognition
# Program to recognize a face based on a trained model

import cv2, argparse
import numpy as np

def arg_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("-c", "--classifier", default="haarcascade_frontalface_default.xml", help="Path to the XML Cascade Classifier file")
    parser.add_argument("-m", "--camera", help="ID of the camera to use")
    parser.add_argument("-t", "--trainer", default="trainer/trainer.yml", help="Path to folder where trainer.yaml will be created")

    args = parser.parse_args()
    
    return args

def returnCameraIndexes():
    index = 0
    arr = []
    while index < 3:
        cap = cv2.VideoCapture(index)
        if cap.isOpened() == True:
            arr.append(index)
        cap.release()
        index += 1
    cam_id = int(input(f"{len(arr)} cameras available. Enter a camera ID {arr}: "))
    return cam_id

def get_users():
    file = "users.txt"
    users = []

    with open(file, "r") as f:
        for line in f.readlines():
            users.append(line.strip())

    return users

def recognize(classifier, camera, trainer, users):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(trainer)
    faceCascade = cv2.CascadeClassifier(classifier);

    font = cv2.FONT_HERSHEY_SIMPLEX

    #initiate id counter
    id = 0

    # Prompt user for camera if not given
    if camera:
        selection = int(camera)
    else:
        selection = returnCameraIndexes()

    # Initialize and start realtime video capture
    cam = cv2.VideoCapture(selection)

    # Define min window size to be recognized as a face
    minW = 0.1*cam.get(3)
    minH = 0.1*cam.get(4)

    confidences = []
    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

        faces = faceCascade.detectMultiScale( 
            gray,
            scaleFactor = 1.2,
            minNeighbors = 5,
            minSize = (int(minW), int(minH)),
        )

        for(x,y,w,h) in faces:
            cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)
            id, confidence = recognizer.predict(gray[y:y+h,x:x+w])

            # Check if confidence is less them 100 ==> "0" is perfect match 
            if (confidence < 100):
                id = users[id]
                confidences.append(100-confidence)
                confidence = "  {0}%".format(round(100 - confidence))
            else:
                id = "unknown"
                confidence = "  {0}%".format(round(100 - confidence))
        
            cv2.putText(img, str(id), (x+5,y-5), font, 1, (255,255,255), 2)
            cv2.putText(img, str(confidence), (x+5,y+h-5), font, 1, (255,255,0), 1)  
    
        cv2.imshow('camera',img) 

        k = cv2.waitKey(10) & 0xff # Pressing Escape exits the video
        if k == 27:
            break

    print("Exiting...")
    if len(confidences) > 0:
        print(f"Average Confidence: {int(sum(confidences)/len(confidences))}")
    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    args = arg_parser()
    
    users = get_users()
    recognize(args.classifier, args.camera, args.trainer, users)
