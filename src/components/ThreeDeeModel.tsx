"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh, DirectionalLight, SpotLight } from "three";

function MeshComponent({ fileUrl }: { fileUrl: string }) {
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useEffect(() => {
    
      console.log("GLTF Model loaded:", gltf);
    
  }, [gltf])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
    // mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} scale={[35,35,35]}>
      {gltf ? <primitive object={gltf.scene} /> : null}
    </mesh>
  );
}

export function ThreeDeeModel({ fileUrl }: { fileUrl: string }) {
  return (
    <div className='relative w-full h-full'>
      <Canvas 
        className='h-full w-full' 
        style={{ width: '100%', height: '100%' }}
        // camera={{ position: [0,1,3], fov:50 }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5,5,5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Environment preset="sunset" />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent fileUrl={fileUrl}/>
      </Canvas>
    </div>
  );
}
