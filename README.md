# Hello SI DevOps

This project demonstrates a simple Node.js application integrated with DevOps practices, including containerization, CI/CD pipelines, and infrastructure as code.

## Features

- **Node.js Application**: A basic Express.js app.
- **Docker**: Containerized application.
- **Terraform**: Infrastructure as code for AWS.
- **Kubernetes**: Deployment and service configuration.
- **Monitoring**: Prometheus and Grafana setup.
- **CI/CD**: GitLab CI/CD and Jenkins pipelines.

## Getting Started

### Prerequisites

- Docker
- Node.js
- Kubernetes cluster
- Terraform

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd hello-si-devops
   ```

3. Install dependencies:
   ```bash
   cd app && npm install
   ```

### Running Locally

1. Start the application:

   ```bash
   npm start
   ```

2. Access the application at `http://localhost:3000`.

### Running Tests

```bash
npm test
```

### Deploying to Kubernetes

1. Build the Docker image:

   ```bash
   docker build -t hello-si-devops:latest .
   ```

2. Kubernetes Deployment:
   Apply Kubernetes configurations:

   ```bash
   kubectl apply -f k8s/
   ```

   Check pods and services:

   ```bash
   kubectl get pods
   kubectl get svc
   ```

### Infrastructure Setup

1. Initialize Terraform:

   ```bash
   terraform init
   ```

2. Apply the configuration:
   ```bash
   terraform apply
   ```

### CI/CD

- **GitLab**: On push, `.gitlab-ci.yml` will build, test, and deploy automatically.
- **Jenkins**: Use the `Jenkinsfile` for Jenkins-based automation.

#### Jenkins with ngrok

If you are running Jenkins locally and want to trigger builds from GitHub (webhooks), you can use [ngrok](https://ngrok.com/) to expose your Jenkins server to the internet:

1. Start ngrok to forward port 8080:

   ```bash
   ngrok http 8080
   ```

2. Copy the HTTPS forwarding URL shown by ngrok (e.g., `https://xxxx-47-250-175-104.ngrok-free.app`).

3. In your GitHub repository, go to **Settings > Webhooks** and set the **Payload URL** to:

   ```
   https://xxx-446-2580-175-104.ngrok-free.app/github-webhook/
   ```

4. Now, GitHub can reach your Jenkins server for webhook events, and builds will be triggered on push.

### Monitoring with Prometheus and Grafana

- Prometheus and Grafana are set up via Helm values in `k8s/monitoring/`.
- After deployment, access Grafana to view dashboards and monitor your app.

#### Deploy Monitoring Stack

1. **Install Prometheus and Grafana using Helm:**
   ```sh
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   helm install monitoring prometheus-community/kube-prometheus-stack \
     --namespace monitoring --create-namespace \
     -f k8s/monitoring/prometheus-grafana-helm-values.yaml
   ```

2. **Apply the service for metrics scraping:**
   ```sh
   kubectl apply -f k8s/monitoring/service-metrics.yaml
   ```

#### Access Prometheus

- Port-forward Prometheus:
  ```sh
  kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090
  ```
- Open [http://localhost:9090](http://localhost:9090) in your browser

#### Access Grafana

- Port-forward Grafana:
  ```sh
  kubectl port-forward -n monitoring svc/monitoring-grafana 3001:80
  ```
- Open [http://localhost:3001](http://localhost:3001) in your browser.
- **Login:**  
  Username: `admin`  
  Password: `admin` (or as set in your Helm values)

#### Visualize Your App Metrics

- In Prometheus, search for `http_requests_total` to see your app’s metrics.
- In Grafana, create a new dashboard and add a panel with the query `http_requests_total` to visualize HTTP request metrics.

#### Troubleshooting

- Ensure your Node.js service is running and exposes `/metrics` on port 3000.
- The Kubernetes service `hello-si-devops` must expose port 3000 and match your deployment’s selector.
- Check Prometheus targets at [http://localhost:9090/targets](http://localhost:9090/targets) for `nodejs-app` status.
