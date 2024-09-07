import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function GlobalLayout() {
  const [e, setE] = useState(null);
  useEffect(() => {
    const a = async () => {
      const res = await fetch('http://localhost:5173/api/user');
      const data = await res.json();
      console.log(data.data[0].id);
      setE(data.data[0].id);
    };
    a();
  }, []);
  return (
    <div>
      <Outlet />
      <div>{e}</div>
    </div>
  );
}
