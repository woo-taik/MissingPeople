import { User } from '@/model/user'
import { atom } from 'recoil'

export const userAtom = atom<User | null>({
  key: 'auth/user',
  default: {
    uid: '',
    email: '',
    photoURL: '',
    displayName: '',
  },
})
