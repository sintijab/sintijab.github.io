\---  
description: "KubeCon 2023- Supply Chain Security in Cloud-Native Environments"   
pubDate: "Apr 29, 2023"   
heroImage: "3999c33e-70ea-4679-a7f9-4a4e126b6fa4_196476203-3e288fa7-241e-4520-aacb-8ebb9a8e442e.webp?auto=compress,format"   
author: "Syntia"   
categories: "workshops, cloud infrastructure, security, supply chain"   
subcategories: "software attestation, provenance attestation, infrastructure bill of materials, bill of materials, supply chain levels for software artifacts, software supply chain, transport layer security, secure sockets layer, encryption"   
\---  

In Supply Chain Security Chapter during KubeCon 2023 Jeremy Rickard, Ido Neeman and Grace Nguyen explained why SBOM and IBOM are equally important with cloud native infrastructure ultimately being software defined and driven, and how SBOM can be complete with a full inventory of infrastructure stack.

From the tooling and building Software and Infrastructure Bill of Materials we will go through an examples to build supply chain provision for cloud native environments.

### **Goal is to establish foundation and familiarity to software supply chain security.**

“In order to facilitate vulnerability analysis, manufacturers should identify and document components contained in the products with digital elements, including by drawing up a security bill of materials.”

_Proposal for a Regulation of the European Parliament and of the council on horizontal cybersecurity requirements for products with digital elements and amending Regulation (EU) 2019/1020_

![](https://images.prismic.io/syntia/a0ebf46d-ffff-486e-b1b9-52be68b24306_196477253-7ede9ec5-a995-4e59-aab7-8acb35dc56cf.webp?auto=compress,format)

![](https://images.prismic.io/syntia/b0ee3537-2638-47d7-bcb2-429ad3af0092_196480219-ff3ed225-65f6-401e-a58a-f8b823e69475.webp?auto=compress,format)

**Graph for Understanding Artifact Composition**

### **Framework security**

**Attestation**: signed claims (claims on network configuration, dependencies, infrastructure) 

**Provenance**: materials to artifacts and its origin

**SBOM**: (Software Bill of Materials) software bill of materials and how the software looks like

**IMOB** (Infrastructure Bill of Materials) infrastructure bill of materials and how the entire infrastructure looks like

#### **SLSA security framework to protect software and built infrastructure:**

1.Documentation of the build process (unsigned provenance)

2.Tamper resistance of the build service (Hosted source/build, signed provenance)

3.Extra resistance to specific threats (Security controls on host, non-falsifiable provenance)

4.Highest levels of confidence and trust (Two party review + hermetic build)

From slsa.dev

We can’t talk about securing the supply chain, without understanding encryption

Digital signature has to do with the asymmetric encryption whereas TLS connections has symmetric encryption.

The process of the signed signature is for the signer to encrypt the binaries w/ private key and pass the signature with the package and signature of the public key for decryption.

#### **Sigstore**

**cosign**: sign and verify software artifacts- containers, standard files, blobs

**fulcio**: root certificate authority

**rekor**: transparency logs

Generate key pair, sign with private key and verify package with a signed public key:

_cosign generate-key-pair_

_cosign sign –key cosign.key goose/demo_

_cosign verify –key cosign.pub goose/demo_ 

Fulcio is a Certificate Authority (CA) good at creating short-lived certificate co-signed and based on:

*   Certificate Request
    
*   OICD ID Token (Gmail)
    
*   Public Key
    
*   Challenge
    

#### **Rekor**

Tamper- proof log of metadata from the software supply chain

In order to verify if this package from Kubernetes 1.27.0 from registry is valid run:

_cosign verify \\_

_–certificate=identity=_[krel-trust@k8s-releng-prod.iam.gserviceaccount.com](mailto:krel-trust@k8s-releng-prod.iam.gserviceaccount.com) _\\_

_–certificate-oidc-issuer=_[https://accounts.google.com](https://accounts.google.com) _\\_

[registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _| jq ._

_Verification for registry_ [registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _.._

**The following checks were performed on each of these signatures:**

*   The cosign claims were validated
    
*   Existence of the claims in the transparency log was verified offline
    
*   The code-signing certificate was verified using trusted certificate authority certificates
    

Log index says whether certificate is valid or not when this package was signed

Crane is a tool for interacting with remote images and registries

crane digest [registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _\# has of contents_

_crane manifest_ [registry.k8s.io/kube-apiserver:sha256-89b8d9dbef2b905b7d028…](//registry.k8s.io/kube-apiserver:sha256-89b8d9dbef2b905b7d028%E2%80%A6)

Hash is a body of the package which cosign gives certificate and the signature- it gets the public key from the certificate, do the decrypting and compare it with the manifest, it saves the metadata during the process:

_“dev.cosignproject.cosign/signature”_

[https://docs.sigstore.dev/cosign/verify/](https://docs.sigstore.dev/cosign/verify/)

Because of cosign sigstore is optimised for container registry, other open-source software adoption to security-chain is in top of mind.

Sigstore for python: [https://github.com/sigstore/sigstore-python](https://github.com/sigstore/sigstore-python)

Sigstore for npm: [https://github.com/sigstore/sigstore-js](https://github.com/sigstore/sigstore-js) 

#### **In-toto**

In-toto is layout policy of verification process in two steps:

*   Record what steps were performed, by whom and in what order in Software Supply chain
    
*   Verifies assestation and its creator permissions with link metadata files evidence
    

##### **The Update Framework (TUF) Roles**

TUF is the last mile of a package distribution. It is not a matter of _if_ but _when_ your package, key or repo will be compromised to minimize the impact as much as possible. Threat model is **roles** that grant permissions to:

*   root permission to specify other roles
    
*   targets: indicate packages validity
    
*   snapshot: provide package versions
    
*   timestamp: when package was last updated
    
*   Revocation + security compared to sigstore
    

### **Misconceptions in open-source:**

#### **It’s just about the code.**

With the example of SolarWinds where the attack was targeted in the process till the consumer gets the package. More than 18,000 customers had applied their package update, which then allowed the remote access trojan to infect all their customer systems and networks.

#### **We’re probably not a good target.**

Security supply chain is relevant not only in crypto.

#### **We can probably never remove supply chain risks in our software- it’s an effort of the entire ecosystem.**

It’s a shared responsibility and conversation that we need in the community- the fact that open-source is often underfunded and maintained by overworked developers. How do we offer governance and support to help get resources that they need? To invest in SLSA supply-chain security.

### **What’s next?**

1.  Progress and new standards are being made right now
    
2.  Other components: vulnerability scanning, securing build environments, patching containers.
    

![](https://images.prismic.io/syntia/7bb9c1f3-5f2b-4d33-9abc-d7605e836577_182689788-70acefc1-6d69-4972-abbf-3e60c0d4c014.webp?auto=compress,format)

A few examples of questions provided by GUAC: [https://github.com/guacsec/guac](https://github.com/guacsec/guac)

## **Checking the Chains at the Gate: Building Supply Chain Policies**

#### **How do we enforce policies and control what’s in our cluster?**

If you’re using Kubernetes 1.26 admission policies is a better start for making policies to start building policies and apply them to your cluster.

#### **Admission controllers**

Kubernetes admission controllers are plugins that govern and enforce how the cluster is used. They can be thought of as a gatekeeper that intercept (authenticated) API requests and may change the request object or deny the request altogether. The admission control process has two phases: the _mutating_ phase is executed first, followed by the _validating_ phase.

![](https://images.prismic.io/syntia/9c0c110c-59d4-4980-b0f5-111d8941c8d4_admission-controller-phases.webp?auto=compress,format)

### **Sigstore Policy Controller**

The policy-controller admission controller can be used to enforce policy on a Kubernetes cluster based on verifiable supply-chain metadata from cosign. It also resolves the image tags to ensure the image being ran is not different from when it was admitted.

Today, a Policy Controller can automatically validate signatures and attestations on container images as well as apply policies (using cue or rego ) against attestations. Enforcement is configured on a per-namespace basis, and multiple policies are supported. More information [https://docs.sigstore.dev/policy-controller/overview/](https://docs.sigstore.dev/policy-controller/overview/) 

### **Gatekeeper**

Gatekeeper is based on Open Policy Agent. Compared to using [OPA with its sidecar kube-mgmt](https://www.openpolicyagent.org/docs/kubernetes-admission-control.html) (aka Gatekeeper v1.0), Gatekeeper introduces the following functionality:

*   An extensible, parameterized [policy library](https://open-policy-agent.github.io/gatekeeper-library/website/)
    
*   Native Kubernetes CRDs for instantiating the policy library, aka “constraints” and extending it with “constraint templates”. It shares labels schema including targets to constraint the labels for metadata.
    
*   Native Kubernetes CRDs for [mutation](https://open-policy-agent.github.io/gatekeeper/website/docs/mutation/) support
    
*   Audit functionality
    
*   External data support
    

OCI 1.1 – “Artifacts” and Referrers API contains image index e.g. amd64 index artifacts and SBOM artifact. Its subject block signature refers back to the container.

Generate SBOM with two signatures and inspect the SBOM referrers tree graph:

_crane ls_ [kubeconeu.azurecr.io/demo-app](//kubeconeu.azurecr.io/demo-app)

\# sha-d0992af7eb82…

\# sha256-8920357d77a1c..

\# sha256-8920357d77a1c…sig

\# image with two signatures, one is cosign the other is notation

_\# oras discover -o tree_ [kubeconeu.azure.io/demo-app@sha-d0992af7eb82…](mailto:kubeconeu.azure.io/demo-app@sha-d0992af7eb82%E2%80%A6)

# sbom artifact image referrers

#### **How do we write policies for these artifacts?**

**Ratify** is an external provider for Gatekeeper. A verification engine as a binary executable and on Kubernetes which enables verification of artifact security metadata and admits for deployment only those that comply with the policies you create before deploying to the cluster.

It also runs as an HTTP service. Cosign verifiers have signatures and OCI spec references where descriptor media type artifact type referrer subject type. Example:

COSIGN\_EXPERIMENTAL=1 cosign verify [kubeconeu.azure.io/demo-app@sha-d0992af7eb82…](mailto:kubeconeu.azure.io/demo-app@sha-d0992af7eb82%E2%80%A6) _–certificate-identity_ [https://github.com/jeremyrickard/kubecon-eu-demo-app/blob/main/.github/workflows/slsa-goreleaser.yml@refs/tags/v0.0.0-alpha.0](https://github.com/jeremyrickard/kubecon-eu-demo-app/blob/main/.github/workflows/slsa-goreleaser.yml@refs/tags/v0.0.0-alpha.0) _–certificate-oidc-issuer_ [https://token.actions.githubusercontent.com](https://token.actions.githubusercontent.com) 

 # verify with ratify

_~/.ratify.ratify verify -c cosign.js on -s_ [kubeconeu.azure.io/demo-app@sha-d0992af7eb82…](mailto:kubeconeu.azure.io/demo-app@sha-d0992af7eb82%E2%80%A6)

##### **Image Verification with Gatekeeper and Ratify**

External data policy, apply policies to pods to make sure they have signatures associated with them:

# run unsigned image

_kubectl run demo –image=_[webbitnetworks.asurect.io/test/notary-image:unsigned](//webbitnetworks.asurect.io/test/notary-image:unsigned)

\# error from server (Forbidden): admission hook “validation.gatekeeper.sh” denied the request:  \[ratify-constraint\] Subject failed verification: [webbitnetworks.asurect.io/test/notary-image@sha256:17490f904cf27..](mailto:webbitnetworks.asurect.io/test/notary-image@sha256:17490f904cf27..)

# Run a signed image

_kubectl run demo –image=_[kubeconeu.azurecr.io/demo-app:sha-d0992af7eb825e..](//kubeconeu.azurecr.io/demo-app:sha-d0992af7eb825e..)

\# pod/demo created

_apiVersion: constraints.gatekeeper.sh/v1beta1_

_kind: ratifyVerification_

_metadata:_ 

    _Name: ratify-constraint_

_spec:_ 

    _enforcementAction: deny_

    _match:_ 

        _Kinds:_ 

            _– apiGroups: \[“”\]_

            _– kinds: \[“Pod”\]_

        _Namespaces: \[“default”\]_

##### **Block Licenses or Packages we Know Are Vulnerable**

###### **with a custom verifier plugin**

#package-verifier.yml

_apiVersion:_ [config.ratify.deislabs.io/v1beta1](//config.ratify.deislabs.io/v1beta1)

_kind: Verifier_

_metadata:_

    _name: package-checker_

_spec:_

    _name: kubecon-demo_

    _artifactTypes: application/spdx+json_

    _parameters:_

      _disAllowedLicenses:_

        _– AGPL-3.0-or-later_

      _disAllowedPackages:_

        _– name:_ [“github.com/mitchellh/mapstructure”](//%E2%80%9Cgithub.com/mitchellh/mapstructure%E2%80%9D)

          _version: “v1.5.0”_

    _source:_

      _artifact:_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0) 

# build and publish plugin to ACR instance and register in cluster

\# the plugin consist of program written in Go that runs verifier instance accepts interface parameters for disallowed licenses and packages, that runs in a loop identifying disallowed versions, generates error message and sends it back

# build our darwin binary which uses Go on a Linux machine

_CGO\_ENABLED=0 GOOS=linux go build -o bin/package-checker ._

# run with oras similar to docker push

_oras push_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0)  _./package-checker_

_oras discover_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0) 

_oras pull_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0) 

# Creates k8s Verifier in cluster

_kubectl get pods_

\# ratify-8f8cdcfd9-sn4qc

_kubectl logs -f ratify-8f8cdcfd9-sn4qc_

_kubectl apply -f package-verifyer.yml_

# Resolves plugin manifest and download plugin

_kubectl get verifiers_

# download plugin and verify compliance in cluster

_kubectl run demo –image=_ [kubeconeu.azure.io/demo-app:sha-d0992af7eb82…](//kubeconeu.azure.io/demo-app:sha-d0992af7eb82%E2%80%A6)

### **Supporting Materials**

[https://open-policy-agent.github.io/gatekeeper/website/docs/howto](https://open-policy-agent.github.io/gatekeeper/website/docs/howto)

[https://open-policy-agent.github.io/gatekeeper/website/docs/next/externaldata](https://open-policy-agent.github.io/gatekeeper/website/docs/next/externaldata)

[https://github.com/opencontainers/image-spec/blob/main/manifest.md](https://github.com/opencontainers/image-spec/blob/main/manifest.md)

[https://github.com/deislabs/ratify/blob/main/docs/reference/dynamic-plugins.md](https://github.com/deislabs/ratify/blob/main/docs/reference/dynamic-plugins.md)

[https://zotregistry.io](https://zotregistry.io)

[https://github.com/opencontainers/image-spec/pull/1049](https://github.com/opencontainers/image-spec/pull/1049)

[https://oras.land](https://oras.land/)

[https://github.com/jeremyrickard/ratify-package-checker](https://github.com/jeremyrickard/ratify-package-checker)

## **About the dependency graph and SBOM exports in GitHub**

The dependency graph is a summary of the manifest and lock files stored in a repository and any dependencies that are submitted for the repository using the Dependency submission API (beta). [https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exporting-a-software-bill-of-materials-for-your-repository](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exporting-a-software-bill-of-materials-for-your-repository) 

For each repository, it shows:

*   Dependencies, the ecosystems and packages it depends on
    
*   Dependents, the repositories and packages that depend on it
    
*   For each dependency, you can see the license information and vulnerability severity. You can also search for a specific dependency using the search bar. Dependencies are sorted automatically by vulnerability severity.
    

You can export the current state of the dependency graph for your repository as a Software Bill of Materials (SBOM) using the industry standard SPDX format.

An SBOM is a formal, machine-readable inventory of a project’s dependencies and associated information (such as versions, package identifiers, and licenses). SBOMs help reduced supply chain risks by:

*   providing transparency about the dependencies used by your repository
    
*   allowing vulnerabilities to be identified early in the process
    
*   providing insights in the license compliance, security, or quality issues that may exist in your codebase
    
*   enabling you to better comply with various data protection standards
    

If your company provides software to the US federal government per Executive Order 14028, you will need to provide an SBOM for your product. You can also use SBOMs as part of your audit process and use them to comply with regulatory and legal requirements.

## **GUAC: Graph for Understanding Artifact Composition**

By exploring Kubernetes Containers we can find what metadata/attestations are connected to it.

Looking up the kube-controller-manager containers for v1.24.6 we can find what are the binaries and its metadata.

In this example of GUAC visual representation with sub-graph we can observe the following:

*   We can see the kubernetes container package (red) has two binaries /go-runner and /usr/local/bin/kube-controller-manager.
    
*   We can see we have a SLSA attestation (orange) for kube binary, but no attestations for the /go-runner.
    
*   We also notice that there is scorecards metadata for the kube binary, which was derived through understanding that the kube binary was built from (through SLSA) the kubernetes source repo/commit, which has a scorecard information.
    
*   We can view the scorecards information in the panel on the right.
    

Reference: [https://github.com/guacsec/guac/blob/main/SETUP.md](https://github.com/guacsec/guac/blob/main/SETUP.md) 

![](https://images.prismic.io/syntia/dbaab748-24b1-4274-a5be-b6c44455d997_182689908-477f4770-1142-4c18-8fa9-16d93dcf84b4.webp?auto=compress,format)

## **Attestation with TACOS**

**TACOS framework** is intended to play well by design with SLSA (Supply chain Levels for Software Artifacts) and GUAC (Graph for Understanding Artifact Composition) in this early design phase, and into the future. The SLSA framework provides a standardized way to attest to artifact provenance.

A TACOS attestation is a simple data structure that contains the attestation metadata and statements attesting to the open source packages’ secure software development practices.

**Attestation** is the document container with metadata about the creation of the attestation, and the statements about upstream open source libraries in use by an application or organization. It is an assertion about the status of a set of secure development software practices at a point in time.

Example with a Lifted package (a package where a maintainer has partnered with Tidelift) [https://github.com/tacosframework/examples](https://github.com/tacosframework/examples)

```markup
{
  "@context": "domain/namespace",
  "@id": "document URL",
  "signature": {"type": "sha256", "digest": "78ab8..."},
  "author": "Firstname Lastname",
  "role": "Attestor",
  "timestamp": "2022-03-23T05:35.37:00+04:00",
  "TACOSversion": "1",
  "application": "HelloWorld",
  "statements": [
    {
      "PackageName": "com.fasterxml.jackson.core:jackson-databind",
        "PackagePlatform": "maven",
        "PURL": "pkg:maven/com.fasterxml.jackson.core/jackson-databind",
      "UpstreamRepositoryURL": "https://github.com/FasterXML/jackson",
      "SPDXLicenseLatestRelease": "Apache-2.0", 
      "LatestRelease": "2.14.2",
      "ReleasesInUse": ["2.14.2, 2.14.0, 2.9.8"],
      "SBOM": [
      {
            "type": "cycloneDX",
            "version": "1.2",
            "format": "XML",
            "DigitalSignatureURL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-cycloneDX.xml.sig",
            "URL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-cycloneDX.xml"
    },
    {
            "type": "SPDX",
            "version": "2.3",
            "format": "SPDX",
            "DigitalSignatureURL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-SPDX.spdx.sig",
            "URL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-SPDX.spdx"
      }
      ],
     "PackageManager2FAEnabled": "True",
     "SourceRepo2FAEnabled": "True",
     "KnownReleasesURL":  "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind/releases-map",
      ... and so on ...    
    }
  ]
}

```

## **DaggerBoard vulnerability scanning**

**DaggerBoard** is a vulnerability scanning tool that ingests Software Bill of Material (SBOM) files (CycloneDX,SPDX) and outputs results in a readable format. This tool evaluates software dependencies outlined within the SBOM file for package vulnerabilities.

![](https://images.prismic.io/syntia/26901cca-cc7b-4367-ae6d-47d2d719c998_readme_db_diagram.webp?auto=compress,format)[https://github.com/nyph-infosec/daggerboard](https://github.com/nyph-infosec/daggerboard) 

## **Software package inspection with TERN**

**Tern** is a software package inspection tool that can create a Software Bill of Materials (SBOM) for containers. Tern is an inspection tool to find the metadata of the packages installed in a container image. The overall operation looks like this:

*   It analyzes the first layer of the container image to collect information like distro type, package format, and package managers.
    
*   It then executes scripts from the “command library” in a chroot environment to collect information about packages installed in that layer.
    
*   With that information as a starting point, it continues to analyze the subsequent layers in the container image.
    
*   Once done, it generates a report of packages with their metadata. Several formats are available. The report, in its default format, provides a layer by layer, explanation of the various software components imported. If a Dockerfile is provided, the report indicates the Dockerfile lines corresponding to each of the file system layers.
    
*   Tern gives you a deeper understanding of your container’s bill of materials so you can make better decisions about your container based infrastructure, integration and deployment strategies. It’s also a good tool if you are curious about the contents of the container images you have built.