import { useEffect, useState } from 'react';
import styles from './Image.module.css';

export default function Image({ data }: any) {
  const url = data?.file?.url || '';
  const imageId = url.match(/(\/.*)\/(.*)\?token/)[2] || null;

  if (imageId === null) return <p>No image...</p>;

  const [image, setImage] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    fetch(
      `https://engage-hub-platform-dev.herokuapp.com/api/v1/download/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setImage(result.data));
  }, [imageId]);

  if (!image) return <p>Loading...</p>;

  return <img className={styles.image} src={image} />;
}
