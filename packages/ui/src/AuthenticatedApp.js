import React from 'react'
import Amplify from 'aws-amplify'
import {
  withAuthenticator,
  Loading,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  SignUp,
  // ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  Greetings
} from 'aws-amplify-react'
import '@aws-amplify/ui/dist/style.css'
import stackOutputs from './stack-outputs.json'

const {
  REACT_APP_API_SERVER = stackOutputs.ApiEndpoint
} = process.env

async function fetchAndSetUsers({ setUsers }) {
  const fetchUsersResponse = await fetch(`${REACT_APP_API_SERVER}/users`)
  const users = await fetchUsersResponse.json()
  setUsers(users)
}

function AuthenticatedApp() {
  const [users, setUsers] = React.useState(null)
  React.useEffect(() => {
    fetchAndSetUsers({ setUsers })
  }, [])

  return <div className="AuthenticatedApp">
    <ul>
      {users && users.Items.map(user => <li key={user.id}>{user.id}</li>)}
    </ul>
  </div>
}

Amplify.configure({
  Auth: {
    // region: process.env.region,
    identityPoolId: stackOutputs.CognitoIdentityPoolId,
    userPoolId: stackOutputs.CognitoUserPoolId,
    userPoolWebClientId: stackOutputs.CognitoUserPoolClientId,
  },
})

// We're auto-confirming via the Lambda Function;
// Hack to skip the ConfirmSignUp view
function ConfirmSignUpRedirectToSignIn({ authState, onStateChange }) {
  React.useEffect(() => {
    if (authState === 'confirmSignUp') onStateChange('signIn', {})
  }, [authState, onStateChange])

  return null
}

const signUpConfig = {
  hideAllDefaults: true,
  hiddenDefaults: ['phone_number'],
}

const federated = {
  // google_client_id: 'abc123abc123abc123abc123',
  // facebook_app_id: 'abc123abc123abc123abc123',
  // amazon_client_id: 'abc123abc123abc123abc123',
}

export default withAuthenticator(AuthenticatedApp, {
  usernameAttributes: 'email',
  signUpConfig,
  includeGreetings: true,
  hideDefault: true,
  authenticatorComponents: [
    <SignIn federated={federated} />,
    <ConfirmSignIn />,
    <VerifyContact />,
    <SignUp signUpConfig={signUpConfig} />,
    <ConfirmSignUpRedirectToSignIn override="ConfirmSignUp" />,
    <ForgotPassword />,
    <RequireNewPassword />,
    <Loading />,
    <Greetings />
  ],
})