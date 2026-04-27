<template>

    <div class="thoughts-container">
      <h2>Other Thoughts</h2>
      <div v-if="!isReady" class="loading-skeleton">
        <div class="skeleton-grid">
          <div class="skeleton-card" v-for="n in 6" :key="n"></div>
        </div>
      </div>

      <div v-else-if="randomArticles.length > 0" class="articles-grid">
        <nuxt-link
          v-for="article in randomArticles"
          :key="article.slug"
          :to="`/thoughts/${article.slug}`"
          class="article-card"
        >
          <svg class="article-card-border" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <rect class="article-card-border-rect" fill="none" stroke="currentColor" stroke-width="2" pathLength="100"/>
          </svg>
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

const isReady = ref(false)
const randomArticles = ref([])

onMounted(() => {
  const shuffled = [...(props.articles || [])].sort(() => Math.random() - 0.5)
  randomArticles.value = shuffled.slice(0, 8)
  isReady.value = true
})

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
  background: rgba($black, 0.06);
  border-radius: $br-sm;
  min-height: 300px;
}

.thoughts-container {

  h2 {
    border-top: 1px solid rgba($black, 0.2);
    padding-top: $spacing-lg;
  }
}

.dark {
  .skeleton-card {
    background: rgba($white, 0.06);
  }

  .article-card {
    background: rgba($white, .1);
    color: $white;
  }

  .article-card:hover {
    background: rgba($white, 0.2);
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
  position: relative;
  overflow: visible;
  border-radius: $br-sm;
  text-decoration: none;
  border: 1px solid rgba($black, 0.2);
  min-height: 300px;
  background: $black;
  color: $white;

  &:hover {
    .article-card-border {
      opacity: 1;

      .article-card-border-rect {
        animation: article-card-trace 0.5s ease forwards;
      }
    }
  }
}

.article-card-border {
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  pointer-events: none;
  overflow: visible;
  opacity: 0;
}

.article-card-border-rect {
  width: 100%;
  height: 100%;
  rx: $br-sm;
  ry: $br-sm;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  vector-effect: non-scaling-stroke;
}

@keyframes article-card-trace {
  to { stroke-dashoffset: 0; }
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
  font-size: calc(var(--h1-size) * 0.45);
  line-height: 1.1;
  margin: 0;
}

.article-date {
  font-size: $font-size-xs;
  color: rgba($white, 0.6);
  margin: 0;
}
</style>
