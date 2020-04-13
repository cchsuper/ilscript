# Calculates IL points for the Super Mario Sunshine IL Spreadsheet.
# Uses the latest .csv file in ./csv/
# Must be in the .csv format downloaded from Google Sheets.

import csv
import re
import os
import sys

debug = -1

def getRaw(time: str) -> int:
    centiseconds = 0
    result = re.compile("^(\d+:)?(\d+)(\.\d(\d)?)$").match(time) #this has a bug lol. 1:232.34 works
    if result==None:
        centiseconds = -1
    else:
        tmp1 = time.split(":")
        tmp2 = []
        if len(tmp1) == 2:
            centiseconds += int(tmp1[0])*60*100
            tmp2 = tmp1[1].split(".")
        else:
            tmp2 = tmp1[0].split(".")
        if len(tmp2) == 2:
            centiseconds += int(tmp2[0])*100
            if len(tmp2[1]) == 1:
                centiseconds += int(tmp2[1])*10
            else:
                centiseconds += int(tmp2[1])
    return centiseconds

path=""
if len(sys.argv) > 1:
    path = "./csv/"+str(sys.argv[1])
    if os.path.isfile(path):
        print("Using "+path)
    else:
        print("File not found:"+path)
        quit()
else:
    print("Using latest file "+os.listdir("./csv/")[-1])
    path = "./csv/"+os.listdir("./csv/")[-1]

data = []
players = []
points={}
data2=[]

with open(path) as f:
    for i,row in enumerate(csv.reader(f)):
        if i<3:
            pass
        else:
            data.append(row[1:])
            players.append(row[0])
            points[row[0]] = 0

# Convert times to centiseconds
for row in data:
    for j,time in enumerate(row):
        row[j] = getRaw(time)

# Populate data2 with (name,time) tuples
for i in range(0,len(data[0])): #
    data2.append([("placeholder",0)])
for j,row in enumerate(data):
    name = players[j]
    for i,time in enumerate(row):
        levelList = data2[i]
        levelList.append((name, time))

# Temporary (?) leaderboard print
# place = 1
# for t in sorted(data2[debug], key=lambda x: x[1]):
#     if(t[1]>0):
#         print(str(place)+". "+t[0]+": "+str(t[1]))
#         place+=1

# Assign Points
for i,level in enumerate(data2):
    reverseSort = [10,11,12,13,22,23,26,39,40,54,55,65,
                   66,68,69,70,83,92,95,100,101,103,104,105]
    if i in reverseSort:
        sortedLevel = sorted(level,key=lambda x: x[1])
    else:
        sortedLevel = sorted(level,key=lambda x: x[1], reverse=True)
    if i==debug: print(sortedLevel)

    pointsToAdd = 0
    tied=[]
    tiedpoints=0
    prev =("placeholder",-1)
    for j,entry in enumerate(sortedLevel):
        if entry[1] > 0:

            if entry[1] == prev[1]:
                if len(tied)==1:
                    tiedpoints = pointsToAdd
            else:
                if len(tied)==1:
                    points[tied[0][0]] += pointsToAdd
                    if i==debug: print(tied[0][0]+": added "+str(pointsToAdd))
                else:
                    for entry2 in tied:
                        points[entry2[0]] += tiedpoints
                        if i==debug: print(entry2[0]+": added "+str(tiedpoints))
                if i==debug: print(tied)
                tiedpoints=0
                tied = []

            tied.append(entry)
            pointsToAdd+=1
            prev = entry

    if len(tied)==1:
        points[tied[0][0]] += pointsToAdd
        if i==debug: print(tied[0][0]+": added "+str(pointsToAdd))
    if len(tied)>1:
        for entry in tied:
            points[entry[0]] += tiedpoints
            if i==debug: print(entry[0]+": added "+str(tiedpoints))

# Display Sorted Ranking
ranking = sorted(points, key=lambda x: points[x], reverse=True)
with open ("./out/"+path[6:-4]+".txt","w") as f:
    for i in ranking:
        f.write(i+":"+str(points[i])+"\n")
