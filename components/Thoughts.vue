<template>

  <div class="thoughts-container w-consistent">
    <!-- Loading skeleton -->
    <div v-if="!isReady" class="loading-skeleton">
      <div class="skeleton-featured">
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
      </div>
      <div class="skeleton-filters"></div>
      <div class="skeleton-grid">
        <div class="skeleton-card small" v-for="n in 4" :key="n"></div>
      </div>
    </div>

    <!-- Main content - only shown after hydration -->
    <template v-else>
      <!-- Featured Articles Section -->
      <div v-if="featuredArticles && featuredArticles.length > 0" class="featured-section fade-in">
        <div class="featured-grid">
          <nuxt-link
            v-for="article in featuredArticles"
            :key="article.slug"
            :to="`/thoughts/${article.slug}`"
            class="featured-card"
          >
            <div class="featured-content">
              <div class="featured-text">
                <span class="featured-label">Featured</span>
                <h2 class="featured-title">{{ article.title }}</h2>
                <p class="featured-date">{{ formatDate(article.date) }}</p>
              </div>
              <img v-if="article.image" :key="article.image" :src="article.image" :alt="article.title" class="featured-image" />
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="filter-container fade-in">
        <button
          @click="selectedCategory = null"
          :class="['filter-pill', { active: selectedCategory === null }]"
        >
          All
        </button>
        <button
          v-for="category in availableCategories"
          :key="category"
          @click="selectedCategory = category"
          :class="['filter-pill', { active: selectedCategory === category }]"
        >
          {{ category }}
          <span class="count">{{ categorizedArticles[category].length }}</span>
        </button>
      </div>

      <div class="search-container fade-in">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles by title"
          class="search-input"
        />
      </div>

      <div v-if="Object.keys(filteredArticles).length === 0" class="empty-state fade-in">
        <div class="empty-state-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No articles found</h3>
          <p>Try adjusting your search query or selected category</p>
        </div>
      </div>

      <div v-for="(articles, category) in filteredArticles" :key="category" class="category-section fade-in">
        <h3 class="category-title">{{ category }}</h3>
        <div class="articles-grid">
          <nuxt-link :to="`/thoughts/${article.slug}`" :key="article.slug" v-for="article in articles" class="article-card">
            <div class="article-content">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-date">{{ formatDate(article.date) }}</p>
              <img v-if="article.image" :key="article.image" :src="article.image" :alt="article.title" class="article-image" />
            </div>
          </nuxt-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';

import articles from '~/assets/articles.json'

// Loading state - wait for hydration to complete
const isReady = ref(false)

onMounted(() => {
  isReady.value = true
})

// Get the two latest articles as featured
const featuredArticles = computed(() => articles.slice(0, 2))

// Get remaining articles (excluding the first two)
const regularArticles = computed(() => articles.slice(2))

const searchQuery = ref('');
const selectedCategory = ref(null);

// Categorize articles by their tags
const categorizedArticles = computed(() => {
  const categories = {};
  
  articles?.forEach(article => {
    article.tags.forEach(tag => {
      // Capitalize first letter of tag for display
      const categoryName = tag.charAt(0).toUpperCase() + tag.slice(1);
      
      if (!categories[categoryName]) {
        categories[categoryName] = [];
      }
      
      // Only add if not already in this category (in case of duplicate tags)
      if (!categories[categoryName].find(a => a.slug === article.slug)) {
        categories[categoryName].push(article);
      }
    });
  });
  
  // Sort articles within each category by date (newest first)
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => new Date(b.date) - new Date(a.date));
  });
  
  return categories;
});

// Get list of available categories sorted alphabetically
const availableCategories = computed(() => {
  return Object.keys(categorizedArticles.value).sort();
});

// Filter articles based on search query and selected category
const filteredArticles = computed(() => {
  let result = categorizedArticles.value;

  // Filter by selected category first
  if (selectedCategory.value) {
    result = {
      [selectedCategory.value]: result[selectedCategory.value]
    };
  }

  // Then filter by search query
  if (!searchQuery.value.trim()) {
    return result;
  }

  const query = searchQuery.value.toLowerCase();
  const filtered = {};

  Object.entries(result).forEach(([category, articles]) => {
    // Check if category matches the search
    const categoryMatches = category.toLowerCase().includes(query);
    
    // Filter articles that match the search query
    const matchingArticles = articles.filter(article => {
      return categoryMatches || 
             article.title.toLowerCase().includes(query) ||
             article.tags.some(tag => tag.toLowerCase().includes(query));
    });

    // Only include the category if it has matching articles
    if (matchingArticles.length > 0) {
      filtered[category] = matchingArticles;
    }
  });

  return filtered;
});

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

.skeleton-featured {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-lg;
  border-bottom: 1px solid rgba($black, 0.1);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.skeleton-card {
  background: linear-gradient(90deg, rgba($black, 0.06) 25%, rgba($black, 0.1) 50%, rgba($black, 0.06) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: $br-sm;
  min-height: 280px;

  &.small {
    min-height: 200px;
  }
}

.skeleton-filters {
  height: 36px;
  width: 60%;
  background: linear-gradient(90deg, rgba($black, 0.06) 25%, rgba($black, 0.1) 50%, rgba($black, 0.06) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: $br-sm;
  margin-bottom: $spacing-sm;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-sm;
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

.dark {
  .skeleton-card,
  .skeleton-filters {
    background: linear-gradient(90deg, rgba($white, 0.03) 25%, rgba($white, 0.08) 50%, rgba($white, 0.03) 75%);
    background-size: 200% 100%;
  }


  .featured-card {
    border: $border;
    border-radius: $br-sm;
    background: rgba($blue, 0.1);

    &:hover {
      background: rgba($blue, 0.2);
      border-color: rgba($blue, 0.5);
      box-shadow: 0 8px 24px rgba($blue, 0.2);
    }
  }

  .featured-label {
    color: rgba($blue, 0.8);
  }

  .featured-title {
    color: $white;
  }

  .featured-image {
    border: $border;
  }

  .filter-pill {
    border: $border;
    background: rgba($blue, 0.05);
    color: rgba($white, 0.7);

    &:hover {
      background: rgba($blue, 0.1);
      border-color: rgba($blue, 0.3);
    }

    &.active {
      background: rgba($blue, 0.3);
      border-color: rgba($blue, 0.5);
    }

    .count {
      background: rgba($white, 0.1);
    }
  }

  .search-container {
    border-bottom: none;
  }

  .search-input {
    border: $border;
    background: rgba($blue, 0.05);

    &::placeholder {
      color: rgba($white, 0.3);
    }

    &:focus {
      outline: none;
      background: rgba($blue, 0.1);
      border-color: rgba($blue, 0.5);
    }
  }

  .empty-state-content {
    color: rgba($white, 0.5);
    
    h3 {
      color: $white;
    }
  }

  .article-card {
    border: $border;
    background: rgba($blue, 0.05);
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

.thoughts-container {
  display: grid;
  min-height: 100vh;

  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: $font-size-lg;
    }
  }

  h4 {
    color: rgba($black, 0.3);
    margin: 0;
  }

  hr {
    width: 100%;
    margin: $spacing-md 0;
  }

}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin-bottom: $spacing-sm;

  @media screen and (max-width: 768px) {
    gap: 4px;
  }
}

.featured-section {
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-lg;
  border-bottom: 1px solid rgba($black, 0.2);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.featured-card {
  border: 1px solid rgba($black, 0.2);
  border-radius: $br-sm;
  background: rgba($blue, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  overflow: hidden;
  min-height: 280px;

  &:hover {
    transform: translateY(-6px);
    background: rgba($blue, 0.2);
    border-color: rgba($blue, 0.5);
    box-shadow: 0 8px 24px rgba($blue, 0.2);
  }
}

.featured-content {
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: $spacing-md;
}

.featured-text {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.featured-label {
  font-family: $font-family-secondary;
  font-size: $font-size-xs;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba($blue, 0.8);
  font-weight: 600;
}

.featured-title {
  font-size: $font-size-xxl;
  line-height: 1;
  margin: 0;
  color: $black;

  @media screen and (max-width: 768px) {
    font-size: $font-size-xl;
  }
}

.featured-date {
  font-size: $font-size-sm;
  opacity: 0.5;
  margin: 0;
}

.featured-image {
  width: 100%;
  height: auto;
  border-radius: $br-xs;
  border: 1px solid rgba($black, 0.2);
  object-fit: cover;
  max-height: 200px;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin-bottom: $spacing-sm;

  @media screen and (max-width: 768px) {
    gap: 4px;
  }
}

.filter-pill {
  padding: 6px $spacing-xs 4px;
  border: 1px solid rgba($black, 0.2);
  border-radius: $br-sm;
  background: rgba($blue, 0.05);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  box-shadow: none;
  color: rgba($black, 0.7);
  font-family: $font-family-secondary;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;

  @media screen and (max-width: 768px) {
    letter-spacing: initial;
    text-transform: initial;
  }

  &:hover {
    background: rgba($blue, 0.1);
    border-color: rgba($blue, 0.3);
  }

  &.active {
    background: rgba($blue, 0.3);
    border-color: rgba($blue, 0.5);
  }

  .count {
    font-size: $font-size-xs;
    background: rgba($black, 0.1);
    padding: 3px 5px;
    border-radius: 9999px;
    min-width: 16px;
    text-align: center;
  }
}

.search-container {
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-sm;
  border-bottom: $border;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-md;
  border: 1px solid rgba($black, 0.2);
  border-radius: $br-sm;
  background: rgba($blue, 0.05);
  transition: all 0.2s;

  &::placeholder {
    color: rgba($black, 0.3);
  }

  &:focus {
    outline: none;
    background: rgba($blue, 0.1);
    border-color: rgba($blue, 0.5);
  }
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
}

.empty-state-content {
  text-align: center;
  color: rgba($black, 0.5);
  
  h3 {
    margin-top: $spacing-md;
    margin-bottom: $spacing-sm;
    color: $black;
  }

  p {
    margin: 0;
    font-size: $font-size-sm;
  }
}

.empty-icon {
  opacity: 0.3;
  margin-bottom: $spacing-sm;
}

.category-section {
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 400px 1fr;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }
}

.category-title {
  font-size: $font-size-xl;
  margin-bottom: $spacing-md;
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
  background: rgba($blue, 0.05);
}

.article-card:hover {
  transform: translateY(-4px);
  background: rgba($blue, 0.2);
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
  border: 1px solid rgba($black, 0.2);
}

.article-title {
  font-size: $font-size-lg;
  line-height: $font-size-lg + 4px;
  margin: 0;
}

.article-date {
  font-size: $font-size-xs;
  color: rgba($black, 0.4);
  margin: 0;
}
</style>