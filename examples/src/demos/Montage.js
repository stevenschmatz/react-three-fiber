import * as THREE from 'three'
import * as React from 'react'
import { Canvas } from 'react-three-fiber'
import { useSprings, a } from 'react-spring/three'

const number = 35
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']
const shapes = ['planeBufferGeometry', 'planeBufferGeometry', 'planeBufferGeometry']
const random = (i) => {
  const r = Math.random()
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)],
  }
}

const data = new Array(number).fill().map(() => {
  const shape = shapes[Math.round(Math.random() * (shapes.length - 1))]
  return {
    shape,
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10],
  }
})

function Content() {
  const [springs, set] = useSprings(number, (i) => ({
    from: random(i),
    ...random(i),
    config: { mass: 20, tension: 150, friction: 50 },
  }))
  React.useEffect(() => void setInterval(() => set((i) => ({ ...random(i), delay: i * 40 })), 3000), [set])
  return data.map((d, index) => (
    <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
      <boxBufferGeometry args={d.args} />
      <a.meshStandardMaterial color={springs[index].color} roughness={0.75} metalness={0.5} />
    </a.mesh>
  ))
}

const position1 = [150, 150, 250]

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={position1}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}

const style = { background: '#A2CCB6' }
const camera = { position: [0, 0, 100], fov: 100 }
const planeBufferGeometryArgs = [1000, 1000]

function Montage() {
  return (
    <Canvas colorManagement={false} shadowMap style={style} camera={camera}>
      <Lights />
      <mesh receiveShadow>
        <planeBufferGeometry args={planeBufferGeometryArgs} />
        <meshStandardMaterial color="#A2ACB6" roughness={1} />
      </mesh>
      <Content />
    </Canvas>
  )
}

export default React.memo(Montage)
