import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const setUser = useSetRecoilState(userAtom)
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid ?? '',
        email: user.email ?? '',
        photoURL: user.photoURL ?? '',
        displayName: user.displayName ?? '',
      })
    }
    setInitialized(true)
  })
  if (!initialized) {
    return null
  }
  return <>{children}</>
}
