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

-GitLab: On push, .gitlab-ci.yml will build, test, and deploy automatically.
-Jenkins: Use the Jenkinsfile for Jenkins-based automation.

### Monitoring

-Prometheus and Grafana are set up via Helm values in k8s/monitoring/.
-After deployment, access Grafana to view dashboards and monitor your app.
