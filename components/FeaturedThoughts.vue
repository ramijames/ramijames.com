<template>

    <div class="thoughts-container">
      <h2>Other Thoughts</h2>
      <!-- Loading skeleton -->
      <div v-if="!isReady" class="loading-skeleton">
        <div class="skeleton-featured">
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
        </div>
      </div>

      <!-- Main content - only shown after hydration -->
      <div v-else-if="randomArticles.length > 0" class="featured-grid fade-in">
        <nuxt-link
          v-for="article in randomArticles"
          :key="article.slug"
          :to="`/thoughts/${article.slug}`"
          class="featured-card"
        >
          <div class="featured-content">
            <img v-if="article.image" :key="article.image" :src="article.image" :alt="article.title" class="featured-image" />
            <div class="featured-text">
              <h3 class="featured-title">{{ article.title }}</h3>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
  articles: Array
});

// Loading state - wait for hydration to complete
const isReady = ref(false)
const randomArticles = ref([])

onMounted(() => {
  // Pick 4 random articles on client to avoid SSR/hydration mismatch
  const shuffled = [...(props.articles || [])].sort(() => Math.random() - 0.5)
  randomArticles.value = shuffled.slice(0, 6)
  isReady.value = true
})

const searchQuery = ref('');
const selectedCategory = ref(null);

// Categorize articles by their tags
const categorizedArticles = computed(() => {
  const categories = {};
  
  props.articles?.forEach(article => {
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
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-sm;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

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
  max-width: 1600px;
  margin: 0 auto;
  filter: grayscale(100%);
  transition: filter 0.4s ease-in-out;

  &:hover {
    filter: grayscale(0%); 
  }

  @media screen and (max-width: 1600px){
    max-width: 1200px;
  }

  @media screen and (max-width: 1200px){
    max-width: 100%;
  }

  .section-title {
    font-size: 2dvw;
    font-weight: 400;
    line-height: 100%;
    text-wrap: balance;
    position: sticky;
    top: $spacing-md;
    opacity: 0.4;
    padding: $spacing-xl 0;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media screen and (max-width: 1000px) {
      font-size: 4dvw;
      padding: $spacing-md 0;
    }
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

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.dark {
  color: $white;

  .skeleton-card {
    background: linear-gradient(90deg, rgba($white, 0.03) 25%, rgba($white, 0.08) 50%, rgba($white, 0.03) 75%);
    background-size: 200% 100%;
  }

  .featured-title {
    color: $white;
  }

  .featured-image {
    border: 1px solid rgba($white, 0.2);
  }
}

.featured-card {
  transition: all 0.3s ease;
  text-decoration: none;
  min-height: 80px;
}

.featured-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  gap: $spacing-md;
  transition: all 0.3s ease;
  

  &:hover {
    transform: scale(1.02);
    z-index:1;
  }

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
  font-weight: 600;
}

.featured-title {
  font-size: $font-size-md;
  color: $black;
  line-height: 1.4;
  margin: 0;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: $font-size-lg;
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
  border-radius: $br-sm;
  border: 1px solid rgba($black, 0.2);
  object-fit: cover;
  height: 300px;
}


</style>