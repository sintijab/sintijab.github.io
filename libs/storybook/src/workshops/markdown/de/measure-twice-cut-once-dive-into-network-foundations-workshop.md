\---  
description: 'Zweimal messen, einmal schneiden - Tauchen Sie in das Netzwerk-Grundlagen-Workshop ein'  
pubDate: 'Apr 21, 2023'  
heroImage: '501f905a-89dd-4824-b5e4-c6a1a012f49e_nf-hooks.png?auto=compress,format'  
author: 'Syntia'  
categories: 'Workshops, Cloud Infrastruktur, Netzwerke, Barebone'  
subcategories: 'Kommunikationsprotokolle, Transmission Control Protocol, Open System Interconnection-Modell, Internetprotokoll, Netzwerkschicht, Netzwerkschnittstelle, Virtuelles Netzwerk'  
\---  

In diesem Jahr hatte die KubeCon + CloudNativeCon Europe 2023 mehr als 10.000 Teilnehmer, von denen 58 % zum ersten Mal an dieser globalen Cloud-Native-Konferenz teilnahmen.

In meinem zweiten Jahr im Bereich Cloud-Native-Ökosystem habe ich erkannt, dass das Wissen über Networking uns nicht nur ermöglicht, den Stack in der verteilten Berechnung zu nutzen und mit Kubernetes zu kommunizieren, sondern auch das Bewusstsein dafür zu steigern, wie der Datentransfer zwischen Anwendungen für das Verständnis ihrer Leistung, Sicherheit und Effizienz entscheidend ist.

Während ich einige der Konzepte aus den Networking-Tagen an der Universität erneut erlernt habe, begann ich den Prozess zu dokumentieren, um die Referenzen zu teilen und die Gemeinschaft anzuerkennen, auf der unser Open-Source-Cloud-Ökosystem aufgebaut ist - Beitragsleistende und Betreuer!

Vielen Dank an Marino Wijay und Jason Skrzypek, Plattformingenieure und Befürworter bei [Solo.io](//Solo.io) für ihre schnelle Präsentation auf der KubeCon 2023!

#### **Workshop-Struktur:**

1.  Schnelle Einführung in die Networking-Grundlagen
    
2.  Zum Gateway gelangen
    
3.  Es ist nicht DNS, es kann nicht DNS sein, es war DNS
    
4.  Ich bin keine Teekanne - Verständnis von HTTP-Codes und Schicht 7
    
5.  Firewalls, Lastenausgleich, Proxies
    
6.  Container-Networking über Networking-Namespaces
    
7.  Kubernetes und Networking
    

## **Schnelle Einführung in die Networking-Grundlagen**

Das OSI-Modell ist eine Struktur, die es uns ermöglicht, zu verstehen, wie Daten in einem Netzwerk und in Kubernetes Networking bewegt werden:

![OSI-Modell](https://images.prismic.io/syntia/a49d7a3e-b18e-446c-9088-e8ada4f8cc06_screenshot-2023-04-21-at-14.16.01.jpeg?auto=compress,format)

Das OSI-Modell wurde in Schichten unterteilt, um das Networking zu beschreiben:

Die physische Schicht ist mit der physischen Verbindung zwischen Geräten (Switches/Routern) x86 + ARM-Virtualisierung verbunden.

Kubernetes entspricht den unteren Schichten in der Infrastruktur, die die Bereitstellung der Computerinfrastruktur und die Basis der Netzwerkschnittstelle bieten.

Andere Komponenten wie das Container-Networking-Interface, CNIs wie Cilium, Calico, Weave, Antrea, wenn sie in verschiedenen Clustern arbeiten und Pakete schnell verschieben. SDN (VPC, VXLAN)

In der obersten Ebene bietet das Istio-Service-Mesh Konnektivität, Sicherheit und Beobachtung auf höheren Ebenen. Es kann bestimmte Attribute für die Arbeitslasten und deren Kommunikation bereitstellen und auf der Grundlage davon Richtlinienentscheidungen treffen.

### **Warum ist Networking so kompliziert?**

Verteiltes Networking kann in verschiedenen Regionen und öffentlichen Clouds kompliziert werden, die Begründung dafür liegt in der darin eingebauten Komplexität, die eine Funktionalität bietet.

Egal, ob Sie es mit Laptops, Servern, IoT-Geräten, virtuellen Maschinen oder Containern zu tun haben, Sie werden irgendwann auf das Netzwerk zugreifen müssen. Unabhängig von Ihrer Rolle ist es wahrscheinlich, dass Sie aus verschiedenen Gründen vom Netzwerk behindert werden:

*   Sie sind möglicherweise nicht autorisiert, auf diesen Dienst zuzugreifen.
    
*   Der Server ist möglicherweise zu beschäftigt, um Ihre Anfrage zu bearbeiten.
    
*   Sie verwenden möglicherweise ein nicht unterstütztes Protokoll.
    
*   Der Server hat möglicherweise seine IP-Adressen geändert.
    
*   Der Server ist möglicherweise nur in bestimmten Netzwerken verfügbar.
    
*   Der Server ist möglicherweise ausschließlich für IPv6 zugänglich.
    

Es ist wichtig, diese Hindernisse als Schichten zu verstehen, die, wenn sie richtig verstanden und implementiert werden, dem Benutzer ein robustes und zuverlässiges Erlebnis bieten und Kenntnisse darüber vermitteln, wie diese Technologie organisiert ist, und einige Tools zur Konfiguration bereitstellen.

### **Atomare Elemente des Networking weisen den Weg zu Kubernetes**

Die beiden wichtigsten Netzwerkmodelle heute sind das **OSI-Modell** und das **TCP/IP-Modell**. Der Zweck dieser Modelle besteht darin, die Bereiche der Netzwerkimplementierung logisch voneinander zu trennen. Jede Schicht repräsentiert eine andere Art von Problem, die gelöst werden muss, um eine umfassende Lösung bereitzustellen. Die Schichten für die OSI- und die TCP/IP-Modelle korrelieren:

*   Die Schichten **Netzwerk** und **Netzwerkzugriff**, die die Schichten Datenverbindung und Physikalische Schicht im OSI-Netzwerkmodell bilden, sind für die Kommunikation zwischen zwei Geräten im selben Netzwerk über eine physische Verbindung verantwortlich.
    
*   Die **Internet-Schicht** ermöglicht die Übertragung von Daten über mehrere Netzwerke, um Quelle und Ziel zu verbinden.
    
*   Die **Transport-Schicht** berücksichtigt Fehler bei der Übertragung, Sequenzierung und Verbindungsverwaltung entlang der in den Netzwerken definierten Routen.
    
*   Die **Anwendungsschicht**, die auch Präsentations- und Sitzungsschichten im OSI-Modell umfasst, stellt Schnittstellen für den Endbenutzer bereit, die eine datenzentrierte Programmierbarkeit bieten.
    

In diesem Workshop konzentrieren wir uns hauptsächlich auf das TCP/IP-Modell.

In diesem ersten Beispiel versuchen wir, auf den öffentlichen httpbin-Dienst zuzugreifen, indem wir den folgenden Befehl verwenden:

```markup
curl http://httpbin.org/get

```

Mit diesem Befehl wird versucht, mit [http://httpbin.org](http://httpbin.org) über den Pfad `/get` und das Protokoll `http` zu kommunizieren.

Weitere Informationen zur Verwendung

des Curl-Tools finden Sie hier: [https://curl.se/docs/manual.html](https://curl.se/docs/manual.html)

Durch die Untersuchung des Datenverkehrs in der Ausgabe dieses Befehls erhalten wir grundlegende Informationen über die Anforderung, wie zusätzliche Header und den Inhalt:

```markup
{
  "args": {},
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "Host": "httpbin.org",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    "X-Amzn-Trace-Id": "Root=1-64413693-4fe14fa0120baf871b50cb39"
  },
  "origin": "109.40.243.50",
  "url": "http://httpbin.org/get"
}

```

Aber es gibt weitere Informationen über das Networking, die auf dieser Ebene nicht sichtbar sind.

**Schicht 1: Daten**

Die Einheit für die erste Anwendungsschicht ist die Daten selbst. Wir hätten andere Header, eine Nutzlast oder eine Abfrage zum Pfad hinzufügen können, aber für diese Beispielanforderung sind die Daten einfach:

```markup
Get /get HTTP/1.1
Host: httpbin.org
User-Agent: curl/7.68.0
Accept: */*

```

**Schicht 2: Segment**

In der Transportschicht codieren wir die Quell- und Zielports, die Fähigkeit, größere Anforderungen aufzuteilen und zu verfolgen, sowie eine grundlegende Fehlererkennung in eine Einheit namens **Segment**. Beachten Sie, dass wir keine Ports angegeben haben, da das HTTP-Protokoll einen Zielport von 80 annimmt, es sei denn, es wird ausdrücklich anders angegeben.

```markup
Source Port: 48296
Destination Port: 80
Sequence Number: 613255907
Checksum: 0x621e

```

**Schicht 3: Paket**

Um tiefer einzusteigen, muss _curl_ nun die Internet-Schicht nutzen, um zu bestimmen, wie von der Quelle zum Ziel navigiert werden soll. Diese Informationen werden in einer Einheit namens **Paket** codiert.

Diese Schicht beschreibt Informationen wie:

*   Quell- und Ziel-IP-Adressen
    
*   Time To Live (TTL)
    
*   Welches Protokoll verwendet wird, TCP, UDP oder ICMP
    

```markup
Source IP: 192.16.9.133
Destination IP: 54.208.105.16
TTL: 64
Protocol: TCP

```

Die Einfachheit der ursprünglichen Curl-Anforderung stellt dem Benutzer keine dieser Informationen zur Verfügung. Um die IP-Adresse des Hosts [httpbin.org](httpbin.org) zu bestimmen, wird ein Prozess namens **DNS-Auflösung** verwendet.

**Schicht 4: Frame**

In der niedrigsten Netzwerkzugriffsschicht nutzen wir Informationen über die physische Welt für unsere Nachricht. Die Einheit auf dieser Ebene wird als **Frame** bezeichnet. Während alle vorherigen Schichten dynamische Informationen codieren, enthält diese Einheit statische und dauerhafte Informationen, insbesondere die **Media Access Control (MAC)**\-Adressen der Quelle und des Ziels. Diese MAC-Adressen sind eindeutige Adressen, die dauerhaft mit dem physischen Gerät verknüpft sind, das mit dem Netzwerk kommuniziert.

Zusammen mit den MAC-Adressen von Quelle und Ziel werden in dieser Einheit einige weitere Informationen gespeichert, darunter das **Ethertype** und das **802.1Q-Tag**. IEEE 802.1Q, oft als Dot1q bezeichnet, ist der Netzwerkstandard, der virtuelle lokale Netzwerke (VLANs) in einem IEEE 802.3-Ethernet-Netzwerk unterstützt. Der Ethertype gibt das verwendete Internetprotokoll an, entweder IPv4 oder IPv6, und das optionale 802.1Q-Tag ermöglicht die virtuelle Trennung von Netzwerken.

Frame-Einheit:

*   Source Mac: 9C:85:DD:53:83:56
    
*   Destination MAC: BF:D0:11:08:F8:42
    
*   EtherType: IPv4
    

**Anzeigen von PDUs mit tcpdump**

_tcpdump_ ist der ausdrucksstärkste aller von uns gesehenen Befehle. Wie Sie aus dem Namen ersehen können, "dumped" _tcpdump_ die Informationen aus jedem TCP-Paket.

Wenn _tcpdump_ ohne Argumente aufgerufen wird, streamt es die TCP-Informationen kontinuierlich nach stdout.

Einige der Standardflags für _tcpdump_ sind:

*   _\-v_: Verbose Ausgabe
    
*   _\-x_ num: Schließen nach {num} Paketen
    
*   _\-i if_: Nur die {if}-Schnittstelle lesen
    
*   _\-A_: Die ASCII-Version des Pakets schreiben
    
*   _\-nn_: Hostname oder Port nicht auflösen
    
*   _\-e_: MAC-Adressen für jedes Protokoll drucken
    
*   _\-D_: Alle verfügbaren Netzwerkschnittstellen auflisten, die erfasst werden können
    

Um die ursprüngliche Curl-Anforderung zu beobachten, führen wir den folgenden Befehl im Hintergrund in einer Schleife ohne Ausgabe aus:

```markup
while true; do curl -s http://httpbin.org/get -o /dev/null; sleep 5; done &

```

Dies ermöglicht uns das Ausführen der folgenden tcpdumps für die Anforderung und die Antwort (jeweils):

```markup
sudo tcpdump -e -c 1 -i en0 -v -nn dst httpbin.org and port 80 and "tcp[tcpflags] == 24"

```

```markup
sudo tcpdump -e -c 1 -i en0 -v -nn src httpbin.org and port 80 and "tcp[tcpflags] == 24"

```

Wir können sehen:

*   Der Frame
    
    *   MAC-Adresse unserer Schnittstelle _42:02:0a:84:00:91_
        
    *   MAC-Adresse des Gateways _42:01:0a:84:00:01_
        
*   Ethertype _IPv4_
    
*   Das Paket
    
    *   Quell-IP _10.5.1.132_
        
    *   Ziel-IP _54.144.44.152_
        
    *   Time to Live _179_
        
    *   Internet Layer Protocol TCP
        
*   Das Segment
    
    *   Quellport _54768_
        
    *   Zielport _80_
        
    *   Sequenznummer _1684126669_
        
    *   Prüfsumme _0x9879_
        
*   Die Daten
    
    *   Methode _Get_
        
    *   Pfad _/get_
        
    *   Protokoll der Anwendungsschicht _HTTP/1.1_
        
    *   Headerinformationen _Host: …, User-Agent: …, Accept: …_
        

Während wir nach _src/dst_ von _httpbin_ und _Port_ _80_ gefiltert haben, ist es möglich, nach vielen bereitgestellten Datapoints zu filtern. Siehe diese [Link](https://www.tcpdump.org/manpages/pcap-filter.7.html) für die vollständige Liste. Einige der gebräuchlichen Filter sind:

*   _src|dst_ - der Hostname oder die IP-Adresse der Quelle oder des Ziels
    
*   _port|port-range_ - der Port oder der Bereich von Ports, die mit dem Ziel verbunden sind
    
*   _less|greater_ - die Länge der Anforderung
    
*   _proto_ - das verwendete Protokoll
    
*   _net_ - der Bereich der IP-Adressen
    
*   _tcp\[x\]_ - der Wert des Elements des TCP-Arrays an der Stelle x
    

Sie können diese auch mit Operatoren kombinieren, wie wir es getan haben. Die Operatoren sind: _and_, _or_, _not_, _\=_, _<\_ und \_>_.

Das Erfassen von TCP-Paketen und die Analyse des Netzwerkverkehrs sind mit zusätzlichen Tools wie [Wireshark](https://www.wireshark.org/docs/wsdg_html_chunked/) oder [tshark](https://www.wireshark.org/docs/man-pages/tshark.html) möglich.

Vergessen Sie nicht, den Hintergrundprozess mit _pkill bash_ zu bereinigen.

**Andere häufig verwendete Tools**

Neben _curl_ gibt es auch andere Werkzeuge zur Ermittlung von Netzwerkinformationen. Eines der Befehle unter Linux, die zur manuellen Erkundung verwendet werden können, ist _ip_. Lassen Sie uns die Ausgabe von _ip address show_ oder _ip addr show_ analysieren:

```markup
1: lo: <loopback,up,lower_up> mtu 16436 qdisc noqueue state UNKNOWN  
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00  
    inet 127.0.0.1/8 scope host lo  
    inet6 ::1/128 scope host  
       valid_lft forever preferred_lft forever  

2: eth0: <broadcast,multicast,up,lower_up> mtu 1500 qdisc pfifo_fast state UP qlen 1000  
    link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff  
    inet 192.168.122.236/24 brd 192.168.122.255 scope global eth0  
    inet6 fe80::5054:ff:fe43:846c/64 scope link  
       valid_lft forever preferred_lft forever  

```

```markup
$ ip addr show eth0
2: eth0: <broadcast,multicast,up,lower_up> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff
    inet 192.168.122.236/24 brd 192.168.122.255 scope global eth0
    inet6 fe80::5054:ff:fe43:846c/64 scope link
       valid_lft forever preferred_lft forever
$ ip addr show eth0 | grep 'inet ' | awk '{print $2}' | cut -f1 -d'/'  
192.168.122.236

```

Jede IP in dieser Liste ist einer Netzwerkkarte (NIC) zugeordnet und kann entweder eine physische Geräte-NIC wie _ens4_ oder eine virtuelle Geräte-NIC wie _lo_ sein. Sie werden auch bemerken, dass außer der IP noch andere Informationen angezeigt werden.

Auf der zweiten Zeile der NIC finden Sie die MAC-Adresse jedes Geräts direkt nach _link/\*_:

```markup
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

```

und

```markup
link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff

```

Wir können den Status der Schnittstelle sowie den Status des physischen Netzwerks, an das sie angeschlossen ist, sehen. Bei _eth0_ wird dies durch _up_ und _lower\_up_ dargestellt:

```markup
2: eth0: <broadcast,multicast,up,lower_up> mtu 1500 qdisc pfifo_fast state UP qlen 1000

```

Jede Kommunikation über die Schnittstelle _eth0_ würde mit der physischen Adresse _52:54:00:43:84:6c_ und der virtuellen Adresse _192.168.122.236_ identifiziert.

**Befehl "dhclient"**

Die physische Adresse ist statisch und vordefiniert, aber woher stammt die IP-Adresse? Die IP-Adresse von Geräten wird oft dynamisch mit **DHCP** oder dem **Dynamic Host Configuration Protocol** festgelegt. _DHCP_ ermöglicht es einem Gerät, eine Identifikation in einem Netzwerk von einer IP-Behörde oder einer Gruppe von Behörden im selben physischen Netzwerk anzufordern.

Wenn erfolgreich, vergibt DHCP:

*   eine eindeutige IP-Adresse (gültig in Ihrem lokalen Netzwerk),
    
*   einen Zeitraum, während dem dieser Anspruch gültig ist, und
    
*   die IP-Adresse unseres _Gateways_.
    

Wir verwenden die _dhclient_ CLI, um mit unserem DHCP-Server zu interagieren:

```markup
dhclient eth0 -v

```

```markup
Internet Systems Consortium DHCP Client 4.4.1
Copyright 2004-2018 Internet Systems Consortium.
All rights reserved.
For info, please visit https://www.isc.org/software/dhcp/
Copyright 2004-2018 Internet Systems Consortium.
All rights reserved.
For info, please visit https://www.isc.org/software/dhcp/
Mar 02 04:57:03 ubu-serv dhclient[806]:
Listening on LPF/eth0/f4:5c:89:b0:4d:7b
Sending on   LPF/eth0/f4:5c:89:b0:4d:7b
Sending on   Socket/fallback
DHCPREQUEST for 192.168.1.5 on eth0 to 255.255.255.255 port 67 (xid=0x58943a1f)
Sending on   LPF/eth0/f4:5c:89:b0:4d:7b
Sending on   Socket/fallback
DHCPREQUEST for 192.168.1.5 on eth0 to 255.255.255.255 port 67 (xid=0x58943a1f)
DHCPACK of 192.168.1.5 from 192.168.1.1 (xid=0x1f3a9458)
RTNETLINK answers: File exists
bound to 192.168.1.5 — renewal in 40109 seconds.

```

... Sie können sehen, dass die Schnittstelle _env0_ eine DHCP-Anforderung gesendet hat und _192.168.1.5_ von _192.168.1.1_ für _40109_ weitere Sekunden erhalten hat.

Während _192.168.1.5_ oder eine der anderen bisher gesehenen IP-Adressen arbiträr erscheinen mag, gibt es ein Muster. Häufige Muster sehen folgendermaßen aus:

*   10._._.\* (privates Netzwerk)
    
*   172._._.\* (privates Netzwerk)
    
*   192.168._._ (unsere Adresse)
    

Wir verdanken diese Muster [RFC-1918](https://www.ietf.org/rfc/rfc1918.txt). Diese Adressblöcke wurden entworfen, um die Grenzen bei IPv4-Adressen zu berücksichtigen und werden in lokalen und Cloud-Netzwerken konsistent verwendet.

**Befehl "route"**

Das _Gateway_ ermöglicht

es uns, über unser lokales Netzwerk hinaus zu [httpbin.org](//httpbin.org) zu gelangen. Alle Daten, die für ein nicht lokales Netzwerk bestimmt sind, müssen über das Gateway ausgehen. Um dieses Verhalten durchzusetzen, verwenden wir Routen und den _route_\-Befehl.

Installieren und starten Sie den _route_\-Befehl:

```markup
apt install net-tools -y
route

```

```markup
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.10.0    *               255.255.255.0   U     40     0        0 eth0
127.0.0.0       *               255.0.0.0       U     40     0        0 lo
default         192.168.10.1    0.0.0.0         UG    40     0        0 eth0
default         _gateway         0.0.0.0         UG    40     0        0 eth0

```

Die Standardeinstellung leitet Netzwerkanfragen an das Gateway weiter, das eine Adresse ähnlich wie _192.168.10.0_ verwendet und die Schnittstelle _eth0_ heißt. Mit dem _route_\-Befehl könnten wir Routen mit mehreren Schnittstellen oder über separate Netzwerke hinweg erstellen. Wenn wir zu diesem Zeitpunkt die IP-Adresse von [httpbin.org](//httpbin.org) kennen würden, könnten wir sogar eine spezielle Route für diesen Datenverkehr erstellen.

**Befehle "dig" und "nslookup"**

Wenn wir die mit [httpbin.org](//httpbin.org) verknüpften IP-Adressen ermitteln müssen, müssen wir DNS abfragen.

```markup
dig httpbin.org

```

```markup
; <<>> DiG 9.10.6 <<>> httpbin.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35457
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;httpbin.org.               IN      A
;; ANSWER SECTION:
httpbin.org.        5       IN      A       54.144.44.152
httpbin.org.        5       IN      A       3.230.204.70
httpbin.org.        5       IN      A       34.235.32.249
httpbin.org.        5       IN      A       54.224.48.41
;; Query time: 42 msec
;; SERVER: 192.168.43.1#53(192.168.43.1)
;; WHEN: Thu Apr 20 18:34:01 CEST 2023
;; MSG SIZE  rcvd: 93

```

und

```markup
nslookup httpbin.org

```

```markup
Server: 192.168.43.1
Address: 192.168.43.1#53
Non-authoritative answer:
Name: httpbin.org
Address: 34.235.32.249
Name: httpbin.org
Address: 54.224.48.41
Name: httpbin.org
Address: 54.144.44.152
Name: httpbin.org
Address: 3.230.204.70

```

Der Befehl _dig_ zeigt zusätzliche tabellarische Daten, die relevant sind, wenn Sie DNS im Detail erkunden. In beiden Beispielen können wir sehen, dass [httpbin.org](//httpbin.org) auf 4 separate IP-Adressen verweist:

*   _34.235.32.249_
    
*   _54.224.48.41_
    
*   _54.144.44.152_
    
*   _3.230.204.70_
    

**Befehl "ping"**

Jetzt, da wir die Adresse unseres Ziel-Dienstes haben, sollten wir überprüfen, ob er aktiv ist. In vielen Situationen können DNS-Einträge veraltet oder ungenau sein. Die einfachste Möglichkeit, den Status einer IP-Adresse zu überprüfen, ist das Dienstprogramm _ping_. Es sendet _Internet Control Message Protocol (ICMP)_\-Datenverkehr an eine bestimmte Adresse und zeigt an, ob der Datenverkehr vollständig übertragen wird. Aufgrund von Netzwerkbeschränkungen werden wir keine erfolgreiche Verbindung herstellen können.

```markup
ping -c 1 httpbin.org

```

```markup
PING httpbin.org (34.235.32.249): 56 data bytes
\---   httpbin.org ping statistics \---  
1 packets transmitted, 0 packets received, 100.0% packet loss

```

Während die Anforderung an einen Host [solo.io](//solo.io) mit derselben Anzahl von Echo-Anforderungen, wie vom Count-Parameter angegeben, gesendet (und empfangen) wird:

```markup
ping -c 5 solo.io

```

```markup
PING solo.io (23.185.0.4): 56 data bytes
64 bytes from 23.185.0.4: icmp_seq=0 ttl=53 time=39.137 ms
64 bytes from 23.185.0.4: icmp_seq=1 ttl=53 time=44.414 ms
64 bytes from 23.185.0.4: icmp_seq=2 ttl=53 time=49.566 ms
64 bytes from 23.185.0.4: icmp_seq=3 ttl=53 time=33.963 ms
64 bytes from 23.185.0.4: icmp_seq=4 ttl=53 time=34.818 ms
\---   solo.io ping statistics \---  
5 packets transmitted, 5 packets received, 0.0% packet loss

```

In gesicherten Umgebungen ist das Pingen oft auf ICMP beschränkt, was zu einem falsch negativen Ergebnis führt. Sure, here's a translation of the text you provided:

**Command "netcat"**

Die Befehle "netstat" oder "nc" haben nicht dieselben Einschränkungen wie "ping". Mit diesem Tool können Sie eine TCP-Verbindung herstellen oder eine UDP-verbindungslose Protokollabfrage durchführen, solange Sie einen Dienstnamen und einen bestimmten Port angeben.

Zum Beispiel der Befehl "netcat -t [httpbin.org](//httpbin.org) 80 -v -w 3":

*   "-t": Flagge, um diesen Befehl mit TCP auszuführen.
    
*   "-v": Gibt uns ausführliche Ausgaben.
    
*   "-w": Warten Sie 3 Sekunden, bevor der Timeout auftritt.
    

Der Befehl "_nc -t_ [httpbin.org](//httpbin.org) 80 -v -w 3" ergibt:

"Verbindung zu [httpbin.org](//httpbin.org) Port 80 \[tcp/http\] erfolgreich hergestellt!"

Netcat kann auch verwendet werden, um Anforderungsdaten zu senden oder einen Bereich von Ports zu scannen:

"_nc -zvn 127.0.0.1 20-23_"

"_nc: Verbindung zu 127.0.0.1 Port 20 (tcp) fehlgeschlagen: Verbindung abgelehnt_"

"_nc: Verbindung zu 127.0.0.1 Port 21 (tcp) fehlgeschlagen: Verbindung abgelehnt_"

"_nc: Verbindung zu 127.0.0.1 Port 22 (tcp) fehlgeschlagen: Verbindung abgelehnt_"

"_nc: Verbindung zu 127.0.0.1 Port 23 (tcp) fehlgeschlagen: Verbindung abgelehnt_"

Um Port-Scans genauer zu erkunden, können Sie "nmap" ([https://nmap.org/](https://nmap.org/)) oder "masscan" ([https://github.com/robertdavidgraham/masscan](https://github.com/robertdavidgraham/masscan)) verwenden.

**Befehl "traceroute"**

Die kürzeste Entfernung zwischen zwei Punkten mag eine gerade Linie sein, aber das Internet ist selten direkt zwischen zwei Punkten verbunden. Der Datenverkehr muss durch das Gateway geleitet werden, um etwas im öffentlichen Internet zu erreichen. Wie viele Zwischenstationen sollte die Anfrage von unserer lokalen Sandbox zu [httpbin.org](//httpbin.org) tatsächlich durchlaufen?

_"apt install traceroute -y"_

_"traceroute_ [httpbin.org](//httpbin.org)"

Wir können jede der zurückgegebenen IP-Adressen mithilfe des "dig"-Befehls als DNS-Server identifizieren:

_"dig -x 99.83.89.102 | grep dns;"_

"traceroute" gibt oft keine Antwort zurück, hilft jedoch bei der Beantwortung der Frage: "Welcher Pfad besteht zwischen mir und diesem Host?"

**Befehl "netstat"**

"netstat" sammelt Netzwerkstatistiken für Ihre aktuelle Maschine. Um aktive Verbindungen und aktive Sockets zu sammeln, führen Sie "netstat" aus. Die Flags "-r" sammeln Routeninformationen und "-ie" Schnittstelleninformationen.

### **Tieferes Eintauchen in IP-Subnetting, Routing, Schicht 3, BGP und Labore!**

#### **Wie Netzwerkverkehr funktioniert?**

Wenn der Verkehr für ein IP-Netzwerk bestimmt ist, das nicht direkt mit dem Host verbunden ist, muss der Verkehr durch einen Router gehen, der den Verkehr an einen anderen Netzwerksegment weiterleitet, das näher am Ziel liegt. Die meisten Clientgeräte haben das Standardgateway definiert, das der Router ist, der den Verkehr aus dem lokalen direkt angeschlossenen Netzwerk ableitet. Router wissen, wie sie den Netzwerkverkehr anhand von Routingtabellen weiterleiten sollen, die von Routingprotokollen erstellt werden.

Jedes einzelne Endgerät Ihres Geräts hat eine MAC-Adresse, die das lokale Netzwerk identifiziert, dem das Gerät gehört. MAC-Adressen werden jedoch niemals direkt verwendet.

In Analogie zu Ihrem Namen (der MAC-Adresse) und den Kontaktdaten, die Sie haben, wie Telefonnummer, E-Mail oder eine andere Form der Kommunikation: Diese Kontaktinformationen werden normalerweise im Adressbuch gespeichert, und Ihre MAC-Adresse hat eine zugehörige IP-Adresse und einen DNS-Hostnamen.

Geroutete Protokolle wie IP existieren auf Layer 3 des OSI-Modells.

**Wie Geräte in einem Netzwerk kommunizieren?** Layer 2 MACs und Layer 3 Sub

Jedes Gerät/Endpunkt/VM/Container/Server, das über seine lokal angeschlossene Schnittstelle auf das Netzwerk zugreift, verfügt über eine physische Adresse, die als **MAC (oder Media Access Control)** bekannt ist. Jede davon ist eindeutig, und die Adresse selbst ist nur mit einem Endpunkt verknüpft (der manipuliert werden kann).

Eine MAC-Adresse sieht so aus: _00-B0-D0-63-C1-23_.

Auch die MAC-Adresse jedes Endpunkts wird vom Hersteller festgelegt, der diesen Endpunkt entwickelt hat. Hersteller besitzen normalerweise die ersten 6 Zeichen einer MAC-Adresse, sodass es einfach ist, festzustellen, wer diesen Endpunkt erstellt hat.

Ein Router hat mehrere Schnittstellen, von denen jede eine eigene eindeutige MAC-Adresse hat. Eine VM, ein Netzwerknamespace oder ein Container hat ebenfalls eine MAC-Adresse.

Ein Bridge ist ein Multi-Access-Gerät, das es MAC-Adressen ermöglicht, einander zu finden. Ein physischer Switch mit 4/8/16/24/48 Ethernet-Ports ist wie eine Bridge. Ein VXLAN ist ein logischer Switch, der die gleiche Funktion für mehrere VMs bereitstellt.

Aber Bridges/Switches sind nicht sehr intelligent und routen nicht über die elektrischen Signale hinaus. Hier kommen IP-Adressen ins Spiel. Jeder IP-Adresse ist eine MAC-Adresse des Endpunkts zugeordnet. Mit IPs ist es einfach, sie logisch zu gruppieren und dorthin zu routen.

Eine IP gehört zu einem Subnetz, und mehrere IPs können miteinander kommunizieren, wenn sie sich im gleichen Subnetz befinden.

Beispiele für ein Subnetz:

_192.168.52.0/24_

_172.13.37.4/30_

_10.20.0.0./16_

In jedem Subnetz gibt es eine Broadcast-Adresse und eine Netzwerkadresse, die beide nicht zugew

iesen werden können. Bei einem Subnetz wie _192.168.52.0/24 (oder 255.255.255.0)_ gibt es 254 verwendbare IP-Adressen. Wie ist das möglich? In einer Subnetzmaske gibt es 32 Bits binärer Darstellung. _/24 oder 255.255.255.0 ist 11111111.11111111.11111111.00000000_. Die 24x1 sind Netzwerkbits, und die 8x0 sind Hostbits. Die ersten drei Oktette sind ein Hinweis auf eine Netzwerkadresse, eine Adresse, die angibt, wie man zu spezifischeren IPs gelangt.

In diesem Subnetz wird normalerweise eine IP-Adresse einem Router zugewiesen, damit er über dieses direkt angeschlossene Netzwerk Bescheid weiß und gleichzeitig Verbindungen zu anderen Netzwerken herstellen kann. Auf diese Weise tauscht der Router Informationen mit anderen Routern aus.

Tatsächlich können zwei (oder mehr) Router im gleichen IP-Subnetz sein (eine Transitverbindung), und unter diesen Routern tauschen sie Informationen über die von ihnen bekannten Netzwerke aus, entweder durch statische Konfiguration oder dynamisch.

**Router/Gateway**

Ein Router ist ein Netzwerkgerät, das zwei oder mehr Netzwerke oder Subnetze miteinander verbindet und Pakete zwischen verschiedenen Netzwerken weiterleitet. Die folgende Visualisierung zeigt die Routen zwischen zwei Subnetzen, die über einen Router Zugriff aufeinander benötigen:

![Router-Visualisierung](https://images.prismic.io/syntia/95c89ec5-febc-4671-b66d-430b708a3232_screenshot-2023-04-20-at-20.13.49.png?auto=compress,format)

Um von einem Local Area Network (LAN) zu einem entfernten Ort zu kommunizieren, müssen wir keine statischen Routen bereitstellen, sondern ein **Dynamic Host Configuration Protocol** (DHCP) verwenden, ein dynamisches Routingprotokoll. Die Stärke des DHCP-Protokolls liegt in der einfacheren Verwaltung von IP-Adressen. In einem Netzwerk ohne DHCP müssen Sie jedem Client manuell eindeutige IP-Adressen zuweisen.

DHCP ermöglicht es Hosts, erforderliche TCP/IP-Konfigurationsinformationen von einem DHCP-Server zu erhalten.

#### **Konfiguration der Routen**

Installation von net-tools, um einige lokale Netzwerkbefehle auszuführen:

```bash
apt-install net-tools -y

```

Aktivieren und überprüfen Sie Ihre lokale Routingtabelle:

```bash
sysctl -w net.ipv4.ip_forward=1
netstat -nr
route

```

Sie können sehen, dass es verschiedene Arten von Routen gibt: lokal angeschlossen und Standardroute, die als Standardgateway dient. Die lokal angeschlossene Route zeigt an, dass der Host mit dem Netzwerk verbunden ist, in dem er sich befindet. Die Standardroute ist eine Route, um über einen Zwischenpunkt zu einem beliebigen Ort zu gelangen.

Sie können die IP der Standard-Schnittstelle erfassen und eine IP in diesem Subnetz verwenden, um "eine neue statische Route zu erstellen":

```bash
ip addr

```

Mit dem Befehl `ip addr` war die IP von eth0 zum Zeitpunkt des Schreibens "192.168.122.236/24". Jetzt, wenn es eine "/32"-Adresse hat, bedeutet dies, dass es die einzige verwendbare IP in diesem Subnetz ist und oft in isolierten Netzwerken für einzelne Hosts wie VPNs verwendet wird.

```bash
eth0IP=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
echo $eth0IP

```

Jetzt können wir diese Variable verwenden und in unseren Routing-Befehl (hinzufügen oder löschen) einfügen und in eine Routing-Tabelle einspeisen:

```bash
ip route add 10.13.37.0/24 via $eth0IP
route

```

#### **Erstellen und Verbinden von zwei Netzwerk-Namensräumen in verschiedenen Subnetzen über veth-Schnittstellen.**

Verwenden wir die folgende Konfiguration, um zwei verschiedene logische Subnetze im Subnetz 10.13.37.0/24 zu erstellen. Wir werden zwei Netzwerk-Namensräume erstellen, ihnen Schnittstellen und IP-Adressen in zwei verschiedenen Subnetzen zuweisen.

Zwei Netzwerk-Namensräume simulieren einen virtuellen Namensraum. Die Linux veth-Geräte sind virtuelle Ethernet-Geräte, die als Tunnel zwischen Netzwerk-Namensräumen agieren, um eine Brücke zu einem physischen Netzwerkgerät in einem anderen Namensraum zu erstellen, können aber auch als eigenständige Netzwerkgeräte verwendet werden. veth-Geräte werden immer in verbundenen Paaren erstellt.

```bash
# Erstellen von zwei Netzwerk-Namensräumen
ip netns add sleep && ip netns add webapp

# Virtuellen Namensraum simulieren
ip link add sleepif type veth peer name webappif

# Jeder virtuellen Netzwerk eine Subnetzadresse zuweisen
ip link set sleepif netns sleep
ip link set webappif netns webapp

# Schnittstellen einem Netzwerk zuweisen
ip -n sleep addr add 10.13.37.0/25 dev sleepif
ip -n webapp addr add 10.13.37.128/25 dev webappif

# Netzwerkschnittstellen online schalten
ip -n sleep link set sleepif up
ip -n webapp link set webappif up

# Loopback-Schnittstellenrouting akzeptieren
ip -n sleep link set lo up
ip -n webapp link set lo up

# Die neu erstellten Namensräume überprüfen
ip netns

```

```bash
# Von einem Netzwerk zum anderen ping
ip netns exec sleep ping -c6 10.13.37.128
# ping: Verbindung: Netzwerk nicht erreichbar

ip netns exec webapp ping -c6 10.13.37.128
# ping: Verbindung: Netzwerk nicht erreichbar

```

```bash
# Statische Routen hinzufügen
ip -n sleep route add 10.13.37.128/25 dev sleepif
ip -n webapp route add 10.13.37.128/25 dev webappif

# Die neu hinzugefügten Routen überprüfen
ip netns exec sleep route
ip netns exec webapp route

```

Jetzt haben wir eine Routing-Verbindung zwischen zwei Netzwerken hergestellt. Stellen Sie sich vor, Sie müssten dies für Hunderte oder Millionen von Netzwerken tun! Deshalb gibt es Protokolle wie BGP und OSPF.

Dasselbe gilt für das Container-Netzwerk in Kubernetes. Wenn wir viele Pods in einem Kubernetes-Cluster ausführen, kann die statische Routenkonfiguration nicht so einfach durchgeführt werden. Tools wie Cilium CNI bieten Netzwerkkonnektivität zwischen Container-Workloads und stellen IP-Adressen für die Pods im großen Maßstab bereit.

BGP verwendet den TCP-Port 179, um Nachbarbeziehungen zu bilden und mit anderen Routern zu kommunizieren. Falsche Konfiguration von BGP trägt dazu bei, dass DNS nicht verfügbar ist und Websites nicht erreichbar sind.

## **Es ist nicht DNS, es kann nicht DNS sein, es war DNS**

Stellen Sie sich vor, Sie müssten sich an jede einzelne Telefonnummer erinnern. Das würde nicht gut enden, wenn Sie aus Versehen die falsche Nummer anrufen. Ähnlich wie bei der Herstellung einer DNS-Verbindung ist ein "Tele

fonbuch" unerlässlich. Beim Zugriff auf das Web mit der Adresse von [httpbin.org](//httpbin.org) muss diese in eine IP-Adresse übersetzt werden. DNS oder Domain Name System übersetzt effektiv eine IP in einen für Menschen lesbaren Namen.

Es gibt verschiedene Rollen in einer DNS-Anfrage, die Werte zurückgeben müssen. Dies sind verschiedene Arten von DNS-Objekten. In Cloud-nativen Umgebungen verwenden wir häufig cloudbasierte DNS-Dienste, um neue DNS-Einträge zu erstellen.

### **Was ist ein DNS-Server?**

DNS-Server liefern direkte Antworten auf DNS-Auflösungen an Endpunkte. Normalerweise geben Sie auf einem Host eine DNS-Serveradresse an (die normalerweise von DHCP übernommen wird), die lokal über Layer 2 oder über Layer 3-Routing IP-erreichbar sein muss. Wenn der DNS-Server erreichbar ist, werden Hostnamen aufgelöst, um Ihrem Host zu ermöglichen, seinen Weg zu seinem Ziel zu finden.

DNS-Server hören auf Anfragen auf UDP-Port 53 (es ist auch mit dem von AWS angebotenen Route53 DNS-Dienstnamen verknüpft), und es ist wichtig, wenn Sie eine Firewall haben, die den Datenverkehr auf bestimmten Ports zulässt oder blockiert.

DNS arbeitet auf Layer 7 des OSI-Modells (Transportebene).

### **DNS-Auflösung**

**Rekursiver DNS-Resolver:** Die unmittelbare Entität eines PCs/Servers/Hosts/Endpunkts wird zur Auflösung des Hostnamens abfragen. Normalerweise können Antworten für häufig abgefragte Endpunkte oder Hostnamen zwischengespeichert werden. Diese zwischengespeicherten Informationen werden normalerweise in einer Datenbank gespeichert und werden im Laufe der Zeit gelöscht, sobald diese Datensätze stabil werden oder nicht häufig abgefragt werden.

**Root-Nameserver:** Der Root-Nameserver ist der nächste Schritt im Ablauf der DNS-Auflösung, da er dafür verantwortlich ist, den Resolver zum Top-Level-Domain-Server zu leiten, basierend auf der Erweiterung dieser Domain, wie z.B. _.io, .ca, .org, .com._ Die Internet Corporation for Assigned Names and Numbers (ICANN) überwacht diese Root-Nameserver.

**Top-Level-Domain-Server:** TLDs speichern Informationen für alle Domainnamen, die dieselbe TLD-Erweiterung wie .io, .ca, .com teilen. Der TLD-Server enthält Informationen für Websites, die eine bestimmte Erweiterung haben. Die TLD wird dem Resolver mit einem Domainnamen und dem Authoritative Name Server für diese Domain antworten.

Der **Authoritative Name Server** ist die letzte Anlaufstelle des Resolvers. Er wird normalerweise mit dem entsprechenden A/AAAA-Eintrag oder CNAME-Eintrag und IP-Informationen antworten, wodurch der Host, der die Anfrage stellt, die IP erhält und den Datenverkehr dorthin leiten kann.

**DNS A, AAAA, PTR Record Types**

Jeder DNS-Server verfügt über eine Datenbank von Einträgen, die Werte verschiedener Typen zurückgeben. Der zurückgegebene Wert hängt vom aufgerufenen Eintragstyp ab. Die gängigen Eintragstypen sind:

*   **A-Eintrag**: Dieser Eintrag übersetzt einen Hostnamen in eine IPv4-Adresse.
    
*   **AAAA-Eintrag**: Dieser Eintrag ist dasselbe wie ein A-Eintrag, jedoch für IPv6-Adressen (z. B. mit mehreren Load-Balancer-IPs oder geolokalisierten).
    
*   **CNAME-Eintrag**: Dieser Eintragstyp übersetzt einen Namen in einen anderen Namen.
    
*   **MX-Eintrag**: Dieser Eintrag verknüpft die Eigentümerschaft eines Domainnamens mit E-Mail-Servern.
    
*   **PTR-Eintrag**: Dieser Eintrag übersetzt eine IP-Adresse in einen Hostnamen, die sogenannte Rückwärtssuche oder das Gegenteil eines A-Eintrags.
    
*   **SRV-Eintrag**: Dieser Eintrag ist für Dienste für eine Host- und Portkombination vorgesehen, die den Zugriff auf bestimmte Anwendungen auf ihrer IP und Port ermöglicht.
    
*   **TXT-Eintrag**: Ein Eintrag, um textbasierte Notizen zu speichern.
    

Liste der DNS-Eintragstypen: [https://en.wikipedia.org/wiki/List\_of\_DNS\_record\_types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)

Vollqualifizierte Domainnamen oder FQDNs sind die vollständige Subdomain, der Domain- und der Top-Level-Domain, die auf eine bestimmte Ressource oder eine Gruppe von Ressourcen verweisen.

Zum Beispiel [www.httpbin.org](//www.httpbin.org), wobei "www" die Subdomain, "httpbin" die Domain und "org" die Top-Level-Domain ist. Wenn wir [www.httpbin.org](//www.httpbin.org) anfordern, werden wir zur Hauptwebseite weitergeleitet. Es gibt verschiedene Anwendungsfälle dafür, wie die Bereitstellung strenger Sicherheit mit Transport Layer Security (TLS), für die ein vollqualifizierter Domainname in das Zertifikat aufgenommen werden muss.

In einem Kubernetes-Cluster wird für jede Pod und Service ein FQDN im folgenden Format erstellt: _(Pod-Name | Service-Name).(Namespace).svc.(Cluster-Domain)_

**CoreDNS** ist der DNS-Resolver von Kubernetes - er wird als Namensdienst oder Diensterkennungsmechanismus für alle Dienste verwendet. Jedes Objekt kennt die anderen Objekte über CoreDNS, zum Beispiel, indem es eine Container-Workload innerhalb eines sogenannten Pods ausführt und mit etwas anderem kommunizieren muss, wird der Eintrag automatisch erstellt und wird zu einer Referenz im Cluster.

Einträge werden automatisch erstellt und gelöscht, da die Kubernetes Control Plane mit CoreDNS kommuniziert und es aktualisiert.

## **HTTP-Grundlagen und Verwendung des Curl-Dienstprogramms zur Interaktion mit HTTP-fähigen Anwendungen**

Die HTTP-Ebene 7 wird nicht nur verwendet, um die Verfügbarkeit der Anwendung zu bestimmen, sondern auch bei der Arbeit mit Service-Meshes und der Interaktion mit Diensten.

Es gibt eine Struktur: Sie senden eine Nachricht an den Server mit Operationen wie HTTP-Anforderungsmethoden. Die Richtlinienentwicklung geht über das Service-Mesh hinaus und bietet Autorisierungsmechanismen wie OAuth, um Sicherheit und Richtlinien für die Verwendung von HTTP-Methoden zu gewährleisten.

### **HTTP-Methoden**

Die **GET-Methode** wird in HTTP verwendet, um Daten von einem Serverressourcen anzufordern und zu lesen. Diese Anfragen können zwischengespeichert werden und bleiben im Browserverlauf erhalten. GET sollte nicht zur Verarbeitung sensibler Daten verwendet werden. Die GET-Methode ermöglicht keine Änderungen an den Ressourcen.

Die **POST-Methode** wird verwendet, um eine Ressource zu aktualisieren oder zu erstellen, indem spezifische Daten an einen Server gesendet werden.

Die **PUT-Methode** ist ebenfalls eine Methode zum Aktualisieren von Ressourcen, ersetzt jedoch den vorhandenen Inhalt durch etwas anderes.

Die **HEAD-Methode**, ähnlich wie die GET-Methode, sendet eine Anfrage, erhält jedoch eine Antwort ohne den Nachrichteninhalt.

Die **DELETE-Methode** ermöglicht das Löschen von spezifizierten Ressourcen.

Die **PATCH-Methode** ermöglicht die Spezifikation von teilweisen Updates für eine Ressource.

### **Statuscodes**

**Statuscodes** ermöglichen es uns, besser zu verstehen, was nach einer HTTP-Anforderung geschieht.

*   **1xx** - Bietet informative Antworten.
    
*   **2xx** - Erfolgreiche Antworten liefern sinnvolle Daten und zeigen an, dass die Anfrage erfolgreich beim Server eingegangen ist.
    
*   **3xx** - Weiterleitungsanweisungen, bei erfolgreicher Weiterleitung wird eine Weiterleitungsanweisung bereitgestellt.
    
*   **4xx** - Clientfehlerantworten, wenn auf der Clientseite etwas falsch ist, wie ein Browserfehler, eine Verbindungsstörung oder eine Nichtautorisation.
    
*   \*\*5
    

xx\*\* - Serverfehlerantworten.

Gängige HTTP-Statuscodes: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

**HTTP/1** war eines der ersten Protokolle, die uns die Kommunikation im Internet ermöglichten, und **HTTP/2** war eine Weiterentwicklung von HTTP/1.1, das die TLS (Transport Layer Security) einführte, SSL (Secure Sockets Layer) - die wichtigsten Protokolle für die Sicherheit der Netzwerkkommunikation. HTTP läuft über das TCP (Transmission Control Protocol), das eine clientseitige Verbindung herstellt, während UDP (User Datagram Protocol) den Datentransfer ermöglicht, bevor eine Bestätigung durch die empfangende Partei erfolgt.

## **Firewalls, Loadbalancer, Proxies**

In diesem Modul werden wir _iptables_, _ipvs_ vorstellen und die Verwendung von Proxies wie Envoy begründen.

Firewalls sind wichtig, um die Sicherheit im Netzwerk durchzusetzen. Eine Firewall kann physisch oder virtuell sein, kontrolliert jedoch hauptsächlich, welcher Datenverkehr in irgendeiner Form akzeptiert oder abgelehnt wird.

### **_iptables_**

_Iptables_, eine weit verbreitete Linux-Firewall, gibt es seit fast einem Vierteljahrhundert und wird immer noch von einigen der größten Softwareprojekte heute verwendet. Es gibt einen Nachfolger in _iftables_, um die Leistung zu verbessern, ist jedoch nicht so häufig verfügbar.

_Iptables_ ist eine Gruppe von Tabellen, die Regeln für zugeordnete IP-Adressen und Ports darstellen.

Es gibt tatsächlich fünf Tabellen:

*   **filter**: Die Standardtabelle zum Akzeptieren, Ablehnen oder Verwerfen von Datenverkehr.
    
*   **net**: Wird verwendet, um die Netzwerkadressübersetzung für Quell- und Zieladressen durchzuführen.
    
*   **mangle**: Wird verwendet, um einige Komponenten der Nachricht zu markieren oder neu zu konfigurieren, um sie später zu verwenden.
    
*   **raw**: Wird verwendet, um einige der Standardnetzwerkflüsse zu umgehen.
    
*   **security**: Wird verwendet, um die Sicherheit mit Komponenten wie SELinux strikt durchzusetzen.
    

In jeder Tabelle befindet sich eine Reihe von Ketten, die benutzerdefiniert sein können, aber die Standardketten sind:

*   _PREROUTING_
    
*   _INPUT_
    
*   _FORWARD_
    
*   _OUTPUT_
    
*   _POSTROUTING_
    

Das folgende Schema zeigt den Fluss von Paketen durch die Linux-Netzwerke:

[https://images.prismic.io/syntia/501f905a-89dd-4824-b5e4-c6a1a012f49e\_nf-hooks.png?auto=compress,format](https://images.prismic.io/syntia/501f905a-89dd-4824-b5e4-c6a1a012f49e_nf-hooks.png?auto=compress,format)

Netfilter-Hooks, Referenz: [https://wiki.nftables.org/wiki-nftables/index.php/Netfilter\_hooks](https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks)

Mit der Fähigkeit, Ketten zu Tabellen hinzuzufügen und Regeln zu Ketten hinzuzufügen, können Programme und Benutzer den Datenverkehr mit hoher Konfigurierbarkeit steuern. Lassen Sie uns ein Programm _docker_ erkunden.

_apt-get update && apt-get install_ [docker.io](//docker.io) _\-y_

Mit Docker installiert können wir alle Regeln für eine Tabelle auflisten:

_iptables -t filter -L -n -v_

**Docker** steuert die Generierung und Zuweisung von IP-Adressen. Wenn wir weitere Container mit dem folgenden Befehl hinzufügen, sehen wir die zusätzlichen Regeln, die erforderlich sind, um den Datenverkehr an sie weiterzuleiten:

# AUS QUELLE AUSFÜHREN

_for i in {8001..8003}; do docker run --restart always -d -p $i:5678 hash iptables -t nat -L -n_

In der NAT-Tabelle sehen wir zusätzliche Regeln für diese Container: Die unteren drei korrespondieren mit den gerade erstellten Anwendungen. Mit _iptables_ haben wir die Möglichkeit, den Datenverkehr nach Bedarf zu steuern oder abzulehnen.

# AUS QUELLE AUSFÜHREN

iptables -R DOCKER-USER 1 -p tcp --dport 5678 -j REJECT

Wenn wir die vorherige Reihe von Curl-Befehlen erneut ausführen, sollten wir unterschiedliche Ausgaben erhalten.

# Keine Verbindung zu networking-foundation

Hier ist die grobe Übersicht darüber, wie der Datenverkehr von _iptables_ analysiert wird:

*   Der Datenverkehr tritt in die PREROUTING-Kette ein.
    
*   Er passt zur einzigen Regel, die zur DOCKER-Kette weiterleitet.
    
*   Hier passt er zu einer der DNAT-Regeln und ändert die IP und den Zielport entsprechend.
    
*   Der Datenverkehr tritt dann in die FORWARD-Kette ein.
    
*   Er passt zur zweiten Regel, die zur DOCKER-USER-Kette weiterleitet.
    
*   Schließlich passt er zur einzigen Regel in dieser Kette, die jeglichen Datenverkehr für _5689_ mit _tcp_ ablehnt.
    

Dieses Verhalten können wir bestätigen, indem wir _iptables_ überwachen und eine Anfrage senden:

# AUS QUELLE AUSFÜHREN

_iptables -t raw -A PREROUTING -s networking-foundations-dst -j TRACE_

_xtables-monitor -t_

Alternativ könnten wir Regeln erstellen, die bestimmten Datenverkehr akzeptieren, zu einer vorherigen Kette zurückkehren, den Datenverkehr verwerfen oder sogar an eine nachfolgende Kette weiterleiten.

### **Loadbalancer**

_Iptables_ überschneidet sich in der Funktionalität zwischen **Loadbalancern** und Firewalls, da Sie die Route zwischen diesen Diensten interagieren und kontrollieren können.

Es gibt viele Gründe, warum der für ein einzelnes Ziel vorgesehene Datenverkehr auf mehrere Workloads verteilt werden muss.

*   Ressourcen reduzieren
    
*   Anforderungen für einzelne Instanzen
    
*   Leistung verbessern
    
*   für intermittierende Ausfälle berücksichtigen
    
*   Verhalten verschiedener Konfigurationen testen und vergleichen

Ebenso wie bei Firewalls gibt es viele Lösungen, sowohl physisch als auch virtuell. Einige Lastenausgleichsfunktionen können mit der iptables-Konfiguration durchgeführt werden, die den Datenverkehr auf Port 8004 auf alle drei Container verteilt, aber der Datenverkehr ist nicht so gleichmäßig, wie die Regeln vermuten lassen.

Um mehr Kontrolle darüber zu haben, wie der Datenverkehr auf separate Instanzen verteilt wird, müssen wir **IP Virtual Server** oder **ipvs** nutzen.

Ipvs verwendet einige der gleichen Kernel-Technologien wie iptables (netfilter), ist jedoch speziell für die Verteilung von Datenverkehr konzipiert und kann leistungsfähiger sein. Wir können den Datenverkehr mit **ipvs** nach den folgenden Methoden verteilen:

*   Round Robin (zweites iptables-Beispiel)
    
*   Gewichtete Round Robin
    
*   Wenigste Verbindungen (Least Connection)
    
*   Gewichtete Wenigste Verbindungen
    
*   Lokalbasierte Wenigste Verbindungen
    
*   Lokalbasierte Wenigste Verbindungen mit Replikation
    
*   Ziel-Hashing
    
*   Quell-Hashing
    

Stellen Sie sicher, dass Sie die iptables-Regeln mit dem Flag _iptables -t nat -D_ löschen, um keine überlappenden Regeln zu erstellen, die miteinander in Konflikt stehen.

# AUS DER QUELLE AUSFÜHREN

_iptables -t nat -D PREROUTING 1_

_iptables -t nat -D PREROUTING 1_

_iptables -t nat -D PREROUTING 1_

Installieren Sie die ipvs-Dienstprogramme mit:

# AUS DER QUELLE AUSFÜHREN

_apt-get install ipvsadm -y_

Wir können unsere iptables-Round-Robin-Regel mit dem folgenden Befehl neu erstellen:

# AUS DER QUELLE AUSFÜHREN

_export ip=$(hostname -I | awk ‘{print #1}’)_

_echo “_

_\-A -t $ip:8000 -s rr_

_\-a -t $ip:8000 -r 172.17.0.2:5678 -m_

_\-a -t $ip:8000 -r 172.17.0.3:5678 -m_

_\-a -t $ip:8000 -r 172.17.0.4:5678 -m_

_” | ipvsadm -R_

_Ipvsadm_

Anstelle von Ketten und Tabellen erstellen wir einen Dienst und wenden Konfigurationen und Ziele darauf an. Die Ausführung dieses Befehls sollte eine gleichmäßige Verteilung der Endpunkte melden:

_für i in {1..100}; do curl -s networking-foundations-src:8000; done | sort | uniq -c_

_33 8001_

_33 8002_

_34 8003_

Nun entspricht jeder der Container jedem der Ports.

Lassen Sie uns den Dienst löschen und einen anderen Verteilungsalgorithmus ausprobieren.

# AUS DER QUELLE AUSFÜHREN

_Ipvsadm –clear_

_echo “_

_\-A -t $ip:8005 -s wic_

_\-a -t $ip:8005 -r 172.17.0.2:5678 -m -w 1_

_\-a -t $ip:8005 -r 172.17.0.3:5678 -m -w 1_

_\-a -t $ip:8005 -r 172.17.0.4:5678 -m -w 98_

_” | ipvsadm -R_

_Ipvsadm_

# Der Großteil des Datenverkehrs wird zum vierten Container geroutet.

_für i in {1..100}; do curl -s networking-foundations-src:8005; done | sort | uniq -c_

_1 8001_

_1 8002_

_98 8003_

Bei "gewichteten Wenigste Verbindungen" wird der Datenverkehr an die Instanz gesendet, die derzeit die wenigsten Verbindungen hat, aber mit einer Vorliebe für diejenigen Instanzen, die höhere numerische Gewichtungen haben.

Es ist erwähnenswert, dass **_ipvs_** neben den Verteilungsalgorithmen auch die folgenden Weiterleitungsarten unterstützt:

*   Direktes Routing (–gatewaying)
    
*   Tunneling (–ipip)
    
*   und NAT (–masquerading)
    

**_ipvs_** bietet definitiv mehr im Bereich des Lastenausgleichs als _iptables_, hat aber auch seine Grenzen. Zwischen diesen beiden Tools gibt es keine Möglichkeit, Entscheidungen für jedes Protokoll zu treffen, das innerhalb eines Netzwerks genutzt werden kann.

### **_Proxy_**

Moderne Anwendungen haben oft individuelle oder spezielle Anforderungen, die mit herkömmlichen Linux-Werkzeugen nicht erfüllt werden können. Dieses sich entwickelnde Set von Anforderungen ist die Grundlage eines **_Proxys_**.

Ein Netzwerkproxy ist eine Entität, die den Datenverkehr im Auftrag eines Clients empfängt und verteilt. Proxies nutzen die von uns erwähnten Fähigkeiten sowie einige weitere für folgende Anwendungsfälle:

*   Weitergabe von geolokalen Daten, die sich von der ursprünglichen Anfrage unterscheiden
    
*   Anonymisierung von Quell- oder Zielinformationen
    
*   Vornehmen von Firewall-Regeln, Autorisierung und Autorisierung für eingehenden oder ausgehenden Datenverkehr
    
*   Verschlüsseln und/oder Schutz sensibler Informationen
    
*   Steigerung der Resilienz
    
*   Optimierung des Datenverkehrsflusses
    
*   Bereitstellung von Beobachtbarkeit
    

Die meisten Daten werden wahrscheinlich irgendwann durch einen Proxy geleitet. Anstelle von gemeinsamen Standards wie iptables und ipvs ist es häufiger, die verfügbaren Werkzeuge als ein Ökosystem zu betrachten.

Bestimmte Proxies eignen sich besser für bestimmte Anwendungsfälle als andere.

Wenn Sie einige der beliebtesten empfohlenen Optionen erkunden möchten:

*   [envoy](https://www.envoyproxy.io/) das Rückgrat von Istio
    
*   [haroxy](https://www.haproxy.com/) die Komponente der RedHat OpenShift-Lösung
    
*   [nginx](https://www.nginx.com/) eine gängige Lösung zur Ex

position von Datenverkehr in Kubernetes
    

Proxies sind leistungsstark im Bereich der Netzwerktransformation, Sicherheit und allgemeinen Optimierung.

## **Container-Netzwerke über Netzwerk-Namespaces**

**Container** sind isolierte Prozesse, die auf einem einzigen Betriebssystem ausgeführt werden. Ähnlich wie bei der Virtualisierung verbrauchen Container CPU, Speicher und Festplattenspeicher, erfordern jedoch erheblich weniger Ressourcen, da sie einer einzigen Funktion oder einem einzigen Prozess gewidmet sind. Bei der Erstellung eines Containers ist kein vollständiges Betriebssystem erforderlich.

Es muss nicht für jeden einzelnen Container manuell ein Netzwerk erstellt werden - die Docker-Container-Runtime war die erste, die einen Workflow erstellte, der sofortigen Zugriff auf das Netzwerk ermöglichte. Kubernetes nahm dies auf eine andere Ebene und stellte das Container Networking Interface (CNI) bereit.

Verschiedene Kubernetes-Umgebungen wie Calico und Cilium fungieren als CNI und kommunizieren mit dem Kube API Server.

Da wir bereits viel Wissen über Netzwerke entwickelt haben, lohnt es sich zu verstehen, wie man einen Netzwerk-Namespace erstellt und Prozesse isoliert, um Container und das damit verbundene Netzwerk besser zu verstehen.

### **Erstellung von Netzwerk-Namespaces, die miteinander kommunizieren**

_apt install net-tools_

_ip netns add sleep && ip netns add webapp_

_ip netns_

_ip netns exec sleep ip link_

_Ip netns exec sleep arp #IP-Adresse MAC_

_\# Jede MAC-Adresse ist einer IP-Adresse zugeordnet, aber diese Endpunkte in jedem Namespace wissen nichts voneinander. In Kubernetes hat jeder Container, der in einem Pod läuft, seine zugehörige MAC-Adresse._

_ip netns exec sleep route_

Der beste Weg, um nach außen von der physischen Schnittstelle eines Hosts zu gelangen, ist die Verwendung der Linux-Bridge-Funktionalität. Zuvor haben wir die Route zwischen zwei Subnetzen in einem privaten Netzwerk erstellt, aber um breiter zu kommunizieren, müssen diese Netzwerk-Namespaces der physischen Schnittstelle nach außen zugänglich gemacht werden. Es ist ähnlich wie das Zuweisen einer IP-Adresse zu einem Prozess in seinem eigenen Namespace oder das Zuweisen einer IP an einen Container, der es allen dreien ermöglicht, in derselben Broadcast-Domäne und im selben Subnetz zu kommunizieren.

Lassen Sie uns eine Bridge erstellen und sie dann auf dem Host präsentieren.

ip link set dev app-net-0 up

# Erstellen Sie eine virtuelle Schnittstelle für den Namespace und das Ende des Links, das an die Bridge angehängt wird

_ip link add veth-sleep type veth peer name veth-sleep-br_

_ip link add veth-webapp type veth peer name veth-webapp-br_

# Weisen Sie die Schnittstelle den entsprechenden Namespaces zu

_ip link set veth-sleep netns sleep_

_ip link set veth-webapp netns webapp_

# Weisen Sie das Ende des Links der Bridge zu

_ip link set veth-sleep-br master app-net-0_

_ip link set veth-webapp-br master app-net-0_

# Weisen Sie IP-Adressen den verschiedenen Links in jedem Namespace zu

_ip -n sleep addr add 192.168.52.1/24 dev veth-sleep_

_ip -n sleep link set veth-sleep up_

_ip -n webapp addr add 192.168.52.1/24 dev veth-webapp_

_ip -n webapp link set veth-webapp up_

# Weisen Sie der Bridge eine IP-Adresse zu, die der Zugangspunkt zum physischen (Host-) Netzwerk sein wird

_ip addr add_ 192.168.52.5/24 dev app-net-0

# Bringen Sie die virtuelle Seite der Bridge hoch, der Netzwerk-Namespace hat eine Verbindung zu seinem eigenen Namespace und zur Bridge

_ip link set dev veth-sleep-br up_

_ip link set dev veth-webapp-br up_

_ip netns exec webapp ping 23.285.0.4_

_ip netns exec webapp route_

# Netzwerk ist nicht erreichbar

Lassen Sie uns das Problem durch eine iptables-Regel beheben, die es uns ermöglicht, das 192.168.52.0-Netzwerk mit einer IP auf dem Host zu NATen, die den ausgehenden Verkehr kommunizieren kann.

_iptables -t net -A POSTROUTING -s 192.168.52.0/24 -j MASQUERADE_

_ip netns exec webapp ping 23.185.0.4_

# Netzwerk ist nicht erreichbar

# _Fügen Sie die Standardroute hinzu_

_ip nens exec webapp route_

_ip netns exec webapp ip route add default via 192.168.52.5_

_sysctl -w net.ipv4.ip.forward=1_

_ip netns exec webapp ping 23.185.0.4_

Wir überlasten die physische Schnittstelle, indem wir:

1. Zwei Netzwerk-Namespaces erstellen, die zwei Container repräsentieren.

2. Jeder Namespace hat eine IP-Adresse, die mit dem Container verknüpft ist.

3. Die Namespaces haben Zugang zur Bridge.

4. Die Bridge hat Zugang zum physischen Host.

5. Der Host hat Zugang zum selben Netzwerk.

Diese Konfiguration ist der Grund für das Vorhandensein von Container Networking Interfaces, die den Prozess automatisieren, wenn ein Pod gestartet wird, eine IP-Adresse erhält und Zugang zum ausgehenden Host-Netzwerk und zur Kommunikation nach außen erhält.

## **Kubernetes Networking**

Kubernetes, auch als k8s bezeichnet, ist ein Open-Source-Tool, das die Orchestrierung von containerbasierten Workloads über heterogene Infrastrukturen ermöglicht.

In dieser virtuellen Umgebung haben wir bereits Zugriff auf die drei Knoten im Kubernetes-Cluster und alle erforderlichen Befehle, um das Netzwerk zu untersuchen.

_kubectl get nodes_

Jedem Knoten ist ein Block von IP-Adressen zugewiesen, aus dem er Pods und Dienste zuweisen kann. Jeder Knoten ist einem /24-Netzwerk oder 254 verwendbaren IP-Adressen zugewiesen, deren Schnittstellen wir auch durch den Befehl sehen können:

_ip a_

### **Intra- und Inter-Pod-Netzwerke**

Erstellen eines einzelnen Pods mit zwei Containern, indem Sie das folgende YAML anwenden.

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

Dieser Pod wird unserem aktuellen Host zugewiesen, sodass wir ihn von innerhalb und außerhalb seines Netzwerk-Namespace inspizieren können.

Alle Kubernetes-Cluster verfügen über einen lokalen DNS-Dienst, der über eine IP im Service CIDR verfügbar ist und in jeden Container geladen wird.

Überprüfen Sie nun den neu erstellten Pod und ermitteln Sie die IP-Adresse des Nameservers:

_kubectl get pod example-pod-2 -o wide_

Es werden drei Suchdomänen sowie die IP-Adresse des Nameservers aufgeführt. Unsere Suchdomäne, insbesondere default.svc.cluster.local, folgt dem Format <<namespace>>.svc.cluster.local.

In diesem Beispiel haben wir die erste Suchdomäne genutzt und die mit diesem FQDN verknüpfte IP-Adresse ermittelt.

Beim Aufrufen dieser IP-Adresse wird IPTables die Anfrage abfangen und den Datenverkehr auf die verfügbaren Pods verteilen.

Um zu sehen, welche Schnittstellen jeder Container hat:

_kubectl exec example-pod-1 -c container-one – ip a_

_kubectl exec example-pod-1 -c container-two – ip a_

Um einige der Regeln anzuzeigen, verwenden Sie:

_Iptables -L –table nat | grep “example-pod-1”_

Mit zunehmender Anzahl von Pods wird jeder zusätzliche Pod mit einer abnehmenden Wahrscheinlichkeit zur Kette hinzugefügt.

Mit dem Kubernetes Control Plane und den Node-Komponent

en kann der Datenverkehr innerhalb unseres Clusters jetzt robust und automatisch gemacht werden.