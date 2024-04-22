
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './DanceWylieDance';
import Spinner from './Spinner';

export default function App() {

  const [animationAction, setAnimationAction] = useState('NlaTrack.005');
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    getPriceFeed().then(data => {

      const xrdPool = data['resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd'] ?? null;

      if (xrdPool) {

        const dailyPriceChange = Math.round(xrdPool.diff24HUSD * 100);
        setPriceChange(dailyPriceChange);

      }

    });

  }, []);

  useEffect(() => {

    if (priceChange) {

      if (priceChange > 5 && priceChange <= 10) {

        setAnimationAction('NlaTrack.007');

      }

      if (priceChange > 10 && priceChange <= 15) {

        setAnimationAction('NlaTrack.004');

      }

      if (priceChange > 15 && priceChange <= 20) {

        setAnimationAction('NlaTrack.003');

      }

      if (priceChange > 20) {

        setAnimationAction('NlaTrack.008');

      }

      if (priceChange < 0 && priceChange >= -5) {

        setAnimationAction('NlaTrack.001');

      }

      if (priceChange < -5 && priceChange >= -10) {

        setAnimationAction('NlaTrack.002');

      }

      if (priceChange < -10 && priceChange >= -15) {

        setAnimationAction('NlaTrack');

      }

      if (priceChange < -20) {

        setAnimationAction('NlaTrack.006');

      }

    }

  }, [priceChange]);

  const getPriceFeed = async () => {

    const url = 'https://api.astrolescent.com/partner/hackathon/prices';
    const response = await fetch(url);
    const data = await response.json();

    return data;

  };

  const modelIsLoaded = () => {

    setIsLoading(false);

  };

  return (
    <>
      {priceChange && !isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          XRD Price Change: {priceChange}%
        </div>
        )
        :
        (
          <div style={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
            <span style={{ marginLeft: '8px' }}>Loading 3D Model...</span>
          </div>
        )}
      <Canvas
        camera={{ position: [2, 0, 12.25], fov: 10 }}
        style={{
          backgroundImage: 'url(radix-bg.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <ambientLight intensity={1.25} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Model position={[0.025, -0.9, 0]} action={animationAction} onLoaded={modelIsLoaded} />
        <OrbitControls />
      </Canvas>
    </>
  );
}