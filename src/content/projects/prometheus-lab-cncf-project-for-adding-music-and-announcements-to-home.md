---
description: 'Prometheus Lab, CNCF Project for Adding Music and Announcements to Home'
pubDate: 'Apr 21, 2023'
heroImage: 'https://images.prismic.io/syntia/3a7f4e2f-fff0-44ef-8eef-f71422107799_screenshot-2023-04-20-at-12.52.54.png?auto=compress,format'
author: 'Syntia'
categories: 'projects, cloud infrastructure, monitoring tools'
---

# **Prometheus Lab, CNCF Project for Adding Music and Announcements to Home**

Project Coldplay by Erwin de Keijzer, DevOps Engineer has guided through project phase of building software solution for Adding Music and Announcements to his Home.

While Prometheus has become the most prominent open source monitoring tool in the world, not let alone OpenTelemetry, Grafana and the recent project updates by CNCF, the onboarding into monitoring and observance tools has been main focus on KubeCon and CloudNativeCon 2023.

In this year KubeCon + CloudNativeCon Europe 2023 had more than 10000 members from which 58% has their first time in this global cloud-native conference.

Attention to proof-of-concept and sandbox projects often prove that decision about project final outcome depends not only on software architecture but the iterations of testing in project development phase.

Erwin de Keijzer, DevOps Engineer has been presenting the use of observance and monitoring tools to learn about Prometheus and discover the abnormality detection with PromQL queries.

#### **Project Coldplay- using CNCF Projects for Adding Music and Announcements to My Home Elevator.**

##### **Coldplay objectives:**

*   know where the elevator is;=
    
*   add the music when elevator is moving
    
*   play announcements when elevator stops at a floor
    
*   don’t break the elevator;
    
*   don’t break the elevator internal electronics
    

#### **Alerts:**

![](https://images.prismic.io/syntia/3a7f4e2f-fff0-44ef-8eef-f71422107799_screenshot-2023-04-20-at-12.52.54.png?auto=compress,format)

![](https://images.prismic.io/syntia/6b9bf08b-5a88-4e63-aa9f-7aa6413ac99b_screenshot-2023-04-20-at-12.54.11.png?auto=compress,format)

*   Elevator stuck between the floors; elevator moves too fast
    
*   elevator moves too slowly
    
*   elevator out of bounds (< 0 cm or > 550cm)
    

### **Attempt #1**

ultrasonic sensor attached to raspberry pi, where the python code produces measurements. Distance seems reliable, but the horizontal support beams in the elevator shaft produce echoes for the sound waves, and the elevator shaft is too high (more than 2m), a vertical scaling issue.

### **Attempt #2**

TF-Luna LiDAR range sensor, in range up to 8m, accuracy of 2% of a measure distance, from 8m it would be 16cm it could deviate, frame rate up to 250Hz, and with a multiple ways of a connection, e.g. trigger based mechanism.

Issue with Jitter for the elevator height that has to do with the temperature of the chip itself on the sensor (Unit: 0.01 Celsius; Timestamp- per TF Luna I2C specs)

![](https://images.prismic.io/syntia/d2547ded-c47c-49e5-ba3e-cc6dea613587_screenshot-2023-04-20-at-11.47.48.png?auto=compress,format)

![](https://images.prismic.io/syntia/53181ac6-c67a-4116-b4bd-59c12d2bd01e_screenshot-2023-04-20-at-12.01.29.png?auto=compress,format)

![](https://images.prismic.io/syntia/617ab138-6ffc-4997-94fe-66ef4b37c2f1_screenshot-2023-04-20-at-12.06.45.png?auto=compress,format)

Monitoring with Prometheus and Grafana

### **Software Architecture:**

**1st attempt** with **microservices approach**– on raspberry pi there are two components- measure and speaker, that does measurements and speaks the announcements. The Scientist is the Coldplay song that is a controller of the project- takes all the measurements and decisions about playing music, updates the user interface, and sends data to prometheus. Ui, prom writer (prometheus), and the Scientist use the subnet. It is based on Tailscale, which allows building an overlay mesh network between all your devices and building connections between them on the Tailnet.

**2nd attempt** with **monolith architecture**– project called Paradise written in Go, connected with Prometheus and Grafana to read the results.

However after running the project for a few hours it outputs noise that returns ground-below results. Reboot worked for a few seconds, and adapting the time between measurements based on the chip temperature didn’t solve the problem.

**3rd attempt** was an **architectural redesign** with rust that takes the measurements and writes them on NATS, then a service called Yellow articulates the measurements to the speaker, updates the user interface and sends the data to Prometheus.

![](https://images.prismic.io/syntia/c89413bf-f8f5-457d-84c6-9133454bb995_screenshot-2023-04-20-at-12.10.53.png?auto=compress,format)

![](https://images.prismic.io/syntia/7b90532a-efb5-4103-9692-3eed32674db2_screenshot-2023-04-20-at-12.36.12.png?auto=compress,format)

![](https://images.prismic.io/syntia/f6a24d7c-dd18-4951-9db9-7e1c00eda89c_screenshot-2023-04-20-at-12.40.17.png?auto=compress,format)

#### **Latency of the Service**

The hardware on top of the elevator shaft has the bluetooth speaker but connects with an audio cable that has no latency to make sure the time between elevator starting- playing the music is short. Hardware box is attached. with magnets inside the elevator.

To connect with Raspbery pi **SSH into the correct Raspberry Pi** for the remote access. Software is built with Go HTML web template and JavaScript, setting the websocket connection from the server to client via event stream incoming message.

Inventor Major General George Owen Squier, credited with inventing telephone carrier multiplexing in 1910, developed the original technical basis for **Muzak**, and several US patents in the 1920s related to transmission and distribution of signals over electrical lines.

While Muzak had initially produced tens of thousands of original artist recordings by the top performers of the late 1930s and 1940s, their new strategy required a different sound.

![](https://images.prismic.io/syntia/eebf8b9d-503b-4c32-b940-d50a751882ce_screenshot-2023-04-20-at-11.47.25.png?auto=compress,format)

![](https://images.prismic.io/syntia/76db2edb-8e45-43a0-a298-d1d49dc0b05a_screenshot-2023-04-20-at-12.08.17.png?auto=compress,format)

![](https://images.prismic.io/syntia/ba0ad0b4-bdd0-4336-8d41-f56996d9bfcc_screenshot-2023-04-20-at-12.36.54.png?auto=compress,format)

#### **Architectural software redesign:**

Decision about high-frame rate detection – Ultrasonic Sensor vs **a single-point ranging LiDAR** with I2C and TF Luna;

Resolving connections- Ssh’ing into the wrong host when testing audio;

Hardware barriers- raspberry pi when unplug the network switch;

Having 2 copies of the measuring software running at the same time;

Bad soldering job on the connectors of th TF Luna;

Cross compiling Rust and Go from M1 Mac to Linux Arm

Reference to the project: [https://github.com/gnur/coldplay](https://github.com/gnur/coldplay)