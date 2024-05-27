// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   MeshDistortMaterial,
//   MeshWobbleMaterial,
//   OrbitControls,
// } from "@react-three/drei";

// function App() {
//   return (
//     <div className="w-full h-[100vh] flex items-center justify-center bg-black ">
//       <Canvas>
//         <directionalLight position={[0, 0, 2]} />
//         {/* <ambientLight /> */}
//         <mesh>
//           {/* <sphereGeometry /> */}
//           {/* <torusKnotGeometry /> */}
//           <boxGeometry />

//           {/* <MeshWobbleMaterial factor={1} speed={2} /> */}
//           <MeshDistortMaterial distort={1} speed={1} />
//           {/* <meshStandardMaterial color={"red"} /> */}
//         </mesh>
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

// export default App;

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  GradientTexture,
  useCursor,
} from "@react-three/drei";
import { useControls } from "leva";

function Flag() {
  const { scale } = useControls({ scale: 2 });
  const { wireframe } = useControls({ wireframe: false });
  const { speed } = useControls({ speed: 5 });
  const { intensity } = useControls({ intensity: 2.5 });
  const ref = useRef();
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame(() => {
    ref.current.distort = THREE.MathUtils.lerp(
      ref.current.distort,
      hovered ? 0.4 : 0,
      hovered ? 0.05 : 0.01
    );
  });

  const texture = useLoader(
    THREE.TextureLoader,
    "https://images.unsplash.com/photo-1615884241403-c5ee2e600bef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  return (
    <mesh
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      scale={scale}
    >
      <planeGeometry args={[2, 3, 100, 100]} />
      <MeshDistortMaterial
        map={texture}
        ref={ref}
        intensity={intensity}
        speed={speed}
        wireframe={wireframe}
      ></MeshDistortMaterial>
    </mesh>
  );
}

export default function App() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center ">
      <Canvas>
        <ambientLight intensity={2.5} />
        {/* <directionalLight intensity={0} position={[0, 0, 2]} /> */}
        <Flag />
      </Canvas>
    </div>
  );
}

//cydstumpel.nl/

// import * as THREE from "three";
// import { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Image,
//   Environment,
//   ScrollControls,
//   useScroll,
//   useTexture,
//   MeshDistortMaterial,
// } from "@react-three/drei";
// import { easing } from "maath";
// import "./util";

// export const App = () => (
//   <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
//     <fog attach="fog" args={["#a79", 8.5, 12]} />
//     <ScrollControls pages={4} infinite>
//       <Rig rotation={[0, 0, 0.15]}>
//         <Carousel />
//       </Rig>
//       <Banner position={[0, -0.15, 0]} />
//     </ScrollControls>
//     <Environment preset="dawn" background blur={0.5} />
//   </Canvas>
// );

// function Rig(props) {
//   const ref = useRef();
//   const scroll = useScroll();
//   useFrame((state, delta) => {
//     ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
//     state.events.update(); // Raycasts every frame rather than on pointer-move
//     easing.damp3(
//       state.camera.position,
//       [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
//       0.3,
//       delta
//     ); // Move camera
//     state.camera.lookAt(0, 0, 0); // Look at center
//   });
//   return <group ref={ref} {...props} />;
// }

// function Carousel({ radius = 1.4, count = 8 }) {
//   return Array.from({ length: count }, (_, i) => (
//     <Card
//       key={i}
//       url={`../public/images/img${i + 1}.avif`}
//       position={[
//         Math.sin((i / count) * Math.PI * 2) * radius,
//         0,
//         Math.cos((i / count) * Math.PI * 2) * radius,
//       ]}
//       rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
//     />
//   ));
// }

// function Card({ url, ...props }) {
//   const ref = useRef();
//   const [hovered, hover] = useState(false);
//   const pointerOver = (e) => (e.stopPropagation(), hover(true));
//   const pointerOut = () => hover(false);
//   useFrame((state, delta) => {
//     easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
//     easing.damp(
//       ref.current.material,
//       "radius",
//       hovered ? 0.25 : 0.1,
//       0.2,
//       delta
//     );
//     easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
//   });
//   return (
//     <Image
//       ref={ref}
//       url={url}
//       transparent
//       side={THREE.DoubleSide}
//       onPointerOver={pointerOver}
//       onPointerOut={pointerOut}
//       {...props}
//     >
//       <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
//     </Image>
//   );
// }

// function Banner(props) {
//   const ref = useRef();
//   const texture = useTexture(
//     "https://clixauto.com/cdn/shop/articles/1_d98cab36-70bb-4bbc-9273-b1e4519f7369.png?v=1700173353"
//   );
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   const scroll = useScroll();
//   useFrame((state, delta) => {
//     ref.current.material.time.value += Math.abs(scroll.delta) * 4;
//     ref.current.material.map.offset.x += delta / 2;
//   });
//   return (
//     <mesh ref={ref} {...props}>
//       <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
//       <meshSineMaterial
//         map={texture}
//         map-anisotropy={16}
//         map-repeat={[30, 1]}
//         side={THREE.DoubleSide}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// }

//lamborghini

// import { Canvas } from "@react-three/fiber";
// import {
//   Environment,
//   Lightformer,
//   ContactShadows,
//   OrbitControls,
// } from "@react-three/drei";
// import { Effects } from "./Effects";
// import { Lamborghini } from "./Lamborghini";

// export default function App() {
//   return (
//     <Canvas
//       gl={{ logarithmicDepthBuffer: true, antialias: false }}
//       dpr={[1, 1.5]}
//       camera={{ position: [0, 0, 15], fov: 25 }}
//     >
//       <color attach="background" args={["#15151a"]} />
//       <Lamborghini rotation={[0, Math.PI / 1.5, 0]} scale={0.015} />
//       <hemisphereLight intensity={0.5} />
//       <ContactShadows
//         resolution={1024}
//         frames={1}
//         position={[0, -1.16, 0]}
//         scale={15}
//         blur={0.5}
//         opacity={1}
//         far={20}
//       />
//       <mesh
//         scale={4}
//         position={[3, -1.161, -1.5]}
//         rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
//       >
//         <ringGeometry args={[0.9, 1, 4, 1]} />
//         <meshStandardMaterial color="white" roughness={0.75} />
//       </mesh>
//       <mesh
//         scale={4}
//         position={[-3, -1.161, -1]}
//         rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
//       >
//         <ringGeometry args={[0.9, 1, 3, 1]} />
//         <meshStandardMaterial color="white" roughness={0.75} />
//       </mesh>
//       {/* We're building a cube-mapped environment declaratively.
//           Anything you put in here will be filmed (once) by a cubemap-camera
//           and applied to the scenes environment, and optionally background. */}
//       <Environment resolution={512}>
//         {/* Ceiling */}
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, -9]}
//           scale={[10, 1, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, -6]}
//           scale={[10, 1, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, -3]}
//           scale={[10, 1, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, 0]}
//           scale={[10, 1, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, 3]}
//           scale={[10, 1, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, 6]}
//           scale={[10, 1, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-x={Math.PI / 2}
//           position={[0, 4, 9]}
//           scale={[10, 1, 1]}
//         />
//         {/* Sides */}
//         <Lightformer
//           intensity={2}
//           rotation-y={Math.PI / 2}
//           position={[-50, 2, 0]}
//           scale={[100, 2, 1]}
//         />
//         <Lightformer
//           intensity={2}
//           rotation-y={-Math.PI / 2}
//           position={[50, 2, 0]}
//           scale={[100, 2, 1]}
//         />
//         {/* Key */}
//         <Lightformer
//           form="ring"
//           color="red"
//           intensity={10}
//           scale={2}
//           position={[10, 5, 10]}
//           onUpdate={(self) => self.lookAt(0, 0, 0)}
//         />
//       </Environment>
//       <Effects />
//       <OrbitControls
//         enablePan={false}
//         enableZoom={false}
//         minPolarAngle={Math.PI / 2.2}
//         maxPolarAngle={Math.PI / 2.2}
//       />
//     </Canvas>
//   );
// }

//////////////////////rolls royce
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

// function Model(props) {
//   const { scene } = useGLTF("/rollsroyce_phantom.glb");
//   return <primitive object={scene} scale={0.01} {...props} />;
// }

// function App() {
//   return (
//     <div>
//       <Canvas
//         dpr={[1, 2]}
//         shadows
//         camera={{ fov: 45 }}
//         style={{ position: "absolute" }}
//       >
//         <color attach="background" args={["black"]} />
//         <PresentationControls
//           speed={1.5}
//           global
//           zoom={0.5}
//           polar={[-0.1, Math.PI / 4]}
//         >

//           <Stage environment={null}>
//             <Model scale={0.01}></Model>
//           </Stage>
//         </PresentationControls>
//       </Canvas>
//     </div>
//   );
// }

// export default App;
