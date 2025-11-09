# Techify   

Techify is a simple ecommerce  web application based on MERN stack.

![image](https://github.com/user-attachments/assets/ef5ce598-8200-4279-8d1b-4fba37e7ff87)

# Techify Mega Project End to End Implementation
![image](https://private-user-images.githubusercontent.com/141355805/511778054-099dd53c-2aac-4691-98ed-a3bab7972fc7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI2ODQ2NDUsIm5iZiI6MTc2MjY4NDM0NSwicGF0aCI6Ii8xNDEzNTU4MDUvNTExNzc4MDU0LTA5OWRkNTNjLTJhYWMtNDY5MS05OGVkLWEzYmFiNzk3MmZjNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTA5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEwOVQxMDMyMjVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02OTdhMTM5NmJhMmMwOGEwMzk3N2RhM2JlMDgzNTczMGI1NDVkNmZjMzkyMjQ3NWU2Yjg1MzRmNDFjMzM1ZTdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.C6FoHS-rCwhkkAsPm1rr5LHGjDohIu09aCykGGOGMc0)

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

![image](https://private-user-images.githubusercontent.com/141355805/511789054-8c151c57-ca16-4a67-bbe3-d57a2f00f279.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI2ODcwMjIsIm5iZiI6MTc2MjY4NjcyMiwicGF0aCI6Ii8xNDEzNTU4MDUvNTExNzg5MDU0LThjMTUxYzU3LWNhMTYtNGE2Ny1iYmUzLWQ1N2EyZjAwZjI3OS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTA5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEwOVQxMTEyMDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01MTE5MjliZGNmODBiOGI4MWZjZTdlNDlhNjQwNjE5ODNkYTlkNjVhZTFlZDNkM2FhMGY1NWMwYzFlYzA0MWZlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.YC7DJZODXyyPcNSonNDl22ZLrtTfniuVKHA6ejfNy_4)

- CD pipeline to update the image tags

![image](https://github.com/user-attachments/assets/46e889db-c147-4bc7-ad7b-a12a01cebf84)
-

> Below table helps you to navigate to the particular tool installation section fast.

|Tech stack Setup|
|:------ |
| [Jenkins](#Jenkins) |
|[ArgoCd](#ArgoCd)|
|[OWASP](#OWASP)|
|[SonarQube](#SonarQube)|
|[Kubeseal](#Kubeseal)|


----
## Jenkins

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
![image](https://private-user-images.githubusercontent.com/141355805/511853119-ae7b7a4a-ff11-4e91-a34e-b0432b3bfda9.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjI3MTM1MTYsIm5iZiI6MTc2MjcxMzIxNiwicGF0aCI6Ii8xNDEzNTU4MDUvNTExODUzMTE5LWFlN2I3YTRhLWZmMTEtNGU5MS1hMzRlLWIwNDMyYjNiZmRhOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTA5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEwOVQxODMzMzZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yY2NhZmY1MmIwNWEzNTg0ODk2ZGFmZjZiMjRjYjc5OWFjZTk3NDViNTQ3YTYzNDYzZTdlMWMwYjkzZjUyOTEyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.EgbvN7BZc-RlnsHLOiakdNSj1-mkiP01vA1XIVNdedc)

![image](https://github.com/user-attachments/assets/ce5ab877-95ac-4c33-bf99-248060f16382)

### Step 4 : Get the Initial Admin Password
```bash
kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 -d && echo
```
Username: `admin`

Password: (the decoded value above)

Login via the browser.

## OWASP

## SonarQube    

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



