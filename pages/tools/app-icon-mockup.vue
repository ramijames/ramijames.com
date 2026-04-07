<template>
  <PageHeader
    title="App Icon Mockup"
    tagline="Preview your icon on iOS and Android, then export a developer-ready ZIP"
  />

  <main class="general-main page-top">

    <!-- Top controls -->
    <div class="controls-row">
      <section
        class="upload-zone"
        :class="{ 'is-dragging': isDragging, 'has-image': iconDataUrl }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        @click="triggerFileInput"
        role="button"
        tabindex="0"
        @keydown.enter="triggerFileInput"
        @keydown.space.prevent="triggerFileInput"
      >
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="file-input-hidden"
          @change="onFileChange"
        />
        <div class="upload-inner">
          <div class="upload-preview" v-if="iconDataUrl">
            <img :src="iconDataUrl" alt="Icon preview" />
          </div>
          <div v-else class="upload-placeholder">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="9" fill="currentColor" opacity="0.1"/>
              <path d="M20 11v14M13 18l7-7 7 7M11 29h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="upload-text">
            <span v-if="!iconDataUrl">Drag &amp; drop or <u>browse</u></span>
            <span v-else>Click to replace</span>
          </p>
          <p class="upload-subtext">PNG, JPG, SVG &middot; Square best</p>
          <p v-if="uploadError" class="upload-error" role="alert">{{ uploadError }}</p>
        </div>
      </section>

      <div class="right-controls">
        <div class="field-group">
          <label class="field-label" for="app-name">App Name</label>
          <input
            id="app-name"
            type="text"
            v-model="appName"
            placeholder="My App"
            maxlength="30"
            class="field-input"
          />
        </div>

        <div class="field-group">
          <label class="field-label">Wallpaper Color</label>
          <label class="color-swatch-large" :style="{ background: bgColor }" title="Choose wallpaper color">
            <input type="color" v-model="bgColor" class="color-hidden-input" />
          </label>
        </div>

      </div>
    </div>

    <!-- Mockups -->
    <section class="mockups-wrapper">

      <!-- iOS -->
      <div class="mockup-column">
        <p class="mockup-platform-label">iOS</p>

        <div class="phone-frame-wrapper">
          <div class="ios-phone-body">
            <div class="ios-dynamic-island">
              <div class="di-camera"></div>
            </div>
            <div class="phone-screen ios-screen" :style="{ background: bgColor }">
              <div class="status-bar">
                <span class="status-time">9:41</span>
                <div class="status-icons">
                  <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true">
                    <rect x="0" y="7" width="3" height="5" rx="0.5" fill="white" opacity="0.9"/>
                    <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill="white" opacity="0.9"/>
                    <rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" opacity="0.9"/>
                    <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" opacity="0.9"/>
                  </svg>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path d="M8 9.5L8 11.5" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
                    <path d="M5.5 7Q8 5 10.5 7" stroke="white" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.9"/>
                    <path d="M3 4Q8 0.5 13 4" stroke="white" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.9"/>
                  </svg>
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" stroke-opacity="0.9" stroke-width="1"/>
                    <rect x="2" y="2" width="15" height="8" rx="1.5" fill="white" fill-opacity="0.9"/>
                    <path d="M22.5 4.5L22.5 7.5" stroke="white" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
              <div class="icon-grid">
                <div v-for="(cell, i) in gridCells" :key="i" class="icon-cell">
                  <div
                    class="grid-icon ios-grid-icon"
                    :class="{ 'user-icon': cell.isUser }"
                    :style="!cell.isUser ? { background: cell.color } : {}"
                  >
                    <img v-if="cell.isUser && iconDataUrl" :src="iconDataUrl" class="grid-icon-img" alt="" />
                    <span v-else-if="cell.isUser" class="upload-indicator">+</span>
                  </div>
                  <span v-if="cell.isUser" class="grid-icon-name">{{ appName || 'My App' }}</span>
                </div>
              </div>
            </div>
            <div class="ios-home-indicator"></div>
          </div>
        </div>
      </div>

      <!-- Android -->
      <div class="mockup-column">
        <p class="mockup-platform-label">Android</p>

        <div class="phone-frame-wrapper">
          <div class="android-phone-body">
            <div class="android-punch-hole"></div>
            <div class="phone-screen android-screen" :style="{ background: bgColor }">
              <div class="status-bar">
                <span class="status-time">9:41</span>
                <div class="status-icons">
                  <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true">
                    <rect x="0" y="7" width="3" height="5" rx="0.5" fill="white" opacity="0.9"/>
                    <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill="white" opacity="0.9"/>
                    <rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" opacity="0.9"/>
                    <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" opacity="0.9"/>
                  </svg>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path d="M8 9.5L8 11.5" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
                    <path d="M5.5 7Q8 5 10.5 7" stroke="white" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.9"/>
                    <path d="M3 4Q8 0.5 13 4" stroke="white" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.9"/>
                  </svg>
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" stroke-opacity="0.9" stroke-width="1"/>
                    <rect x="2" y="2" width="15" height="8" rx="1.5" fill="white" fill-opacity="0.9"/>
                    <path d="M22.5 4.5L22.5 7.5" stroke="white" stroke-opacity="0.9" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
              <div class="icon-grid">
                <div v-for="(cell, i) in gridCells" :key="i" class="icon-cell">
                  <div
                    class="grid-icon android-grid-icon"
                    :class="{ 'user-icon': cell.isUser }"
                    :style="!cell.isUser ? { background: cell.color } : {}"
                  >
                    <img v-if="cell.isUser && iconDataUrl" :src="iconDataUrl" class="grid-icon-img" alt="" />
                    <span v-else-if="cell.isUser" class="upload-indicator">+</span>
                  </div>
                  <span v-if="cell.isUser" class="grid-icon-name">{{ appName || 'My App' }}</span>
                </div>
              </div>
            </div>
            <div class="android-nav-bar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7L9 12" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="android-nav-home"></div>
              <div class="android-nav-recents"></div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- Export -->
    <section class="export-icons">
      <div class="export-area">
        <button
          class="button export-trigger"
          @click="exportIcons"
          :disabled="!iconDataUrl || isExporting"
        >
          <svg v-if="!isExporting" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M7.5 1v9M4.5 7l3 3 3-3M1.5 11v1.5a1 1 0 001 1h10a1 1 0 001-1V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" class="spin">
            <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-opacity="0.25" stroke-width="1.5"/>
            <path d="M7.5 1.5a6 6 0 016 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>{{ isExporting ? 'Exporting…' : 'Export Icons ZIP' }}</span>
        </button>
        <p class="export-hint">iOS (Xcode) + Android (Studio) ready</p>
        <p v-if="exportError" class="upload-error" role="alert">{{ exportError }}</p>
      </div>
    </section>

  </main>

  <Footer />
</template>

<script setup>
useSeoMeta({
  title: 'App Icon Mockup',
  description: 'Upload your app icon, preview it on iOS and Android home screens, and export a developer-ready ZIP with all required sizes.',
  ogTitle: 'App Icon Mockup',
  ogDescription: 'Client-side tool to preview and export app icons for iOS and Android.',
})

// ─── State ───────────────────────────────────────────────────────────────────

const iconDataUrl = ref(null)
const appName = ref('')
const isDragging = ref(false)
const uploadError = ref('')
const exportError = ref('')
const fileInputRef = ref(null)
const isExporting = ref(false)

const bgColor = ref('#1e3a5f')

// ─── Icon grid ────────────────────────────────────────────────────────────────

const placeholderColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7B731', '#A8E6CF', '#FFB3BA',
  '#BADA55', '#C9B1BD', '#89CFF0', '#F2A65A', '#73D2DE',
  '#FF9F43', '#6C5CE7', '#00B894', '#E17055', '#74B9FF',
]

const gridCells = computed(() =>
  Array.from({ length: 20 }, (_, i) => ({
    isUser: i === 0,
    color: placeholderColors[i > 0 ? (i - 1) % placeholderColors.length : 0],
  }))
)

// ─── Upload ───────────────────────────────────────────────────────────────────

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE_MB = 5

function triggerFileInput() {
  fileInputRef.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (file) processFile(file)
  event.target.value = ''
}

function onDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function processFile(file) {
  uploadError.value = ''
  if (!ACCEPTED_TYPES.includes(file.type)) {
    uploadError.value = 'Unsupported type. Use PNG, JPG, GIF, WebP, or SVG.'
    return
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    uploadError.value = `File too large. Max ${MAX_SIZE_MB}MB.`
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => { iconDataUrl.value = e.target?.result ?? null }
  reader.onerror = () => { uploadError.value = 'Failed to read file. Try again.' }
  reader.readAsDataURL(file)
}

// ─── Export ───────────────────────────────────────────────────────────────────

const iosSizesConfig = [
  // iPhone
  { filename: 'AppIcon-20@2x.png',       size: 40,   idiom: 'iphone',        scale: '2x', pointSize: '20x20'     },
  { filename: 'AppIcon-20@3x.png',       size: 60,   idiom: 'iphone',        scale: '3x', pointSize: '20x20'     },
  { filename: 'AppIcon-29@2x.png',       size: 58,   idiom: 'iphone',        scale: '2x', pointSize: '29x29'     },
  { filename: 'AppIcon-29@3x.png',       size: 87,   idiom: 'iphone',        scale: '3x', pointSize: '29x29'     },
  { filename: 'AppIcon-40@2x.png',       size: 80,   idiom: 'iphone',        scale: '2x', pointSize: '40x40'     },
  { filename: 'AppIcon-40@3x.png',       size: 120,  idiom: 'iphone',        scale: '3x', pointSize: '40x40'     },
  { filename: 'AppIcon-60@2x.png',       size: 120,  idiom: 'iphone',        scale: '2x', pointSize: '60x60'     },
  { filename: 'AppIcon-60@3x.png',       size: 180,  idiom: 'iphone',        scale: '3x', pointSize: '60x60'     },
  // iPad
  { filename: 'AppIcon-20@1x-ipad.png',  size: 20,   idiom: 'ipad',          scale: '1x', pointSize: '20x20'     },
  { filename: 'AppIcon-20@2x-ipad.png',  size: 40,   idiom: 'ipad',          scale: '2x', pointSize: '20x20'     },
  { filename: 'AppIcon-29@1x-ipad.png',  size: 29,   idiom: 'ipad',          scale: '1x', pointSize: '29x29'     },
  { filename: 'AppIcon-29@2x-ipad.png',  size: 58,   idiom: 'ipad',          scale: '2x', pointSize: '29x29'     },
  { filename: 'AppIcon-40@1x-ipad.png',  size: 40,   idiom: 'ipad',          scale: '1x', pointSize: '40x40'     },
  { filename: 'AppIcon-40@2x-ipad.png',  size: 80,   idiom: 'ipad',          scale: '2x', pointSize: '40x40'     },
  { filename: 'AppIcon-76@2x-ipad.png',  size: 152,  idiom: 'ipad',          scale: '2x', pointSize: '76x76'     },
  { filename: 'AppIcon-83.5@2x-ipad.png',size: 167,  idiom: 'ipad',          scale: '2x', pointSize: '83.5x83.5' },
  // App Store
  { filename: 'AppIcon-1024@1x.png',     size: 1024, idiom: 'ios-marketing', scale: '1x', pointSize: '1024x1024' },
]

const androidSizesConfig = [
  { size: 48,  folder: 'mipmap-mdpi'    },
  { size: 72,  folder: 'mipmap-hdpi'    },
  { size: 96,  folder: 'mipmap-xhdpi'   },
  { size: 144, folder: 'mipmap-xxhdpi'  },
  { size: 192, folder: 'mipmap-xxxhdpi' },
  { size: 512, folder: 'play-store'     },
]

function buildContentsJson() {
  return JSON.stringify({
    images: iosSizesConfig.map(({ filename, idiom, scale, pointSize }) => ({
      filename,
      idiom,
      scale,
      size: pointSize,
    })),
    info: { author: 'xcode', version: 1 },
  }, null, 2)
}

function resizeToBase64(dataUrl, size) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      resolve(canvas.toDataURL('image/png').split(',')[1])
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

async function exportIcons() {
  if (!iconDataUrl.value || isExporting.value) return
  isExporting.value = true
  exportError.value = ''

  try {
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()

    // iOS — full Xcode-ready appiconset
    const iosFolder = zip.folder('ios/AppIcon.appiconset')
    for (const { filename, size } of iosSizesConfig) {
      const b64 = await resizeToBase64(iconDataUrl.value, size)
      iosFolder.file(filename, b64, { base64: true })
    }
    iosFolder.file('Contents.json', buildContentsJson())

    // Android — mipmap folder structure
    for (const { size, folder } of androidSizesConfig) {
      const b64 = await resizeToBase64(iconDataUrl.value, size)
      zip.folder(`android/${folder}`).file('ic_launcher.png', b64, { base64: true })
    }

    // README
    const name = appName.value || 'App'
    zip.file('README.md', [
      `# ${name} — App Icons`,
      '',
      '## iOS (Xcode)',
      'Drag `ios/AppIcon.appiconset` into your project\'s Assets.xcassets.',
      'The included Contents.json maps all sizes automatically.',
      '',
      '## Android (Android Studio)',
      'Copy the `android/mipmap-*` folders into `app/src/main/res/`.',
      'Each folder contains `ic_launcher.png` at the correct density.',
      '`android/play-store/ic_launcher.png` (512×512) is for the Google Play listing.',
      '',
      '## Sizes included',
      '',
      '### iOS',
      iosSizesConfig.map(({ filename, size }) => `- ${filename} (${size}×${size})`).join('\n'),
      '',
      '### Android',
      androidSizesConfig.map(({ folder, size }) => `- ${folder}/ic_launcher.png (${size}×${size})`).join('\n'),
    ].join('\n'))

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(appName.value || 'app').toLowerCase().replace(/\s+/g, '-')}-icons.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Export failed:', err)
    exportError.value = 'Export failed. Please try again.'
  } finally {
    isExporting.value = false
  }
}
</script>

<style lang="scss" scoped>

/* ─────────────────────────────────────────
   Top controls layout
───────────────────────────────────────── */

.controls-row {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  align-items: flex-start;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
}

/* ─────────────────────────────────────────
   Upload zone
───────────────────────────────────────── */

.upload-zone {
  flex: 0 0 160px;
  height: 160px;
  border: 2px dashed rgba($black, 0.2);
  border-radius: $br-md;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  background: rgba($white-dark, 0.6);
  width: 100%;

  &:hover, &:focus-visible {
    border-color: $blue;
    background: rgba($blue, 0.03);
    outline: none;
  }
  &.is-dragging {
    border-color: $blue;
    background: rgba($blue, 0.06);
  }
  &.has-image {
    border-style: solid;
    border-color: rgba($black, 0.12);
  }
}

.dark .upload-zone {
  border-color: rgba($white, 0.25);
  background: rgba($white, 0.05);

  &:hover, &:focus-visible {
    border-color: $white;
    background: rgba($white, 0.12);
  }
  &.is-dragging {
    border-color: $white;
    background: rgba($white, 0.14);
  }
  &.has-image {
    border-color: rgba($white, 0.15);
  }
}

.file-input-hidden { display: none; }

.upload-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
  pointer-events: none;
  padding: $spacing-sm;
}

.upload-preview {
  width: 72px;
  height: 72px;
  border-radius: $br-md;
  overflow: hidden;
  box-shadow: $soft-shadow;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
}

.upload-placeholder { color: rgba($black, 0.45); }

.upload-text {
  font-size: $font-size-xs;
  color: rgba($black, 0.6);
  margin: 0;
  u { color: $blue; }
}

.upload-subtext {
  font-size: 11px;
  margin: 0;
  color: rgba($black, 0.35);
}

.upload-error {
  font-size: 11px;
  color: $red-dark;
  margin: 0;
  font-weight: 600;
}

.dark .upload-placeholder { color: rgba($white, 0.45); }
.dark .upload-text {
  color: rgba($white, 0.6);
  u { color: $blue-light; }
}
.dark .upload-subtext { color: rgba($white, 0.35); }

/* ─────────────────────────────────────────
   Right controls
───────────────────────────────────────── */

.right-controls {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  justify-content: space-between;
  width: 100%;
  padding: $spacing-md ;
  border: 1px solid rgba($black, 0.1);
  background: rgba($black, 0.01);
  border-radius: $br-md;
}

.dark .right-controls {
  border-color: rgba($white, 0.25);
  background: rgba($white, 0.05);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-xxs;
  width: 100%;
}

.field-label {
  font-size: $font-size-xs;
  font-weight: 600;
  color: rgba($black, 0.6);
}

.dark .field-label {
  color: $white;
  opacity: 1;
}

.field-input {
  padding: $spacing-xs $spacing-sm;
  border-radius: $br-sm;
  border: 1px solid rgba($black, 0.2);
  font-family: $font-family-main;
  font-size: $font-size-sm;
  background: $white;
  color: $black;
  width: 100%;
  &:focus-visible { border-color: $blue; outline: none; }
}

.dark .field-input {
  border-color: rgba($white, 0.3);
  color: $white;
  background: rgba($white, 0.1);
  &:focus-visible { border-color: rgba($white, 0.6); outline: none; }
}

.export-icons {
  width: 100%;
  display: flex;
  justify-content: center;
}

.export-area {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  align-items: center;
}

// Disabled state — the global button style has no disabled handling
button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

// Inverted dark mode: white button + black text
// Needs higher specificity than the global `.dark .button` rule
.dark .export-trigger {
  background: $white;
  color: $black;
  border-color: $white;

  svg path { fill: none; stroke: $black; }
}

.export-hint {
  font-size: 11px;
  margin: 0;
  color: rgba($black, 0.4);
}

.dark .export-hint { color: rgba($white, 0.4); }

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spin { animation: spin 0.9s linear infinite; }

/* ─────────────────────────────────────────
   Mockups section
───────────────────────────────────────── */

.mockups-wrapper {
  display: flex;
  flex-direction: row;
  gap: $spacing-lg;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: $spacing-md ;
  border: 1px solid rgba($black, 0.1);
  background: rgba($black, 0.01);
  border-radius: $br-md;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
  }
}

.dark .mockups-wrapper {
  border-color: rgba($white, 0.25);
  background: rgba($white, 0.05);
}

.mockup-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
}

.mockup-platform-label {
  font-size: $font-size-xs;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.4;
  margin: 0;
}

.color-swatch-large {
  width: 100%;
  height: 36px;
  border-radius: $br-sm;
  border: 1px solid rgba($black, 0.15);
  cursor: pointer;
  display: block;
  position: relative;
  overflow: hidden;
  box-shadow: $main-shadow;
  transition: transform 0.15s;

  &:hover { transform: scale(1.05); }
}

.dark .color-swatch-large {
  border-color: rgba($white, 0.2);
}

.color-hidden-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* ─────────────────────────────────────────
   Phone frame wrapper
───────────────────────────────────────── */

.phone-frame-wrapper {
  filter: drop-shadow(0 16px 32px rgba($black, 0.3));
}

/* ─────────────────────────────────────────
   iOS phone
───────────────────────────────────────── */

.ios-phone-body {
  width: 270px;
  height: 576px;
  background: #1c1c1e;
  border-radius: 46px;
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.07),
    inset 0 36px 16px 4px rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px 12px;
  position: relative;
  overflow: hidden;

  // Power button — right
  &::before {
    content: '';
    position: absolute;
    right: -3px;
    top: 118px;
    width: 3px;
    height: 68px;
    background: #3a3a3c;
    border-radius: 0 2px 2px 0;
  }

  // Volume buttons — left (two via box-shadow)
  &::after {
    content: '';
    position: absolute;
    left: -3px;
    top: 96px;
    width: 3px;
    height: 36px;
    background: #3a3a3c;
    border-radius: 2px 0 0 2px;
    box-shadow: 0 50px 0 #3a3a3c, 0 94px 0 #3a3a3c;
  }
}

.ios-dynamic-island {
  width: 90px;
  height: 24px;
  background: #000;
  border-radius: 20px;
  margin-bottom: 12px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.di-camera {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(100, 160, 255, 0.5), rgba(20, 20, 60, 0.8));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.phone-screen {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ios-screen {
  border-radius: 28px;
}

.android-screen {
  border-radius: 20px;
}

.ios-home-indicator {
  width: 96px;
  height: 4px;
  background: rgba(255, 255, 255, 0.28);
  border-radius: 4px;
  margin-top: 8px;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────
   Android phone
───────────────────────────────────────── */

.android-phone-body {
  width: 270px;
  height: 576px;
  background: #1c1c1e;
  border-radius: 34px;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 -4px 10px rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px 10px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    right: -3px;
    top: 128px;
    width: 3px;
    height: 48px;
    background: #3a3a3c;
    border-radius: 0 2px 2px 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: -3px;
    top: 108px;
    width: 3px;
    height: 76px;
    background: #3a3a3c;
    border-radius: 2px 0 0 2px;
  }
}

.android-punch-hole {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
  flex-shrink: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
  }
}

.android-nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 28px;
  height: 32px;
  width: 100%;
  flex-shrink: 0;
  margin-top: 4px;
}

.android-nav-home {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.28);
}

.android-nav-recents {
  width: 14px;
  height: 10px;
  border-radius: 2px;
  border: 2px solid rgba(255, 255, 255, 0.28);
}

/* ─────────────────────────────────────────
   Status bar
───────────────────────────────────────── */

.status-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px 4px;
  flex-shrink: 0;
}

.status-time {
  font-size: 10px;
  font-weight: 700;
  color: white;
  font-family: $font-family-main;
  letter-spacing: 0.2px;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ─────────────────────────────────────────
   Icon grid
───────────────────────────────────────── */

.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 8px 10px 10px;
  align-content: start;
}

.icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.grid-icon {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.ios-grid-icon {
  // CSS approximation of Apple's superellipse (squircle) icon mask
  border-radius: 24%;
}

.android-grid-icon {
  // Android adaptive icon squircle — slightly more circular than iOS
  border-radius: 28%;
}

.grid-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.upload-indicator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px dashed rgba(255, 255, 255, 0.3);
}

.grid-icon-name {
  font-size: 9px;
  color: white;
  font-family: $font-family-main;
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

</style>
