import React from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'
import { ChildCare } from '@mui/icons-material'

interface AuthProviderProps {
  children: React.ReactNode
}
interface IAuth {
  User: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}
const AuthContext = createContext<IAuth>({
  User: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setloading] = useState(false)
  const [User, setUser] = useState<User | null>(null)
  const [error, seterror] = useState<null>(null)
  const [InitialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setloading(false)
        } else {
          // Not logged in...
          setUser(null)
          setloading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setloading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user.user)
        router.push('/')
        setloading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setloading(false))
  }
  const signIn = async (email: string, password: string) => {
    setloading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user.user)
        router.push('/')
      })
      .catch((error) => alert(error.message))
      .finally(() => setloading(false))
    setloading(false)
  }

  const logout = async () => {
    setloading(true)
    signOut(auth)
      .then(() => setUser(null))
      .finally(() => setloading(false))
  }
  const memoedValue = useMemo(
    () => ({
      User,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [User, loading]
  )
  return (
    <AuthContext.Provider value={memoedValue}>
      {!InitialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
