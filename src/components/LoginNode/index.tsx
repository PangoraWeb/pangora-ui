'use client'

import { useState } from 'react'
import Input from '../Input'

export default function LoginNode() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  return (
    <div className="flex p-20 w-full gap-4 flex-col">
      <h1>Log In</h1>
      <Input type="email" label="Email or Username" isRequired />
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        label="Password"
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -2 24 24"
                width="24"
                fill="currentColor"
              >
                <path d="M9.329 11.885L2.12 19.092a1 1 0 1 1-1.414-1.414l7.324-7.324a2 2 0 0 1 2.322-2.322L17.679.706a1 1 0 0 1 1.414 1.414L11.885 9.33a2 2 0 0 1-2.556 2.556zm7.54-6.127C18.75 6.842 20 8.34 20 10c0 3.314-4.958 5.993-10 6a14.734 14.734 0 0 1-3.053-.32l1.861-1.86a4 4 0 0 0 5.011-5.011l3.05-3.051zm-4.16-1.496l-1.834 1.834a4 4 0 0 0-4.779 4.779L2.869 14.1C1.134 13.028 0 11.585 0 10c0-3.314 4.984-6.017 10-6 .914.003 1.827.094 2.709.262z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -6 24 24"
                width="24"
                fill="currentColor"
              >
                <path d="M10 12c-5.042.007-10-2.686-10-6S4.984-.017 10 0c5.016.017 10 2.686 10 6s-4.958 5.993-10 6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
              </svg>
            )}
          </button>
        }
      />
    </div>
  )
}
