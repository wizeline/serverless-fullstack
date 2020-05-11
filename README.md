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
  
## GitHub Actions Continuous Deployments (CI/CD)

<p align="center">
  <img src="https://raw.githubusercontent.com/wizeline/serverless-fullstack/master/serverless-fullstack-github-actions-cd.png" alt="serverless-fullstack github actions continous deployment flow diagram">
</p>

## Getting started

Replace all instances of "myapp" with the name of your application.

Add `myapp_dev` profile to `~/.aws/credentials`. Add `_staging` and `_prod` variants as necessary. It's recommended each developer to have their own account, and for staging and prod to also be deployed to separate accounts.

## Deploying

Make a copy of the `example.env.development` file:

```shell
cp example.env.development .env.development
```

Modify the values in your `.env.development` file. If you're using a shared developer account, you should set `SERVERLESS_SERVICE_SUFFIX=-brett`, ensuring the value you specify is unique and not used by other developers on your team.

Run `npm run deploy:dev` to deploy to your dev account.

To deploy to staging and production manually, you can run `npm run deploy:staging` or `npm run deploy:prod` respectively.

We'll be adding Continuous Deployment soon.

## Developing

After deploying to your developer AWS account, run `npm run start:ui` to run your UI locally against your AWS resources in the cloud.

If you want to run your API locally also, you can run `npm run start:api` and `npm run start:ui:offline` separately.

## Customization

## Remove auto-verification

This kit comes with auto-verification of new users by default to reduce onboarding friction. That is, users aren't required to verify their email address. If you want to remove this and require users to verify their accounts, perform the following:

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