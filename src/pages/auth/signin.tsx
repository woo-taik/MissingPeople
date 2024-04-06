import GoogleSignIn from '@/components/auth/GoogleSignin'
import KakaoSignin from '@/components/auth/KakaoSignin'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import Image from 'next/image'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import { useRecoilState } from 'recoil'
import { userAtom } from '@/store/atom/user'
import { useEffect } from 'react'

export default function Signin({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  const session = useSession()
  const [user, setUser] = useRecoilState(userAtom)
  useEffect(() => {
    if (session?.data) {
      setUser({
        email: session?.data?.user?.email as string,
        displayName: session?.data?.user?.name as string,
        photoURL: session?.data?.user?.image as string,
      })
    }
  }, [session?.data])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: `${colors.gray100}`,
      }}
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        css={ContainerStyle}
      >
        {Object.values(providers).map((provider) => (
          <>
            <Flex
              key={provider.id}
              css={ContainerStyle2}
              justify="center"
              align="center"
              direction="row"
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: '/',
                })
              }
            >
              {provider.id === 'google' ? (
                <Image
                  src={'/images/GoogleLogo.png'}
                  alt="google logo"
                  width={30}
                  height={30}
                  style={{
                    marginRight: '10px',
                  }}
                />
              ) : provider.id === 'kakao' ? (
                <Image
                  src={'/images/kakaoLogo.png'}
                  alt="kakao logo"
                  width={30}
                  height={30}
                  style={{
                    marginRight: '10px',
                  }}
                />
              ) : null}
              <Text css={TextStyle}>{provider.name} 로그인하기</Text>
            </Flex>
            <Spacing direction="vertical" size={10} />
          </>
        ))}
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

const ContainerStyle = css`
  display: flex;
  background-color: ${colors.white};
  width: 650px;
  height: 550px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const ContainerStyle2 = css`
  width: 80%;
  height: 60px;
  border: 1px solid ${colors.gray200};
  border-radius: 6px;
  display: flex;
  cursor: pointer;
`

const TextStyle = css`
  color: ${colors.blue980};
`
