'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '../../actions'

function LoginButton (): JSX.Element {
  const { pending } = useFormStatus()
  return (
    <button aria-disabled={pending}>Login</button>
  )
}

export default function Login (): JSX.Element {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <div className="p-3">
      <h1 className="display-6 mb-3">Login</h1>
        <form action={dispatch}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="Email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" placeholder="Password" type="password" />
          </div>
          <LoginButton />
        </form>
        <div>
          {(errorMessage !== null) && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
    </div>
  )
};
