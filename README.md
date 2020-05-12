# Serverless FullStack starter

<p align="center">
  <img src="https://raw.githubusercontent.com/wizeline/serverless-fullstack/master/wizeline-amplify-serverless-banner.png" alt="wizeline, serverless, and amplify banner">
</p>

Get started developing applications quickly with best practices using Serverless on AWS.

## Pre-requisites

* [AWS CLI](https://docs.aws.amazon.com/polly/latest/dg/setup-aws-cli.html)
* Node.js
* Git
* GitHub Account

## Getting started

Clone the repository `git clone https://github.com/wizeline/serverless-fullstack` and replace all instances of "myapp" with the name of your application.

Add `myapp_dev`, `myapp_staging`, and `myapp_prod` profiles to `~/.aws/credentials` (replacing `myapp` with the name of your application). It's recommended that each developer has their own account, and for staging and prod profiles to exist in separate accounts.

Coming soon: setup script to automate this.

## Features

### UI

The UI was bootstrapped with Create React App and modified to include an Auth flow using AWS Amplify and Cognito.

Static website hosting is provided by AWS Ampify, backed by S3 and CloudFront.

### Auth

User authentication is provided by AWS Cognito.

Social sign-in coming soon.

### REST API

A Node.js Express API running on Lambda and API Gateway allows for a familiar developer experience while leveraging the benefits of Serverless.

### Database

DynamoDB is capable of scaling to meet any requirements you may have.

### Continuous Deployment (CI/CD)

GitHub Actions is used to create a Continuous Deployment Pipeline from developer preview, to staging, to production. Each environment is deployed to an isolated AWS Account (optionally, these can be deployed to the same account for simplicity).

Changes are automatically versioned with Semantic Versioning based on git commit messages and immutable release packages created as GitHub relesaes.

### Pull Request Previews

Each PR gets its own stack deployed so that reviewers can see the results for themselves, and end-to-end tests can be run.

### Infrastructure as Code

Serverless Framework is used to describe our infrastruture

### And more...

* CloudWatch Alarms
* Per-function IAM Roles
* REST API Logs in JSON
* Custom Domain Names
* .env support
* Pruning of old Lambda Function Versions
* Lambda Functions optimized with Webpack
  
## GitHub Actions Continuous Deployments (CI/CD)

<p align="center">
  <img src="https://raw.githubusercontent.com/wizeline/serverless-fullstack/master/serverless-fullstack-github-actions-cd.png" alt="serverless-fullstack github actions continous deployment flow diagram">
</p>

## Manual/developer deployments

Make a copy of the `example.env.development` file:

```shell
cp example.env.development .env.development
```

Modify the values in your `.env.development` file. If you're using a shared developer account, you should set `SERVERLESS_SERVICE_SUFFIX=-brett`, ensuring the value you specify is unique and not used by other developers on your team.

Run `npm run deploy:dev` to deploy to your dev account.

To deploy to staging and production manually, you can run `npm run deploy:staging` or `npm run deploy:prod` respectively.

## Developing

After deploying to your developer AWS account, run `npm run start:ui` to run your UI locally against your AWS resources in the cloud.

If you want to run your API locally also, you can run `npm run start:api` and `npm run start:ui:offline` separately.

## Customization

### Remove auto-verification

By default, Cognito forces users to verify their email address, but this kit comes with auto-verification of new users to reduce onboarding friction. If you want to remove this and require users to verify their accounts, perform the following:

1. Inside of `serverless.yaml`, remove the `cognitoAutoConfirmUser` function, the `CognitoAutoConfirmUserLambdaCognitoPermission` resource, and the `PreSignUp: !GetAtt CognitoAutoConfirmUserLambdaFunction.Arn` line.
2. Remove the `ConfirmSignUpRedirectToSignIn`function from `packages/ui/src/AuthenticatedApp.js`, and replace `<ConfirmSignUpRedirectToSignIn override="ConfirmSignUp" />,` with `<ConfirmSignup />`.
3. Delete `packages/api/functions/auto-confirm-user.js`

## TODO:
- [ ] Improve setup experience (primarily, replace myapp with custom name)
- [ ] Custom domains
- [ ] CloudFormation rollback triggers
- [ ] Enable stack termination protection on prod and staging
- [ ] Add [lumigo-cli](https://www.npmjs.com/package/lumigo-cli), especially for tuning
- [ ] Split stacks to mitigate chance of hitting CloudFormation 200 resource limit
- [ ] Split secrets.AWS_ACCESS_KEY_ID and secrets.AWS_SECRET_ACCESS_KEY in GitHub Action Workflows into _DEV, _STAGING, and _PROD.
- [ ] Additional unit/integration tests
- [ ] End-to-end tests (with Cypress?)
- [ ] Make it easy to disable this for open-source projects where you don't want to allow people to create resources in your AWS account. 🔒
