### Configarations

cd web
Add following keys to src/config.js

- S3
  - REGION
- apiGateway
  - REGION
  - URL
- clientId : cognito pool client ID

### How to deploy

- `cd web`
- `npm install`
- (Doesnt work on Mac) run locally with `HTTPS=true npm start`
- First time: Build the infrastructure
  - Change bucket name in package.json at TWO locations
  - `npm run provision`
- `npm run deploy`
