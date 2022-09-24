import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import useAuth from '../Hooks/useAuth'

interface Input {
  email: string
  password: string
}

const login = () => {
  const { signIn, signUp, loading } = useAuth()
  const [login, setlogin] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Mercys Netflix | Login</title>
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        alt="netflox logo"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 "
      >
        <h1 className="text-4xl font-semibold text-center">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              className="input"
              type="email"
              placeholder="Email.."
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="text-red-600 font-light">
                Please Enter Valid Email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              className="input"
              type="password"
              placeholder="password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="text-red-600 font-light">Please Enter Password</p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setlogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          <p> New to NetFlix?</p>
          <button
            type="submit"
            className="text-white hover:underline  "
            onClick={() => setlogin(false)}
          >
            Signup now
          </button>
        </div>
      </form>
    </div>
  )
}

export default login
