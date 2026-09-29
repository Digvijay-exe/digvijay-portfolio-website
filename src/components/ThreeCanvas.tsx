import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  reducedMotion?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ reducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all 3D objects
    const group = new THREE.Group();
    scene.add(group);

    // Minimalist Matte Pastel Core Geometry (Soft Sage / Clay)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x9fb8ad, // Calm soft pastel sage
      roughness: 0.65,
      metalness: 0.1,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Delicate hairline wireframe overlay
    const wireGeo = new THREE.WireframeGeometry(coreGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xd4c2fc, // Soft pastel lavender
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    coreMesh.add(wireMesh);

    // Inner Warm Alabaster Core
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xf5ede4, // Soft warm cream/alabaster
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Minimalist Delicate Orbital Rings (Pastel Lavender & Soft Peach)
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.012, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xc8b6ff, // Pastel lavender
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.4, 0.009, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xfbc4ab, // Soft pastel peach
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    group.add(ring2);

    // 4 Minimalist Pastel Node Spheres
    const nodeColors = [0xa7c4b5, 0xd4c2fc, 0xfcd5ce, 0xfaedcd]; // Sage, Lilac, Blush Peach, Soft Butter
    const nodes: THREE.Mesh[] = [];
    nodeColors.forEach((color, i) => {
      const angle = (i / nodeColors.length) * Math.PI * 2;
      const radius = 2.2;
      const sphereGeo = new THREE.SphereGeometry(0.08, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.4,
        metalness: 0.1
      });
      const node = new THREE.Mesh(sphereGeo, sphereMat);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.4, Math.sin(angle) * radius);
      group.add(node);
      nodes.push(node);
    });

    // Soft Ambient & Directional Lighting for calm editorial look
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const softKeyLight = new THREE.DirectionalLight(0xfff8f0, 1.2);
    softKeyLight.position.set(5, 6, 5);
    scene.add(softKeyLight);

    const softFillLight = new THREE.DirectionalLight(0xe8eefa, 0.8);
    softFillLight.position.set(-5, -4, 3);
    scene.add(softFillLight);

    // Smooth subtle mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    const onClick = () => {
      setIsInteracting(true);
      coreMesh.scale.set(1.08, 1.08, 1.08);
      setTimeout(() => {
        coreMesh.scale.set(1, 1, 1);
        setIsInteracting(false);
      }, 300);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        targetY += 0.003;
        group.rotation.y += (targetY + mouseX - group.rotation.y) * 0.04;
        group.rotation.x += (mouseY - group.rotation.x) * 0.04;

        innerMesh.rotation.y -= 0.005;
        innerMesh.rotation.x += 0.004;

        ring1.rotation.z = elapsed * 0.15;
        ring2.rotation.y = elapsed * 0.12;

        nodes.forEach((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 + elapsed * 0.25;
          const radius = 2.2;
          node.position.x = Math.cos(angle) * radius;
          node.position.z = Math.sin(angle) * radius;
          node.position.y = Math.sin(angle * 2) * 0.25;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      wireGeo.dispose();
      innerGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      coreMat.dispose();
      wireMat.dispose();
      innerMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[340px] md:h-[400px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Minimal Sculpture"
      />
      
      {/* Discreet minimalist watermark */}
      <div className="absolute bottom-3 right-3 text-[11px] text-stone-400 dark:text-stone-500 font-mono tracking-tight pointer-events-none select-none">
        Three.js &bull; 3D sculpture
      </div>
    </div>
  );
};
