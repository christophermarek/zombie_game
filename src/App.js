import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Sky } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import "./styles.css";
import { PerspectiveCamera } from "three";
import { Player } from './components/Player';
import { Ground } from './components/Ground';

function Box() {
  const [ref, api] = useBox(() => ({ mass: 1, position: [1, 2, 1] }));
  return (
    <mesh
      ref={ref}
      position={[10, 1, 1]}
      scale={(1, 1, 1)}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function LoadZombie() {

}

function LoadObj() {
  const materials = useLoader(MTLLoader, './assets/Obj/MountainRocks-0.mtl');
  const object = useLoader(OBJLoader, './assets/Obj/MountainRocks-0.obj', loader => {
    materials.preload()
    loader.setMaterials(materials)
  })
  object.position.set(10, 0, 0);
  object.scale.set(1, 1, 1);
  return (<primitive object={object} />);
}

export default function App() {

  return (
    <Canvas >
      <Stars />
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 10]} />
      </Physics>
    </Canvas>
  );
}
