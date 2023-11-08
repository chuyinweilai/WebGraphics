export const onResizeListener = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  window.addEventListener('resize', () => {
    // 重设渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重设相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
  })
}