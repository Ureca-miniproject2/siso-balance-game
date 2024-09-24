import KakaoImage from '../../assets/photos/kakao-login.png';

export default function LoginPage() {
  const handleKakaoRedirect = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
  };

  const handleCreateUser = () => {
    fetch('http://localhost/user/create', {
      method: 'POST',
      credentials: 'include',
    });
  };
  return (
    <div>
      <img src={KakaoImage} alt="kakao image" onClick={handleKakaoRedirect} />
      <div onClick={handleCreateUser}>안녕ㅎㅇㅇㄴㄹㄴㅇㄹ</div>
    </div>
  );
}
