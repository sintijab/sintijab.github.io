# **Radar and optical satellite imagery prediction**

![](https://images.prismic.io/syntia/2f347b0b-5e4c-4167-a106-e625524b3ca4_figure-2022-03-27-153109.png?auto=compress,format)

Test image and feature maps from convolutional layer

Progress made in technology and digital signal processing since the early 50s lead to developing systems useful for military and civilian actions.

All information held on systems amounted to mass surveillance should be a counterpart to defense and military intelligence for North Atlantic Treaty Organisation which was established in the aftermath of World War Two and should be responsible to provide security with real time actionable intelligence operations to assist in both military and humanitarian efforts.

Today, synthetic aperture radar (SAR) plays an important role in military ground surveillance and earth observation. In the military context the availability of SAR is its convincing advantage.

Applications in this area are widespread: global reconnaissance is done mainly by satellite systems, aircrafts and high flying unmanned platforms carry sensors for wide area observation and miniaturized SAR equipment is used for integration into drones for battlefield surveillance.

The underlying radar principle offers advantages compared to competing sensors in infrared or visible spectral areas. Radar has proved to be valuable before, because of its day-and-night capability and the possibility to penetrate clouds and rain. Optical instruments however have great advantages in the interpretation of depicted objects. Optical imagery from companies such as Maxar Technologies and Planet provide satellite images relying on visible or infrared light, can’t see through clouds and are not as effective at night.

SAR uses the motion of the radar antenna mounted on an aircraft or a satellite to image what lies below; it works by sending pulses of radar beams and collecting the echoes. Similar to ultrasound waves bounce off interfaces between media with different impedances, such as bone/muscle, or skin/amniotic fluid. The synthesizing is performed by acquiring data from parts of the array to reduce the amount of electronic channels. For Radar, the object is most often in the far-field of the array, whereas the object always is in the near-field of a medical ultrasound system, which complicates the reconstruction. Since the medical array is stationary, it is possible to repeat measurements rapidly, which is not the case for a SA Radar system. The position between the different elements is also fixed in ultrasound, whereas the deviations from a straight flight path for airplanes often have to be compensated for in Radar systems. 

Hence, by measuring precisely how long it takes for echoes to return from these interfaces taking account of the differing sound velocities in each medium, their positions can be worked out and a detailed three-dimensional map can be calculated, and converted to a real-time video image.

“Ultrasound” depicts a collection of images generated from convolutional network model trained on optical and radar satellite imagery datasets from military activity from before Russia began sending military troops into Ukraine detailing a significant fleet of military technology and resources across Belarus, Crimea and western Russia all of which border Ukraine.

Images classifies the objects for segmentation: deployed helicopters, tents, ground attack aircraft, troops, air defense units, vehicle convoys. The deep neural network training is done by unsupervised learning because of unknown faults, increasing number of unlabeled imbalanced datasets and built autoencoders that are suitable as a diagnostic tool to examine satellite imagery and predict detection of military objects as anomalies from far distance, on different surfaces and angles. To increase the performance of auto labelling the image dimensionality of the original dataset was reduced after the first 100 epochs of training and the new dataset created a reconstructed feature maps from the encoder part with the same weights used for the autoencoder. The generated predictions from CNN model is printable [./gallery/140472457/Ultrasound](https://www.behance.net/gallery/140472457/Ultrasound) representing the generated images with the auto labeling. The magnitude of changes is better reflected and is more significant by KDE distribution and the latent space analysis. 

How to predict where the war does start? The neural network training consists of binary classification where the territory has no military intervention and where there is some activity captured in different time series. The training could be optimized by autoencoding datasets with positive and false positive sectors to differentiate between testing reconstruction errors for the territories with the lower probability of anomalies. 

The military activity was observed and captured between Feb. 13 and Feb. 22 before Russia sent military troops into Ukraine for “peacekeeping” operations, announced one week later on Monday Feb. 21th. With the optical and radar satellite imagery available could guarantee of civilian protection and early response to the humanitarian crisis before escalating state of emergency. 

Sincere condolences to the war victims in Ukraine and abroad.