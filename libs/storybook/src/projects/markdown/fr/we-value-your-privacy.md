# Nous valorisons votre vie privée

![](https://images.prismic.io/syntia/ZncucZbWFboweyE8_714158.jpg?auto=format,compress?auto=compress,format)

Mes compétences en reconnaissance faciale ne sont pas excellentes, mais l'IA a
le pouvoir d'adapter CNN au système de surveillance pour cibler les personnes à
envoyer en prison illégalement.

Bien que le Règlement général sur la protection des données (RGPD) ait
considérablement amélioré les droits à la vie privée en Europe, il a mis en
lumière les pires problèmes des lois souffrant d'un écart de mise en application
– un large fossé entre les protections théoriques énoncées et la réalité de la
réponse des entreprises. Cela a conduit les entreprises et les pays européens à
investir des ressources considérables dans la conception de programmes de
conformité réglementaire, mais cela ne les a pas vraiment incités à se soucier
de la vie privée des clients.

> « Vous ne pouvez pas protéger les données si vous ne savez pas où elles se
> trouvent. »
>
> Inconnu

En 2023, cinq ans après l'application du RGPD, la Commission irlandaise de
protection des données (DPC) a infligé une amende de 1,2 milliard d'euros à
Meta. Cette amende record a été émise pour le transfert de données personnelles
d'utilisateurs européens vers les États-Unis sans mécanismes de protection des
données adéquats et constitue une étape importante dans la réglementation de la
protection des données.

En 2021, la Commission nationale pour la protection des données (CNPD) du
Luxembourg a infligé une amende de 746 millions d'euros (888 millions de
dollars) à Amazon.com Inc. La CNPD a ouvert une enquête sur la manière dont
Amazon traite les données personnelles de ses clients et a constaté des
infractions concernant le système de ciblage publicitaire d'Amazon, qui a été
réalisé sans consentement approprié.

En 2018, une faille dans la conception de Twitter a entraîné une violation de
données. Si un utilisateur sur un appareil Android changeait l'adresse e-mail
associée à son compte Twitter, les tweets protégés devenaient non protégés et
donc accessibles à tout le monde (y compris les autorités) sans que
l'utilisateur en ait connaissance.

En 2022, un étudiant saoudien de l'Université de Leeds, après être rentré chez
lui pour les vacances, a été condamné à 34 ans de prison pour avoir un compte
Twitter et pour avoir suivi et retweeté des dissidents et des militants.

VisionLabs, détenue par MTS et basée aux Pays-Bas, a créé une technologie de
reconnaissance faciale de premier plan mondial. En 2022, au moins 141 personnes
ont été préventivement détenues via la reconnaissance faciale, selon les données
d'OVD-Info. La technologie de reconnaissance faciale utilise des algorithmes
d'intelligence artificielle pour analyser et identifier les personnes.

À Moscou, plus de 160 000 caméras ont été installées à travers la ville - plus
de 3 000 d'entre elles connectées au système de reconnaissance faciale - et ont
aidé les forces de l'ordre. Désormais, plus de 2 000 affaires judiciaires
montrent que ces caméras ont joué un rôle important dans l'arrestation de
centaines de manifestants. La plupart de ces personnes ont été détenues en 2021
après avoir participé à des manifestations antigouvernementales.

### Comment mettre en œuvre un suivi respectant la vie privée des clients ?

Même si le but du suivi est de surveiller l'utilisation d'un site web, cela peut
toujours être fait sans collecter de données personnelles ou d'informations
personnellement identifiables (PII), sans utiliser de cookies et tout en
respectant la vie privée des visiteurs du site.

Les solutions de suivi sont souvent surestimées en termes d'utilité. Trouver les
bons outils pour l'analyse des produits de votre entreprise peut vous aider à
établir un meilleur contrôle sur les données nécessaires à l'analyse et au
reporting pour prendre des décisions commerciales, et quels outils les
soutiennent tout en respectant la vie privée des visiteurs.

- Tests A/B

- Enregistrement au niveau du produit pour l'analyse des entonnoirs et de la
  rétention, les chemins des utilisateurs, les cohortes comportementales et
  autres métriques UX

- Surveillance et observabilité des logiciels (OpenTelemetry, Prometheus,
  Grafana)

La plupart des fournisseurs de tests A/B utilisent le stockage local pour
stocker des identifiants au niveau de l'utilisateur dans des cookies afin de
suivre les parcours des utilisateurs et de comprendre leur comportement sur le
site web. Les marketeurs traitent principalement des

- Cookies de première partie envoyés à un serveur interne

- Cookies de tiers créés par des domaines externes qui les envoient à des
  serveurs tiers tels que LinkedIn, Google ou Meta.

Les cookies de tiers permettent à toute information de vos visiteurs d'être
partagée avec, envoyée à ou vendue à quiconque, y compris les annonceurs, ils
sont donc considérés comme intrusifs et très envahissants pour la vie privée des
utilisateurs.

Anonymiser les données pour éviter le traçage sur les plateformes basées sur des
informations relatives à une personne physique identifiée ou identifiable

- anonymiser les adresses IP

- agréger les données pour empêcher l'identification des utilisateurs
  individuels

- utiliser des techniques de pseudonymisation pour protéger toute information
  personnellement identifiable (PII)

- désactiver le suivi par identifiant utilisateur, ce qui rend considérablement
  plus difficile pour la plupart des annonceurs et des courtiers en données de
  vous suivre

- désactiver les paramètres de partage des données qui envoient les données à
  des services tiers

#### Partage de données limité

- configurer les paramètres de rétention des données pour supprimer
  automatiquement les données des utilisateurs et des événements après une
  certaine période

- permettre aux utilisateurs de gérer leurs préférences (quand ils en ont
  besoin)

- collecter les données cruciales uniquement pour les décisions commerciales et
  l'analyse

- utiliser des fournisseurs de suivi sans cookies - Plausible, PostHog, matomo,
  umami

Trouver les outils de suivi respectueux de la vie privée - transparence sur leur
politique de données décrivant non seulement comment les entreprises gèrent les
données de leurs clients, mais aussi une divulgation complète de leurs clients.

Si vous ne trouvez pas les réponses sur la politique de données dans le
document, l'IA pourrait le faire pour vous. Jason Mayes a montré un exemple pour
télécharger des PDF et discuter de la vie privée des données via la plateforme
AskYourPDF.

#### Données personnelles

Données personnelles à supprimer/pseudonymiser des collections de données et
enregistrements

- un nom et un prénom;

- une adresse personnelle;

- une adresse e-mail telle que
  [nom.prenom@entreprise.com](mailto:nom.prenom@entreprise.com);

- un numéro de carte d'identité;

- des données de localisation (par exemple la fonction de données de
  localisation sur un téléphone mobile)\*;

- une adresse de protocole Internet (IP);

- un identifiant de cookie\*;

- l'identifiant publicitaire de votre téléphone;

- des données détenues par un hôpital ou un médecin, qui pourraient être un
  symbole identifiant de manière unique une personne.

Écoutez la présentation sur « L'architecture axée sur la vie privée » à JSNation
par Andrey Sitnik

[https://portal.gitnation.org/contents/how-to-make-your-open-source-project-popular](https://portal.gitnation.org/contents/how-to-make-your-open-source-project-popular)

Autres sources :

Conseil européen de la protection des données

[https://www.edpb.europa.eu/our-work-tools/documents/our-documents\_fr](https://www.edpb.europa.eu/our-work-tools/documents/our-documents_fr)

Comment choisir un outil de test A/B conforme à la protection de la vie privée
[https://www.convert.com/blog/privacy/how-to-buy-privacy-compliant-ab-testing-tool/](https://www.convert.com/blog/privacy/how-to-buy-privacy-compliant-ab-testing-tool/)

Pirater le navigateur pour jumeler numériquement nos utilisateurs

[https://youtu.be/cWxpp9HwLYw?feature=shared](https://youtu.be/cWxpp9HwLYw?feature=shared)
Jason Mayes « Les applications Web du futur avec Web AI » à JSNation
[https://portal.gitnation.org/contents/web-apps-of-the-future-with-web-ai](https://portal.gitnation.org/contents/web-apps-of-the-future-with-web-ai)
