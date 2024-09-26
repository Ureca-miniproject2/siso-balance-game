import { useEffect } from 'react';
import ItemCreate from '../../components/itemcreate/ItemCreate';

export default function CreatePage() {
  // useEffect(() => {
  //   const postRequest = async () => {
  //     const response = await fetch('http://localhost/game', {
  //       method: 'POST',
  //       credentials: 'include', // 쿠키를 포함하여 요청
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userId: 1,
  //         firstItemText: '안녕하세여jjjj',
  //         secondItemText: '그래요?jhhhh',
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //   console.log('eef');
  //   postRequest();
  // });
  return <ItemCreate />;
}
