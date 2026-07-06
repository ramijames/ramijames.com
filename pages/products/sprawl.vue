<template>

  <ProjectsOverview
    title="Sprawl"
    tagline="A spatial workbench for the way you actually work."
    overview="Sprawl is a native macOS developer environment built on one infinite, zoomable canvas. Instead of juggling windows and tabs, you place live terminals, code editors, and browsers wherever they make sense, grouped into projects that all stay visible at once. It's written in Swift and AppKit, so every panel is a real, GPU-composited native view, and the whole layout is saved and restored exactly as you left it."
    :services="['Product', 'Design', 'Development']"
  />

  <main class="w-consistent">

    <div>

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>One canvas instead of a pile of windows</h3>
              <p>Development work scatters across terminals, editors, browser tabs, and whatever window manager you've bolted on top. Sprawl replaces that with a single infinite surface you pan and zoom, laying related shells and files side by side so an entire project is visible at a glance. Figma-style snapping keeps things aligned, and one-step auto-tiling arranges a project's windows into a tidy layout whenever the canvas gets busy.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="Sprawl canvas" class="single-product-image" />
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Real tools, natively</h3>
              <p>There's no web view here. Terminals run your login shell over a real PTY, so they behave exactly like the ones in your favourite emulator. The code editor points at a repository, browses the file tree, and edits files with syntax highlighting and autosave, alongside a tabbed browser with ad and tracker blocking built in. Every panel stays live and interactive at any zoom level.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="Sprawl panels" class="single-product-image" />
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Editor-grade code intelligence</h3>
              <p>The editor speaks the Language Server Protocol, so you get autocomplete, go-to-definition, diagnostics, hover, signature help, format-on-command, and rename-across-files, with Swift and JS/TS working out of the box. An in-panel git view shows uncommitted changes as a side-by-side diff you can stage and commit without leaving the canvas.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="Sprawl code intelligence" class="single-product-image" />
            </div>
          </section>

        </section>
      </section>
    </div>

  </main>
  <section class="more-products w-consistent">
    <h3>More products</h3>
    <Portfolio random="3" />
  </section>
  <Footer />

</template>

<script setup>
useHead({
  title: () => `Sprawl`
})

useSeoMeta({
  title: 'Sprawl',
  ogTitle: 'Sprawl',
  description: 'Sprawl is a native macOS developer environment built on one infinite, zoomable canvas, with live terminals, code editors, and browsers grouped into projects.',
  ogDescription: 'A native macOS developer environment on one infinite canvas: live terminals, code editors, and browsers, grouped into projects.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/sprawl',
  twitterTitle: 'Sprawl',
  twitterDescription: 'A native macOS developer environment on one infinite canvas: live terminals, code editors, and browsers, grouped into projects.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>
