<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/crisp-tools/crisp-logo-white.svg" alt="Crisp Tools Logo" class="product-logo">
      <h1 class="hyper-bold">Crisp Tools</h1>
      <h4 class="centered">A simple, useful set of tools for designers and developers to work faster and be happier</h4>
      <div class="main-product-image">
        <img src="/products/crisp-tools/crisp-tools-home.png" alt="Crisp Tools Logo">
      </div>
      <section class="product-bar">
        <section class="links">
          <a href="https://crisptools.dev" target="_blank">Github Repo</a>
        </section>
        <section class="buttons">
          <a href="https://crisptools.dev" target="_blank" class="button">Visit Crisp Tools</a>
        </section>
      </section>
    </section>
    <section class="product-content">
      <h2>The CrispTools Story</h2>
      <aside class="story-time">
        <p>As with many products, CrispTools came about while trying to scratch a personal need. Necessity is the mother of invention, as they say.</p>

        <p>During my day-to-day work and play, there are a handful of tools, scattered across the web, that I find that I use regularly. They work well enough, but the interfaces are often clunky, and it can interrupt the flow of the work that I am doing.</p>

        <p>So, I decided to build a simple, clean, and easy-to-use set of tools that I could use to speed up my workflow. I wanted to build something that was fun to use, and that would make me happy to use it.</p>

        <p>And so, CrispTools was born.</p>

        <p>A secondary consideration was the opportunity to fully learn Vue.js 3 and its composition API. The last time that I dug deep and built a product with Vue, it was Scatter, with Vue.js 2 and it felt like it was time to update my knowledge about that stack.</p>

        <p>Instead of starting as I usually do, with some sketches in Figma, I jumped straight into building some of the smaller tools so that I could become comfortable with the stack before I got to some of the more complicated sets of functionality that I had in mind. It went well, and within a couple of weeks I had developed a series of initial mini-apps and a brand plus interface to hold them together.</p>

        <p>The initial release of CrispTools launched in April of 2024.</p>

        <h4>Feature Roadmap</h4>
        <p>The intent is to have a robust set of tools that are useful for designers and developers. I should be able to open CrispTools up and not have to use any other external tool which I am working throughout the day.</p>

        <p>There are many features that I would like to add to CrispTools over the coming months. These have all been vetted as personally useful. I'm breaking them down into discrete groups, and will likely work on them as sets of functionality which will be released together.</p>
      </aside>

      <section class="features">
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-pdf.svg" alt="Crisp PDF" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>PDF Tools</strong></p>
            <ul>
              <li>PDF join</li>
              <li>PDF split</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-image.svg" alt="Crisp Image" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Image Tools</strong></p>
            <ul>
              <li>Image compression</li>
              <li>Image to text</li>
              <li>Image to PDF</li>
              <li>Image to base64</li>
              <li>Image to ASCII</li>
              <li>Image to URL</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-color.svg" alt="Crisp Color" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Color Tools</strong></p>
            <ul>
              <li>Palette Generator</li>
              <li>Lighten</li>
              <li>Darken</li>
              <li>RGB/HEX converter</li>
              <li>Contrast tools</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-convert.svg" alt="Crisp Converter" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Converter Tools</strong></p>
            <ul>
              <li>Number base</li>
              <li>YAML</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-timeanddate.svg" alt="Crisp Time" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Time and Date</strong></p>
            <ul>
              <li>Unix Timestamp Converter</li>
              <li>Lunar cycle</li>
              <li>Days/month left in the year</li>
              <li>Time / location conversion</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-encoders.svg" alt="Crisp Encoders" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Encoders/decoders</strong></p>
            <ul>
              <li>JWT</li>
              <li>Base64</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-format.svg" alt="Crisp Formatters" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Formatters</strong></p>
            <ul>
              <li>JSON</li>
              <li>XML</li>
              <li>SQL</li>
              <li>HTML</li>
              <li>Markdown</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-generate.svg" alt="Crisp Generators" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Generator Tools</strong></p>
            <ul>
              <li>Hashing</li>
              <li>UUID</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-text.svg" alt="Crisp Text" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Text Tools</strong></p>
            <ul>
              <li>Typography</li>
              <li>Lorem Ipsum</li>
            </ul>
          </section>
        </div>
        <div class="single-feature">
          <img src="/products/crisp-tools/crisp-icon.svg" alt="Crisp Icons" class="single-feature-image">
          <section class="single-feature-text">
            <p><strong>Icon Tools</strong></p>
            <ul>
              <li>Favicon</li>
              <li>iOS</li>
              <li>Android</li>
              <li>Windows</li>
            </ul>
          </section>
        </div>

      </section>
    </section>

    <hr>

    <!-- <section class="product-content-bg crisp-bg">
      <section class="product-content">
        <h2>Product Vision</h2>
        <p>There are many types of small, critical tools which can speed up design or development workflows, which do not fall under a more general tool like Figma or Visual Studio.</p> 
        <p>Tools that will be included in this product are:</p>
        <ul>
          <li><strong>PDF Tools</strong> - PDF join, PDF split</li>
          <li><strong>Image Tools</strong> - Image compression, Image to text, Image to PDF, Image to base64, Image to ASCII, Image to URL</li>
          <li><strong>Color Tools</strong> - Palette Generator, Lighten, Darken, RGB/HEX converter, Contrast tools</li>
          <li><strong>Converter Tools</strong> - Number base, YAML</li>
          <li><strong>Time and Date</strong> - Unix Timestamp Converter, Lunar cycle, Days/month left in the year, Time / location conversion</li>
          <li><strong>Encoders/decoders</strong> - JWT, Base64</li>
          <li><strong>Formatters</strong> - JSON, XML, SQL, HTML, Markdown</li>
          <li><strong>Generator Tools</strong> - Hashing, UUID</li>
          <li><strong>Text Tools</strong> - Typography, Lorem Ipsum</li>
          <li><strong>Icon Tools</strong> - Favicon, iOS, Android, Windows</li>
        </ul>
      </section>
    </section> -->
    <section class="product-content">
      <h2>Brand</h2>
      <p class="centered">The Crisptools brand concept is intended to be simple and clean. The logo is a "crisp", or potato chip. Small, bite-sized bits that taste good on their own.</p>
      <img src="/products/crisp-tools/crisp-logo-brand.svg" alt="Crisp Tools Logo" class="single-product-image">
      <p class="centered">The associated iconography is customized to reflect the simple, bright nature of the brand. Icons are fun, clear, and easy to understand.</p>
      <img src="/products/crisp-tools/crisp-icons-brand.svg" alt="Crisp Tools Icons" class="single-product-image">

      <hr>

      <h2>Interface Design</h2>
      <p>The interface design is intended to be simple and clean. The color palette is bright and fun, with a focus on usability and clarity.</p>
    </section>
    <section class="product-images">
      <img src="/products/crisp-tools/crisp-tools-home.png" alt="Crisp Tools Home" class="single-product-image">
      <img src="/products/crisp-tools/crisp-tools-palette.png" alt="Crisp Tools Color" class="single-product-image">
      <img src="/products/crisp-tools/crisp-tools-darken.png" alt="Crisp Tools Image" class="single-product-image">
      <img src="/products/crisp-tools/crisp-tools-textanalysis.png" alt="Crisp Tools Text" class="single-product-image">
      <img src="/products/crisp-tools/crisp-tools-lorem-ipsum.png" alt="Crisp Tools Text" class="single-product-image">
      <img src="/products/crisp-tools/crisp-tools-typescale.png" alt="Crisp Tools Text" class="single-product-image">
    </section>
  </main>
</template>