\---  
description: 'Measure Twice, Cut Once- Dive into Network Foundations Workshop'  
pubDate: 'Apr 21, 2023'  
heroImage: '501f905a-89dd-4824-b5e4-c6a1a012f49e_nf-hooks.png?auto=compress,format'  
author: 'Syntia'  
categories: 'workshops, cloud infrastructure, networking, barebone'  
subcategories: 'communication protocols, tranmission control protocol, open system interconnection model, internet protocol, network layer, network interface, virtual network'  
\---  

In this year KubeCon + CloudNativeCon Europe 2023 had more than 10000 members from which 58% has their first time in this global cloud-native conference.

In my second year of diving into cloud-native ecosystem I realised that the knowledge about Networking enables us not only to use the stack in is the distributed computing and communicate Kubernetes, but also increase the awareness of how data transfer between applications is crucial for understanding their performance, security and efficiency.

While I have been relearning some of the concepts back from the Networking days at university, I started documenting the process to share the references and acknowledge the community that our open-source cloud ecosystem is built on- contributors and maintainers!

Thanks to the Marino Wijay and Jason Skrzypek, platform engineers and advocates at [Solo.io](//Solo.io) for their presentation at a fast pace in KubeCon 2023!

#### **Workshop structure:**

1.  Quick intro to Networking Basics
    
2.  Get to the Gateway
    
3.  It’s not DNS, it can’t be DNS, it was DNS
    
4.  I’m not a teapot- Understanding HTTP Codes and Layer 7
    
5.  Firewalls, Load-balancing, Proxies
    
6.  Container Networking through Networking Namespaces
    
7.  Kubernetes and Networking
    

## **Quick intro to Networking Basics**

OSI Model is a structure that allows us to understand how the data moves around a network and Kubernetes Networking:

![](https://images.prismic.io/syntia/a49d7a3e-b18e-446c-9088-e8ada4f8cc06_screenshot-2023-04-21-at-14.16.01.jpeg?auto=compress,format)

OSI Model has been defined by layers to describe the networking:

Physical layer is associated with the physical connection between devices (Switches/Routers) x86 + ARM virtualization. 

Kubernetes maps to the lower layers in the infrastructure that provides the compute infrastructure and basis of the Networking interface.

Other components such as container networking interface, CNI such as Cilium, Calico, Weave, Antrea when working across different clusters and move packets quickly. SDN (VPC, VXLAN)

On the top level Istio service mesh provides connectivity, security and observability at higher layers. It can provide certain attributes to the workloads and how it communicates, and make policy decisions based on it.

### **Why is networking so complicated?**

Distributed networking can get complicated across regions and public clouds, the reasoning behind is a sophistication built in it that provides a functionality.

Whether you are dealing with laptops. Servers, IOT devices, virtual machines, or containers you will need to access some remote resource at some point in time. Regardless of your role, it is likely that you will be obstructed by the network for many reasons:

*   You might be unauthorized to access this service
    
*   The server might be too busy to handle your request
    
*   You might be using an unsupported protocol
    
*   The server might have changed IP addresses
    
*   The server might only be available on certain networks
    
*   The server might be exposed exclusively to ipv6
    

It is important to appreciate each of these obstacles as a layer that, when understood and implemented correctly, provides the user with a robust and reliable experience with a knowledge of how this technology is organized and few tools to configure it.

### **Atomic Elements of Networking Path The Way to Kubernetes**

Two main networking models today are **OSI model** and the **TCP/IP** model. The purpose of these models is to logically separate the domains of networking implementation. Each layer represents a different type of concern that needs to be addressed to provide a complete solution. The layers for the OSI and the TCP/IP models correlates:

**Network and Network Access** layers, that form Data Link and Physical Layer in OSI networking model, are responsible for communication between two devices on the same network over a physical connection.

**The Internet layer** allows for the transmission of data across multiple networks to connect source and destination.

**The Transport layer** accounts for errors in transmission, sequencing, and connection handling along the routes defined in the Networking.

**Application layer**, that is also Presentation and Session layers in OSI model, exposes interfaces to the end-user that provide data centric programmability.

This workshop will focus primarily on TCP/IP model.

In this first example let us attempt to access the public httpbin service using the following command:

_curl_ [http://httpbin.org/get](http://httpbin.org/get)

With this command to communicate with [http://httpbin.org](http://httpbin.org) at the path _/get_ with a protocol _http_

More about the Curl tool usage: [https://curl.se/docs/manual.html](https://curl.se/docs/manual.html) 

By introspecting the traffic in the output of this command we receive the basic information about the request such as the additional headers and body: 

{

  “args”: {}, 

  “headers”: {

    “Accept”: “text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.7”, 

    “Accept-Language”: “en-GB,en-US;q=0.9,en;q=0.8”, 

    “Host”: “httpbin.org”, 

    “Upgrade-Insecure-Requests”: “1”, 

    “User-Agent”: “Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_15\_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36”, 

    “X-Amzn-Trace-Id”: “Root=1-64413693-4fe14fa0120baf871b50cb39”

  }, 

  “origin”: “109.40.243.50”, 

  “url”: “[http://httpbin.org/get&#8221](http://httpbin.org/get&#8221);

}

But there is more information about the Networking that is not visible at this level.

**Layer 1:Data**

The unit for the first application layer is the data itself. We could have added a different headers, a payload, or a query to the path, but for this example request data simply is:

Get /get HTTP/1.1

Host: [httbin.org](//httbin.org)

User-Agent: curl/7.68.0

Accept: _/_

**Layer 2:Segment**

In the transport layer we encode the source and the destination ports, the ability to break down and track larger requests, as well as some basic error detection into a unit called the **_segment_**. You may note that we have not specified any ports, because the http protocol assumes a destination port of 80 unless otherwise unspecified.

Source Port: 48296

Destination Port: 80

Sequence Number: 613255907

Checksum: 0x621e

**Layer 3:Packet**

Descending deeper _curl_ must now leverage the internet layer to determine how to navigate from source to destination. This information is encoded into a unit called the **_packet_**.

This layer describes information such as:

*   Source and destination IPs
    
*   Time To Live (TTL)
    
*   Which protocol is being leveraged among TCP, UDP or ICMP
    

Source IP: 192.16.9.133

Destination IP: 54.208.105.16

TTL: 64

Protocol: TCP

The simplicity of the original curl request does not present any of this information to the user. In order to determine the IP address of the host [httpbin.org](//httpbin.org) a process called **_DNS resolution_** is leveraged. 

**Layer 4:Frame**

The lowest network access layer we leverage the information about the physical world to our message. The unit at this level is referred to as the **_frame_**_._ Whereas all of the previous layers encode dynamic information, this unit has static and persistent information, in particular the **Media Access Control (MAC)** addresses of the source and destination. These MAC addresses are unique addresses that are permanently associated with the physical device communicating with the network.

Along with the destination and source MAC addresses, some other information stored in this unit are the **_Ethertype_** and the **_802.1Q tag_.** IEEE 802.1Q, often referred to as Dot1q, is the networking standard that supports virtual local area networking (VLANs) on an IEEE 802.3 Ethernet network. The Ethertype indicates the internet protocol being used either IPv4 or IPv6 and the optional 802.1Q tag adds the ability to separate networks virtually.

Frame unit:

Source Mac: 9C:85:DD:53:83:56

Destination MACL BF:D0:11:08:F8:42

EtherType: IPv4

**View PDUs with dcpdump**

_tcpdump_ is the most expressive of all of the commands we have seen. As you may gather from the name, _tcpdump_ “dumps” the information from every tcp packet.

Invoking _tcpdump_ without any arguments will stream the tcp information to stdout perpetually. 

Some of the standard _tcpdump_ command flags are:

*   _\-v_: Verbose output
    
*   _\-x_ num: Close after {num} packets
    
*   _\-i if_: Read only the {if} interface
    
*   _\-A_: Write the ACII version of the packet
    
*   _\-nn_: Do not resolve hostname or port
    
*   _\-e_: Print the MAC addresses for each protocol
    
*   _\-D_: List all network interfaces available to capture
    

To observe the original curl request we will run the following command in the background on a loop without any output:

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

We can see:

*   The Frame
    
    *   MAC address of our interface _42:02:0a:84:00:91_
        
    *   MAC address of the gateway _42:01:0a:84:00:01_
        
    *   ethertype _IPv4_
        
*   The Packet
    
    *   source IP _10.5.1.132_
        
    *   destination IP _54.144.44.152_
        
    *   time to live _179_
        
    *   internet layer protocol TCP
        
*   The Segment
    
    *   source port _54768_
        
    *   destination port _80_
        
    *   sequence number _1684126669_
        
    *   checksum _0x9879_
        
*   The Data
    
    *   method _Get_
        
    *   path _/get_
        
    *   application layer protocol _HTTP/1.1_
        
    *   header information _Host: …, User-Agent:…,Accept:…_
        

While we filtered for the _src/dst_ of _httpbin_ and _port_ _80_, it is possible to filter on many datapoints provided. Refer to this [link](https://www.tcpdump.org/manpages/pcap-filter.7.html) for the full list, Some of the common filters are:

*   _src|dst_ – the hostname or ip address of the source or destination
    
*   _port|port-range_ – the port or range of ports associated with target
    
*   _less|greater_ – the length of request
    
*   _proto_ – the protocol being leveraged
    
*   _net_ – the range of ip addresses
    
*   _tcp\[x\]_ – the value of the element of the tcp array at index x
    

You can also combine these with operators as we have done. The operators are: _and_, _or_, _not_, _=_, _<_ and _\>_.

Capturing TCP packets and analyzing the network traffic is possible with additional tooling provided by [wireshark](https://www.wireshark.org/docs/wsdg_html_chunked/) or [tshark](https://www.wireshark.org/docs/man-pages/tshark.html).

Remember to cleanup the background process with _pkill bash_.

**Other commonly used tools**

There are other tools to determine networking information besides _curl._ One of the commands on linux to help exploring it manually is _ip_. Let’s analyze the output of: 

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

Each IP in this list is assigned to _network interface card (NIC)_ and it can either be a physical device like _ens4_ or a virtual device like _lo_. You may also notice that there is other info presented besides IP.

On the second line of NIC you will find the MAC address of each device right after the _link/\*_

 _link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00_

and

 _link/ether 52:54:00:43:84:6c brd ff:ff:ff:ff:ff:ff_

We can see the status of the interface as well as the status of the physical network attached to it. In _eth0_ that is portrayed by _up_ and _lower\_up_ respectively

_2: eth0: <broadcast,multicast,up,lower\_up> mtu 1500 qdisc pfifo\_fast state UP qlen 1000_

Any communication using the _eth0_ interface would identify with the physical address _52:54:00:43:84:6c_ and _the_ virtual address _192.168.122.236_.

**“dhclient” Command**

The physical address is static and predefined, but where did the IP address come from? The IP address of devices is often set dynamically with **DHCP** or the **Dynamic Host Configuration Protocol**. _DHCP_ allows a device to request to be identified on a network from an IP authority or group of authorities on the same physical network. 

If successful, DHCP will allocate:

*   a unique IP address (valid in your local network)
    
*   a period of time in which that claim is valid
    
*   and the IP address of our _gateway_
    

We use the _dhclient_ CLI to interact with our DHCP server:

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

…you can see the interface env0 has made a DHCP request and received _192.168.1.5_ from _192.168.1.1_ for _40109_ more seconds.

While _192.168.1.5_ or any of the other IP addresses we have seen thus far may seem arbitrary, there is a pattern. Common patterns you will see in the form:

*   10._._.\*
    
*   172._._.\*
    
*   192.168._._ (our address)
    

We owe these patterns to [RFC-1918](https://www.ietf.org/rfc/rfc1918.txt). These blocks of addresses were designed to account for the limits in IPv4 addresses and are consistently used across local and cloud networks.

**“route” Command**

The _gateway_ allows us to extend beyond our local network area network (LAN) and attempt to reach [httpbin.org](//httpbin.org). All traffic that is intended for a non-local network must exit through the gateway. To enforce this behavior, we will use routes and the _route_ command.

Install and run the route command:

_apt install net-tools -y_

_route_

_Kernel IP routing table_

_Destination Gateway Genmask Flags MSS Window Irtt Iface_

_192.168.10.0 \* 255.255.255.0 U 40 0 0 0 eth0_

_127.0.0.0 \* 255.0.0.0 U 40 0 0 0 lo_

_default 192.168.10.1 0.0.0.0 UG 40 0 0 0 0 eth0_

_default \_gateway 0.0.0.0 UG 40 0 0 0 0 eth0_

Identifying the host with: _host \_gateway_

The default setting is to redirect network requests to the gateway, which has the address similar to _192.168.10.0_ using the interface named _eth0_. Using the route command we could establish routes with multiple interfaces, or across separate networks. If at this point we knew the IP address of [httpbin.org](//httpbin.org), we could even create a route specific to this traffic.

**“dig” & “nslookup” Commands**

When we need to determine the IP addresses associated with [httpbin.org](//httpbin.org) we must query DNS. 

_dig_ [httpbin.org](//httpbin.org) or _nslookup_ [httpbin.org](//httpbin.org)

This command will send a request that after some number of DNS hops, will provide a destination IP address or addresses of [httpbin.org](//httpbin.org).

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

Command _dig_ has additional tabular data that is relevant when exploring the DNS in greater detail. In both examples we can see that [httpbin.org](//httpbin.org) refers to 4 separate IP addresses:

*   _34.235.32.249_
    
*   _54.224.48.41_
    
*   _54.144.44.152_
    
*   _3.230.204.70_
    

**“ping” Command**

Now that we have the address of our destination service, we should identify if it is active. In many situations DNS records may be outdated or inaccurate. The simplest way to check the status of an IP address is the _ping_ utility. It will send _Internet Control Message Protocol (ICMP)_ traffic to a designated address, and display whether or not the traffic is fully transmitted. Due to network limitations we won’t be able to successfully complete the connection. 

_ping -c 1_ [httpbin.org](//httpbin.org)

_PING_ [httpbin.org](//httpbin.org) _(34.235.32.249): 56 data bytes_

_—_ [httpbin.org](//httpbin.org) _ping statistics —_

_1 packets transmitted, 0 packets received, 100.0% packet loss_

Whereas the request to a host [solo.io](//solo.io) with the same number of echo requests, as indicated by the Count variable to be sent (and received):

_ping -c 5_ [solo.io](//solo.io)

_PING_ [solo.io](//solo.io) _(23.185.0.4): 56 data bytes_

_64 bytes from 23.185.0.4: icmp\_seq=0 ttl=53 time=39.137 ms_

_64 bytes from 23.185.0.4: icmp\_seq=1 ttl=53 time=44.414 ms_

_64 bytes from 23.185.0.4: icmp\_seq=2 ttl=53 time=49.566 ms_

_64 bytes from 23.185.0.4: icmp\_seq=3 ttl=53 time=33.963 ms_

_64 bytes from 23.185.0.4: icmp\_seq=4 ttl=53 time=34.818 ms_

_—_ [solo.io](//solo.io) _ping statistics —_

_5 packets transmitted, 5 packets received, 0.0% packet loss_

In secured environments ping is often restricted to ICMP that generates a false negative.

**“netcat” Command**

netstat or nc will not have the same limitations as ping. With this tool you can establish a TCP connection based protocol connection or query UDP connectionless protocol, as long as you provide a service name and a designated port.

For instance, command _netcat -t_ [httpbin.org](//httpbin.org) _80 -v -w 3_

*   _\-t: flag to try this command using TCP_
    
*   _\-v: provide us with verbose output_
    
*   _\-w wait for 3 seconds before timing out_
    

_nc -t_ [httpbin.org](//httpbin.org) _80 -v -w 3_

_Connection to_ [httpbin.org](//httpbin.org) _port 80 \[tcp/http\] succeeded!_

Netcat can be also used to send request data, or scan a range of ports:

_nc -zvn 127.0.0.1 20-23_

_nc: connectx to 127.0.0.1 port 20 (tcp) failed: Connection refused_

_nc: connectx to 127.0.0.1 port 21 (tcp) failed: Connection refused_

_nc: connectx to 127.0.0.1 port 22 (tcp) failed: Connection refused_

_nc: connectx to 127.0.0.1 port 23 (tcp) failed: Connection refused_

To explore port scanning in greater detail check out [nmap](https://nmap.org/) or [masscan](https://github.com/robertdavidgraham/masscan).

**“traceroute” Command**

The shortest distance between two points may be a straight line, but the internet is seldom connected directly between two points. Traffic must travel through the gateway to reach anything on the public internet. How many hoops in total should the request from our local sandbox to [httpbin.org](//httpbin.org) actually take?

_apt install traceroute -y_

_traceroute_ [httpbin.org](//httpbin.org)

We can identify each of the returned IP addresses as dns servers using the _dig_ command.

_dig -x 99.83.89.102 | grep dns;_

_traceroute_ often doesn’t return the response, but it helps answer the question: “What path exists between me and this host?”

**“netstat” Command**

_netstat_ gathers network statistics for your current machine. To gather active connections and active sockets run _netstat._ Flags _\-r_ gather route information, _\-ie_ interface info.

### **Digging into IP subnetting, routing, layer 3, GBP, and labs!**

#### **How network traffic works?**

When traffic is intended for an IP network that is not directly connected to the host, the traffic will need to go through a router which will forward the traffic on to another network segment closer to the target destination. Most client devices have the default gateway defined, that is the router used to get traffic off the local directly attached network. Routers know how to direct network traffic onwards based on routing tables that are populated by routing protocols.

Every single endpoint of your device has a MAC address that identifies the local area network of who owns the device. However, MAC addresses are never used to communicate directly. 

In analogy to your name (the MAC address) and for the contact info you’re having a phone number, email, or some other form of communication- contact details used to be stored in the contact list, and your MAC address has an associated IP address and a DNS host name.

Routed protocols such as IP live at Layer 3 of the OSI Model. 

**How devices communicate over a network?** Layer 2 MACs and Layer 3 Sub

Each device/endpoint/VM/container/server which has the network access through its locally attached interface has a physical address known as **MAC (or Media Access Control)**. Each one is unique and the address itself is only bound to one endpoint (which can be manipulated).

A MAC address looks like this _00-B0-D0-63-C1-23_.

Also each endpoint’s MAC address is assigned by the vendor who developed this endpoint. Vendors usually own the first 6 characters of a MAC so it’s easy to identify who created this endpoint.

A Router has multiple interfaces with each one having its own unique MAC address. A VM or network namespace, or container has a MAC address as well.

A bridge is a multi-access device allowing for MAC addresses to find each other. A physical switch with 4/8/16/24/48 Ethernet ports is like a bridge. A VXLAN is a logical switch that provides the same function for multiple VMs.

But bridges/switches aren’t very smart routing beyond electrical signals through various MACs. This is why IP addresses are important. Each IP is assigned to each endpoint’s MAC address. With IPs it’s easy to group them logically and route to them.

An IP lives in a subnet, and multiple IPs can talk to each id they are in the same subnet.

Examples of a subnet:

_192.168.52.0/24_

_172.13.37.4/30_

_10.20.0.0./16_

In each subnet there is a broadcast address, and a network address both of which cannot be assigned. So, with a subnet like _192.168.52.0/24 (or 255.255.255.0)_ there are 254 usable IP addresses. How is this possible? In a subnet mask, there are 32 bits of binary representation. _/24 or 255.255.255.0 is 11111111.11111111.11111111.00000000_ The 24x1s are network-bits, and 8x0s are host bits.The first three octets are indicative of a network address, an address that tells how to get to more specific IPs.

In this subnet usually an IP is allocated to a Router so it can know about this directly connected network while also being able to connect to other networks. This is also how the Router goes about trading information with other routers.

In fact, two (or more) routers can be in the same IP subnet (a transit) and among these routers, they will trade information about the networks they know about, either through static configuration or dynamic.

## **Router/Gateway**

Router is a network device that connects two or more networks or subnets and forwards packets between different networks. Routing visualized below between two subnets requiring access to each other through a router:

![](https://images.prismic.io/syntia/95c89ec5-febc-4671-b66d-430b708a3232_screenshot-2023-04-20-at-20.13.49.png?auto=compress,format)

In order to communicate from Local Area Network (LAN) to the remote, we don’t need to deploy static routes, but use a **Dynamic Host Configuration Protocol** (DHCL), a dynamic routing protocol. Power of DHCL protocol is easier management of IP addresses- in a network without DHCP you must manually assign unique IP addresses to each client. 

DHCP allows hosts to obtain required TCP/IP configuration information from a DHCP server.

#### **Configure routing**

Installing net-tools to run some local network commands:

_apt-install net-tools -y_

Enable and check your local routing table:

_sysctl -w net.ipv4.ip\_forward=1 netstat -nr_

_route_

You can see that there are a few types of routes available: local-attached and default route which is a default gateway. The locally-attached route is showing that the host is connected to the network it’s on. The default route is a route used to get to anywhere using a hop-point.

You can capture the IP of the default interface and use an IP in that subnet to “create a new static route”

_ip addr_

With a command _ip addr,_ at the time of writing, the IP of eth0 was _192.168.122.236/24._ Now, if it has _/32_ address which means it’s the only usable IP in this subnet and only address- is often used in isolated networks to singular hosts such as VPNs setup.

_eth0IP=$(/sbin/ip -o -4 addr list eth0 | awk ‘{print $4}’ | cut -d/ -fl)_

_echo $eth0IP_

Now we can take this variable and use it in our routing command (add or delete) and inject into a routing table:

_ip route add 10.13.37.0/24 via $eth0IP_

_Route_

#### **Create and connect two network namespaces on different subnets, over veth interfaces.**

Let’s use the following configuration to create two different logical subnets in the 10.13.37.0/24 subnet. We’ll create two network namespaces, assign them interfaces, and IP addresses in two different subnets.

Two network namespaces will simulate a virtual namespace. The linux veth devices are virtual Ethernet devices that act as tunnels between network namespaces to create a bridge to a physical network device in another namespace, but can also be used as standalone network devices. veth devices are always created in interconnected pairs.

# create two network namespaces

_ip netns add sleep && ip netns add webapp_

# simulate a virtual namespace

_ip link add sleepif type veth peer name webappif_

# for each virtual network assign a subnet address

_ip link set sleeping netns sleep_

_ip link set webappif netns webapp_

 # assign interfaces to a network

_ip -n sleep addr add 10.13.37.0/25 dev sleepif_ 

_ip -n webapp addr add 10.13.37.128/25 dev webappif_

# bring a network interface up online

_ip -n sleep link set sleepif up_

_ip -n webapp link set webappif up_

_\#_ accept the loopback interface routing the traffic through

_ip -n sleep link set lo up_

_ip -n webapp slink set lo up_

# check the newly created namespaces

_ip netns_

# ping each network from another

_ip netns exec sleep ping -c6 10.13.37.128_

\# ping: connect: Network is unreachable

_ip netns exec webapp ping -c6 10.13.37.128_

\# ping: connect: Network is unreachable

# add static routes

_ip -n sleep route add 10.13.37.128/25 dev sleepif_

_ip -n webapp route add 10.13.37.128/25 dev webappif_

# verify the newly added routes

_ip netns exec sleep route_

_ip netns exec webapp route_

\# now we’re having a routes associated

# communicate between these networks

_ip netns exec sleep ping -c6 10.13.37.128_

_ip netns exec webapp ping -c6 10.13.37.128_

Now we have established routing between two networks. Imagine having to do it for hundreds or millions of networks! This is why protocols like BGP and OSPF exist.

The same applies on Kubernetes container networking. When we’re running many pods on Kubernetes cluster, static routing cannot be done so easily. Tools like Cilium CNI provides, secures and observes network connectivity between container workloads, and provision IP addresses for the pods at scale.

BGP uses TCP port 179 to form neighbor relationships and communicate with other routers. Misconfiguration of BGP contributes to lack of DNS making websites unavailable.

## **It’s not DNS, it can’t be DNS, it was DNS**

Imagine if you had to remember every single phone number. That wouldn’t end up well if you’re calling the wrong number by mistake. Similar to establishing DNS connectivity, having a ‘phonebook’ is essential. By accessing the web with  [httpbin.org](//httpbin.org) address, it has to be translated into an IP address. DNS or Domain Name System, effectively translates an IP to a human-readable name.

There are various roles in a DNS request that have to return values. These are various types of DNS objects. In cloud-native environments we often use cloud provided DNS service for creating new DNS records.

### **What is a DNS Server?**

DNS servers provide the direct response to DNS resolutions to endpoints. Typically on a host you will specify a DNS Server address (which normally might be picked up by DHCP), which needs to be IP reachable either locally via Layer 2 or via Layer 3 routing. If the DNS Server is reachable, it will resolve hostnames to allow your host to find its way to its destination.

DNS Servers listens for requests on UDP Port 53 (it also associates with Route53 DNS service name by AWS), and it is important if you have a firewall that allows or blocks traffic on certain ports.

DNS operates at Layer 7 of the OSI model (Transport layer).

### **DNS Resolution**

**Recursive DNS Resolver:** The immediate entity of PC/Server/Host/Endpoint will query to resolve the hostname. Usually responses may be cached for frequently queried endpoints or hostnames. This cached information is usually stored in a database and will age out over time once these records become stable, or not frequently queried.

**Root Name Server**: The Root Name Server is the next stop in the DNS resolution flow, as it’s responsible for pointing the Resolver towards the Top-Level-Domain Server based on the extension of that domain like _.io, .ca, .org, .com._ The Internet Corporation for Assigned Names and Numbers (ICANN) oversees these Root Name Servers.

**Top Level Domain Server**: TLDs house information for all domain names that share the same TLD extension such as .io, .ca, .com. The TLD Server has information for websites that end in a particular extension. The TLD will respond to the Resolver with a domain name and the Authoritative Name Server for that domain.

**Authoritative Name Server** is the Resolver’s last stop. It usually will contain and respond with the appropriate A/AAAA record or CNAME record and IP information, at which the host originating the request has the IP and can route traffic towards it.

**DNS A, AAAA, PTR record types**

Each DNS Server has a database of records that return values of various types. A value is return based on the record type being called on. The common record types are:

*   **A Record**: This record translates a hostname to an IPv4 address
    
*   **AAAA Record**: This record is the same as A Record but for IPv6 addresses (e.g. with multiple load balancer IPs, or geo-located)
    
*   **CNAME Record**: This record type translates one name to one other name
    
*   **MX Record**: This record ties ownership of domain name to e-mail servers
    
*   **PTR Record**: This record translates an IP address to a hostname, the reverse-lookup, or opposite of A-record
    
*   **SRV Record**: this record is meant for services for a host and port combination which allows for access to specific applications on their IP and port.
    
*   **TXT Record**: a record to store text-based notes
    

List of DNS record types: [https://en.wikipedia.org/wiki/List\_of\_DNS\_record\_types](https://en.wikipedia.org/wiki/List_of_DNS_record_types) 

Fully Qualified Domain Names or FQDNs are the complete subdomain, domain, and top-level domain which is directed to a particular resource or set of resources.

For example, [www.httpbin.org](//www.httpbin.org), where _www_ is the subdomain, _httpbin_ is the domain and _.org_ is the top level domain. We are directed to the main webpage when requesting [www.httpbin.org](//www.httpbin.org). There are various use-cases to it such as providing strict security using Transport-layer security (or TLS), which needs a fully qualified domain-name to add into the certificate data.

In a kubernetes cluster there will be an FQDN generated for each pods and service in the following format: _( pod-name | service-name ).( namespace ).svc.( cluster-domain )_

**CoreDNS** is Kubernetes DNS Resolver- it is used as a name service, or service discovery mechanism for all services. Every object knows about the other objects using CoreDNS, for instance, by running a container workload inside of a construct known as a pod, and it needs to communicate with something else, the entry is created automatically becoming a reference inside of the cluster.

Records are created and deleted automatically, because Kubernetes Control Plane communicates with CoreDNS and updates it.

## **HTTP Basics and use the Curl utility to interact with HTTP enabled applications**

HTTP Layer 7 becomes relevant not only to determine the availability of the application, but also when working with service meshes and interacting with services. 

There is a structure- you send a message to the server with operations such as HTTP request Methods. Policy development goes beyond the service mesh, providing authorization mechanisms e.g. with OAuth to guarantee security and policies for the use of HTTP methods.

### **HTTP methods**

**GET** **Method** is used with HTTP to request and read data from a server resource. These requests can be cached and stay in the browser history. GET shouldn’t be used to deal with sensitive data. The GET method does not let you modify the resources.

**POST** **Method** is used to update or create a resource by sending specific data to a server.

**PUT Method** also is a method for updating resources but replaces the existing content with something else.

**HEAD Method**, similar to GET method sends a request but receives a response without the body.

**DELETE** **Method** allows to delete resources that are specified.

**PATCH Method** allows to specify partial updates to a resource.

### **Status codes**

**Status codes** allow us to better understand what happens after an HTTP request has been made.

*   **1xx** – Provides informational responses
    
*   **2xx** – Successful responses provide meaningful data, known that the request successfully made it to the server
    
*   **3xx** – Redirection messages, when successful a redirection message is provided
    
*   **4xx** – Client error responses, when something is wrong at the client side, like a browser, connection issue, or non-authorization
    
*   **5xx** – Server error responses
    

Common HTTP status codes: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

**HTTP/1** was one of the first protocols that allowed us to communicate on the internet, and **HTTP/2** has been enhancement of the HTTP/1.1 introducing the TLS Transport-Layer-Security, SSL Secure Sockets Layer, the most important protocols for the network communication security. HTTP runs over TCP Transmission Control Protocol is client-server connection oriented whereas UDP User Datagram Protocol enables the transfer of data before an agreement is provided by the receiving party.

![](https://images.prismic.io/syntia/c3a7989e-d476-4156-bd56-6e32c6c1a8fb_screenshot-2023-04-21-at-01.24.18.png?auto=compress,format)

## **Firewalls, Loadbalancers, Proxies**

In this module we will: demonstrate _iptables_; _ipvs_; justify the use of proxies such as Envoy.

Firewalls are instrumental in enforcing the security across the given network. Firewall can be physical or virtual, but mainly controls what traffic is accepted or rejected in some form.

### **_iptables_**

Iptables, a prevalent Linux firewall, has been around for nearly a quarter of a century, and is still leveraged by some of the largest software projects around today. There is a successor in _iftables_ to improve the performance, but it isn’t as commonly available.

_iptables_ is a set of tables outlining rules for associated ip addresses and ports.

There are five tables in fact:

*   **filter**: the default table used to accept, reject, or drop traffic
    
*   **net**: used to do network address translation for sources and destinations
    
*   **mangle**: used to mark or reconfigure some components of the message for later use
    
*   **raw**: used to circumvent some of the standard network flow
    
*   **security**: used to strictly enforce security with components such as SELinux
    

Within each table are a series of chains that may be user defined, but the default chains are:

*   _PREROUTING_
    
*   _INPUT_
    
*   _FORWARD_
    
*   _OUTPUT_
    
*   _POSTROUTING_
    

The following schematic shows packet flows through Linux networking:

![](https://images.prismic.io/syntia/501f905a-89dd-4824-b5e4-c6a1a012f49e_nf-hooks.png?auto=compress,format)

Netfilter hooks, ref: [](https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks)[https://wiki.nftables.org/wiki-nftables/index.php/Netfilter\_hooks](https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks)

With just the ability to add chains to tables and rules to chains, programs and users can control traffic with a high degree of configurability. Let’s explore a program _docker._

_apt-get update && apt-get install_ [docker.io](//docker.io) _-y_

With docker installed we can list all of the rules for any table:

_iptables -t filter -L -n -v_

**Docker** is controlling the IP address generation and assignment. When we add more containers with the following command, we will see he additional rules required to forward traffic to them:

#RUN FROM SOURCE

_for i in {8001..8003}; do docker run –restart always -d -p $i:5678 hash iptables -t nat -L -n_

On the nat table we can see additional walls created for these containers: lower three are correlating with the applications just created. With _iptables_ we have an ability to direct or reject traffic as necessary. 

#RUN FROM DESTINATION

_curl networking-foundations-src:8001_

_curl networking-foundations-src:8002_

_curl networking-foundations-src:8003_

We can reject the tcp traffic destined for prot 5678 on this host by replacing the first rule in the DOCKER-USER chain:

#RUN FROM SOURCE

iptables -R DOCKER-USER 1 -p tcp —dport 5678 -j REJECT

Running again the previous set of curl commands again should produce different output.

#Failed to connect to networking-foundation

Here is the rough outline of how traffic is parsed by _iptables_:

*   the traffic enters the PREROUTING chain
    
*   matches the only rule, which redirects to the DOCKER chain
    
*   which will match one of the DNAT rules, converting the ip and destination port accordingly
    
*   traffic then enters the FORWARD chain
    
*   matches the second rule, which redirects to the DOCKER-USER chain
    
*   and finally matches the only rule in this chain, which rejects any traffic destined for _5689_ with _tcp_
    

We can confirm this behavior by auditing _iptables_– enabling tracing and sending a request:

#RUN FROM SOURCE

_iptables -t raw -A PREROUTING -s networking-foundations-dst -j TRACE_

_xtables-monitor -t_

Alternatively, we could create rules that accept specific traffic, return to a previous chain, drop the traffic, or even redirect to a subsequent chain.

### **Loadbalancers**

_iptables_ overlap the functionality between **loadbalancers** and firewalls, because you can interact the route between these services, and control the way they are routed.

There are many reasons why the traffic intended for a single destination might need to be distributed over multiple workloads.

*   reduce resource
    
    *   Requirements for single instances
        
*   improve performance
    
*   account for intermittent outages
    
*   test and compare the behavior of different configurations
    

The same as with the firewalls there are many solutions both physical and virtual. Some loadbalancing can be done with iptables configuration that distribute traffic on port 8004 across all three containers, but the traffic is not as even as the rules suggest. 

For more control over how traffic is distributed to separate instances we will need to leverage **IP Virtual Server** or **ipvs**.

Ipvs uses some of the same kernel technology as iptables (netfilter), but is specifically designed for traffic distribution and can be more performant. We can distribute traffic with **ipvs** following the methods below:

*   round robin (second iptables example)
    
*   weighted round robin
    
*   least-connection
    
*   weighted least-connection
    
*   locally-based least-connection
    
*   locally-based least-connection with replication
    
*   destination-hashing
    
*   source-hashing
    

Make sure to delete iptables rules with _iptables -t nat -D_ flag, so we don’t create overlapping rules conflicting one with another.

#RUN FROM SOURCE

_iptables -t nat -D PREROUTING 1_

_iptables -t nat -D PREROUTING 1_

_iptables -t nat -D PREROUTING 1_

Install ipvs utilities with: 

#RUN FROM SOURCE

_apt-get install ipvsadm -y_

We can recreate our iptables round robin rule with following command:

_#RUN FROM SOURCE_

_export ip=$(hostname -I | awk ‘{print #1}’)_

_echo “_

_\-A -t $ip:8000 -s rr_

_\-a -t $ip:8000 -r 172.17.0.2:5678 -m_

_\-a -t $ip:8000 -r 172.17.0.3:5678 -m_

_\-a -t $ip:8000 -r 172.17.0.4:5678 -m_

_” | ipvsadm -R_

_Ipvsadm_

Instead of chains and tables, we create a service and apply configuration and destinations to it. Running this command should report an even distribution of endpoints:

_for i in {1..100}; do curl -s networking-foundations-src:8000; done | sort | uniq -c_

_33 8001_

_33 8002_

_34 8003_

Now each one of the containers corresponds to each one of the ports.

Let’s clear the service and try another distribution algorithm.

_#RUN FROM SOURCE_

_Ipvsadm –clear_

_echo “_

_\-A -t $ip:8005 -s wic_

_\-a -t $ip:8005 -r 172.17.0.2:5678 -m -w 1_

_\-a -t $ip:8005 -r 172.17.0.3:5678 -m -w 1_

_\-a -t $ip:8005 -r 172.17.0.4:5678 -m -w 98_

_” | ipvsadm -R_

_Ipvsadm_

\# Most of the traffic will be routed to the fourth container.

_for i in {1..100}; do curl -s networking-foundations-src:8005; done | sort | uniq -c_

_1 8001_

_1 8002_

_98 8003_

With “weighted least connection” traffic is sent to the instance currently holding the least connections, but with a preference to those instances with higher numerical weights.

It is worth noting that in addition to the distribution algorithms, that **_ipvs_** also supports the following methods of forwarding:

*   direct routing (–gatewaying)
    
*   tunneling (–ipip)
    
*   and nat (–masquerading)
    

_ipvs_ definitely has more to offer than loadbalancing domain than _iptables_ did, but it too has limits. Between these two tools there is no way to make decisions on every protocol that may be leveraged within a network.

### **_proxy_**

Modern applications often come with custom or niche demands that can’t be met by standard linux tools. This evolving set of demands is the foundation of a **_proxy_**.

A network proxy is some entity that receives and distributes the traffic on behalf of a client. Proxies leverage the capabilities we’ve mentioned along with several more for the use cases:

*   relaying different geolocation data than the original request
    
*   Anonymize source or destination information
    
*   in front of inbound or outbound traffic set firewall rules, authorization, authorization
    
*   encrypt and/or generally protect sensitive information
    
*   increasing the resilience
    
*   optimizing traffic flow
    
*   providing observability
    

Most traffic will probably travel through proxy at some point. Instead of common standards like iptables and ipvs, it is more common to consider the available tools as an ecosystem.

Specific proxies will suit certain use cases better than others.

If you’d like to explore some of the most popular options recommended:

*   [envoy](https://www.envoyproxy.io/) the backbone of Istio
    
*   [haroxy](https://www.haproxy.com/) the component of the RedHat OpenShift solution
    
*   [nginx](https://www.nginx.com/) one common solution for exposing traffic in Kubernetes
    

Proxies are powerful in the domain of network transformation, security, and general optimization.

## **Container Networking through Networking Namespaces**

**Containers** are isolated processes that run on a single operating system. Much like virtualization, containers will consume CPU, Memory, and Disk space, but require significantly less to run, as they are dedicated to a single function or a process. Any time a container is created a full operating system isn’t required.

A network doesn’t have to be created for every single container manually,- docker container runtime was first to create a workflow that allows it to get access to the network instantly. Kubernetes took this to another level and provided the Container Networking Interface (CNI).

Various Kubernetes environments such as Calico and Cilium work as a CNI communicating with the Kube API Server.

Since we’ve developed a ton of networking knowledge it’s worthwhile understanding how to build a networking namespace and have processes isolated to further understand containers and the associated networking.

### **Building a Networking Namespaces that communicate with each other**

_apt install net-tools_

_ip netns add sleep && ip netns add webapp_

_ip netns_

_ip netns exec sleep ip link_

_Ip netns exec sleep arp #IP address MAC_

_\# each MAC is associated to an IP, but these endpoints in each namespace don’t know about each other. In Kubernetes each container that runs in a pod has its associated MAC address_

_ip netns exec sleep route_

The best way to get to the outside from the physical interface of a host is to use the Linux bridge functionality. Previously we did route between two subnets in a private network, but to communicate broader, these network namespaces has to be exposed to the physical interface outside. It is like assigning an IP address to a process in its own namespace, or even, assigning an IP to a container that allows for all three to communicate with addressing in the same broadcast domain and subnet.

Let’s create one bridge and then present on the host.

ip link set dev app-net-0 up

# create virtual interface namespace and end of the link that gets attached to the bridge

_ip link add veth-sleep type veth peer name veth-sleep-br_

_ip link add veth-webapp type veth peer name veth-webapp-br_

# assign interface to respected namespaces

_ip link set veth-sleep netns sleep_

_ip link set veth-webapp netns webapp_

# Assign the end of the link to the bridge

_ip link set veth-sleep-br master app-net-0_

_ip link set veth-webapp-br master app-net-0_

# assign IP addresses to the different links on each namespace

_ip -n sleep addr add 192.168.52.1/24 dev veth-sleep_

_ip -n sleep link set veth-sleep up_

_ip -n webapp addr add 192.168.52.1/24  dev veth-webapp_

_ip -n webapp link set veth-webapp up_

#assign an IP address to the bridge that will be the access point to the physical (host network)

_ip addr add_ 192.168.52.5/24 dev app-net-0

\# bring virtual side of the bridge up, network namespace has link on its namespace & bridge

_ip link set dev veth-sleep-br up_

_ip link set dev veth-webapp-br up_

_ip netns exec webapp ping 23.285.0.4_

_ip netns exec webapp route_

# network is unreachable

Let’s fix it by iptables rule that allows us to NAT the 192.168.52.0 with an IP on the host that can communicate outbound.

_iptables -t net -A POSTROUTING -s 192.168.52.0/24 -j MASQUERADE_

_ip netns exec webapp ping 23.185.0.4_

# network is unreachable

# _Add the default route_

_ip nens exec webapp route_

_ip netns exec webapp ip route add default via 192.168.52.5_

_sysctl -w net.ipv4.ip.forward=1_

_ip netns exec webapp ping 23.185.0.4_

We’re overloading the physical interface by:

1.  creating two network namespaces that represent two containers
    
2.  each namespace has IP address associated with container
    
3.  the namespaces that has access to the bridge
    
4.  the bridge has access to the physical host
    
5.  the host has access to the same network.
    

![](https://images.prismic.io/syntia/fcaaa60f-0691-4de1-8c9d-6ffeb8705a03_screenshot-2023-04-21-at-04.29.21.png?auto=compress,format)

This configuration is the reason for having Container Networking Interfaces that automates the process when pod comes up, gains IP address and access to the host networks outbound and communicate to the outside

## **Kubernetes Networking**

Kubernetes, referred to as k8s, is an open source tool that allows to orchestrate container based workloads over heterogeneous infrastructure.

In this virtual environment we already have access to the three nodes in the kubernetes cluster and all of the commands necessary to investigate the network.

_kubectl get nodes_

Each node is designated a block of IP addresses from which it can assign pods and services. Each node is assigned to /24 or 254 usable IPs., which interfaces we can also see by command

_ip a_

### **Intra and Inter Pod Networking**

Creating a single pod with two containers by applying the following yaml.

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

This pod is scheduled to our current host, so we can inspect it from inside and outside it’s network namespace.

All kubernetes clusters have a local dns service that is available through an IP in the service CIDR and loaded into every container

Now verify newly created pod and lookup the IP address of the nameserver:

_kubectl get pod example-pod-2 -o wide_

Three search domains are listed as well as IP address of the name server. Our search domain in particular default.svc.cluster.local follows the format <<namespace>>.svc.cluster.local

In this example we leveraged first search domain and determined the IP address associated with that fqdn.

Upon calling that IP address, IPTables will intercept the request and load-balance the traffic among the available pods.

To see what each container has for interfaces:

_kubectl exec example-pod-1 -c container-one – ip a_

_kubectl exec example-pod-1 -c container-two – ip a_

To see some of the rules using:

_Iptables -L –table nat | grep “example-pod-1”_

As more pods are added, each additional pod will be added to the chain with a decreasing fractional probability.

With Kubernetes Control Plane and Node Components traffic within our cluster can now be made resilient and automatic.

![](https://images.prismic.io/syntia/d60f2188-5122-4366-8d11-b2ec097ee3cd_kubernetes_architecture.png?auto=compress,format)