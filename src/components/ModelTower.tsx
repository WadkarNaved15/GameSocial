import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import bromo_seltzer_tower from "/src/assets/bromo_seltzer_tower.glb?url";

const Model = () => {
  const { scene } = useGLTF(bromo_seltzer_tower);
  const pointsRef = useRef();

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.traverse((child) => {
        if (child.isMesh) {
          const geometry = child.geometry.clone(); // Clone original geometry
          const positions = geometry.attributes.position.array; // Get vertex positions

          // Create new buffer geometry with only points
          const pointGeometry = new THREE.BufferGeometry();
          pointGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3)
          );

          // Create PointsMaterial
          const material = new THREE.PointsMaterial({
            size: 1.5, // Size of points
            color: 0xffffff, // White points
          });

          // Replace mesh with points
          const points = new THREE.Points(pointGeometry, material);
          child.parent.add(points); // Add points to scene
          child.visible = false; // Hide original mesh
        }
      });
    }
  }, []);

  return (
    <primitive 
      object={scene} 
      scale={1} 
      position={[0, -50, 0]} // Moves the model down so the floor is at the bottom
      rotation={[0, 0, 0]} 
    />
  );
};

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(70, 0, 0); // Keep the camera at a fixed horizontal level
    camera.lookAt(0, 0, 0); // Look at the center of the model
  }, [camera]);

  return null;
};

const ModelTower = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 50, 50]} intensity={1.5} />
        <Model />
        <CameraSetup />
        <OrbitControls 
          enableRotate={true} 
          enableZoom={false}  // Disable zoom
          enablePan={false}   // Disable panning
          minPolarAngle={Math.PI / 2}  // Lock to sideways rotation
          maxPolarAngle={Math.PI / 2}  // Lock to sideways rotation
        />
      </Canvas>
    </div>
  );
};

export default ModelTower;
