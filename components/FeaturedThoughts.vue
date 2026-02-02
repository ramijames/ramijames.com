<template>

    <div class="thoughts-container w-consistent">
      <h2>Other Thoughts</h2>
      <!-- Loading skeleton -->
      <div v-if="!isReady" class="loading-skeleton">
        <div class="skeleton-grid">
          <div class="skeleton-card" v-for="n in 6" :key="n"></div>
        </div>
      </div>

      <!-- Main content - only shown after hydration -->
      <div v-else-if="randomArticles.length > 0" class="articles-grid fade-in">
        <nuxt-link
          v-for="article in randomArticles"
          :key="article.slug"
          :to="`/thoughts/${article.slug}`"
          class="article-card"
        >
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-date">{{ formatDate(article.date) }}</p>
            <img v-if="article.image" :key="article.image" :src="article.image" :alt="article.title" class="article-image" />
          </div>
        </nuxt-link>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  articles: Array
});

// Loading state - wait for hydration to complete
const isReady = ref(false)
const randomArticles = ref([])

onMounted(() => {
  // Pick 6 random articles on client to avoid SSR/hydration mismatch
  const shuffled = [...(props.articles || [])].sort(() => Math.random() - 0.5)
  randomArticles.value = shuffled.slice(0, 8)
  isReady.value = true
})

// Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped lang="scss">
// Loading skeleton styles
.loading-skeleton {
  display: grid;
  gap: $spacing-md;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-sm;
}

.skeleton-card {
  background: linear-gradient(90deg, rgba($black, 0.06) 25%, rgba($black, 0.1) 50%, rgba($black, 0.06) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: $br-sm;
  min-height: 200px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// Fade-in animation for content
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.thoughts-container {

  h2 {
    border-top: 1px solid rgba($black, 0.2);
    padding-top: $spacing-lg;
  }
}

.dark {
  .skeleton-card {
    background: linear-gradient(90deg, rgba($white, 0.03) 25%, rgba($white, 0.08) 50%, rgba($white, 0.03) 75%);
    background-size: 200% 100%;
  }

  .article-card {
    background: rgba($white, 1);
    color: $black;
  }

  .article-card:hover {
    background: rgba($blue, 0.2);
  }

  .article-image {
    border: $border;
  }

  .article-date {
    color: rgba($white, 0.3);
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-sm;
}

.article-card {
  overflow: hidden;
  border-radius: $br-sm;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  border: 1px solid rgba($black, 0.2);
  min-height: 200px;
  background: $black;
  color: $white;
}

.article-card:hover {
  transform: translateY(-4px);
}

.article-content {
  padding: $spacing-sm;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.article-image {
  width: 80px;
  position: absolute;
  right: $spacing-sm;
  bottom: $spacing-sm;
  border-radius: $br-xs;
  border: 1px solid rgba($white, 0.2);
}

.article-title {
  font-size: $font-size-lg;
  line-height: $font-size-lg + 4px;
  margin: 0;
}

.article-date {
  font-size: $font-size-xs;
  color: rgba($white, 0.6);
  margin: 0;
}
</style>