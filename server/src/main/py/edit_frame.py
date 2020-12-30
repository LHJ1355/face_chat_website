import cv2
import numpy as np

def edit_frame(frame, background):
    lower_blue = np.array([94, 80, 2])
    upper_blue = np.array([126, 255, 255])

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    mask_all = cv2.inRange(hsv,lower_blue,upper_blue)

    mask_all = cv2.morphologyEx(mask_all, cv2.MORPH_OPEN, np.ones((3,3),np.uint8))
    mask_all = cv2.morphologyEx(mask_all, cv2.MORPH_DILATE, np.ones((3,3),np.uint8))

    mask2 = cv2.bitwise_not(mask_all)

    streamA = cv2.bitwise_and(frame,frame,mask=mask2)

    streamB = cv2.bitwise_and(background, background, mask = mask_all)

    output = cv2.addWeighted(streamA,1,streamB,1,0)
    return output
# ## Notes for adding colors

# ###### Red color
# low_red = np.array([161, 155, 84])
# high_red = np.array([179, 255, 255])
# red_mask = cv2.inRange(hsv_frame, low_red, high_red)
# red = cv2.bitwise_and(frame, frame, mask=red_mask)
# 
# ###### Blue color
# low_blue = np.array([94, 80, 2])
# high_blue = np.array([126, 255, 255])
# blue_mask = cv2.inRange(hsv_frame, low_blue, high_blue)
# blue = cv2.bitwise_and(frame, frame, mask=blue_mask)
# 
# ###### Green color
# low_green = np.array([25, 52, 72])
# high_green = np.array([102, 255, 255])
# green_mask = cv2.inRange(hsv_frame, low_green, high_green)
# green = cv2.bitwise_and(frame, frame, mask=green_mask)
# 
# ###### Every color except white
# low = np.array([0, 42, 0])
# high = np.array([179, 255, 255])
# mask = cv2.inRange(hsv_frame, low, high)
# result = cv2.bitwise_and(frame, frame, mask=mask)
