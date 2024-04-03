# Planification topographique pour les cartes numériques

![](https://images.prismic.io/syntia/8933c596-6e38-45e3-ace0-1829a8304ec4_snazzy-image.png?auto=compress,format)

Aujourd'hui, je ne pourrais pas imaginer voyager sans Google Maps. Alors que certains endroits reculés sont obsolètes ou manquent sur la carte, visualiser les principales infrastructures est crucial pour la sécurité des déplacements. J'utilise souvent la fonctionnalité Couches de Google Maps, qui reflète généralement des collections d'objets que vous ajoutez sur la carte pour désigner une association commune.

## Randonnées pédestres et à vélo

Vous pouvez obtenir des itinéraires pour conduire, utiliser les transports en commun, marcher, faire du covoiturage, du vélo, prendre un vol ou une moto sur Google Maps. Atteindre des sites inaccessibles à pied peut être dangereux, surtout sur les routes sans trottoirs.

Google Maps offre des fonctionnalités telles que les Couches pour marquer les sentiers, les voies dédiées, les routes adaptées aux vélos ou les sentiers non pavés sur la vue de la carte. Dans certaines régions reculées, ce n'est pas précis. Dans le nord de l'Allemagne, par exemple, l'allée s'étend sur un tiers de la route séparée du trottoir, qui se fond dans la piste cyclable à mesure que la route continue. Les panneaux de signalisation routière sont les plus fiables, mais si vous en manquez un, Google Maps vous fera faire des virages inattendus dans votre voyage.

Un stylisme personnalisé pour les Couches Google rendra la planification de votre prochain voyage sur la route plus facile.

## Comment créer des Couches personnalisées pour Google Maps?

1. Visitez [https://mapstyle.withgoogle.com/](https://mapstyle.withgoogle.com/)

2. Utilisez le générateur de style JSON hérité

3. Créez un style de carte

4. Paramètres - Importez JSON

5. Copiez/collez le tableau JavaScript à partir de n'importe quel modèle, par exemple [https://snazzymaps.com/style/85450/monochrome-grey](https://snazzymaps.com/style/85450/monochrome-grey)

## Thèmes de couleur

Dans un récent sondage auprès de 115 utilisateurs de téléphones portables demandant dans quel mode ils ont généralement leur appareil mobile, environ 1/3 ont dit mode sombre, 1/3 ont dit mode clair et 1/3 ont dit une combinaison des deux. L'argument selon lequel le mode sombre améliore l'expérience utilisateur (et l'accessibilité dans certains cas) semble toujours revenir aux mêmes quelques raisons, mentionnées par les utilisateurs, les designers et les développeurs :

- Réduction de la fatigue oculaire

- Économies de batterie

- Attrait esthétique

- Amélioration de l'accessibilité pour les personnes atteintes de déficiences visuelles (par exemple, les cataractes)

La chromothérapie utilise le pouvoir des couleurs pour soutenir notre bien-être mental, émotionnel et physique, et peut être extrêmement importante lors de la conduite d'une voiture ou de la mesure de longues distances.

Dans cet article, j'ai répertorié quelques modèles que je recommande pour les cartes Google Web [https://mapstyle.withgoogle.com/](https://mapstyle.withgoogle.com/), ou lors de l'intégration des cartes sur n'importe quel site web.

## Modèles de topographie

### L'Effet Propia

Palette de couleurs rouge, violette et orange adaptée au thème sombre.
[Lien vers le modèle](https://snazzymaps.com/style/111/the-propia-effect).
<div id="propia-effect-map" class="map"></div>

### Vert clair

Thème vert clair mettant en évidence les surfaces non plates loin des environnements urbains.
[Lien vers le modèle](https://snazzymaps.com/style/59/light-green).
<div id="light-green-map" class="map"></div>

### Navigation

Thème monochrome à niveaux de gris clair mettant en évidence les marqueurs de localisation routière pour les voyages en voiture ou à vélo.
[Lien vers le modèle](https://snazzymaps.com/style/4069/navigation).

### Adapté aux daltoniens

Une carte stylisée basée sur les nuances d'une palette adaptée aux daltoniens. Les personnes atteintes de différents types de déficience chromatique, par exemple, la tritanopie (déficience de la vision bleue), la deutéranopie (verte), la protanopie (rouge). Le canal orange/rouge est le mieux perçu quel que soit le type de daltonisme d'une personne. Il est à l'extrémité du spectre des couleurs et transmet un contraste maximal, qui n'est pas perdu lorsque la perception des couleurs est altérée.
[Lien vers le modèle](https://snazzymaps.com/style/114/colorblind-friendly).

![](https://images.prismic.io/syntia/697c51f6-174a-4774-8500-3b2af3a9d3f5_tritanopia-deuteranopia-protanopia.jpg?auto=compress,format)
<div id="colorblind-friendly-map" class="map"></div>

### Mise en évidence des zones d'intérêt

Ce style vise à mettre en évidence les "zones d'intérêt" de couleur cuivrée. Il est utile de regrouper la zone en groupes d'activités.
[Lien vers le modèle](https://snazzymaps.com/style/276636/areas-of-interest-highlight).

Conseil : filtrer les zones par mots-clés dans les avis Google catégorise les intérêts et répond aux questions liées à la planification d'itinéraires.

<div id="areas-of-interest-map" class="map"></div>

### Réseau ferroviaire et stations

Mise en évidence du réseau ferroviaire, de la voie maritime et des stations.
[Lien vers le modèle](https://snazzymaps.com/style/76037/rail-network-and-stations)

<div id="rail-network-and-stations-map" class

="map"></div>

### Navigation naturelle

Idéal pour marquer les principales routes de l'infrastructure cyclable sur les sites.
[Lien vers le modèle](https://snazzymaps.com/style/19607/natural-navigation).

<div id="natural-navigation-map" class="map"></div>

### RoweMap

Palette de couleurs pastel rose, violette, monochrome gris, la saturation des couleurs et la luminosité sont relatives au niveau de zoom de la carte.
[Lien vers le modèle](https://snazzymaps.com/style/40616/rowemap).

<div id="rowe-map-map" class="map"></div>

### BestTrip

Couleurs vert clair, monochromes, carte simplifiée avec des marqueurs pour les zones de randonnée et les sentiers. [Lien vers le modèle](https://snazzymaps.com/style/20730/besttrip).

<div id="best-trip-map" class="map"></div>

### Topo USGS 1946

Carte en deux tons monochromes basée sur une carte topo USGS datant de 1946, mettant en évidence les voies navigables, les parcs et les caractéristiques naturelles. Utile pour marquer les collections topographiques historiques.
[Lien vers le modèle](https://snazzymaps.com/style/103965/usgs-topo-1946).

<div id="usgs-topo-map" class="map"></div>

### Routes secondaires pour vélo

Mise en évidence des routes et des sentiers adaptés aux bicyclettes,
[lien vers le modèle](https://snazzymaps.com/style/7800/biking-secondary-roads).

## Cartes simplifiées

Les cartes simplifiées ne sont pas étiquetées et sont idéales pour ajouter des marqueurs personnalisés ou des impressions artistiques et des affiches.

### Tour

Une carte simple, avec les autoroutes, les limites des États et des pays, et la topographie incluses. Aucun parc/réserve/etc. n'est identifié, aucune étiquette n'est incluse. Zoomez pour ajuster la largeur de la ligne de route.
[Lien vers le modèle](https://snazzymaps.com/style/97220/tour-tour-tour).

<div id="tour-map" class="map"></div>

### Mapiful

Thème de style Mapiful idéal pour les affiches de cartes de n'importe quelle ville,
[lien vers le modèle](https://snazzymaps.com/style/146099/like-mapiful).

<div id="mapiful-map" class="map"></div>

### Picoteo Malaga

Thème de style Mapiful idéal pour les marqueurs des entreprises locales,
[lien vers le modèle](https://snazzymaps.com/style/13110/picoteo-malaga).

<div id="picoteo-malaga-map" class="map"></div>

### Nuances de gris avec de l'eau

Carte en grisaille et bleu-vert avec un contraste élevé entre les canaux d'eau,
[lien vers le modèle](https://snazzymaps.com/style/20028/greyscale-w-water),
[thème similaire](https://snazzymaps.com/style/213493/water-only).

<div id="greyscale-water-map" class="map"></div>

### Eau bleu clair simple

Carte minimale, en nuances de gris, bleu clair,
[lien vers le modèle](https://snazzymaps.com/style/62520/light-blue-water-simple).

<div id="light-blue-water-map" class="map"></div>

### Gris monochrome

Palette de couleurs minimaliste, monochrome, gris,
[lien vers le modèle](https://snazzymaps.com/style/85450/monochrome-grey).

<div id="monochrome-grey-map" class="map"></div>
