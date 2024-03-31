import GoogleSignIn from '@/components/auth/GoogleSignin'
import Flex from '@/components/shared/Flex'
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
      <Flex css={ContainerStyle}>
        <GoogleSignIn />
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
  justify-content: center;
  align-items: center;
`
