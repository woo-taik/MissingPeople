import { COLLECTION } from '@/constants'
import { auth, store } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useGoogleSignin() {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(auth, provider)
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTION.USER), user.uid),
      )
      if (userSnapshot.exists()) {
        navigate('/')
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
        }
        await setDoc(
          doc(collection(store, COLLECTION.USER), user.uid),
          새로운유저,
        )
        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          return
        }
      }
      throw new Error('Google Signin Error')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [navigate])
  return { signin, signout }
}
