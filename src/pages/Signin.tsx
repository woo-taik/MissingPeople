import GoogleSignIn from '@/components/auth/GoogleSignin'
import KakaoSignin from '@/components/auth/KakaoSignin'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

export default function Signin() {
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
        <GoogleSignIn />
        <Spacing direction="vertical" size={10} />
        <KakaoSignin />
      </Flex>
    </div>
  )
}

const ContainerStyle = css`
  display: flex;
  background-color: ${colors.white};
  width: 650px;
  height: 550px;
  border-radius: 10px;
`
