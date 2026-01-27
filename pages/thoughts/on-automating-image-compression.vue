<template>

  <PageHeader title="On Automating Image Compression" tagline="Ensure your users have the best experience while avoiding tedium yourself by using CLI and CI/CD tools to automate your process." />

  <main class="w-content page-top">
    <section class="content">

      <h2>Figma's png export defaults are too heavy</h2>
      <p>This website is heavy. It's a personal <nuxt-link to="/products">portfolio</nuxt-link> of my work and shows big images because I want to show off a lot of detail in each piece. Over the years it's added up and some of the pages are not as fast as they should be. We're talking 100+ images that add up to well over 50MB total. It's not the end of the world, but it isn't great.</p>
      <p>Part of the problem is that when you export images from Figma (my main design tool), the PNG compression that they use by default is not great. Figma gives you two options:</p>

      <img src="/articles/compression/figma-png-export-options.png" />

    </section>

    <section class="product-images two-across">
      <div>
        <img src="/articles/compression/test1.png" alt="Exported from Figma using 'Detailed'" class="single-product-image">
        <p class="caption">Exported from Figma using 'Detailed' - 214,951 bytes</p>
      </div>
      <div>
        <img src="/articles/compression/test2.png" alt="Exported from Figma using 'Basic'" class="single-product-image">
        <p class="caption">Exported from Figma using 'Basic' - 208,587 bytes</p>
      </div>
    </section>

    <section class="content">

      <p>Not great.</p>
    
      <p>Historically, I've then manually imported the exported images into another application and re-exported them so that I can get them down another 50-60%. It's a hassle and sometimes I skip it because the laundry list of to-dos is big and I'm short on time.</p>

      <p>The truth is that unless I automate this, I'm going to end up always chasing my tail. So, let's do that.</p>
    </section>
  </main>

  <main class="w-content">
    <section class="content">

      <h2>Automating image compression locally</h2>

      <p>I recently poked around some command-line tools for compression. There are a lot of options, but the best seem to be <a href="https://pngquant.org/">pngquant</a> and <a href="https://github.com/tjko/jpegoptim">jpegoptim</a>. They are fairly cross-platform and free. Both big bonuses in my book.</p>

      <p>I want to use CLI tools because they:</p>

      <ul>
        <li>Work across entire projects, not one file at a time</li>
        <li>Are easy to automate (CI, build scripts, pre-deploy steps)</li>
        <li>Produce consistent, repeatable results</li>
        <li>Are not GUI tools which means no manual exporting required</li>
      </ul>

      <img src="/articles/compression/test1.png" alt="Exported from Figma using 'Detailed'" class="single-product-image">

      <p>Compressed using pngquant - 59,449 bytes</p>

      <h3>Step 1: Install the Tools</h3>

      <h4>macOS (Homebrew)</h4>

      <CodeBlock code="brew install pngquant jpegoptim" lang="bash" />

      <h4>Linux</h4>

      <p>Ubuntu / Debian:</p>
      <CodeBlock :code="`sudo apt update\nsudo apt install pngquant jpegoptim`" lang="bash" />

      <p>Fedora:</p>
      <CodeBlock code="sudo dnf install pngquant jpegoptim" lang="bash" />

      <p>Arch:</p>
      <CodeBlock code="sudo pacman -S pngquant jpegoptim" lang="bash" />

      <p>You can then verify installation with:</p>

      <CodeBlock :code="`pngquant --version\njpegoptim --version`" lang="bash" />

      <h3>Step 2: Compress PNGs</h3>

      <h4>Single PNG file compression</h4>

      <CodeBlock :code='`pngquant --quality=65-85 --force --ext .png image.png`' lang="bash" />

      <h4>Recursively compress all PNGs in a project</h4>

      <CodeBlock :code='`find ./website-folder -type f -name \"*.png\" -exec pngquant --skip-if-larger --ext .png --quality=65-85 {} \\;`' lang="bash" />

      <p>
        This command recursively finds all PNG files, compresses them in place,
        preserves filenames, and applies a quality range suitable for most web UI
        and illustration assets. It will skip the file if larger, meaning that it won't try to recompress files that it has already compressed.
      </p>

      <h3>Step 3: Compress JPGs</h3>

      <h4>Single JPG file compression</h4>

      <CodeBlock :code='`jpegoptim --strip-all --max=85 image.jpg`' lang="bash" />

      <h4>Recursively compress all JPGs in a project</h4>

      <CodeBlock :code='`find ./website-folder \\( -iname \"*.jpg\" -o -iname \"*.jpeg\" \\) -type f -exec jpegoptim --strip-all --max=85 {} \\;`' lang="bash" />

      <p>
        <code>--max=85</code> applies strong compression with minimal visual loss, while
        <code>--strip-all</code> removes EXIF and metadata. Files are overwritten in place.
      </p>

      <h3>Optional: Parallel Processing!</h3>

      <p>
        Parallel execution is especially useful on Linux servers and modern multi-core Macs.
      </p>

      <CodeBlock :code='`# PNGs\nfind ./website-folder -type f -name \"*.png\" -print0 \\\n  | xargs -0 -P 4 pngquant --force --ext .png --quality=65-85\n\n# JPGs\nfind ./website-folder \\( -iname \"*.jpg\" -o -iname \"*.jpeg\" \\) -type f -print0 \\\n  | xargs -0 -P 4 jpegoptim --strip-all --max=85`' lang="bash" />

      <p>
        Increase the <code>-P</code> value based on available CPU cores.
        These commands are safe for CI runners and build servers.
      </p>

      <h3>Optional: Skip Small Images</h3>

      <p>
        You can avoid processing files that won’t meaningfully benefit from compression.
      </p>

      <CodeBlock :code='`# PNGs larger than 50KB\nfind ./website-folder -type f -name \"*.png\" -size +50k \\\n  -exec pngquant --force --ext .png --quality=65-85 {} \\;\n\n# JPGs larger than 50KB\nfind ./website-folder \\( -iname \"*.jpg\" -o -iname \"*.jpeg\" \\) -type f -size +50k \\\n  -exec jpegoptim --strip-all --max=85 {} \\;`' lang="bash" />

    </section>
  </main>

  <main class="w-content">
    <section class="content">

      <h2>Integrating Image Compression into CI/CD</h2>

      <p>
        Image compression works best when it is automated.
        By running optimization in your CI pipeline, you ensure that all images
        merged into your main branch are consistently compressed without relying
        on manual developer steps.
      </p>

      <h3>Basic CI Strategy</h3>

      <ul>
        <li>Install image optimization tools in the CI environment</li>
        <li>Run compression as part of the build or pre-deploy step</li>
        <li>Fail or warn if unoptimized images are detected (optional)</li>
      </ul>

      <p>
        Most Linux-based CI runners (GitHub Actions, GitLab CI, Bitbucket, Netlify)
        support <code>pngquant</code> and <code>jpegoptim</code> out of the box.
      </p>

      <h3>Example: GitHub Actions</h3>

      <CodeBlock :code='`name: Optimize Images\n\non:\n  pull_request:\n  push:\n    branches: [main]\n\njobs:\n  compress-images:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout repository\n        uses: actions/checkout@v4\n\n      - name: Install image tools\n        run: |\n          sudo apt update\n          sudo apt install -y pngquant jpegoptim\n\n      - name: Compress PNGs\n        run: |\n          find ./website-folder -type f -name \"*.png\" \\\n            -exec pngquant --force --ext .png --quality=65-85 {} \\;\n\n      - name: Compress JPGs\n        run: |\n          find ./website-folder \\( -iname \"*.jpg\" -o -iname \"*.jpeg\" \\) -type f \\\n            -exec jpegoptim --strip-all --max=85 {} \\;`' lang="yaml" />

      <p>
        This workflow ensures that all images committed to the repository
        are optimized before deployment.
      </p>

      <h3>CI Optimization Tips</h3>

      <ul>
        <li>Run compression only on changed files to speed up builds</li>
        <li>Pair with version control so diffs clearly show size reductions</li>
        <li>Use parallel execution for large asset directories</li>
        <li>Consider failing the build if images exceed a size threshold</li>
      </ul>

      <p>
        Once integrated into CI, image optimization becomes a default behavior
        rather than a manual cleanup step, leading to consistently faster builds
        and better performance in production. Who doesn't want that, right?
      </p>


    </section>

  </main>
  <PostsExtras />
  <Footer />
</template>

<script setup>

import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

useHead({
  title: 'On Image Compression'
})

useSeoMeta({
  title: 'On Automating Image Compression',
  ogTitle: 'On Automating Image Compression',
  description: 'Ensure your users have the best experience while avoiding tedium yourself by using CLI and CI/CD tools to automate your process.',
  ogDescription: 'Ensure your users have the best experience while avoiding tedium yourself by using CLI and CI/CD tools to automate your process.',
  ogImage: '/articles/automating-image-compression.png',
  url: 'https://www.ramijames.com/thoughts/on-automating-image-compression',
  twitterTitle: 'On Automating Image Compression',
  twitterDescription: 'Ensure your users have the best experience while avoiding tedium yourself by using CLI and CI/CD tools to automate your process.',
  twitterImage: '/articles/automating-image-compression.png',
  twitterCard: 'summary_large_image'
})

</script>
