#!/bin/bash

DISPLAY=:0.0 ; export DISPLAY xhost +

adb reverse tcp:8081 tcp:8081

echo 256 | tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | tee -a /proc/sys/fs/inotify/max_user_watches

echo $'REACT_NATIVE_EMAIL=merendamaisfga@gmail.com' > .env
echo $'REACT_NATIVE_PASS=codamais' >> .env
