declare module 'gsap' {
  export * from 'gsap';
  export { gsap as default } from 'gsap';
}

declare module 'gsap/ScrollTrigger' {
  export * from 'gsap/ScrollTrigger';
  export { ScrollTrigger as default } from 'gsap/ScrollTrigger';
}

declare module '@react-three/fiber' {
  import * as React from 'react';
  import { Renderer } from 'three';
  
  export interface CanvasProps {
    children?: React.ReactNode;
    camera?: any;
    dpr?: number | [number, number];
    gl?: any;
    [key: string]: any;
  }
  
  export const Canvas: React.FC<CanvasProps>;
  export function useFrame(callback: (state: any, delta: number) => void): void;
  export function useThree(): any;
}

declare module 'three' {
  export * from 'three';
}
