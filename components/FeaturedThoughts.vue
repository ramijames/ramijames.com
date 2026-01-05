<template>
  
  <div class="thoughts-container">
    <h2>Featured Articles</h2>
    <!-- Featured Articles Section -->
    <div v-if="props.featuredArticles && props.featuredArticles.length > 0" class="featured-section">
      <div class="featured-grid">
        <nuxt-link 
          v-for="article in props.featuredArticles" 
          :key="article.slug"
          :to="`/thoughts/${article.slug}`" 
          class="featured-card"
        >
          <div class="featured-content">
            <div class="featured-text">
              <h3 class="featured-title">{{ article.title }}</h3>
              <p class="featured-date">{{ formatDate(article.date) }}</p>
            </div>
            <img v-if="article.image" :src="article.image" :alt="article.title" class="featured-image" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  featuredArticles: Array,
  articles: Array
});

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

@import './assets/variables';
@import './assets/animation';

.thoughts-container {
  display: grid;
  padding: $spacing-xl;

  @media screen and (max-width: 1200px) {
    padding: $spacing-md;
  }

  @media screen and (max-width: 768px) {
    padding: $spacing-sm;
  }

  h2 {
    margin: 0 0 $spacing-lg;
  }

  h3 {
    margin: 0;
    font-size: $font-size-lg;

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

.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.featured-card {
  border: 1px solid rgba($black, 0.2);
  border-radius: $br-md;
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
  padding: $spacing-md;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: $spacing-md;

  @media screen and (max-width: 1600px) {
    padding: $spacing-md;
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
  font-size: $font-size-xxl;
  line-height: 1;
  margin: 0;

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


</style>