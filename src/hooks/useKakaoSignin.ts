import { SCOPE } from './../constants/scope'
declare global {
  interface Window {
    Kakao: any
  }
}

declare global {
  interface Window {
    Kakao: any
  }
}

export default function useKakaoSignin() {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
  }
  const location = window.location
  const redirectUri = `${location.origin}/callback/kakaotalk`
  const scope = [SCOPE.PROFILE_IMAGE, SCOPE.PROFILE_NICKNAME].join(',')
  window.Kakao.Auth.authorize({
    redirectUri,
    scope,
  })
}
