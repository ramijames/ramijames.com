<template>

    <div class="thoughts-container w-consistent">
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
  min-height: 200px;
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
  overflow: hidden;
  border-radius: $br-sm;
  text-decoration: none;
  border: 1px solid rgba($black, 0.2);
  min-height: 200px;
  background: $black;
  color: $white;
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
