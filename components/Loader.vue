<template>
  <div
    v-if="visible"
    class="loader"
    :class="{ 'is-tracing': tracing, 'is-fading': fading }"
    aria-hidden="true"
  >
    <div class="loader-stack">
      <svg class="loader-logo" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M41.6492 27.2521C46.0072 27.2521 50.4345 23.8378 51.5379 19.626C52.6412 15.4143 50.0028 12 45.6448 12C43.3509 12 40.5896 12.8841 38.235 13.4079C34.9228 14.1448 32.3003 14.8457 30.6837 15.3147C29.9858 15.5171 29.427 15.0553 29.5987 14.4L29.9115 13.2058C30.0718 12.594 29.5934 12.1457 28.9404 12.2958L10.0807 16.631C9.62206 16.7364 9.22203 17.1113 9.10947 17.5409L9.03517 17.8245C8.95239 18.1405 9.05119 18.4322 9.29392 18.589C9.50465 18.725 9.7979 18.7424 10.0871 18.636L11.4073 18.1506C11.8618 17.9835 12.3048 18.1079 12.482 18.4525L12.5345 18.5545C12.618 18.717 12.6343 18.9146 12.5811 19.1177L5.78471 45.0609C5.62511 45.6702 6.09891 46.1179 6.74924 45.9724L21.451 42.68C21.912 42.5768 22.3157 42.2006 22.4288 41.7686L28.5036 18.5802C28.6141 18.1583 29.0022 17.7883 29.4526 17.6757L36.3585 15.9485C36.8046 15.837 37.1905 16.0371 37.2662 16.419C37.2738 16.458 37.2646 16.5025 37.2365 16.5415C36.5574 17.4846 36.0438 18.5282 35.7562 19.626C34.6529 23.8378 37.2913 27.2521 41.6492 27.2521Z"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
      <div class="loader-frame">
        <div class="loader-bar">
          <div class="loader-bar-fill" :style="{ width: (progress * 100).toFixed(2) + '%' }" />
        </div>
        <svg class="loader-trace" viewBox="0 0 256 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            class="loader-trace-rect"
            x="1"
            y="1"
            width="254"
            height="22"
            rx="2"
            ry="2"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            pathLength="100"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(true)
const tracing = ref(false)
const fading = ref(false)
const progress = ref(0)

const MIN_DISPLAY_MS = 800
const FAKE_DURATION_MS = 1800
const FILL_FINISH_MS = 280
const TRACE_MS = 500
const HOLD_AFTER_TRACE_MS = 350
const FADE_MS = 500

let rafId = null
const timers = []

function setT(fn, ms) {
  const id = setTimeout(fn, ms)
  timers.push(id)
  return id
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }

  const start = performance.now()
  let completed = false

  function tick() {
    const elapsed = performance.now() - start
    const fake = Math.min(0.9, elapsed / FAKE_DURATION_MS)
    if (!completed) progress.value = Math.max(progress.value, fake)
    if (!completed && progress.value < 0.9) {
      rafId = requestAnimationFrame(tick)
    } else {
      rafId = null
    }
  }
  rafId = requestAnimationFrame(tick)

  function complete() {
    if (completed) return
    completed = true
    if (rafId != null) cancelAnimationFrame(rafId)

    const elapsed = performance.now() - start
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed)
    setT(() => {
      const startVal = progress.value
      const fillStart = performance.now()
      function fillTick() {
        const t = Math.min(1, (performance.now() - fillStart) / FILL_FINISH_MS)
        progress.value = startVal + (1 - startVal) * t
        if (t < 1) {
          rafId = requestAnimationFrame(fillTick)
        } else {
          // Bar reached 100%. Trigger SVG trace, then hold, then fade out.
          tracing.value = true
          setT(() => {
            setT(() => {
              fading.value = true
              setT(() => {
                visible.value = false
                if (typeof document !== 'undefined') {
                  document.documentElement.style.overflow = ''
                  document.body.style.overflow = ''
                }
              }, FADE_MS)
            }, HOLD_AFTER_TRACE_MS)
          }, TRACE_MS)
        }
      }
      rafId = requestAnimationFrame(fillTick)
    }, wait)
  }

  if (document.readyState === 'complete') {
    complete()
  } else {
    window.addEventListener('load', complete, { once: true })
  }
})

onBeforeUnmount(() => {
  if (rafId != null) cancelAnimationFrame(rafId)
  for (const t of timers) clearTimeout(t)
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: opacity 0.5s ease;
}

.loader.is-fading {
  opacity: 0;
  pointer-events: none;
}

.loader-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.loader-logo {
  width: 54px;
  height: 54px;
  display: block;
}

.loader-frame {
  position: relative;
  width: 240px;
  height: 2px;
}

.loader-bar {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.loader-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  width: 0%;
  background: #ffffff;
  transition: width 0.18s linear;
}

.loader-trace {
  position: absolute;
  /* 8px padding on each side so the trace surrounds the 240×2 bar with breathing room */
  top: -11px;
  left: -8px;
  width: 256px;
  height: 24px;
  pointer-events: none;
  overflow: visible;
}

.loader-trace-rect {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  vector-effect: non-scaling-stroke;
}

.loader.is-tracing .loader-trace-rect {
  animation: loader-trace 0.5s cubic-bezier(0.6, 0, 0.4, 1) forwards;
}

@keyframes loader-trace {
  to { stroke-dashoffset: 0; }
}
</style>
