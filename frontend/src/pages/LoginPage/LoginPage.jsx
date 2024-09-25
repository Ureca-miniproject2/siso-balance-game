import KakaoImage from '../../assets/photos/kakao-login.png';
import * as S from './LoginPage.styled';

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
    <>
      <S.LoginText>로그인 시 댓글 작성과 밸런스게임 제작이 가능합니다</S.LoginText>
      <S.Kakaologin>
        <S.KakaoImage src={KakaoImage} alt="kakao image" onClick={handleKakaoRedirect} />
        <div onClick={handleCreateUser}></div>
      </S.Kakaologin>
    </>
  );
}
