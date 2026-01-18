<template>
  <div class="code-block">
    <span v-if="lang" class="lang-badge">{{ lang }}</span>
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

.lang-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-family: monospace;
  text-transform: uppercase;
  z-index: 1;
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
