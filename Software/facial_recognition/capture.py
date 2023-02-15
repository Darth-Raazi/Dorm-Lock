# Dorm Lock 
# Created by Ozayr Raazi
# Based on code by Marcelo Rovai -> https://github.com/Mjrovai/OpenCV-Face-Recognition
# Program to capture face snapshots

import cv2, argparse

def arg_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("-c", "--classifier", default="haarcascade_frontalface_default.xml", help="Path to the XML Cascade Classifier file")
    parser.add_argument("-i", "--id", type=int, help="User ID that will correspond to pictures taken")
    parser.add_argument("-n", "--num", type=int, default=100, help="Number of photos to capture")

    args = parser.parse_args()

    if args.id is None:
        args.id = input("Please enter the user ID: ")

    return args

def capture(classifier, id, num):
    cam = cv2.VideoCapture(0)
    face_detector = cv2.CascadeClassifier(classifier)

    print("Please look at the camera and wait")
    print("Capturing face details...")
    # Initialize individual sampling face count
    count = 0

    while(True):
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_detector.detectMultiScale(gray, 1.3, 5)

        for (x,y,w,h) in faces:

            cv2.rectangle(img, (x,y), (x+w,y+h), (255,0,0), 2)     
            count += 1

            # Save the captured image 
            cv2.imwrite("data/User." + str(id) + '.' + str(count) + ".jpg", gray[y:y+h,x:x+w])
            cv2.imshow('image', img)

        k = cv2.waitKey(100) & 0xff # Pressing Escape exits the capture session 
        if k == 27:
            break
        elif count >= num: # Number of image captures to take 
            break

    # Do a bit of cleanup
    print("Capture Successful! Exiting...")
    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
   args = arg_parser()

   capture(args.classifier, args.id, args.num) 