<template>
  <div class="code-block">
    <div class="code-block-header">
      <span v-if="lang" class="lang-badge">{{ lang }}</span>
      <button class="copy-btn" @click="copyCode" :title="copied ? 'Copied!' : 'Copy code'">
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
    <div v-if="highlighted" v-html="highlighted" class="shiki-wrapper"></div>
    <pre v-else class="code"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { codeToHtml } from 'shiki'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    default: 'javascript'
  },
  theme: {
    type: String,
    default: 'github-dark'
  }
})

const highlighted = ref('')
const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code.trim())
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    console.warn('Copy failed:', e)
  }
}

async function highlight() {
  try {
    highlighted.value = await codeToHtml(props.code.trim(), {
      lang: props.lang,
      theme: props.theme
    })
  } catch (e) {
    console.warn('Shiki highlighting failed:', e)
    highlighted.value = ''
  }
}

onMounted(() => {
  highlight()
})

watch(() => [props.code, props.lang, props.theme], () => {
  highlight()
})
</script>

<style scoped>
.code-block {
  position: relative;
  margin: 0 0 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.code-block-header {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.lang-badge {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-family: monospace;
  text-transform: uppercase;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 1);
}

.shiki-wrapper :deep(pre) {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  border-radius: 0.5rem;
}

.shiki-wrapper :deep(code) {
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code {
  background: #24292e;
  color: #e1e4e8;
  padding: 1.5rem;
  margin: 0;
  overflow-x: auto;
  border-radius: 0.5rem;
}

.code code {
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
