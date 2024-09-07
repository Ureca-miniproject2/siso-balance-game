import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function GlobalLayout() {
  const [e, setE] = useState([]);
  useEffect(() => {
    const a = async () => {
      const res = await fetch('http://localhost:5173/api/item');
      const data = await res.json();
      console.log(data.data);
      setE(data.data);
    };
    a();
  }, []);
  return (
    <div>
      <Outlet />
      {e.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.firstTitle}</h2>
            <p>{item.secondTitle}</p>
          </div>
        );
      })}
    </div>
  );
}
