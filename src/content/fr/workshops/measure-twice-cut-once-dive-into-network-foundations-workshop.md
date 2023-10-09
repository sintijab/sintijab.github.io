---
description: "Mesurez deux fois, coupez une fois - Plongez dans l'atelier des fondements du réseau"
pubDate: "Apr 21, 2023"
heroImage: "https://images.prismic.io/syntia/501f905a-89dd-4824-b5e4-c6a1a012f49e_nf-hooks.png?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, réseau, infrastructure à nu"
subcategories: "protocoles de communication, protocole de contrôle de transmission, modèle d'interconnexion des systèmes ouverts, protocole Internet, couche réseau, interface réseau, réseau virtuel"
---

Lors du KubeCon + CloudNativeCon Europe 2023, plus de 10 000 participants étaient présents, dont 58 % assistaient pour la première fois à cette conférence mondiale sur le cloud natif.

En ma deuxième année d'immersion dans l'écosystème cloud natif, j'ai réalisé que la connaissance en matière de réseau nous permet non seulement d'utiliser la pile dans la distribution informatique et de communiquer avec Kubernetes, mais aussi de comprendre l'importance du transfert de données entre les applications pour leur performance, leur sécurité et leur efficacité.

Pendant que je revis certains concepts des jours de réseautage à l'université, j'ai commencé à documenter le processus afin de partager les références et de reconnaître la communauté sur laquelle repose notre écosystème cloud open source, c'est-à-dire les contributeurs et les mainteneurs !

Un grand merci à Marino Wijay et Jason Skrzypek, ingénieurs et défenseurs de la plateforme chez [Solo.io](//Solo.io) pour leur présentation rapide au KubeCon 2023 !

#### **Structure de l'atelier :**

1.  Brève introduction aux bases du réseau
    
2.  Atteindre la passerelle
    
3.  Ce n'est pas DNS, cela ne peut pas être DNS, c'était DNS
    
4.  Je ne suis pas une théière - Compréhension des codes HTTP et de la couche 7
    
5.  Pare-feux, équilibrage de charge, proxies
    
6.  Réseau de conteneurs via les espaces de noms réseau
    
7.  Kubernetes et le réseau
    

## **Brève introduction aux bases du réseau**

Le modèle OSI est une structure qui nous permet de comprendre comment les données circulent dans un réseau et le réseau Kubernetes :

![](https://images.prismic.io/syntia/a49d7a3e-b18e-446c-9088-e8ada4f8cc06_screenshot-2023-04-21-at-14.16.01.jpeg?auto=compress,format)

Le modèle OSI a été défini en couches pour décrire le réseau :

La couche physique est associée à la connexion physique entre les appareils (commutateurs/routeurs) x86 + ARM virtualisation.

Kubernetes se rapporte aux couches inférieures de l'infrastructure qui fournissent l'infrastructure informatique et la base de l'interface réseau.

D'autres composants tels que l'interface réseau de conteneur, CNI tels que Cilium, Calico, Weave, Antrea lorsqu'ils travaillent sur différents clusters et déplacent rapidement les paquets. SDN (VPC, VXLAN).

Au niveau supérieur, Istio Service Mesh assure la connectivité, la sécurité et l'observabilité aux niveaux supérieurs. Il peut fournir certaines attributs aux charges de travail et à leur mode de communication, et prendre des décisions de politique en fonction de cela.

### **Pourquoi le réseau est-il si compliqué ?**

Le réseautage distribué peut devenir compliqué entre les régions et les clouds publics, en raison de la sophistication intégrée qui assure une fonctionnalité.

Que vous travailliez avec des ordinateurs portables, des serveurs, des appareils IoT, des machines virtuelles ou des conteneurs, vous devrez à un moment donné accéder à une ressource distante. Quel que soit votre rôle, il est probable que le réseau vous entrave pour de nombreuses raisons :

*   Vous pourriez ne pas être autorisé à accéder à ce service
    
*   Le serveur pourrait être trop occupé pour traiter votre demande
    
*   Vous pourriez utiliser un protocole non pris en charge
    
*   Le serveur pourrait avoir changé d'adresses IP
    
*   Le serveur pourrait être disponible uniquement sur certains réseaux
    
*   Le serveur pourrait être exposé exclusivement à IPv6
    

Il est important d'apprécier chacun de ces obstacles comme une couche qui, lorsqu'elle est comprise et implémentée correctement, offre à l'utilisateur une expérience solide et fiable, avec une connaissance de la manière dont cette technologie est organisée et quelques outils pour la configurer.

### **Éléments atomiques du chemin réseau vers Kubernetes**

Les deux principaux modèles de réseau aujourd'hui sont le modèle OSI et le modèle TCP/IP. Le but de ces modèles est de séparer logiquement les domaines de mise en œuvre réseau. Chaque couche représente un type de préoccupation différent qui doit être abordé pour fournir une solution complète. Les couches des modèles OSI et TCP/IP sont corrélées :

Les couches **réseau et accès réseau**, qui forment la couche liaison de données et la couche physique du modèle OSI, sont responsables de la communication entre deux appareils sur le même réseau via une connexion physique.

La couche Internet permet la transmission de données sur plusieurs réseaux pour connecter la source et la destination.

La couche Transport prend en compte les erreurs de transmission, le séquençage et la gestion de la connexion le long des routes définies dans le réseau.

La couche Application, qui correspond également aux couches Présentation et Session du modèle OSI, expose des interfaces à l'utilisateur final qui offrent une programmabilité centrée sur les données.

Cet atelier se concentrera principalement sur le modèle TCP/IP.

Dans cet exemple, essayons d'accéder au service public httpbin en utilisant la commande suivante :

_curl_ [http://httpbin.org/get](http://httpbin.org/get)

Avec cette commande, nous communiquons avec [http://httpbin.org](http://httpbin.org) sur le chemin _/get_ avec le protocole _http_.

En savoir plus sur l'utilisation de l'outil Curl : [https://curl.se/docs/manual.html](https://curl.se/docs/manual.html)

En examinant le trafic dans la sortie de cette commande, nous recevons des informations de base sur la requête, telles que les en-têtes supplémentaires et le corps :

{

  “args”: {

},

  “headers”: {

    “Accept”: “text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.7”,

    “Accept-Language”: “en-GB,en-US;q=0.9,en;q=0.8”,

    “Host”: “httpbin.org”,

    “Upgrade-Insecure-Requests”: “1”,

    “User-Agent”: “Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_15\_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36”,

    “X-Amzn-Trace-Id”: “Root=1-64413693-4fe14fa0120baf871b50cb39”

  },

  “origin”: “109.40.243.50”,

  “url”: “[http://httpbin.org/get](http://httpbin.org/get)”

}

Mais il y a plus d'informations sur le réseau qui ne sont pas visibles à ce niveau.

**Couche 1 : Données**

L'unité de la première couche d'application est la donnée elle-même. Nous aurions pu ajouter différents en-têtes, une charge utile ou une requête au chemin, mais pour cet exemple, la donnée de la requête est simplement :

Get /get HTTP/1.1

Host: [httbin.org](//httbin.org)

User-Agent: curl/7.68.0

Accept: _/_

**Couche 2 : Segment**

Dans la couche de transport, nous codons les ports source et destination, la capacité de diviser et de suivre les demandes plus importantes, ainsi que quelques détections d'erreurs de base dans une unité appelée **_segment_**. Vous remarquerez peut-être que nous n'avons pas spécifié de ports, car le protocole http suppose un port de destination de 80 sauf indication contraire.

Port source : 48296

Port de destination : 80

Numéro de séquence : 613255907

Checksum : 0x621e

**Couche 3 : Paquet**

En descendant plus profondément, _curl_ doit maintenant utiliser la couche Internet pour déterminer comment naviguer de la source à la destination. Ces informations sont encodées dans une unité appelée **_paquet_**.

Cette couche décrit des informations telles que :

*   Adresses IP source et destination
    
*   Temps de vie (TTL)
    
*   Le protocole utilisé, qu'il s'agisse de TCP, UDP ou ICMP
    

Adresse IP source : 192.16.9.133

Adresse IP de destination : 54.208.105.16

TTL : 64

Protocole : TCP

La simplicité de la requête curl d'origine ne présente aucune de ces informations à l'utilisateur. Pour déterminer l'adresse IP de l'hôte [httpbin.org](//httpbin.org), un processus appelé **_résolution DNS_** est utilisé.

**Couche 4 : Trame**

Dans la couche d'accès réseau la plus basse, nous exploitons les informations sur le monde physique pour notre message. L'unité à ce niveau est appelée la **_trame_**. Alors que toutes les couches précédentes codent des informations dynamiques, cette unité contient des informations statiques et persistantes, en particulier les adresses de contrôle d'accès au support (MAC) de la source et de la destination. Ces adresses MAC sont des adresses uniques associées en permanence à l'appareil physique communiquant avec le réseau.

Avec les adresses MAC de destination et de source, quelques autres informations stockées dans cette unité sont le **_type Ethernet_** et la **_balise 802.1Q_.** IEEE 802.1Q, souvent appelé Dot1q, est la norme de réseau qui prend en charge les réseaux locaux virtuels (VLAN) sur un réseau Ethernet IEEE 802.3. Le type Ethernet indique le protocole Internet utilisé, IPv4 ou IPv6, et la balise 802.1Q optionnelle ajoute la possibilité de séparer virtuellement les réseaux.

Unité de trame :

Adresse MAC source : 9C:85:DD:53:83:56

Adresse MAC de destination : BF:D0:11:08:F8:42

Type Ethernet : IPv4

**Afficher les PDU avec dcpdump**

_tcpdump_ est la commande la plus expressive de toutes celles que nous avons vues. Comme son nom l'indique, _tcpdump_ "déverse" les informations de chaque paquet TCP.

L'appel à _tcpdump_ sans aucun argument diffusera les informations TCP en continu vers la sortie standard.

Voici quelques-uns des drapeaux standard de la commande _tcpdump_ :

*   _\-v_ : Sortie verbose
    
*   _\-x_ num : Fermer après {num} paquets
    
*   _\-i if_ : Lecture uniquement de l'interface {if}
    
*   _\-A_ : Écrire la version ASCII du paquet
    
*   _\-nn_ : Ne pas résoudre les noms d'hôte ou les ports
    
*   _\-e_ : Imprimer les adresses MAC pour chaque protocole
    
*   _\-D_ : Liste de toutes les interfaces réseau disponibles pour la capture
    
Pour observer la requête curl originale, nous exécuterons la commande suivante en arrière-plan en boucle sans aucune sortie :

_while true; do curl -s_ [httpbin.org/get](//httpbin.org/get) _-o /d ev/null; sleep 5; done &_

This allows us to run the following tcpdumps for the request and the response (respectively):

_sudo tcpdump -e -c 1 -i en0 -v -nn dst_ [httpbin.org](//httpbin.org) _and port 80 and “tcp\[tcpflags\] == 24”_ 

_tcpdump: listening on en0, link-type EN10MB (Ethernet), snapshot length 524288 bytes_

_16:16:06.459700 42:02:0a:84:00:91 > 42:01:0a:84:00:01, ethertype IPv4 (0x0800), length 144: (tos 0x0, ttl 64, id 0, offset 0, flags \[DF\], proto TCP (6), length 130)_

    _10.5.1.132.54900 > 3.230.204.70.80: Flags \[P.\], cksum 0xfdb7 (correct), seq 2913526421:2913526499, ack 3494874680, win 2064, options \[nop,nop,TS val 3066355421 ecr 3505646817\], length 78: HTTP, length: 78_

_GET /get HTTP/1.1_

_Host:_ [httpbin.org](//httpbin.org)

_User-Agent: curl/7.87.0_

_Accept: /_

_1 packet captured_

_11 packets received by filter_

_0 packets dropped by kernel_

_sudo tcpdump -e -c 1 -i en0 -v -nn src_ [httpbin.org](//httpbin.org) _and port 80 and “tcp\[tcpflags\] == 24”_

_tcpdump: listening on en0, link-type EN10MB (Ethernet), snapshot length 524288 bytes_

_16:14:58.770875 42:01:0a:84:00:01 > 42:02:0a:84:00:91, ethertype IPv4 (0x0800), length 320: (tos 0x0, ttl 179, id 40291, offset 0, flags \[DF\], proto TCP (6), length 306)_

    _54.144.44.152.80 > 10.5.1.132.54768: Flags \[P.\], cksum 0x9879 (correct), seq 1684126415:1684126669, ack 3374913347, win 16, options \[nop,nop,TS val 2410631955 ecr 4066540288\], length 254: HTTP_

_1 packet captured_

_93 packets received by filter_

_0 packets dropped by kernel_

Nous pouvons voir :

*   La Trame
    
    *   Adresse MAC de notre interface _42:02:0a:84:00:91_
        
    *   Adresse MAC de la passerelle _42:01:0a:84:00:01_
        
    *   éthertype _IPv4_
        
*   Le Paquet
    
    *   IP source _10.5.1.132_
        
    *   IP de destination _54.144.44.152_
        
    *   temps de vie _179_
        
    *   protocole de la couche Internet TCP
        
*   Le Segment
    
    *   Port source _54768_
        
    *   Port de destination _80_
        
    *   numéro de séquence _1684126669_
        
    *   somme de contrôle _0x9879_
        
*   Les Données
    
    *   méthode _Get_
        
    *   chemin _/get_
        
    *   protocole de la couche applicative _HTTP/1.1_
        
    *   informations d'en-tête _Host:…, User-Agent:…, Accept:…_
        

Bien que nous ayons filtré pour les _src/dst_ de _httpbin_ et le _port_ _80_, il est possible de filtrer sur de nombreuses données fournies. Consultez ce [lien](https://www.tcpdump.org/manpages/pcap-filter.7.html) pour la liste complète. Voici quelques filtres courants :

*   _src|dst_ – le nom d'hôte ou l'adresse IP de la source ou de la destination
    
*   _port|port-range_ – le port ou la plage de ports associés à la cible
    
*   _less|greater_ – la longueur de la requête
    
*   _proto_ – le protocole utilisé
    
*   _net_ – la plage d'adresses IP
    
*   _tcp\[x\]_ – la valeur de l'élément du tableau tcp à l'index x
    

Vous pouvez également combiner ces filtres avec des opérateurs, comme nous l'avons fait. Les opérateurs sont : _and_, _or_, _not_, _=_, _<_, et _>_.

La capture de paquets TCP et l'analyse du trafic réseau sont possibles avec des outils supplémentaires fournis par [Wireshark](https://www.wireshark.org/docs/wsdg_html_chunked/) ou [tshark](https://www.wireshark.org/docs/man-pages/tshark.html).

N'oubliez pas de nettoyer le processus en arrière-plan avec la commande _pkill bash_.

**Autres outils couramment utilisés**

Il existe d'autres outils pour déterminer les informations réseau en dehors de _curl_. Une des commandes sur Linux pour explorer manuellement cela est _ip_. Analysons la sortie de :

_ip address show_ or _ip addr show_

_1: lo: <loopback,up,lower\_up> mtu 16436 qdisc noqueue state UNKNOWN_ 

    _link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00_

    _inet 127.0.0.1/8 scope host lo_

    _inet6 ::1/128 scope host_ 

       _valid\_lft forever preferred\_lft forever_

_2: eth0: <broadcast,multicast,up,lower\_up> mtu 1500 qdisc pfifo\_fast state UP qlen 1000_

    _link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff_

    _inet 192.168.122.236/24 brd 192.168.122.255 scope global eth0_

    _inet6 fe80::5054:ff:fe43:846c/64 scope link_ 

       _valid\_lft forever preferred\_lft forever_

_$ ip addr show eth0_

_2: eth0: <broadcast,multicast,up,lower\_up> mtu 1500 qdisc pfifo\_fast state UP qlen 1000_

    _link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff_

    _inet 192.168.122.236/24 brd 192.168.122.255 scope global eth0_

    _inet6 fe80::5054:ff:fe43:846c/64 scope link_ 

       _valid\_lft forever preferred\_lft forever_

_$ ip addr show eth0 | grep ‘inet ‘ | awk ‘{print $2}’ | cut -f1 -d’/’_

_192.168.122.236_

_</broadcast,multicast,up,lower\_up></broadcast,multicast,up,lower\_up></loopback,up,lower\_up>_

Chaque adresse IP de cette liste est attribuée à une _carte réseau_ (_network interface card - NIC_) et peut être soit un périphérique physique comme _ens4_, soit un périphérique virtuel comme _lo_. Vous remarquerez également qu'il y a d'autres informations présentées en plus de l'adresse IP.

Sur la deuxième ligne de la NIC, vous trouverez l'adresse MAC de chaque périphérique juste après _link/\*_ :

 _link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00_

et

 _link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff_

Nous pouvons voir l'état de l'interface ainsi que l'état du réseau physique auquel elle est connectée. Sur _eth0_, cela est représenté respectivement par _up_ et _lower\_up_ :

_2: eth0: <broadcast,multicast,up,lower\_up> mtu 1500 qdisc pfifo\_fast state UP qlen 1000_

Toute communication utilisant l'interface _eth0_ serait identifiée avec l'adresse physique _52:54:00:43:84:6c_ et l'adresse virtuelle _192.168.122.236_.

**Commande "dhclient"**

L'adresse physique est statique et prédéfinie, mais d'où vient l'adresse IP ? Les adresses IP des appareils sont souvent définies dynamiquement avec le **DHCP** ou le **Dynamic Host Configuration Protocol**. _DHCP_ permet à un appareil de demander à être identifié sur un réseau par une autorité IP ou un groupe d'autorités sur le même réseau physique. 

En cas de succès, DHCP attribuera :

*   une adresse IP unique (valide dans votre réseau local)
    
*   une période de validité de cette attribution
    
*   et l'adresse IP de notre _passerelle_ (_gateway_)
    

Nous utilisons la commande _dhclient_ en ligne de commande pour interagir avec notre serveur DHCP :

_dhclient_ _eth0 -v_

_Internet Systems Consortium DHCP Client 4.4.1_

_Copyright 2004-2018 Internet Systems Consortium._

_All rights reserved._

_For info, please visit_ [https://www.isc.org/software/dhcp/](https://www.isc.org/software/dhcp/)

_Copyright 2004-2018 Internet Systems Consortium._

_All rights reserved._

_For info, please visit_ [https://www.isc.org/software/dhcp/](https://www.isc.org/software/dhcp/)

_Mar 02 04:57:03 ubu-serv dhclient\[806\]:_

_Listening on LPF/eth0/f4:5c:89:b0:4d:7b_

_Sending on   LPF/eth0/f4:5c:89:b0:4d:7b_

_Sending on   Socket/fallback_

_DHCPREQUEST for 192.168.1.5 on eth0 to 255.255.255.255 port 67 (xid=0x58943a1f)_

_Sending on   LPF/eth0/f4:5c:89:b0:4d:7b_

_Sending on   Socket/fallback_

_DHCPREQUEST for 192.168.1.5 on eth0 to 255.255.255.255 port 67 (xid=0x58943a1f)_

_DHCPACK of 192.168.1.5 from 192.168.1.1 (xid=0x1f3a9458)_

_RTNETLINK answers: File exists_

_bound to 192.168.1.5 — renewal in 40109 seconds._

...vous pouvez voir que l'interface _env0_ a fait une demande DHCP et a reçu _192.168.1.5_ de _192.168.1.1_ pour encore _40109_ secondes.

Bien que _192.168.1.5_ ou l'une des autres adresses IP que nous avons vues jusqu'à présent puissent sembler arbitraires, il y a un schéma. Les schémas courants se présentent sous la forme suivante :

*   10._._.\*
    
*   172._._.\*
    
*   192.168._._ (notre adresse)
    

Nous devons ces schémas à [RFC-1918](https://www.ietf.org/rfc/rfc1918.txt). Ces blocs d'adresses ont été conçus pour tenir compte des limites des adresses IPv4 et sont utilisés de manière cohérente dans les réseaux locaux et les réseaux cloud.

**Commande "route"**

La _passerelle_ (_gateway_) nous permet de nous étendre au-delà de notre réseau local (LAN) et de tenter d'atteindre [httpbin.org](//httpbin.org). Tout le trafic destiné à un réseau non local doit passer par la passerelle. Pour imposer ce comportement, nous utiliserons des routes et la commande _route_.

Installez et exécutez la commande _route_ :

_apt install net-tools -y_

_route_

_Kernel IP routing table_

_Destination Gateway Genmask Flags MSS Window Irtt Iface_

_192.168.10.0 \* 255.255.255.0 U 40 0 0 0 eth0_

_127.0.0.0 \* 255.0.0.0 U 40 0 0 0 lo_

_default 192.168.10.1 0.0.0.0 UG 40 0 0 0 0 eth0_

_default \_gateway 0.0.0.0 UG 40 0 0 0 0 eth0_

Identifying the host with: _host \_gateway_

Les paramètres par défaut consistent à rediriger les demandes réseau vers la passerelle, qui a une adresse similaire à _192.168.10.0_ en utilisant l'interface nommée _eth0_. À l'aide de la commande route, nous pourrions établir des routes avec plusieurs interfaces, ou à travers des réseaux distincts. À ce stade, si nous connaissions l'adresse IP de [httpbin.org](//httpbin.org), nous pourrions même créer une route spécifique pour ce trafic.

**Commandes "dig" et "nslookup"**

Lorsque nous devons déterminer les adresses IP associées à [httpbin.org](//httpbin.org), nous devons interroger le DNS.

_dig_ [httpbin.org](//httpbin.org) or _nslookup_ [httpbin.org](//httpbin.org)

Cette commande enverra une demande qui, après un certain nombre de sauts DNS, fournira une adresse IP de destination ou des adresses de httpbin.org.

_dig_ [httpbin.org](//httpbin.org) _+short_ 

_54.144.44.152_

_54.224.48.41_

_34.235.32.249_

_3.230.204.70_

# _or_

_dig_ [httpbin.org](//httpbin.org)

_; <<>> DiG 9.10.6 <<>>_ [httpbin.org](//httpbin.org)

_;; global options: +cmd_

_;; Got answer:_

_;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35457_

_;; flags: qr rd ra ad; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0_

_;; QUESTION SECTION:_

_;_[httpbin.org](//httpbin.org)_. IN A_

_;; ANSWER SECTION:_

[httpbin.org](//httpbin.org)_. 5 IN A 54.144.44.152_

[httpbin.org](//httpbin.org)_. 5 IN A 3.230.204.70_

[httpbin.org](//httpbin.org)_. 5 IN A 34.235.32.249_

[httpbin.org](//httpbin.org)_. 5 IN A 54.224.48.41_

_;; Query time: 42 msec_

_;; SERVER: 192.168.43.1#53(192.168.43.1)_

_;; WHEN: Thu Apr 20 18:34:01 CEST 2023_

_;; MSG SIZE  rcvd: 93_

_If you notice there are four A records, because it round-robins the connection between any of those addresses, so that if any of them wouldn’t be available, it would respond with another._

and 

_nslookup_ [httpbin.org](//httpbin.org)

_Server: 192.168.43.1_

_Address: 192.168.43.1#53_

_Non-authoritative answer:_

_Name:_ [httpbin.org](//httpbin.org)

_Address: 34.235.32.249_

_Name:_ [httpbin.org](//httpbin.org)

_Address: 54.224.48.41_

_Name:_ [httpbin.org](//httpbin.org)

_Address: 54.144.44.152_

_Name:_ [httpbin.org](//httpbin.org)

_Address: 3.230.204.70_

La commande _dig_ affiche des données tabulaires supplémentaires qui sont pertinentes lorsque l'on explore le DNS en détail. Dans les deux exemples, nous pouvons voir que [httpbin.org](//httpbin.org) fait référence à 4 adresses IP distinctes :

*   _34.235.32.249_
    
*   _54.224.48.41_
    
*   _54.144.44.152_
    
*   _3.230.204.70_
    

**Commande "ping"**

Maintenant que nous avons l'adresse de notre service de destination, nous devrions vérifier s'il est actif. Dans de nombreuses situations, les enregistrements DNS peuvent être obsolètes ou inexacts. La manière la plus simple de vérifier l'état d'une adresse IP est l'utilitaire _ping_. Il enverra du trafic de _protocole de messages de contrôle Internet (ICMP)_ vers une adresse désignée et affichera si le trafic est entièrement transmis ou non. En raison des limitations du réseau, nous ne pourrons pas établir la connexion avec succès.

_ping -c 1_ [httpbin.org](//httpbin.org)

_PING_ [httpbin.org](//httpbin.org) _(34.235.32.249): 56 data bytes_

_—_ [httpbin.org](//httpbin.org) _ping statistics —_

_1 packets transmitted, 0 packets received, 100.0% packet loss_

Alors que la demande à un hôte solo.io avec le même nombre de requêtes d'écho, tel qu'indiqué par la variable Count à envoyer (et à recevoir) :

_ping -c 5_ [solo.io](//solo.io)

_PING_ [solo.io](//solo.io) _(23.185.0.4): 56 data bytes_

_64 bytes from 23.185.0.4: icmp\_seq=0 ttl=53 time=39.137 ms_

_64 bytes from 23.185.0.4: icmp\_seq=1 ttl=53 time=44.414 ms_

_64 bytes from 23.185.0.4: icmp\_seq=2 ttl=53 time=49.566 ms_

_64 bytes from 23.185.0.4: icmp\_seq=3 ttl=53 time=33.963 ms_

_64 bytes from 23.185.0.4: icmp\_seq=4 ttl=53 time=34.818 ms_

_—_ [solo.io](//solo.io) _ping statistics —_

_5 packets transmitted, 5 packets received, 0.0% packet loss_

Dans des environnements sécurisés, le ping est souvent restreint à ICMP, ce qui génère un faux négatif.

**Commande "netcat"**

netstat ou nc n'auront pas les mêmes limitations que le ping. Avec cet outil, vous pouvez établir une connexion basée sur un protocole TCP ou interroger un protocole de connexion UDP sans état, tant que vous fournissez un nom de service et un port désigné.

Par exemple, la commande _netcat -t_ [httpbin.org](//httpbin.org) _80 -v -w 3_

*   _\-t : drapeau pour essayer cette commande en utilisant TCP_
    
*   _\-v : nous fournir une sortie détaillée_
    
*   _\-w : attendre 3 secondes avant de définir un délai d'expiration_
    

_nc -t_ [httpbin.org](//httpbin.org) _80 -v -w 3_

_Connection à_ [httpbin.org](//httpbin.org) _port 80 \[tcp/http\] réussie !_

Netcat peut également être utilisé pour envoyer des données de demande ou scanner une plage de ports :

_nc -zvn 127.0.0.1 20-23_

_nc: connectx to 127.0.0.1 port 20 (tcp) failed: Connection refused_

_nc: connectx to 127.0.0.1 port 21 (tcp) failed: Connection refused_

_nc: connectx to 127.0.0.1 port 22 (tcp) failed: Connection refused_

_nc: connectx to 127.0.0.1 port 23 (tcp) failed: Connection refused_

Pour explorer plus en détail le balayage de ports, consultez [nmap](https://nmap.org/) ou [masscan](https://github.com/robertdavidgraham/masscan).

**Commande "traceroute"**

La distance la plus courte entre deux points peut être une ligne droite, mais Internet est rarement connecté directement entre deux points. Le trafic doit passer par la passerelle pour atteindre quoi que ce soit sur Internet public. Combien d'étapes au total devrait prendre la demande de notre bac à sable local vers [httpbin.org](//httpbin.org) ?

_apt install traceroute -y_

_traceroute_ [httpbin.org](//httpbin.org)

Nous pouvons identifier chacune des adresses IP retournées comme des serveurs DNS en utilisant la commande _dig_.

_dig -x 99.83.89.102 | grep dns;_

_traceroute_ ne retourne souvent pas la réponse, mais il aide à répondre à la question : "Quel chemin existe entre moi et cet hôte ?"

**Commande "netstat"**

_netstat_ recueille des statistiques réseau pour votre machine actuelle. Pour collecter les connexions actives et les sockets actifs, exécutez _netstat._ Les drapeaux _\-r_ rassemblent des informations sur les routes, _\-ie_ sur les informations d'interface.

### **Approfondissement de la sous-répartition IP, du routage, de la couche 3, de GBP et des laboratoires !**

#### **Comment fonctionne le trafic réseau ?**

Lorsque le trafic est destiné à un réseau IP qui n'est pas directement connecté à l'hôte, le trafic doit passer par un routeur qui transférera le trafic vers un autre segment de réseau plus proche de la destination cible. La plupart des dispositifs clients ont la passerelle par défaut définie, c'est-à-dire le routeur utilisé pour acheminer le trafic en dehors du réseau local directement connecté. Les routeurs savent comment diriger le trafic réseau en fonction des tables de routage alimentées par des protocoles de routage.

Chaque point de terminaison de votre appareil a une adresse MAC qui identifie le réseau local de son propriétaire. Cependant, les adresses MAC ne sont jamais utilisées pour communiquer directement.

En analogie avec votre nom (l'adresse MAC) et pour les coordonnées, vous avez un numéro de téléphone, une adresse e-mail ou une autre forme de contact - des coordonnées utilisées pour être stockées dans la liste de contacts, et votre adresse MAC a une adresse IP associée et un nom d'hôte DNS.

Les protocoles routés tels qu'IP vivent à la couche 3 du modèle OSI.

**Comment les appareils communiquent-ils sur un réseau ?** MAC de la couche 2 et Sub de la couche 3

Chaque appareil/point d'extrémité/VM/conteneur/serveur qui a accès au réseau par le biais de son interface localement attachée a une adresse physique appelée **MAC (ou Media Access Control)**. Chacun est unique et l'adresse elle-même est liée à une seule extrémité (qui peut être manipulée).

Une adresse MAC ressemble à ceci _00-B0-D0-63-C1-23_.

En outre, l'adresse MAC de chaque point d'extrémité est attribuée par le fabricant qui a développé cette extrémité. Les fabricants possèdent généralement les six premiers caractères d'une MAC, ce qui facilite l'identification de l'auteur de cette extrémité.

Un routeur a plusieurs interfaces, chacune ayant sa propre adresse MAC unique. Une VM ou un espace de noms réseau, ou un conteneur a également une adresse MAC.

Un pont est un dispositif multi-accès permettant aux adresses MAC de se trouver mutuellement. Un commutateur physique avec 4/8/16/24/48 ports Ethernet est semblable à un pont. Un VXLAN est un commutateur logique qui remplit la même fonction pour plusieurs VM.

Mais les ponts/commutateurs ne sont pas très intelligents pour le routage au-delà des signaux électriques à travers diverses adresses MAC. C'est pourquoi les adresses IP sont importantes. Chaque IP est attribuée à l'adresse MAC de chaque point d'extrémité. Avec les IP, il est facile de les regrouper logiquement et de les router.

Une IP vit dans un sous-réseau, et plusieurs IPs peuvent communiquer entre elles si elles sont dans le même sous-réseau.

Exemples d'un sous-réseau :

_192.168.52.0/24_

_172.13.37.4/30_

_10.20.0.0./16_

Dans chaque sous-réseau, il y a une adresse de diffusion et une adresse réseau qui ne peuvent pas être attribuées. Ainsi, avec un sous-réseau comme _192.168.52.0/24 (ou 255.255.255.0)_, il y a 254 adresses IP utilisables. Comment est-ce possible ? Dans un masque de sous-réseau, il y a 32 bits de représentation binaire. _/24 ou 255.255.255.0 est 11111111.11111111.11111111.00000000_ Les 24x1s sont des bits réseau, et les 8x0s sont des bits hôtes. Les trois premiers octets indiquent une adresse réseau, une adresse qui indique comment accéder à des IP plus spécifiques.

Dans ce sous-réseau, généralement une IP est attribuée à un routeur afin qu'il puisse connaître ce réseau directement connecté tout en étant capable de se connecter à d'autres réseaux. C'est aussi ainsi que le routeur procède à l'échange d'informations avec d'autres routeurs.

En fait, deux (ou plus) routeurs peuvent être dans le même sous-réseau IP (un transit) et parmi ces routeurs, ils échangeront des informations sur les réseaux qu'ils connaissent, soit par configuration statique soit dynamique.

## **Routeur/Passerelle**

Un routeur est un dispositif réseau qui connecte deux ou plusieurs réseaux ou sous-réseaux et fait suivre les paquets entre différents réseaux. Le routage est visualisé ci-dessous entre deux sous-réseaux nécessitant un accès mutuel via un routeur :

![](https://images.prismic.io/syntia/95c89ec5-febc-4671-b66d-430b708a3232_screenshot-2023-04-20-at-20.13.49.png?auto=compress,format)

Pour communiquer du réseau local (LAN) vers le réseau distant, nous n'avons pas besoin de déployer des routes statiques, mais d'utiliser un protocole de configuration dynamique des hôtes, un protocole de routage dynamique. La puissance du protocole DHCL est une gestion plus facile des adresses IP - dans un réseau sans DHCP, vous devez attribuer manuellement des adresses IP uniques à chaque client.

Le DHCP permet aux hôtes d'obtenir les informations de configuration TCP/IP requises auprès d'un serveur DHCP.

#### **Configurer le routage**

Installation de net-tools pour exécuter certaines commandes réseau locales :

_apt-install net-tools -y_

Activer et vérifier votre table de routage locale :

_sysctl -w net.ipv4.ip\_forward=1 netstat -nr_

_route_

Vous pouvez voir qu'il existe plusieurs types de routes disponibles : attachées localement et une route par défaut qui est une passerelle par défaut. La route attachée localement montre que l'hôte est connecté au réseau sur lequel il se trouve. La route par défaut est une route utilisée pour atteindre n'importe quel endroit en utilisant un point de saut.

Vous pouvez capturer l'IP de l'interface par défaut et utiliser une IP dans ce sous-réseau pour "créer une nouvelle route statique".

_ip addr_

Avec une commande _ip addr_, au moment de la rédaction, l'IP de eth0 était _192.168.122.236/24_. Maintenant, s'il a une adresse _/32_, ce qui signifie que c'est la seule adresse IP utilisable dans ce sous-réseau et la seule adresse, elle est souvent utilisée dans des réseaux isolés pour des hôtes individuels tels que les VPN configurés.

_eth0IP=$(/sbin/ip -o -4 addr list eth0 | awk ‘{print $4}’ | cut -d/ -fl)_

_echo $eth0IP_

Maintenant, nous pouvons prendre cette variable et l'utiliser dans notre commande de routage (ajout ou suppression) et l'injecter dans une table de routage :

_ip route add 10.13.37.0/24 via $eth0IP_

_Route_

#### **Créer et connecter deux espaces de noms réseau sur différents sous-réseaux, via des interfaces veth.**

Utilisons la configuration suivante pour créer deux sous-réseaux logiques différents dans le sous-réseau 10.13.37.0/24. Nous allons créer deux espaces de noms réseau, leur attribuer des interfaces et des adresses IP dans deux sous-réseaux différents.

Deux espaces de noms réseau simuleront un espace de noms virtuel. Les dispositifs veth Linux sont des dispositifs Ethernet virtuels qui agissent comme des tunnels entre les espaces de noms réseau pour créer un pont vers un dispositif réseau physique dans un autre espace de noms, mais peuvent également être utilisés comme dispositifs réseau autonomes. Les dispositifs veth sont toujours créés par paires interconnectées.

# Créer deux espaces de noms réseau

_ip netns add sleep && ip netns add webapp_

# Simuler un espace de noms virtuel

_ip link add sleepif type veth peer name webappif_

# Pour chaque réseau virtuel, attribuer une adresse de sous-réseau

_ip link set sleeping netns sleep_

_ip link set webappif netns webapp_

# Attribuer des interfaces à un réseau

_ip -n sleep addr add 10.13.37.0/25 dev sleepif_

_ip -n webapp addr add 10.13.37.128/25 dev webappif_

# Mettre en ligne une interface réseau

_ip -n sleep link set sleepif up_

_ip -n webapp link set webappif up_

# Accepter la boucle locale pour le routage du trafic

_ip -n sleep link set lo up_

_ip -n webapp link set lo up_

# Vérifier les espaces de noms nouvellement créés

_ip netns_

# Pinger chaque réseau depuis l'autre

_ip netns exec sleep ping -c6 10.13.37.128_

# ping: connect: Le réseau est inaccessible

_ip netns exec webapp ping -c6 10.13.37.128_

# ping: connect: Le réseau est inaccessible

# Ajouter des routes statiques

_ip -n sleep route add 10.13.37.128/25 dev sleepif_

_ip -n webapp route add 10.13.37.128/25 dev webappif_

# Vérifier les routes nouvellement ajoutées

_ip netns exec sleep route_

_ip netns exec webapp route_

# Maintenant, nous avons des routes associées

# Communiquer entre ces réseaux

_ip netns exec sleep ping -c6 10.13.37.128_

_ip netns exec webapp ping -c6 10.13.37.128_

Nous avons maintenant établi un routage entre deux réseaux. Imaginez devoir le faire pour des centaines ou des millions de réseaux ! C'est pourquoi des protocoles comme BGP et OSPF existent.

La même chose s'applique à la mise en réseau des conteneurs Kubernetes. Lorsque nous exécutons de nombreux pods dans un cluster Kubernetes, le routage statique ne peut pas être fait aussi facilement. Des outils tels que Cilium CNI fournissent, sécurisent et observent la connectivité réseau entre les charges de travail des conteneurs et attribuent des adresses IP aux pods à grande échelle.

BGP utilise le port TCP 179 pour établir des relations de voisinage et communiquer avec d'autres routeurs. La mauvaise configuration de BGP contribue à l'absence de DNS, ce qui rend les sites Web indisponibles.

## **Ce n'est pas le DNS, ça ne peut pas être le DNS, c'était le DNS**

Imaginez si vous deviez vous souvenir de chaque numéro de téléphone. Cela ne se terminerait pas bien si vous composiez le mauvais numéro par erreur. Tout comme pour établir une connectivité DNS, avoir un 'annuaire téléphonique' est essentiel. En accédant au web avec l'adresse [httpbin.org](//httpbin.org), elle doit être traduite en une adresse IP. Le DNS ou Domain Name System traduit efficacement une IP en un nom lisible par l'homme.

Il existe divers rôles dans une requête DNS qui doivent renvoyer des valeurs. Ce sont différents types d'objets DNS. Dans les environnements cloud natifs, nous utilisons souvent le service DNS fourni par le cloud pour créer de nouveaux enregistrements DNS.

### **Qu'est-ce qu'un serveur DNS ?**

Les serveurs DNS fournissent une réponse directe aux résolutions DNS vers les points de terminaison. En général, sur un hôte, vous spécifierez une adresse de serveur DNS (qui pourrait normalement être récupérée par DHCP), qui doit être accessible par IP, soit localement via la couche 2, soit via le routage de la couche 3. Si le serveur DNS est accessible, il résoudra les noms d'hôte pour permettre à votre hôte de trouver son chemin vers sa destination.

Les serveurs DNS écoutent les demandes sur le port UDP 53 (ils sont également associés au nom de service DNS Route53 par AWS), et il est important de disposer d'un pare-feu qui autorise ou bloque le trafic sur certains ports.

Le DNS fonctionne à la couche 7 du modèle OSI (couche de transport).

### **Résolution DNS**

**Résolveur DNS récursif :** L'entité immédiate du PC/serveur/hôte/point de terminaison interrogera pour résoudre le nom d'hôte. Habituellement, les réponses peuvent être mises en cache pour les points de terminaison ou les noms d'hôte fréquemment interrogés. Ces informations mises en cache sont généralement stockées dans une base de données et expirent au fil du temps une fois que ces enregistrements deviennent stables ou ne sont pas fréquemment interrogés.

**Serveur racine de noms :** Le serveur racine de noms est la prochaine étape dans le flux de résolution DNS, car il est responsable de diriger le résolveur vers le serveur de domaine de premier niveau en fonction de l'extension de ce domaine, comme _.io, .ca, .org, .com_. L'Internet Corporation for Assigned Names and Numbers (ICANN) supervise ces serveurs racine de noms.

**Serveur de domaine de premier niveau :** Les TLD hébergent des informations sur tous les noms de domaine partageant la même extension TLD tels que .io, .ca, .com. Le serveur TLD contient des informations sur les sites Web se terminant par une extension particulière. Le TLD répondra au résolveur avec un nom de domaine et le serveur de noms d'autorité pour ce domaine.

Le **serveur de noms d'autorité** est la dernière étape du résolveur. Il contient généralement et répond avec l'enregistrement A/AAAA approprié ou l'enregistrement CNAME et les informations IP, à partir desquelles l'hôte à l'origine de la demande dispose de l'IP et peut acheminer le trafic vers celle-ci.

**Types d'enregistrements DNS A, AAAA, PTR**

Chaque serveur DNS a une base de données d'enregistrements qui renvoient des valeurs de différents types. Une valeur est renvoyée en fonction du type d'enregistrement appelé. Les types d'enregistrements courants sont :

*   **Enregistrement A** : Cet enregistrement traduit un nom d'hôte en une adresse IPv4.
    
*   **Enregistrement AAAA** : Cet enregistrement est similaire à l'enregistrement A mais pour les adresses IPv6 (par exemple, avec plusieurs adresses de répartiteur de charge ou géolocalisées).
    
*   **Enregistrement CNAME** : Ce type d'enregistrement traduit un nom en un autre nom.
    
*   **Enregistrement MX** : Cet enregistrement lie la propriété du nom de domaine aux serveurs de messagerie électronique.
    
*   **Enregistrement PTR** : Cet enregistrement traduit une adresse IP en un nom d'hôte, c'est-à-dire la recherche inverse, ou l'inverse d'un enregistrement A.
    
*   **Enregistrement SRV** : Cet enregistrement est destiné aux services d'une combinaison hôte et port, permettant l'accès à des applications spécifiques sur leur adresse IP et leur port.
    
*   **Enregistrement TXT** : Un enregistrement pour stocker des notes textuelles.

Liste des types d'enregistrements DNS : [https://en.wikipedia.org/wiki/List\_of\_DNS\_record\_types](https://en.wikipedia.org/wiki/List_of_DNS_record_types) 

Les noms de domaine complets ou FQDN (Fully Qualified Domain Names) sont le sous-domaine complet, le domaine et le domaine de premier niveau qui sont dirigés vers une ressource particulière ou un ensemble de ressources.

Par exemple, [www.httpbin.org](//www.httpbin.org), où _www_ est le sous-domaine, _httpbin_ est le domaine et _.org_ est le domaine de premier niveau. Nous sommes dirigés vers la page principale lors de la demande de [www.httpbin.org](//www.httpbin.org). Il existe divers cas d'utilisation, notamment la fourniture d'une sécurité stricte à l'aide de la sécurité de la couche de transport (ou TLS), qui nécessite un nom de domaine entièrement qualifié à ajouter dans les données du certificat.

Dans un cluster Kubernetes, un FQDN est généré pour chaque pod et service selon le format suivant : _(nom-du-pod | nom-du-service ).(espace-de-noms).svc.(domaine-du-cluster)_

**CoreDNS** est le résolveur DNS Kubernetes - il est utilisé comme service de nom ou mécanisme de découverte de service pour tous les services. Chaque objet connaît les autres objets en utilisant CoreDNS, par exemple, en exécutant une charge de travail de conteneur à l'intérieur d'une structure connue sous le nom de pod, et s'il doit communiquer avec autre chose, l'entrée est créée automatiquement en devenant une référence à l'intérieur du cluster.

Les enregistrements sont créés et supprimés automatiquement, car le plan de contrôle Kubernetes communique avec CoreDNS et le met à jour.

## **Notions de base d'HTTP et utilisation de l'utilitaire Curl pour interagir avec les applications activées en HTTP**

La couche 7 d'HTTP devient pertinente non seulement pour déterminer la disponibilité de l'application, mais aussi lors de l'utilisation des maillages de services et de l'interaction avec les services.

Il y a une structure - vous envoyez un message au serveur avec des opérations telles que les méthodes de requête HTTP. Le développement des politiques va au-delà du maillage de services, fournissant des mécanismes d'autorisation, par exemple avec OAuth, pour garantir la sécurité et les politiques d'utilisation des méthodes HTTP.

### **Méthodes HTTP**

La **méthode GET** est utilisée avec HTTP pour demander et lire des données à partir d'une ressource du serveur. Ces demandes peuvent être mises en cache et rester dans l'historique du navigateur. GET ne devrait pas être utilisé pour traiter des données sensibles. La méthode GET ne permet pas de modifier les ressources.

La **méthode POST** est utilisée pour mettre à jour ou créer une ressource en envoyant des données spécifiques à un serveur.

La **méthode PUT** est également une méthode pour mettre à jour des ressources, mais remplace le contenu existant par quelque chose d'autre.

La **méthode HEAD**, similaire à la méthode GET, envoie une demande mais reçoit une réponse sans le corps.

La **méthode DELETE** permet de supprimer des ressources spécifiées.

La **méthode PATCH** permet de spécifier des mises à jour partielles d'une ressource.

### **Codes d'état**

Les codes d'état nous permettent de mieux comprendre ce qui se passe après qu'une requête HTTP a été effectuée.

*   **1xx** - Fournit des réponses informatives
    
*   **2xx** - Les réponses réussies fournissent des données significatives, indiquant que la demande a réussi à atteindre le serveur
    
*   **3xx** - Messages de redirection, lorsqu'une redirection réussie est fournie
    
*   **4xx** - Réponses d'erreur côté client, lorsqu'il y a un problème du côté client, comme un navigateur, un problème de connexion ou une non-autorisation
    
*   **5xx** - Réponses d'erreur côté serveur
    

Codes d'état HTTP courants : [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

**HTTP/1** a été l'un des premiers protocoles permettant de communiquer sur Internet, et **HTTP/2** a été une amélioration de l'HTTP/1.1 introduisant la sécurité de la couche de transport TLS, la couche de sockets sécurisée SSL, les protocoles les plus importants pour la sécurité de la communication réseau. HTTP fonctionne sur le protocole de contrôle de transmission TCP, qui est une connexion client-serveur orientée, tandis que le protocole de datagramme utilisateur UDP permet le transfert de données avant qu'un accord soit fourni par la partie réceptrice.

![](https://images.prismic.io/syntia/c3a7989e-d476-4156-bd56-6e32c6c1a8fb_screenshot-2023-04-21-at-01.24.18.png?auto=compress,format)

## **Pare-feux, équilibreurs de charge, proxys**

Dans ce module, nous allons : démontrer _iptables_; _ipvs_; justifier l'utilisation de proxys tels qu'Envoy.

Les pare-feux sont essentiels pour faire respecter la sécurité sur le réseau donné. Les pare-feux peuvent être physiques ou virtuels, mais ils contrôlent principalement le trafic accepté ou refusé sous une forme quelconque.

### **_iptables_**

Iptables, un pare-feu Linux prédominant, existe depuis près d'un quart de siècle et est toujours utilisé par certains des plus grands projets logiciels d'aujourd'hui. Il existe un successeur en _iftables_ pour améliorer les performances, mais il n'est pas aussi couramment disponible.

_iptables_ est un ensemble de tables décrivant des règles pour les adresses IP et les ports associés.

Il existe en fait cinq tables :

*   **filter** : la table par défaut utilisée pour accepter, rejeter ou supprimer le trafic
    
*   **net** : utilisé pour effectuer la traduction d'adresses réseau pour les sources et les destinations
    
*   **mangle** : utilisé pour marquer ou reconfigurer certaines composantes du message pour une utilisation ultérieure
    
*   **raw** : utilisé pour contourner une partie du flux réseau standard
    
*   **security** : utilisé pour appliquer strictement la sécurité avec des composants tels que SELinux
    

À l'intérieur de chaque table, se trouvent une série de chaînes pouvant être définies par l'utilisateur, mais les chaînes par défaut sont :

*   _PREROUTING_
    
*   _INPUT_
    
*   _FORWARD_
    
*   _OUTPUT_
    
*   _POSTROUTING_
    
Voici le texte traduit en français en suivant les règles spécifiées :

![Cette schématique montre les flux de paquets à travers la mise en réseau Linux :](https://images.prismic.io/syntia/501f905a-89dd-4824-b5e4-c6a1a012f49e_nf-hooks.png?auto=compress,format)

Crochets Netfilter, réf : [](https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks)[https://wiki.nftables.org/wiki-nftables/index.php/Netfilter\_hooks](https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks)

Avec seulement la capacité d'ajouter des chaînes aux tables et des règles aux chaînes, les programmes et les utilisateurs peuvent contrôler le trafic avec un haut degré de configurabilité. Explorons un programme : _docker._

_apt-get update && apt-get install_ [docker.io](//docker.io) _-y_

Avec Docker installé, nous pouvons répertorier toutes les règles pour n'importe quelle table :

_iptables -t filter -L -n -v_

**Docker** contrôle la génération et l'attribution des adresses IP. Lorsque nous ajoutons plus de conteneurs avec la commande suivante, nous verrons les règles supplémentaires nécessaires pour rediriger le trafic vers eux :

#EXÉCUTER À PARTIR DE LA SOURCE

_pour i in {8001..8003}; do docker run --restart always -d -p $i:5678 hash iptables -t nat -L -n_

Sur la table nat, nous pouvons voir des murs supplémentaires créés pour ces conteneurs : les trois inférieurs sont en corrélation avec les applications récemment créées. Avec _iptables_, nous avons la possibilité d'orienter ou de rejeter le trafic au besoin.

#EXÉCUTER À PARTIR DE LA DESTINATION

_curl networking-foundations-src:8001_

_curl networking-foundations-src:8002_

_curl networking-foundations-src:8003_

Nous pouvons rejeter le trafic TCP destiné au port 5678 sur cet hôte en remplaçant la première règle dans la chaîne DOCKER-USER :

#EXÉCUTER À PARTIR DE LA SOURCE

iptables -R DOCKER-USER 1 -p tcp —dport 5678 -j REJECT

En exécutant à nouveau l'ensemble précédent de commandes curl, nous devrions obtenir une sortie différente.

#Échec de la connexion à networking-foundation

Voici un aperçu approximatif de la manière dont le trafic est analysé par _iptables_ :

*   le trafic entre dans la chaîne PREROUTING
    
*   correspond à la seule règle, qui redirige vers la chaîne DOCKER
    
*   qui correspondra à l'une des règles DNAT, convertissant l'adresse IP et le port de destination en conséquence
    
*   le trafic entre ensuite dans la chaîne FORWARD
    
*   correspond à la deuxième règle, qui redirige vers la chaîne DOCKER-USER
    
*   et enfin correspond à la seule règle de cette chaîne, qui rejette tout trafic destiné à _5689_ avec _TCP_
    

Nous pouvons confirmer ce comportement en auditant _iptables_ - en activant la trace et en envoyant une demande :

#EXÉCUTER À PARTIR DE LA SOURCE

_iptables -t raw -A PREROUTING -s networking-foundations-dst -j TRACE_

_xtables-monitor -t_

Alternativement, nous pourrions créer des règles qui acceptent un trafic spécifique, retournent à une chaîne précédente, abandonnent le trafic ou le redirigent même vers une chaîne ultérieure.

### **Équilibrage de charge**

Les _iptables_ chevauchent la fonctionnalité entre les **équilibreurs de charge** et les pare-feu, car vous pouvez interagir avec la route entre ces services et contrôler la manière dont ils sont routés.

Il existe de nombreuses raisons pour lesquelles le trafic destiné à une seule destination pourrait avoir besoin d'être réparti sur plusieurs charges de travail.

*   réduire les ressources
    
    *   Exigences pour des instances uniques
        
*   améliorer les performances
    
*   tenir compte des pannes intermittentes
    
*   tester et comparer le comportement de différentes configurations
    

De même que pour les pare-feu, il existe de nombreuses solutions, à la fois physiques et virtuelles. Certaines répartitions de charge peuvent être effectuées avec une configuration _iptables_ qui distribue le trafic sur le port 8004 entre les trois conteneurs, mais le trafic n'est pas aussi uniforme que ne le suggèrent les règles.

Pour avoir plus de contrôle sur la manière dont le trafic est distribué à des instances séparées, nous devrons utiliser **IP Virtual Server** ou **ipvs**.

Ipvs utilise certaines des mêmes technologies noyau que _iptables_ (netfilter), mais est spécifiquement conçu pour la distribution du trafic et peut être plus performant. Nous pouvons distribuer le trafic avec **ipvs** en suivant les méthodes suivantes :

*   round robin (deuxième exemple _iptables_)
    
*   round robin pondéré
    
*   moins de connexions
    
*   moins de connexions pondéré
    
*   moins de connexions basées localement
    
*   moins de connexions basées localement avec réplication
    
*   hachage de destination
    
*   hachage de source
    
Bien sûr, voici la traduction du texte avec la suppression des règles iptables en utilisant le drapeau _iptables -t nat -D_ pour éviter la création de règles superposées qui pourraient entrer en conflit les unes avec les autres :

#EXÉCUTER À PARTIR DE LA SOURCE

_iptables -t nat -D PREROUTING 1_

_iptables -t nat -D PREROUTING 1_

_iptables -t nat -D PREROUTING 1_

Installez les utilitaires ipvs avec :

#EXÉCUTER À PARTIR DE LA SOURCE

_apt-get install ipvsadm -y_

Nous pouvons recréer notre règle de répartition round-robin iptables avec la commande suivante :

#EXÉCUTER À PARTIR DE LA SOURCE

_export ip=$(hostname -I | awk ‘{print #1}’)_

_echo “_

_\-A -t $ip:8000 -s rr_

_\-a -t $ip:8000 -r 172.17.0.2:5678 -m_

_\-a -t $ip:8000 -r 172.17.0.3:5678 -m_

_\-a -t $ip:8000 -r 172.17.0.4:5678 -m_

_” | ipvsadm -R_

_Ipvsadm_

Au lieu de chaînes et de tables, nous créons un service et appliquons une configuration et des destinations à celui-ci. En exécutant cette commande, vous devriez obtenir un rapport de distribution uniforme des points de terminaison :

_pour i in {1..100}; do curl -s networking-foundations-src:8000; done | sort | uniq -c_

_33 8001_

_33 8002_

_34 8003_

Maintenant, chacun des conteneurs correspond à chacun des ports.

Effaçons le service et essayons un autre algorithme de distribution.

#EXÉCUTER À PARTIR DE LA SOURCE

_Ipvsadm –clear_

_echo “_

_\-A -t $ip:8005 -s wic_

_\-a -t $ip:8005 -r 172.17.0.2:5678 -m -w 1_

_\-a -t $ip:8005 -r 172.17.0.3:5678 -m -w 1_

_\-a -t $ip:8005 -r 172.17.0.4:5678 -m -w 98_

_” | ipvsadm -R_

_Ipvsadm_

# La plupart du trafic sera routé vers le quatrième conteneur.

_pour i in {1..100}; do curl -s networking-foundations-src:8005; done | sort | uniq -c_

_1 8001_

_1 8002_

_98 8003_

Avec "weighted least connection", le trafic est envoyé à l'instance qui détient actuellement le moins de connexions, mais avec une préférence pour les instances ayant des poids numériques plus élevés.

Il est à noter qu'en plus des algorithmes de distribution, **_ipvs_** prend également en charge les méthodes de transfert suivantes :

*   routage direct (–gatewaying)
    
*   tunneling (–ipip)
    
*   et nat (–masquerading)
    

_ipvs_ offre certainement plus en termes d'équilibrage de charge que _iptables_, mais il a lui aussi ses limites. Entre ces deux outils, il n'y a pas de moyen de prendre des décisions sur chaque protocole qui peut être exploité au sein d'un réseau.

**_Proxy_**

Les applications modernes ont souvent des exigences personnalisées ou de niche qui ne peuvent pas être satisfaites par les outils Linux standard. Cet ensemble en constante évolution d'exigences est à la base d'un **_proxy_**.

Un proxy réseau est une entité qui reçoit et distribue le trafic au nom d'un client. Les proxies exploitent les capacités que nous avons mentionnées, ainsi que plusieurs autres, pour les cas d'utilisation suivants :

*   Relayer des données de géolocalisation différentes de la demande d'origine
    
*   Anonymiser les informations de source ou de destination
    
*   Mettre en place des règles de pare-feu, d'autorisation et d'authentification pour le trafic entrant ou sortant
    
*   Chiffrer et/ou protéger généralement les informations sensibles
    
*   Accroître la résilience
    
*   Optimiser le flux de trafic
    
*   Fournir une observabilité
    

La plupart du trafic passera probablement par un proxy à un moment donné. Au lieu de normes courantes telles que iptables et ipvs, il est plus courant de considérer les outils disponibles comme un écosystème.

Certains proxies spécifiques conviendront mieux à certains cas d'utilisation que d'autres.

Si vous souhaitez explorer certaines des options les plus populaires recommandées :

*   [envoy](https://www.envoyproxy.io/) l'épine dorsale d'Istio
    
*   [haproxy](https://www.haproxy.com/) le composant de la solution RedHat OpenShift
    
*   [nginx](https://www.nginx.com/) une solution courante pour exposer le trafic dans Kubernetes
    

Les proxies sont puissants dans le domaine de la transformation réseau, de la sécurité et de l'optimisation générale.

## **Réseau de conteneurs via des espaces de noms réseau**

Les **conteneurs** sont des processus isolés qui s'exécutent sur un seul système d'exploitation. Tout comme la virtualisation, les conteneurs consomment CPU, mémoire et espace disque, mais nécessitent beaucoup moins de ressources pour fonctionner, car ils sont dédiés à une seule fonction ou à un processus. Chaque fois qu'un conteneur est créé, un système d'exploitation complet n'est pas nécessaire.

Un réseau n'a pas besoin d'être créé manuellement pour chaque conteneur individuel : le runtime de conteneur Docker a été le premier à créer un flux de travail qui lui permet d'accéder instantanément au réseau. Kubernetes a poussé cela à un autre niveau et a fourni l'interface de réseau de conteneur (CNI - Container Networking Interface).

Divers environnements Kubernetes tels que Calico et Cilium fonctionnent comme une CNI en communiquant avec le serveur d'API Kube.

Étant donné que nous avons développé une grande quantité de connaissances en matière de mise en réseau, il est utile de comprendre comment construire un espace de noms réseau et d'isoler les processus pour mieux comprendre les conteneurs et la mise en réseau associée.

### **Construction d'espaces de noms réseau qui communiquent entre eux**

_apt install net-tools_

_ip netns add sleep && ip netns add webapp_

_ip netns_

_ip netns exec sleep ip link_

_Ip netns exec sleep arp #IP address MAC_

_\# each MAC is associated to an IP, but these endpoints in each namespace don’t know about each other. In Kubernetes each container that runs in a pod has its associated MAC address_

_ip netns exec sleep route_

La meilleure façon d'accéder à l'extérieur depuis l'interface physique d'un hôte est d'utiliser la fonctionnalité de pont Linux. Auparavant, nous routions entre deux sous-réseaux dans un réseau privé, mais pour communiquer plus largement, ces espaces de noms réseau doivent être exposés à l'interface physique à l'extérieur. C'est un peu comme attribuer une adresse IP à un processus dans son propre espace de noms, ou même attribuer une IP à un conteneur qui permet à tous les trois de communiquer avec une adresse dans le même domaine de diffusion et le même sous-réseau.

Créons un pont et présentons-le sur l'hôte.

_ip link set dev app-net-0 up

# Créer un espace de nom de l'interface virtuelle et la fin du lien qui est attachée au pont

_ip link add veth-sleep type veth peer name veth-sleep-br_

_ip link add veth-webapp type veth peer name veth-webapp-br_

# Assigner l'interface aux espaces de noms respectifs

_ip link set veth-sleep netns sleep_

_ip link set veth-webapp netns webapp_

# Assigner l'extrémité du lien au pont

_ip link set veth-sleep-br master app-net-0_

_ip link set veth-webapp-br master app-net-0_

# Assigner des adresses IP aux différents liens dans chaque espace de nom

_ip -n sleep addr add 192.168.52.1/24 dev veth-sleep_

_ip -n sleep link set veth-sleep up_

_ip -n webapp addr add 192.168.52.1/24  dev veth-webapp_

_ip -n webapp link set veth-webapp up_

# Assigner une adresse IP au pont qui servira de point d'accès au réseau physique (hôte)

_ip addr add_ 192.168.52.5/24 dev app-net-0

\# Activer le côté virtuel du pont, l'espace de noms réseau a une liaison dans son espace de noms et le pont

_ip link set dev veth-sleep-br up_

_ip link set dev veth-webapp-br up_

_ip netns exec webapp ping 23.285.0.4_

_ip netns exec webapp route_

# Le réseau est inaccessible

Corrigeons-le en utilisant une règle iptables qui nous permet de NAT la plage IP 192.168.52.0 avec une adresse IP de l'hôte pouvant communiquer en sortie.

_iptables -t nat -A POSTROUTING -s 192.168.52.0/24 -j MASQUERADE_

_ip netns exec webapp ping 23.185.0.4_

# _Ajoutez la route par défaut_

_ip netns exec webapp route_

_ip netns exec webapp ip route add default via 192.168.52.5_

_sysctl -w net.ipv4.ip_forward=1_

_ip netns exec webapp ping 23.185.0.4_

Nous surchargeons l'interface physique en :

1. Créant deux espaces de noms réseau qui représentent deux conteneurs.
   
2. Chaque espace de nom a une adresse IP associée au conteneur.
   
3. Les espaces de noms ont accès au pont.
   
4. Le pont a accès à l'hôte physique.
   
5. L'hôte a accès au même réseau.

![](https://images.prismic.io/syntia/fcaaa60f-0691-4de1-8c9d-6ffeb8705a03_screenshot-2023-04-21-at-04.29.21.png?auto=compress,format)

Cette configuration est la raison pour laquelle nous avons des Interfaces de Réseau de Conteneur (Container Networking Interfaces) qui automatisent le processus lorsque le pod est créé, obtient une adresse IP, accède aux réseaux de l'hôte en sortie et communique avec l'extérieur.

## **Réseau Kubernetes**

Kubernetes, souvent appelé k8s, est un outil open source permettant d'orchestrer des charges de travail basées sur des conteneurs sur une infrastructure hétérogène.

Dans cet environnement virtuel, nous avons déjà accès aux trois nœuds du cluster Kubernetes et à toutes les commandes nécessaires pour examiner le réseau.

_kubectl get nodes_

Chaque nœud se voit attribuer un bloc d'adresses IP à partir duquel il peut attribuer des pods et des services. Chaque nœud est assigné à un /24 ou 254 adresses IP utilisables, dont nous pouvons également voir les interfaces avec la commande

_ip a_

### **Réseautage Intra et Inter-Pods**

Création d'un seul pod avec deux conteneurs en appliquant le fichier YAML suivant.

Kubectl apply -f <<EOF

apiVersion: v1

kind: Pod

metadata:

    name: example-pod-1

    labels:

        app: example

spec:

    nodeName: k8s-server

    containers:

*   name: container-one
    

image: [gcr.io/intio-release/app/1.13](//gcr.io/intio-release/app/1.13)

ports:

–     containerPort: 8080

args:

–    –port

–  “8080”

–    –grpc

–  “9080”

–    –tcp

–  “10080”

        – name: container-two

…

EOF

Ce pod est planifié sur notre hôte actuel, ce qui nous permet de l'inspecter depuis l'intérieur et l'extérieur de son espace de nom de réseau.

Tous les clusters Kubernetes disposent d'un service DNS local disponible via une adresse IP dans le CIDR du service et chargé dans chaque conteneur.

Maintenant, vérifiez le nouveau pod créé et recherchez l'adresse IP du serveur de noms :

_kubectl get pod example-pod-2 -o wide_

Trois domaines de recherche sont répertoriés ainsi que l'adresse IP du serveur de noms. Notre domaine de recherche en particulier, default.svc.cluster.local, suit le format <<namespace>>.svc.cluster.local.

Dans cet exemple, nous avons utilisé le premier domaine de recherche et avons déterminé l'adresse IP associée à ce fqdn.

En appelant cette adresse IP, IPTables interceptera la demande et équilibrera la charge du trafic entre les pods disponibles.

Pour voir ce que chaque conteneur a comme interfaces :

_kubectl exec example-pod-1 -c container-one – ip a_

_kubectl exec example-pod-1 -c container-two – ip a_

Pour voir certaines des règles en utilisant :

_Iptables -L –table nat | grep “example-pod-1”_

À mesure que davantage de pods sont ajoutés, chaque pod supplémentaire sera ajouté à la chaîne avec une probabilité fractionnaire décroissante.

Avec les composants de contrôle et de nœud de Kubernetes, le trafic à l'intérieur de notre cluster peut désormais être rendu résilient et automatique.

![](https://images.prismic.io/syntia/d60f2188-5122-4366-8d11-b2ec097ee3cd_kubernetes_architecture.png?auto=compress,format)
