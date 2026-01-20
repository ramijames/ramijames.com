<template>
  <ClientOnly>
    <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal" aria-label="Close modal"></button>
          <h2>Start a Project</h2>
          <p class="modal-description">Tell me about your project and I'll get back to you to set up a call.</p>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="description">Describe your project</label>
              <textarea
                id="description"
                v-model="form.description"
                placeholder="Tell me about your project..."
                rows="4"
                required
              ></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="stage">Project Stage</label>
                <select id="stage" v-model="form.stage" required>
                  <option value="" disabled>Select stage</option>
                  <option value="concept">Concept</option>
                  <option value="needs-redesign">Needs redesign</option>
                  <option value="needs-review">Needs review</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div class="form-group">
                <label for="budget">Budget</label>
                <select id="budget" v-model="form.budget" required>
                  <option value="" disabled>Select budget</option>
                  <option value="under-1k">&lt; $1k</option>
                  <option value="1k-10k">$1k - $10k</option>
                  <option value="10k-plus">$10k+</option>
                </select>
              </div>
            </div>
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send</span>
              <span v-else>Sending...</span>
            </button>
          </form>

          <Transition name="fade">
            <div v-if="submitStatus === 'success'" class="status-message success">
              Thanks! I'll be in touch soon.
            </div>
            <div v-else-if="submitStatus === 'error'" class="status-message error">
              Something went wrong. Please try again or email me directly.
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
  
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const form = reactive({
  name: '',
  email: '',
  description: '',
  stage: '',
  budget: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const closeModal = () => {
  emit('close')
  // Reset form after closing
  setTimeout(() => {
    form.name = ''
    form.email = ''
    form.description = ''
    form.stage = ''
    form.budget = ''
    submitStatus.value = 'idle'
  }, 300)
}

const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        description: form.description,
        stage: form.stage,
        budget: form.budget
      }
    })

    submitStatus.value = 'success'
    setTimeout(() => {
      closeModal()
    }, 2000)
  } catch (error) {
    console.error('Failed to send email:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

// Close on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})

// Prevent body scroll when modal is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($black, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  padding: $spacing-sm;

  @media screen and (max-width: 768px) {
    padding: 0;
    min-height: 100vh;
  }
}

.modal-content {
  background: $white;
  border-radius: $br-lg;
  padding: $spacing-lg;
  max-width: 800px;
  width: 100%;
  position: relative;
  color: $black;

  @media screen and (max-width: 768px) {
    padding: $spacing-md $spacing-md $spacing-xl $spacing-md;
    border-radius: 0;
    height: 100%;
    overflow-y: auto;
  }

  h2 {
    font-family: $font-family-main;
    font-size: $font-size-xl;
    font-weight: 600;
    margin-bottom: $spacing-xs;
  }

  .modal-description {
    font-family: $font-family-main;
    font-size: $font-size-md;
    color: rgba($black, 0.6);
    margin-bottom: $spacing-md;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
  }
}

.close-button {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    background: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover::before,
  &:hover::after {
    background: rgba($black, 0.6);
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  label {
    font-family: $font-family-main;
    font-size: $font-size-md;
    font-weight: 600;
    color: rgba($black, 0.6);
  }

  input,
  textarea {
    font-family: $font-family-main;
    font-size: $font-size-md;
    padding: $spacing-sm;
    border: 1px solid rgba($black, 0.2);
    border-radius: $br-sm;
    background: $white;
    color: $black;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: $black;
    }

    &::placeholder {
      color: rgba($black, 0.4);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  select {
    font-family: $font-family-main;
    font-size: $font-size-md;
    padding: $spacing-sm;
    border: 1px solid rgba($black, 0.2);
    border-radius: $br-sm;
    background: $white;
    color: $black;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: $black;
    }
  }
}

.submit-button {
  font-family: $font-family-main;
  font-size: $font-size-md;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: $spacing-sm $spacing-md;
  background: $black;
  color: $white;
  border: none;
  border-radius: $br-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: $spacing-xs;

  &:hover:not(:disabled) {
    background: rgba($black, 0.8);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.status-message {
  margin-top: $spacing-sm;
  padding: $spacing-sm;
  border-radius: $br-sm;
  font-family: $font-family-main;
  font-size: $font-size-sm;
  text-align: center;

  &.success {
    background: rgba($green, 0.1);
    color: $green-dark;
  }

  &.error {
    background: rgba($red, 0.1);
    color: $red-dark;
  }
}

// Dark mode
.dark {
  .modal-backdrop {
    background: rgba($black, 0.9);
  }

  .modal-content {
    background: $black;
    color: $white;
    border: 1px solid rgba($white, 0.1);

    h2 {
      color: $white;
    }

    .modal-description {
      color: rgba($white, 0.6);
    }
  }

  .close-button {
    &::before,
    &::after {
      background: $white;
    }

    &:hover::before,
    &:hover::after {
      background: rgba($white, 0.6);
    }
  }

  .form-group {
    label {
      color: rgba($white, 0.6);
    }

    input,
    textarea {
      background: rgba($white, 0.05);
      border-color: rgba($white, 0.2);
      color: $white;

      &:focus {
        border-color: $white;
      }

      &::placeholder {
        color: rgba($white, 0.4);
      }
    }
  }

  .submit-button {
    background: $white;
    color: $black;

    &:hover:not(:disabled) {
      background: rgba($white, 0.9);
    }
  }
}

// Transitions
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
