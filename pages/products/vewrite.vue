<template>

  <section class="product-splash">
      <section class="product-intro">
        <div class="product-intro-brand vewrite">
          <img src="/products/vewrite/ve-logo.svg" alt="Vewrite Logo" class="product-logo">
          <h2 class="product-title">Vewrite</h2>
        </div>
      </section>
      <section class="product-teasers">
        <section class="product-teaser vewrite-website-show"></section>
        <section class="product-teaser vewrite-new"></section>
      </section>
    </section>

  <section class="w-three-quarters">
    <h2>Product Vision</h2>
    <p>The product vision of Vewrite is to provide the optimal project management experience for teams of content creators who are focused on providing written content to clients.</p>
    <h3>My Role as Founder</h3>
    <p>I am the Founder and sole developer of Vewrite. I lead the product concept, create the user experience, craft the user interface, and implement everything with Nuxt and Supabase. Vewrite is currently in <a href="https://github.com/ramijames/vewrite/">active development</a>.</p>
  </section>

  <section class="w-three-quarters">
    <h2>Branding</h2>
    <p>As part of the product development, I created a modern, fresh brand for use within the application, the website, and for uses like advertising and marketing. It is simple, memorable, and professional. The colors were selected to represent the transition from incomplete to complete, as an expression of the work that Vewrite's users do.</p>
    <img src="/products/vewrite/ve-brand.png" alt="Vewrite Brand" class="single-product-image">
    <img src="/products/vewrite/ve-palette.png" alt="Vewrite Brand" class="single-product-image">
  </section>

  <section class="w-three-quarters">
    <h2>Product Features</h2>
    <h3>Project Management and Workflows</h3>
    <p>The primary use-case for Vewrite is as a way to create workflows that have states so that complex projects with multiple writers and stakeholders can be managed effortlessly. The deliverables that users create are pushed through these states, promoting a consistent and structured approach to the work that the content creation team is doing. Where possible, automation is used to smooth the process and ensure that tasks are completed asap.</p>
    <p>The writing experience within Vewrite can be automated to link to external documents, for example in Google Docs, but the primary expectation is for writers to be able to get their work done in situ from within the app. Where the project management happens, writers can get their work done, too. When they are ready, they can simply move the deliverable to the next state in the workflow. This means that when it is time for a stakeholder to review, it is as easy as a click of a button.</p>
  </section>

  <section class="w-full">
    <section class="product-images three-across">
      <img src="/products/vewrite/ve-projects.png" alt="" class="single-product-image">
      <img src="/products/vewrite/ve-workflowcreation.png" alt="" class="single-product-image">
      <img src="/products/vewrite/ve-deliverable.png" alt="" class="single-product-image">
    </section>
  </section>

  <section class="w-three-quarters">
    <h3>Teams and Clients</h3>
    <p>How a manager assembles their team within Vewrite is very straightforward. They simply input an email address and invite that user to the team they will use for their next project.</p>
    <p>Clients are the entity that projects are created for. Both teams and clients are a predicate for a project's creation.</p>
  </section>

  <section class="w-full">
    <section class="product-images two-across">
      <img src="/products/vewrite/ve-teams.png" alt="" class="single-product-image">
      <img src="/products/vewrite/ve-clients.png" alt="" class="single-product-image">
    </section>
  </section>

  <hr>

  <MergedProjects />
  <Footer />
</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue';

let image = ref(null);

onMounted(() => {
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const rotationAngle = Math.max(0, 20 - scrollPosition / 20);
    image.value.style.transform = `rotate3d(1, 0, 0, ${rotationAngle}deg)`;
  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

</script>