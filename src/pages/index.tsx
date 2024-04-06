import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Skeleton from '@shared/Skeleton'
import { useRecoilState } from 'recoil'
import { userAtom } from '@/store/atom/user'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {
  const { data } = useSession()
  const [user, setUser] = useRecoilState(userAtom)
  useEffect(() => {
    if (data?.user) {
      setUser({
        email: data?.user?.email as string,
        displayName: data?.user?.name as string,
        photoURL: data?.user?.image as string,
      })
    }
  }, [data?.user])
  console.log(user)

  return <div></div>
}
