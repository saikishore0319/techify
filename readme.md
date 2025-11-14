# Techify   

Techify is a simple ecommerce  web application based on MERN stack.

![image](https://github.com/user-attachments/assets/ef5ce598-8200-4279-8d1b-4fba37e7ff87)

# Techify Mega Project End to End Implementation
![image](https://github.com/user-attachments/assets/0315fa2d-6615-4c1e-b5a1-2b226701a8a5)


![image](https://github.com/user-attachments/assets/46b13b95-92b5-4855-bdb2-85c6e47b065a)
## Tech Stack used in the project

- MERN(React, Express js, Node js, Mongo DB)
- Github (Store Code)
- Docker (Containerization)
- Jenkins (CI)
- OWASP (Dependency Check)
- SonarQube (Code Quality)
- Trivy (File System Scan)
- ArgoCD (CD)
- Kubernetes (Orcastrate)
- Kubeseal (Encrypt Env Variables)

## How pipeline will look after deployemnt
- CI pipeline to build and push

![image](https://github.com/user-attachments/assets/548cb6e1-44b9-43df-9dd0-c733825b35a3)

- CD pipeline to update the image tags

![image](https://github.com/user-attachments/assets/46e889db-c147-4bc7-ad7b-a12a01cebf84)

- ArgoCD application for deployment on Kubernetes

![image](https://github.com/user-attachments/assets/02d783ad-4cd8-4e11-a06a-90b376a7883d)

---

> Below table helps you to navigate to the particular tool installation section fast.

|Tech stack Setup|
|:------ |
| [Jenkins](#Jenkins) |
| [Github](#Github) |
|[ArgoCd](#ArgoCd)|
|[OWASP](#OWASP)|
|[SonarQube](#SonarQube)|
|[Trivy ](#Trivy )|
|[Kubeseal](#Kubeseal)|


----
## Jenkins
- Install and configure Jenkins
```bash
sudo apt update -y
sudo apt install fontconfig openjdk-17-jre -y

sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
  
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
  
sudo apt-get update -y
sudo apt-get install jenkins -y
```
- Now, access Jenkins Master on the browser on port 8080 and configure it.

- Go to Jenkins Master and click on Manage **Jenkins --> Plugins --> Available**

- plugins install the below plugins:
 
  - OWASP

  - SonarQube Scanner

  -  Docker

  -  Pipeline: Stage View
## Github

### Configure a webhook :
![image](https://github.com/user-attachments/assets/33708582-3921-42bf-9776-a148fffa894f)

### Generate a PAT :
![image](https://github.com/user-attachments/assets/9099d973-a449-4769-a667-434f42816ef8)

### Add the generated PAT in jenkins credentials :
![image](https://github.com/user-attachments/assets/fa31f82b-2940-4a09-bb01-8f46f5bf09d7)

## ArgoCd
### Step 1 : Create Namespace for Argo CD
By convention, Argo CD runs in its own namespace called `argocd`.
``` bash
kubectl create namespace argocd 
```
### Step 2 : Install Argo CD
Use the official installation manifest:
```bash
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

```
Wait for all pods to be ready:
```bash
kubectl get pods -n argocd -w
```
You should see:

![image](https://github.com/user-attachments/assets/1330d72a-2c2e-4be5-85ba-f788afefac2a)

### Step 3 : Expose the Argo CD Server (UI Access)
For local testing, use port-forwarding:
```bash
kubectl port-forward svc/argocd-server -n argocd 9000:443
```
Now open your browser and go to:
```
https://localhost:9000
```
![image](https://github.com/user-attachments/assets/85cc862f-e5f0-42be-99d1-df7878578c93)

![image](https://github.com/user-attachments/assets/ce5ab877-95ac-4c33-bf99-248060f16382)

### Step 4 : Get the Initial Admin Password
```bash
kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 -d && echo
```
Username: `admin`

Password: (the decoded value above)

Login via the browser.

Use it to log in to the UI once.
Then immediately change the password in the UI:

>User icon (top right) → “Change Password” → set your new admin password.

### Step 5 : Log in from CLI (with your new password)
``` bash
argocd login localhost:9000 --username admin --password <your-new-password> --insecure
```
This links your local `argocd` CLI to the UI/API running on port 9000.

### Step 6 : Add Your Cluster (In-Cluster Setup for Kind)
```bash
argocd cluster add kind-kind-techify-cluster --in-cluster
```
**Confirm :**
```bash
argocd cluster list
```
**Output should show :**
```bash
https://kubernetes.default.svc  kind-kind-techify-cluster  1.31  Successful
```
### Step 7 : Create the Application
In the UI:

**Applications → NEW APP**

Fill:

- App name: techify

- Project: default

- Sync Policy: Manual (you can switch to Auto later)

- Repository URL: your GitHub repo

- Path: k8s

- Cluster: https://kubernetes.default.svc

- Namespace: techify

Click **Create** → then Sync once to deploy.

In the App view:

**App Details → Sync Policy → Enable Auto-Sync**

Now Argo CD will automatically sync every time you ``git push``.

## OWASP
- Configure OWASP, move to **Manage Jenkins --> Plugins --> Available plugins** 

- After OWASP plugin is installed, Now move to **Manage jenkins --> Tools**

![image](https://github.com/user-attachments/assets/ea388f11-f3db-467e-99aa-f7625cd88edc)

## SonarQube    
- Install and run SonarQube 
```bash
docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community
```
### Step 1 : Generate a SonarQube token
Top right → My Account → Security → Generate Token

![image](https://github.com/user-attachments/assets/88e312e1-7e73-4660-9bad-fe0d45ca9547)

### Step 2 : Add the token inside jenkins
Manage Jenkins → Credentials → Add Credential

Type: Secret Text

ID: sonar-token

Secret: < your token >

![image](https://github.com/user-attachments/assets/fa31f82b-2940-4a09-bb01-8f46f5bf09d7)

### Step 3 : Add SonarQube Server in Jenkins

Manage Jenkins → Configure System
Scroll to SonarQube Servers → Add:

Name: sonar-server

Server URL: < Your server url >

![image](https://github.com/user-attachments/assets/afad97d0-95c7-4abe-888e-ee1ff8937737)

### Step 4 : Configure webhook

![image](https://github.com/user-attachments/assets/e451cd24-7069-40c6-ab7a-f7f26800de24)

## Trivy 
- Install Trivy
```bash
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update -y
sudo apt-get install trivy -y
```
## Kubeseal 
kubeseal works with a Sealed Secrets controller running inside your cluster.

- You create a normal Kubernetes Secret (locally).
- `kubeseal` encrypts it using the cluster’s public key.
- You commit the encrypted “SealedSecret” to Git.
- When applied to the cluster, the controller decrypts it back into a normal Secret — but only inside that specific cluster.

So even if your Git repo is public, the secret stays safe because it can only be decrypted by your cluster’s private key.

### Step 1 : Install kubeseal and Sealed Secrets Controlle
**Install the controller in the cluster:**
```bash
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.27.1/controller.yaml
```
**Check it :**
``` bash
kubectl get pods -n kube-system | grep sealed-secrets
```
**You should see :**

![image](https://github.com/user-attachments/assets/808921bb-1806-4475-8465-d14a062ee225)

**Install CLI locally :**
```bash
sudo wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.27.1/kubeseal-linux-amd64 -O /usr/local/bin/kubeseal
sudo chmod +x /usr/local/bin/kubeseal
```

### Step 2 : Create Namespace (if not present)
**Your app’s namespace must exist before the secret can be decrypted :**
```bash
kubectl create namespace techify --dry-run=client -o yaml | kubectl apply -f -
```

### Step 3 : Generate a Plain Kubernetes Secret Locally
```bash
kubectl create secret generic techify-env \
  --from-literal=PORT=4000 \
  --from-literal=MONOGODB_URI=... \
  --from-literal=CLOUDINARY_API_KEY=... \
  --from-literal=CLOUDINARY_SECRET_API_KEY=... \
  --from-literal=CLOUDINARY_NAME=... \
  --from-literal=JWT_SECRET=... \
  --from-literal=ADMIN_EMAIL=... \
  --from-literal=ADMIN_PASSWORD=... \
  --from-literal=STRIPE_SECRET_KEY=... \
  --from-literal=RAZORPAY_KEY_ID=... \
  --from-literal=RAZORPAY_KEY_SECRET=... \
  -n techify \
  --dry-run=client -o yaml > secret.yaml
```
That creates a `secret.yaml` with base64-encoded values.

### Step 4 : Encrypt It Using kubeseal
```bash
kubeseal \
  --controller-name=sealed-secrets-controller \
  --controller-namespace=kube-system \
  --format yaml < secret.yaml > sealedsecret.yaml
```



