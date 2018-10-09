FROM java:8

#In Host-Terminal exec this command: sudo xhost +local:docker

# Install base software packages
RUN dpkg --add-architecture i386

RUN apt-get update && \
    apt-get install software-properties-common \
    python-software-properties \
    wget \
    curl \
    git \
    libncurses5:i386 \ 
    libstdc++6:i386 \ 
    zlib1g:i386 \
    unzip -y && \
    apt-get clean


# ——————————
# Install Node and global packages
# ——————————
ENV NODE_VERSION 6.11.2
RUN cd && \
    wget -q http://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz && \
    tar -xzf node-v${NODE_VERSION}-linux-x64.tar.gz && \
    mv node-v${NODE_VERSION}-linux-x64 /opt/node && \
    rm node-v${NODE_VERSION}-linux-x64.tar.gz
ENV PATH ${PATH}:/opt/node/bin


# ——————————
# Install Basic React-Native packages
# ——————————
RUN npm install -g create-react-native-app
RUN npm install -g react-native-cli

# Install SDK
RUN mkdir /app/
WORKDIR /app/
RUN wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip -P /app/
RUN unzip /app/sdk-tools-linux-3859397.zip  -d android-sdk-linux

# ENV JAVA_HOME="/opt/jdk1.8.0_171"
ENV PATH="$PATH:${JAVA_HOME}/bin"
ENV ANDROID_HOME=/app/android-sdk-linux
ENV ANDROID_SDK_ROOT=/app/android-sdk-linux
ENV PATH=$PATH:$ANDROID_HOME/tools
ENV PATH=$PATH:$ANDROID_HOME/platform-tools
ENV PATH=$PATH:$ANDROID_HOME/tools/bin

RUN yes | sdkmanager --licenses

RUN yes | $ANDROID_HOME/tools/bin/sdkmanager "tools" 

RUN echo "y" | android update sdk

RUN $ANDROID_HOME/tools/bin/sdkmanager "platforms;android-23"
RUN $ANDROID_HOME/tools/bin/sdkmanager "platforms;android-25"
RUN $ANDROID_HOME/tools/bin/sdkmanager "system-images;android-25;google_apis;x86"

ENV ANDROID_COMPONENTS platform-tools,build-tools-25.0.2,android-25,build-tools-23.0.1,android-23
ENV GOOGLE_COMPONENTS extra-android-m2repository,extra-google-m2repository,extra-google-google_play_services,extra-google-gcm

RUN echo y | android update sdk --no-ui --all --filter "${ANDROID_COMPONENTS}" ; \
    echo y | android update sdk --no-ui --all --filter "${GOOGLE_COMPONENTS}"

ENV QT_XKB_CONFIG_ROOT=/usr/share/X11/xkb

# Create AVD
RUN $ANDROID_HOME/tools/bin/avdmanager create avd\
 -n emulator-android\
 -k "system-images;android-25;google_apis;x86"\
 --device "Nexus 5"\
 --sdcard 700M

RUN mkdir /code

COPY package.json /code/

WORKDIR /code/

RUN npm install --loglevel verbose

COPY . /code/

WORKDIR /code/android/

RUN ./gradlew assembleDebug

WORKDIR /code/

RUN chmod +x variables.sh

CMD "./variables.sh"
