<template>
  <PageHeader title="Use Verbose Comments" />
  <main class="w-content page-top">
    <section class="content">

      <p>There’s a growing sentiment in software development that code should be self-documenting, that comments are a crutch for unclear code, and that they should be kept to an absolute minimum. The prevailing wisdom suggests that well-written code should be so obvious that comments become redundant. But here’s the problem: code is rarely as obvious as we think it is.</p>
      <p>While writing clean and readable code is important, the idea that code should be entirely self-explanatory is, frankly, a utopian fantasy. The reality is that comments serve a valuable purpose: they provide context, explain intent, and offer guidance to future developers—including your future self. Being verbose is not a vice; it’s a virtue.</p>
      <h2 id="the-arguments-against-comments-and-why-they-fall-short-">The Arguments Against Comments (and Why They Fall Short)</h2>
      <h3 id="your-code-should-be-obvious-and-self-documenting-">Your code should be obvious and self-documenting.</h3>
      <p>One of the most common arguments against comments is that good code doesn’t need them. If variable names are clear and functions are well-structured, everything should be self-explanatory, right? Unfortunately, this assumption overlooks several key realities:</p>
      <ul>
      <li>Code explains what is happening, not why. Even the best-written code can lack context. A function might be named <code>calculateTax()</code>, but that doesn’t tell you <em>why</em> certain tax rules were applied or what business logic guided those choices.</li>
      <li>Not all decisions are obvious. Sometimes, you have to make compromises in your implementation. Perhaps there’s a performance tradeoff, a workaround for a bug in a third-party library, or a domain-specific reason for doing something in a particular way. Comments help explain these decisions.</li>
      <li>Different levels of expertise. What’s obvious to a senior developer might not be clear to a junior developer—or even to another senior developer unfamiliar with the project. Good comments help bridge that gap.</li>
      </ul>
      <h3 id="comments-don-t-always-get-updated-and-can-be-misleading-">Comments don’t always get updated and can be misleading.</h3>
      <p>Yes, it’s true—outdated comments can cause confusion. But this is a process problem, not a reason to abandon comments altogether. If you’re disciplined enough to refactor your code, you should be disciplined enough to update your comments. The failure to maintain documentation is not an indictment of comments themselves; it’s an indictment of the developer’s habits.</p>
      <p>Let’s be honest: if you can’t be bothered to update a few lines of comments while modifying your code, you are the problem, not the comments.</p>
      <h2 id="the-case-for-verbose-comments">The Case for Verbose Comments</h2>
      <h3 id="comments-provide-context-">Comments Provide Context</h3>
      <p>Context is one of the hardest things to reconstruct when revisiting code. A well-placed comment can explain the reasoning behind a design choice, preventing future developers (including yourself) from spending hours trying to reverse-engineer the intent behind a decision.</p>
      <h4 id="example-">Example:</h4>
      <pre>
// Using setTimeout to delay execution because the API has a race condition<
setTimeout<span class="hljs-comment">(()</span> =&gt; processData<span class="hljs-comment">(data)</span>, <span class="hljs-number">500</span>);</pre>
      <p>Without the comment, a future developer (or you, three months later) might remove the timeout thinking it’s unnecessary—only to introduce a hard-to-trace bug.</p>
      <h3 id="comments-save-time-">Comments Save Time</h3>
      <p>Imagine stepping into a large codebase you’ve never worked on before. Would you rather have some well-placed comments to help you understand things quickly, or spend hours deciphering function calls and hunting down dependencies? Good comments act as a guide, saving time and reducing frustration.</p>
      <h4 id="example-">Example:</h4>
      <pre>
# Convert temperature from Fahrenheit to Celsius using standard formula
celsius_temp = (fahrenheit_temp - <span class="hljs-number">32</span>) * <span class="hljs-number">5</span> / <span class="hljs-number">9</span></pre>
      <p>A simple comment like this removes any doubt about what’s happening, even for someone unfamiliar with temperature conversion.</p>
      <h3 id="comments-encourage-thoughtful-coding-">Comments Encourage Thoughtful Coding</h3>
      <p>Writing comments forces you to articulate what your code is doing. This extra step can sometimes reveal flaws in your logic or inefficiencies in your implementation. If you can’t describe what a piece of code does in a sentence or two, that might be a sign that it needs refactoring.</p>
      <h3 id="code-longevity-and-team-collaboration-">Code Longevity and Team Collaboration</h3>
      <p>Codebases evolve. Teams change. The person writing the code today might not be around six months from now. Comments ensure that institutional knowledge is preserved, reducing onboarding time for new team members and making long-term maintenance easier.</p>
      <h2 id="how-to-write-good-comments">How to Write Good Comments</h2>
      <p>While I strongly advocate for comments, not all comments are created equal. Here are some best practices:</p>
      <ul>
      <li>Explain intent, not just mechanics. Don’t describe what the code is doing line by line if it’s already clear. Instead, explain why it’s doing it.</li>
      <li>Keep comments concise but informative. Avoid overly verbose explanations, but provide enough detail to be useful.</li>
      <li>Update comments when you change code. Treat comments as part of your codebase, not an afterthought.</li>
      <li>Use comments to clarify tricky or non-obvious logic. If something isn’t immediately clear, add a comment to guide future readers.</li>
      </ul>
      <h2 id="let-s-normalize-commenting-again">Let’s Normalize Verbose Commenting</h2>
      <p>The idea that comments are a sign of weak code is misguided. Good code and good comments are not mutually exclusive—they complement each other. Rather than discouraging comments, we should encourage developers to use them wisely, ensuring that our codebases remain accessible, maintainable, and easy to understand.</p>
      <p>So go ahead—leave that comment. Future developers (including you) will thank you.</p>
      <ArticleAddendum />
    </section>
  </main>
  <Footer />
</template>

<script setup>

useHead({
  title: () => `Use Verbose Comments`
})

useSeoMeta({
  title: 'Use Verbose Comments',
  ogTitle: 'Use Verbose Comments',
  description: 'The idea that code should be entirely self-explanatory is a utopian fantasy. Comments provide context, explain intent, and offer guidance to future developers—including your future self.',
  ogDescription: 'The idea that code should be entirely self-explanatory is a utopian fantasy. Comments provide context, explain intent, and offer guidance to future developers—including your future self.',
  ogImage: '/articles/comments-in-code.png',
  url: 'https://www.ramijames.com/thoughts/use-verbose-comments',
  twitterTitle: 'Use Verbose Comments',
  twitterDescription: 'The idea that code should be entirely self-explanatory is a utopian fantasy. Comments provide context, explain intent, and offer guidance to future developers—including your future self.',
  twitterImage: '/articles/comments-in-code.png',
  twitterCard: 'summary_large_image',
})


</script>