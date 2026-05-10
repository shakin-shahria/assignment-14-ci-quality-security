# Assignment 14: Improving Quality, Security & Performance in CI/CD Pipelines

## Project Overview
This repository contains a minimal Node.js sample application with pipeline automation for:
- Unit testing with Jest
- Code quality checks with ESLint
- Security scanning with Trivy
- Load testing with k6
- Policy-as-code validation with Open Policy Agent (OPA)
- Secrets management via CI environment variables

## Files Added
- `src/app.js` - simple math and response helper module
- `src/server.js` - Express API server reading `API_KEY` from env
- `tests/app.test.js` - unit tests for app helper functions
- `tests/server.test.js` - endpoint tests using SuperTest
- `Dockerfile` - container build definition
- `.github/workflows/ci.yml` - CI pipeline with tests, linting, Docker build, Trivy scanning, and OPA validation
- `sonar-project.properties` - SonarScanner configuration
- `load-test/load-test.js` - basic k6 load test script
- `policy/deny-latest-tag.rego` - OPA policy forbidding `latest` Docker tags
- `policy/input.json` - sample OPA input
- `.env.example` - environment variable examples

## Tools Used
- Node.js / npm
- Jest
- ESLint
- SuperTest
- Docker
- Trivy
- k6
- Open Policy Agent
- GitHub Actions
- SonarScanner / SonarCloud

## Steps Performed
1. Initialized a Node.js project and added source code under `src/`.
2. Created unit tests for `src/app.js` and endpoint tests for `src/server.js`.
3. Added `npm test` and `npm run lint` scripts, plus `npm run loadtest`.
4. Configured GitHub Actions pipeline in `.github/workflows/ci.yml`:
   - checkout code
   - set up Node.js
   - install dependencies
   - run unit tests
   - run ESLint
   - build Docker image
   - run Trivy filesystem and image scans
   - validate OPA policy
   - run SonarCloud scan if `SONAR_TOKEN` is provided
5. Added `sonar-project.properties` for code quality analysis.
6. Created a `Dockerfile` to support image scanning and secure deployment.
7. Added `load-test/load-test.js` to simulate 60 virtual users for 30 seconds.
8. Added OPA policy to disallow `latest` Docker image tags.
9. Removed hardcoded secrets from the application and used `process.env.API_KEY`.

## How to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables from `.env.example` or manually:
   ```bash
   export API_KEY=example-api-key
   export PORT=3000
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Run unit tests:
   ```bash
   npm test
   ```
5. Run ESLint:
   ```bash
   npm run lint
   ```
6. Run load test (requires k6 installed):
   ```bash
   npm run loadtest
   ```
7. Run OPA policy validation:
   ```bash
   curl -L -o opa https://openpolicyagent.org/downloads/latest/opa_darwin_amd64
   chmod +x opa
   ./opa eval --input policy/input.json --data policy/deny-latest-tag.rego "data.docker.tag_allowed == true"
   ```

## Secrets Management
The app no longer contains hardcoded secrets. `API_KEY` is loaded from environment variables. In CI, set `API_KEY` and `SONAR_TOKEN` as repository secrets.

## Key Learnings
- CI pipelines should verify code quality and security before deployment.
- Unit tests and endpoint tests catch regressions early.
- Load testing helps verify response time and failure rate under traffic.
- Security scanning detects vulnerabilities in application files and container images.
- Policy as code enforces standards like banning `latest` Docker tags.
