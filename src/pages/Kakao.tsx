import { auth } from '@/remote/firebase'
import { OAuthProvider, signInWithCredential } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Kakao() {
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  const [idToken, setIdToken] = useState<string>('')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const provider = new OAuthProvider('oidc.kakao')
  const credential = provider.credential({
    idToken: idToken as string,
  })
  signInWithCredential(auth, credential)
    .then((result) => {
      const credential = OAuthProvider.credentialFromResult(result)
      const accessToken = credential?.accessToken
      const idToken = credential?.idToken
    })
    .catch((error) => {
      console.log(error)
    })

  const getKakaoToken = async (code: string) => {
    await fetch(`https://kauth.kakao.com/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${window.location.origin}/callback/kakaotalk&code=${code}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id_token) {
          setIdToken(data.id_token)
        } else {
          navigate('/')
        }
        if (data.access_token) {
          setAccessToken(data.access_token)
          window.Kakao.Auth.setAccessToken(data.access_token)
        }
      })
  }
  useEffect(() => {
    if (code) {
      getKakaoToken(code)
    }
  }, [])
  console.log(code)
  return <div>Kakao Login...</div>
}
