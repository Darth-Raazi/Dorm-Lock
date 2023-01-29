from subprocess import run
from os import listdir

files = []

for file in listdir():
	if "IMG" in file:
		files.append(file)

counter = 1001 
for file in listdir():
	if file == "clean.py":
		continue
	run(['mv', file, f"User.0.{counter}.jpg"])
	counter+=1

print("Process done")
