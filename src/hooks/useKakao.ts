declare global {
  interface Window {
    Kakao: any
  }
}

export default function useKakao() {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
  }
}
