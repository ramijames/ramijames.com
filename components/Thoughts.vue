<template>
  
  <div class="thoughts-container">
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search articles by title"
        class="search-input"
      />
    </div>

    <div v-if="Object.keys(filteredArticles).length === 0" class="empty-state">
      <div class="empty-state-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h3>No articles found</h3>
        <p>Try adjusting your search query</p>
      </div>
    </div>

    <div v-for="(articles, category) in filteredArticles" :key="category" class="category-section">
      <h3 class="category-title">{{ category }}</h3>
      <div class="articles-grid">
        <nuxt-link :to="`/thoughts/${article.slug}`" :key="article.slug" v-for="article in articles" class="article-card">
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-date">{{ formatDate(article.date) }}</p>
            <img v-if="article.image" :src="article.image" :alt="article.title" class="article-image" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  articles: Array
});

const searchQuery = ref('');

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

// Filter articles based on search query
const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) {
    return categorizedArticles.value;
  }

  const query = searchQuery.value.toLowerCase();
  const filtered = {};

  Object.entries(categorizedArticles.value).forEach(([category, articles]) => {
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
  background: rgba($blue, 0.05);

  @media screen and (max-width: 1200px) {
    padding: $spacing-md;
  }

  @media screen and (max-width: 768px) {
    padding: $spacing-sm;
  }

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
    color: rgba($white, 0.3);
    margin: 0;
  }

  hr {
    width: 100%;
    margin: $spacing-md 0;
  }

}

.search-container {
  margin-bottom: $spacing-lg;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-md;
  border: $border;
  border-radius: $br-sm;
  background: rgba($blue, 0.05);
  color: $white;
  transition: all 0.2s;

  &::placeholder {
    color: rgba($white, 0.3);
  }

  &:focus {
    outline: none;
    background: rgba($blue, 0.1);
    border-color: rgba($blue, 0.5);
    box-shadow: 0 0 0 3px rgba($blue, 0.1);
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
  color: rgba($white, 0.5);
  
  h3 {
    margin-top: $spacing-md;
    margin-bottom: $spacing-sm;
    color: $white;
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
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
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
  border: $border;
  min-height: 200px;
  background: rgba($blue, 0.05);
}

.article-card:hover {
  transform: translateY(-4px);
  background: rgba($blue, 0.2);
  box-shadow: 0 10px 20px rgba($black, .8);
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
  border: $border;
}

.article-title {
  font-size: $font-size-lg;
  line-height: $font-size-lg + 4px;
  margin: 0;
}

.article-date {
  font-size: $font-size-xs;
  color: rgba($white, 0.3);
  margin: 0;
}

.article-summary {
  font-size: 0.938rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  color: #374151;
  border-radius: 9999px;
}
</style>