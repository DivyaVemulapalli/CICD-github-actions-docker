# CI/CD Pipeline with GitHub Actions and Docker

An automated CI/CD pipeline that tests a Node.js application, builds a Docker image, validates the running container, and publishes versioned images to Docker Hub.

## Project Overview

This project demonstrates how DevOps practices automate application testing, containerization, and image publishing. GitHub Actions runs the pipeline when code is pushed to the `main` branch or a pull request targets `main`.

## Architecture

**Developer → GitHub Repository → GitHub Actions → Automated Tests → Docker Image Build → Container Validation → Docker Hub**

## Technologies Used

- **Node.js:** Runs the sample HTTP application.
- **Node.js Test Runner:** Executes automated application tests.
- **Git and GitHub:** Version control and source-code hosting.
- **GitHub Actions:** Automates the CI/CD workflow using a GitHub-hosted runner.
- **Docker:** Packages the application into a container image.
- **Docker Hub:** Stores published container images.

## Application Features

- Returns an HTTP 200 response at `/`.
- Returns an HTTP 404 response for unknown routes.
- Runs on port `3000` inside the container.
- Uses a non-root `node` user inside the Docker image.
- Uses a `.dockerignore` file to exclude unnecessary build-context files.

## CI/CD Pipeline Stages

1. **Checkout:** Retrieves the source code from GitHub.
2. **Set up Node.js:** Configures Node.js on the GitHub-hosted runner.
3. **Application validation:** Starts the application and checks its HTTP response.
4. **Automated testing:** Runs `npm test` to verify successful and invalid-route responses.
5. **Docker Hub authentication:** Logs in using GitHub Actions repository secrets.
6. **Image build:** Builds the Docker image with both `latest` and commit-specific tags.
7. **Container validation:** Runs the image and checks that the application responds over HTTP.
8. **Image publishing:** Pushes both tags to Docker Hub.

For pull requests, the workflow runs application validation and tests; Docker publishing steps are skipped.

## Docker Hub Image

Repository: https://hub.docker.com/r/b711/cicd-github-actions-docker

Pull the latest image:

```bash
docker pull b711/cicd-github-actions-docker:latest
```

Run the container:

```bash
docker run --rm -p 3000:3000 b711/cicd-github-actions-docker:latest
```

Open `http://localhost:3000` in a browser to view the application.

## Run the Application Locally

Requirements: Node.js 24 or a compatible version that supports the built-in test runner and `fetch`.

```bash
node app.js
```

In a separate terminal, run:

```bash
npm test
```

The application must be running before the tests execute.

## Security and Reliability

- Docker Hub credentials are stored as GitHub Actions secrets rather than hard-coded in the workflow.
- The container runs as a non-root user.
- A `.dockerignore` file keeps unnecessary files out of the Docker build context.
- Commit-specific image tags preserve identifiable versions alongside the `latest` tag.
- The pipeline validates the running container before publishing the image.

## Troubleshooting

- **Port already in use:** Use an available host port. The workflow maps host port `3001` to container port `3000` for container validation.
- **Docker Hub login failure:** Verify that `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are correctly configured in repository secrets. Never commit access tokens.
- **Application test failure:** Confirm the application starts successfully and returns the expected HTTP status and response body.

## Project Links

- GitHub repository: https://github.com/DivyaVemulapalli/CICD-github-actions-docker
- Docker Hub repository: https://hub.docker.com/r/b711/cicd-github-actions-docker
- GitHub Actions runs: https://github.com/DivyaVemulapalli/CICD-github-actions-docker/actions

## Conclusion

This project demonstrates an automated CI/CD workflow using GitHub Actions and Docker. The pipeline runs application tests, builds and validates a container image, and publishes versioned images to Docker Hub. It provides practical experience with version control, automated testing, container security, and CI/CD troubleshooting.