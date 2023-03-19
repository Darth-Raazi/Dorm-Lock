# Dorm Lock 
# Created by Ozayr Raazi
# Based on code by Marcelo Rovai -> https://github.com/Mjrovai/OpenCV-Face-Recognition
# Program to capture face snapshots

import cv2, argparse, json, os

def arg_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("-c", "--classifier", default="haarcascade_frontalface_default.xml", help="Path to the XML Cascade Classifier file")
    parser.add_argument("-m", "--camera", help="ID of the camera to use")
    parser.add_argument("-u", "--user", help="Username corresponding to the pictures taken: ")
    parser.add_argument("-n", "--num", type=int, default=100, help="Number of photos to capture")

    args = parser.parse_args()

    if not args.user:
        args.user = input("Please enter the user name: ")

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
    
def save_user(username):
    file = "users.txt"
    users = []

    if os.path.exists(file):
        with open(file, "r") as f:
            for line in f.readlines():
                users.append(line.strip())

    if username in users:
        return users.index(username)
    else:
        with open(file, "a") as f:
            f.write(username)
        return len(users)

def capture(classifier, id, num, camera):
    # Prompt user for camera if not given
    if camera:
        selection = int(camera)
    else:
        selection = returnCameraIndexes()

    cam = cv2.VideoCapture(selection)
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

        print(f"\rCaptured image {count}/{num}", end="")

        k = cv2.waitKey(100) & 0xff # Pressing Escape exits the capture session 
        if k == 27:
            break
        elif count >= num: # Number of image captures to take 
            break

    # Do a bit of cleanup
    print("\nCapture Successful! Exiting...")
    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
   args = arg_parser()
   
   id = save_user(args.user)
   capture(args.classifier, id, args.num, args.camera) 
