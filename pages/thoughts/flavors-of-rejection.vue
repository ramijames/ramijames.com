<template>
  <!-- Three.js falling leaves overlay -->
  <div class="leaves-overlay">
    <canvas ref="leavesCanvas"></canvas>
  </div>

  <PageHeader title="Flavors of Rejection" tagline="Every new mail is hope, crushed." />
  <main class="w-content page-top">
    <div class="rejection-grid w-consistent">

      <div class="rejection-card card-tall text-large">
        <p>We encourage you to visit our careers site as new positions often become available.</p>
      </div>

      <div class="rejection-card">
        <p>We'll be keeping your resume on file in case a future opportunity aligns more closely with your background. Wishing you all the best in your search and continued professional journey.</p>
      </div>

      <div class="rejection-card text-small">
        <p>While we were impressed by your skills and accomplishments, we have decided to move forward with other applicants whose skills and experience better meet our current needs.</p>
      </div>

      <div class="rejection-card card-wide">
        <p>The team was sincerely impressed with your background and qualifications. Unfortunately, after thoughtful consideration, we have decided to continue forward in the process with other candidates.</p>
      </div>

      <div class="rejection-card text-large">
        <p>Unfortunately, we have decided to move forward with other candidates at this time.</p>
      </div>

      <div class="rejection-card card-tall">
        <p>We've been extremely fortunate to have a fantastic response from accomplished candidates such as yourself for this role. However, after careful consideration, we've made the decision to not move forward with the interview process at this time.</p>
      </div>

      <div class="rejection-card text-small">
        <p>Your resume is in our system for future opportunities, and we hope you'll keep an eye on our careers page. Best of luck with your job search!</p>
      </div>

      <div class="rejection-card card-wide">
        <p>We want you to know that our talent team personally reviews each application - we don't use AI in the process. After carefully reviewing your application, we're not able to move forward to the interview stage at this time.</p>
      </div>

      <div class="rejection-card text-large">
        <p>We truly appreciate the time you've taken to apply and your interest in being part of our mission.</p>
      </div>

      <div class="rejection-card card-tall text-small">
        <p>After careful consideration, we have chosen to proceed with other candidates at this time. Please know that your interest in our company is valued, and we want to keep your resume and contact information on file in case a future opportunity arises that aligns with your skills and qualifications.</p>
      </div>

      <div class="rejection-card card-wide">
        <p>After careful consideration, we have decided not to move forward with your application for this position. We are committed to maintaining an honest and supportive recruitment process, while this opportunity wasn't the right fit, we value your interest.</p>
      </div>

      <div class="rejection-card card-wide text-large">
        <p>Unfortunately, the opportunity for which you were under consideration is no longer open.</p>
      </div>

      <div class="rejection-card card-wide">
        <p>After carefully reviewing the many applications we received, we regret to inform you that we won’t be moving forward with your application to the next stage of our hiring process at this time. We truly appreciate the skills and experience you bring to the table, and thank you for considering us as part of your career journey.</p>
      </div>

      <div class="rejection-card text-large">
        <p>Unfortunately, the Product Designer opportunity for which you were under consideration is no longer open.</p>
      </div>

    </div>
    <PostsExtras />
  </main>
  
  <Footer />
</template>

<script setup>
import * as THREE from 'three';

const leavesCanvas = ref(null);
let renderer = null;
let animationId = null;

onMounted(() => {
  if (!leavesCanvas.value) return;

  const scene = new THREE.Scene();

  // Get full page dimensions
  const sizes = {
    width: window.innerWidth,
    height: document.body.scrollHeight
  };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({
    canvas: leavesCanvas.value,
    alpha: true,
    antialias: true
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Create leaf geometry (simple elongated shape)
  const createLeafGeometry = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.3, 0.5, 0, 1);
    shape.quadraticCurveTo(-0.3, 0.5, 0, 0);
    return new THREE.ShapeGeometry(shape);
  };

  // Create leaves
  const leaves = [];
  const leafCount = 120;
  const leafGeometry = createLeafGeometry();

  for (let i = 0; i < leafCount; i++) {
    // Varying shades of sad gray
    const grayValue = 0.3 + Math.random() * 0.3;
    const leafMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(grayValue, grayValue, grayValue * 0.55),
      transparent: true,
      opacity: 1 + Math.random() * 0.3,
      side: THREE.DoubleSide
    });

    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

    // Random starting positions spread across the scene
    leaf.position.x = (Math.random() - 0.5) * 60;
    leaf.position.y = Math.random() * 80 - 20;
    leaf.position.z = (Math.random() - 0.5) * 20;

    // Random initial rotation
    leaf.rotation.x = Math.random() * Math.PI;
    leaf.rotation.y = Math.random() * Math.PI;
    leaf.rotation.z = Math.random() * Math.PI;

    // Random scale for variety
    const scale = 0.5 + Math.random() * 1;
    leaf.scale.set(scale, scale, scale);

    // Store animation properties
    leaf.userData = {
      fallSpeed: 0.02 + Math.random() * 0.03,
      swaySpeed: 0.5 + Math.random() * 1,
      swayAmount: 0.5 + Math.random() * 1,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01
      },
      initialX: leaf.position.x,
      timeOffset: Math.random() * Math.PI * 2
    };

    scene.add(leaf);
    leaves.push(leaf);
  }

  // Animation
  let time = 0;
  const tick = () => {
    time += 0.01;

    leaves.forEach(leaf => {
      const { fallSpeed, swaySpeed, swayAmount, rotationSpeed, initialX, timeOffset } = leaf.userData;

      // Fall down slowly
      leaf.position.y -= fallSpeed;

      // Gentle side-to-side sway
      leaf.position.x = initialX + Math.sin(time * swaySpeed + timeOffset) * swayAmount;

      // Slow rotation as it falls
      leaf.rotation.x += rotationSpeed.x;
      leaf.rotation.y += rotationSpeed.y;
      leaf.rotation.z += rotationSpeed.z;

      // Reset leaf when it falls below view
      if (leaf.position.y < -50) {
        leaf.position.y = 50;
        leaf.position.x = (Math.random() - 0.5) * 60;
        leaf.userData.initialX = leaf.position.x;
      }
    });

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(tick);
  };

  tick();

  // Handle resize
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = document.body.scrollHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
  });
});

useHead({
  title: () => ``
})

useSeoMeta({
  title: 'Flavors of Rejection',
  ogTitle: 'Flavors of Rejection',
  description: "A collection of rejection responses from companies.",
  ogDescription: "A collection of rejection responses from companies.",
  ogImage: "/articles/flavors-of-rejection.png",
  url: 'https://www.ramijames.com/thoughts/flavors-of-rejection',
  twitterTitle: 'Flavors of Rejection',
  twitterDescription: "A collection of rejection responses from companies.",
  twitterImage: "/articles/flavors-of-rejection.png",
  twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="scss">

.leaves-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;

  canvas {
    width: 100%;
    height: 100%;
  }
}

.rejection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  padding: $spacing-sm $spacing-md;
}

.rejection-card {
  border-radius: $br-sm;
  padding: $spacing-md;
  display: flex;
  align-items: center;
  background-color: rgba($black, 1);

  p {
    margin: 0;
    font-family: $font-family-serif;
    line-height: $multiplier;
    color: $white;
  }
}

// Sizes
.card-wide {
  grid-column: span 2;
}

.card-tall {
  grid-row: span 2;
}

// Text sizes
.text-large {
  background-color: $white;

  p {
    font-size: $font-size-xxl;
    font-weight: 200;
    font-style: italic;
    color: $black;
    opacity: 0.5;
  }
}

.text-small p {
  font-size: $font-size-md;
}

// Responsive
@media (max-width: 1000px) {
  .rejection-grid {
    grid-template-columns: 1fr;
  }

  .card-large,
  .card-wide {
    grid-column: span 1;
  }

  .card-large,
  .card-tall {
    grid-row: span 1;
  }
}
</style>