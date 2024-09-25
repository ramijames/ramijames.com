<template>
  <section id="composables">
    <h2 class="special-title">Build with Composables First</h2>
  </section>
  <main class="general-main page-top">

    <section class="content">
      <p>Nuxt is a beautiful framework, based on Vue and Vite, for building complex applications quickly. It gives you just enough structure to ensure you don't make too much of a mess, while at the same time it provides you with a lot of easily accessible tools that speed up your development process. I've been building with either Vue or Nuxt since 2018 and if you haven't checked them out, I highly recommend them.</p>

      <h3>About Composables</h3>

      <p><a href="https://nuxt.com/docs/guide/directory-structure/composables">Composables</a> are a way to bundle similar sets of functionality into a single file. You export the functions and the refs, and then you can use them throughout your app. This reduces code duplication and ensures that when you make updates to the composable, the core functionality of your app is all updated at once. It's a clean, sensible pattern.</p>

      <p>The question then is, "how do I group functionality into composables?"</p>

      <p>I think that this is an interesting question that comes down to how you think about development and how you structure your code. For <a href="https://vewrite.com/articles/introducing-vewrite">Vewrite</a>, I've been building composables and have generally broken them down by object type. By this I mean that my <span class="code">composables/</span> folder has a set of files like:</p>

      <ul>
        <li><span class="code">useAction.ts</span></li>
        <li><span class="code">useClient.ts</span></li>
        <li><span class="code">useDeliverable.ts</span></li>
        <li><span class="code">useState.ts</span></li>
        <li><span class="code">useWorkflow.ts</span></li>
        <li><span class="code">etc.</span></li>
      </ul>

      <p>These composables reflect the concepts in my app, and this gives me an easy to remember, sensible mental model for when I'm actually doing the work of building out functionality.</p>

      <p>For example, if I'm building a new feature that involves a client, I know that I can go to <span class="code">useClient.ts</span> and find all the functions and refs that I need to build out that feature. I'll be able to create a new client, update an existing one, delete it, list all of the clients, find a client by project, etc. It's all in there.</p>

      <h3>Composables First</h3>

      <p>One of the things I've been doing lately is building with composables first, before I build any templates or solve front-end issues. From a product perspective, this allows me to start by blocking out big chunks of functionality at the concept level before I have to worry about how it works, or how it looks.</p>

      <p>It reminds me a lot of building with Ruby on Rails (or really, any other MVC framework), where you work from the back-end to the front-end. With Rails, you typically define your model first (i.e., how your object is defined, and how it is reflected in the database), then your controller which houses all of your actions. Lastly, you'll define your views which rely on the functionality that you have built up.</p>

      <p>When I first started using Nuxt and Vue, since I was actually building a front-end, I started from the front-end and worked backwards towards the back-end when I needed to.</p>

      <p>Some of the problems that I encountered with working this way </p>

    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<style lang="scss" scoped>

@import './assets/variables';

#composables {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(0deg, #36C883, #1E7C4F);

  .special-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
    color: $white !important;
    font-size: $font-size-max;
    line-height: 100%;
    font-weight: 900;

    @media screen and (max-width: 768px){
      font-size: $font-size-xl;
    }
  }
}

</style>