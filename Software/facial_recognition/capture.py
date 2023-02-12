# February 5, 2023
# Created by Ozayr Raazi
# Based on code by Marcelo Rovai -> https://github.com/Mjrovai/OpenCV-Face-Recognition
# Program to capute face snapshots

import cv2

cam = cv2.VideoCapture(0)
face_detector = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# For each person, enter one numeric face id
face_id = input("Please enter the user ID: ")

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
        cv2.imwrite("data/User." + str(face_id) + '.' + str(count) + ".jpg", gray[y:y+h,x:x+w])
        cv2.imshow('image', img)

    k = cv2.waitKey(100) & 0xff # Pressing Escape exits the capture session 
    if k == 27:
        break
    elif count >= 100: # Number of image captures to take 
         break

# Do a bit of cleanup
print("Capture Successful! Exiting...")
cam.release()
cv2.destroyAllWindows()
