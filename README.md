# Serverless Node.js FullStack starter

## Includes

* Simple React UI hosted with AWS Amplify
  * Just enough to get you started. This is mostly a blank canvas bootstrapped with Create React App and simple Auth integration with Amplify and Cognito.
* User authentication with Cognito
  * Includes auto-verification of Users to reduce friction in signup flow. See instructions below to remove this and force users to verify their email address.
* Node.js Express API running on Lambda
* DynamoDB Users table
  * Upon signing in, a user entry is created in the table if it doesn't yet exist and maps to the user in the Cognito User Pool.
* Automatic semantic versioning based on git commit messages
* Continuous Deployment with GitHub Actions
* (WIP) PR Previews
  * Each PR gets its own stack deployed so that reviewers can see the results for themselves, and end-to-end tests can be run.
  * TODO: make it easy to disable this for open-source projects where you don't want to allow people to create resources in your AWS account. 🔒

## Getting started

Replace all instances of "myapp" with the name of your application.

Add `myapp_dev` profile to `~/.aws/credentials`. Add `_staging` and `_prod` variants as necessary. It's recommended each developer to have their own account, and for staging and prod to also be deployed to separate accounts.

## Developing

After deploying to your developer AWS account, run `npm run start:api` and `npm run start:ui` separately. Everything except the UI and Lambda Functions use the actual Cloud resources running in your dev account.

## Deploying

Run `npm run deploy:dev` to deploy to your dev account. Run `npm run deploy:staging` or `npm run deploy:prod` to deploy to staging and prod respectively.

We'll be adding Continuous Deployment soon.

## Customization

## Remove auto-verification

Inside of `serverless.yaml`, remove the `cognitoAutoConfirmUser` function, the `CognitoAutoConfirmUserLambdaCognitoPermission` resource, and the `PreSignUp: !GetAtt CognitoAutoConfirmUserLambdaFunction.Arn` line. Remove `ConfirmSignUpRedirectToSignIn` from `packages/ui/src/AuthenticatedApp.js`

## TODO:
- [ ] Deploy to Amplify - currently, there's a CD disconnect since Amplify has its own CD pipeline that gets triggered on push. We need to disable Amplify CD and implement something similar to https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-console-hosting/utils/amplify-console-utils.js.
- [ ] GitHub Actions: Split PR and push to master workflows
- [ ] Dev stack suffix from .env to allow multiple devs to use a single AWS account; update GitHub Actions workflow to also use env var
- [ ] Custom domains
- [ ] CloudFormation rollback triggers
- [ ] Enable stack termination protection on prod and staging
- [ ] GitHub bot to comment on PRs with stack outputs (API and UI endpoint)