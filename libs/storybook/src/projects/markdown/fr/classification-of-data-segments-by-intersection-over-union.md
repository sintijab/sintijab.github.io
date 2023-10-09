\---  
description: "Classification de segments de données par des réseaux artificiels et l'apprentissage en profondeur"  
pubDate"Feb 22, 2022"   
heroImage"6df8f3e9-cc2c-4313-bebf-889e7a0f7393_14-00023-g002.png?auto=compress,format"   
author"Syntia"   
categories: "projets, intelligence artificielle, réseaux neuronaux, classification d'images"  
subcategories: "réseau neuronal convolutionnel, réseau neuronal artificiel"  
\---  

# **Classification de segments de données par intersection sur union**

Le problème de classification le plus fondamental en vision par ordinateur est la classification d'images elle-même, où l'étiquette et l'objet principal sont une sortie donnée d'une image qui échoue à reconnaître le type d'objets en dehors de sa boîte englobante.

La segmentation précise des instances reste difficile, en particulier aux bords des objets. Ce problème est plus prépondérant pour la segmentation des instances dans les images de télédétection en raison des échelles diverses, de l'illumination variable, des objets plus petits et des arrière-plans complexes. Nous constatons que la plupart des réseaux de segmentation d'instances actuels ne tiennent pas compte de la difficulté de segmentation des différentes instances et des différentes régions au sein de l'instance.

L'architecture classique du réseau neuronal convolutionnel est typique avec une certaine taille de couche d'entrée et des chemins de contraction et d'expansion de la sortie. La réponse de convolution d'une entrée n'est rien de plus qu'une multiplication où les dimensions peuvent changer d'une sortie et sont définies à chaque étape de la couche de convolution et de la mise en commun maximale par un certain nombre de décalages sur la matrice d'entrée.
L'architecture U-net est conçue pour la segmentation sémantique et se compose de deux chemins : l'encodage et le décodage, un chemin contractant et un chemin expansif. La concaténation des cartes des caractéristiques rend disponibles les détails de localisation à mesure que le réseau propage les informations de contexte vers la couche de réponse, c'est pourquoi le chemin expansif est symétrique à la partie contractante.
L'architecture U-net standard peut être étendue à la segmentation sémantique multiclasses avec un poids contrôlé sur les entrées fournies. La configuration du modèle de segmentation et sa colonne vertébrale (comme un modèle de classification sans les dernières couches denses de segmentation) sont définies par la technique d'extraction de caractéristiques, par exemple ResNet, Inception, MobileNet, EfficientNet utilisée pour l'imagerie par résonance magnétique, la microscopie légère, la segmentation d'images biomédicales.
La segmentation multiclasse sémantique peut être effectuée en structurant les données pour l'entrée en plusieurs classes, en divisant l'image en patchs, en convertissant les images et les masques en fichiers image étiquetés et compilés dans une liste de tableaux NumPy, pas de liste. Elle fonctionne également dans le domaine de l'algèbre linéaire, de la transformée de Fourier et des matrices. Après la conversion, les étiquettes doivent être encodées par un tableau de vectorisation en un seul vecteur, remis en forme et normalisé.
Les images doivent avoir des étiquettes étiquetées pour générer des masques afin de définir des classes pour chaque segment et les compiler avec une segmentation binaire, car la dernière couche a une sortie avec une probabilité atteignant de zéro à un.
La classification multiclasse est caractérisée par des catégories telles que la taille de l'image et le nombre de classes, l'équilibrage du poids des classes pour le jeu de données en définissant un modèle multi-unité, cette fois en utilisant la classification avec une entropie croisée catégorique plutôt que binaire. L'intersection sur une unité obtiendra l'argument qui donne la probabilité la plus élevée parmi les classes définies et trouvera la classe avec la probabilité maximale. Le pourcentage peut varier pour la probabilité accrue, le poids doit être augmenté pour la classe. Plusieurs codeurs peuvent être définis pour générer des caractéristiques pour l'image d'entrée, ce qui donne la plus grande précision et l'avantage le plus important par rapport aux autres modèles de réseau de convolution.

Outils :
Outil d'étiquetage pour les masques d'images [www.apeer.com/annotate](//www.apeer.com/annotate)
Jeu de données ImageNet avec des modèles entraînés [https://www.image-net.org](https://www.image-net.org)
Spyder, IDE open source légère pour Python [https://www.spyder-ide.org](https://www.spyder-ide.org)
Cadre Python Keras ou PyTorch pour les réseaux artificiels et l'apprentissage en profondeur, par exemple en vision par ordinateur ou en traitement du langage naturel [https://keras.io](https://keras.io) [https://pytorch.org](https://pytorch.org)
Un exemple d'apprentissage d'instances difficiles et d'analyse de la forme des frontières [https://www.mdpi.com/2072-4292/14/1/23](https://www.mdpi.com/2072-4292/14/1/23)