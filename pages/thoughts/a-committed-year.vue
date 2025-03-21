<template>
  <main class="w-content page-top">
    <section class="article-extras">
      <SectionTitle title="A Committed Year" />
      <img src="/articles/a-committed-year.png" alt="A Committed Year" />
      <Share route="/thoughts/a-committed-year" topic="A Committed Year" />
      <AllPosts />
    </section>
    <section class="content">

      <h2>A year of daily practice</h2>

      <p>Not diving as deep as I could into software development was something that I've always regretted, and a year ago today, I decided that I wanted to do something about it. I have to admit that it feels like a bad time to be a mediocre developer, but it is what it is. The heart wants what it wants.</p>

      <p>I've found that the only way for me to really get good at something is to do it obsessively. This was true for me of rock climbing, running, and yoga. In particular, yoga has a 'daily practice' concept that I found really helpful in building the structure that I needed to progress.</p>

      <p>So, a year ago, I committed to <a href="https://github.com/ramijames">writing a bit of code every day and publishing to Github</a>. A daily practice for my mind with the hope that, in time, I could grant myself a deep enough understanding of how computers work to build something that I'm really proud of. I made it through the year and I wanted to share with you some of my insights.</p>

      <img src="/articles/one-year-of-github.png" alt="One Year" />

      <p>My longest stretch was 20 weeks. Being consistent and steady in the beginning was easier, but there were definitely days where I just committed any old bullshit just to say that I did. In retrospect, I'm not super proud of this, but we were going through a lot of personal hardship at the time and morale was pretty low. In total, I only missed 5 days over the course of the past year. These came down to a bout of COVID that knocked me out in August and a few flights back and forth across the Atlantic that made committing code consistently impossible.</p>
      
      <p>I wrote about 100kloc, with the bulk of it being for <a href="https://vewrite.com/">Vewrite</a>. I started building that project in the summer of 2024, and it has made being consistent much, much easier. At this point there are a long list of issues that I'd like to work through, and when I'm in doubt about what to do next, I can simply select something from the backlog and get on with it.</p>

      <h2>What I've learned</h2>

      <p>There are a few things that I've learned over the past year that I think are worth sharing.</p>
      
      <h4>Development is really hard, but you can do it if you stick with it</h4>
      
      <p>I'm not as good at this as I thought I would be. Web development in particular has advanced to the point where you have to have a really deep understanding of how servers and protocols work to be able to build anything of significant complexity. This is true for companies, but at a single-person scale this means that you really have to learn how to do everything from:</p>
      
      <ul>
        <li>deploy servers</li>
        <li>set up CI/CD</li>
        <li>integrate external services</li>
        <li>manage branches and repositories effectively</li>
        <li>write and maintain documentation</li>
        <li>create tests</li>
        <li>manage serverless functions</li>
        <li>setup and manage databases</li>
        <li>build backends</li>
        <li>build front-end applications that are appealing to users</li>
      </ul>
      
      <p>It's a lot and I'm sure that I've forgotten to list a lot of stuff that I've managed to get running the last year. Frankly, I'm not sure whether any one person can do everything, or even if they should. All you have to do is try.</p>

      <h3>Iteration at the personal and development level is key</h3>
        
      <p>I'm not as bad at this as I thought I was. I've built a lot of things that I'm proud of, especially over the last six months. I've made a lot of mistakes, but I've learned from them. I don't make them twice. I've built a lot of things that I'm not proud of, but I've learned from them too and I've made them better over time. That's no small thing that I really want to emphasize. The stuff that you build doesn't need to be perfect. It needs to work and it needs to be reliable. It needs to get better over time, as you do.</p>

      <h3>Confidence is built over time</h3>
        
      <p>At first, I was scared of just about everything. It all seemed like too much to cram into my dumb, little skull. Every new concept that I encountered seemed like a mountain that I would never be able to climb. But I did. I climbed a lot of technical mountains. I'm still climbing them. I'm not scared of them anymore. I know that I can do it. I know that I can learn anything that I need to learn.</p>

      <h3>You have to let yourself rest</h3>
        
      <p>A year of this has left me really tired. There are some days where I can only manage one or two small commits before my brain just refuses to make any progress anymore. At first, I mostly tried to ignore it and plow forward. It wasn't healthy for me physically or mentally, and I've definitely stepped back from that. A few days of rest will make a lot of difference in the amount of work that you can confidently complete, and what the quality will be.</p>

      <h3>It's okay to ask for help</h3>
        
      <p>I wrote about this a while ago, and I stand by it. <nuxt-link to="/thoughts/asking-for-help-is-a-core-skill">Asking for help is a core developer skill</nuxt-link>. I've been really lucky to have a few people in my life that I can ask for help when I need it, and I've come to rely on them to make sure that I can progress the way that I want.</p>

      <h3>If you want to get better, build harder stuff</h3>
        
      <p>This is really a truism for life in general. If you aren't challenging yourself, you aren't going to get anywhere at all. I found that the hard stuff is much like the easy stuff (just harder). You have to take it one piece at a time, understand it really deeply, and then move forward to the next piece. Eventually, you'll get there.</p>

      <h3>It's okay to fail</h3>
        
      <p>I've failed a lot over the past year. I've failed to build things that I wanted to build. I've failed to understand things that I wanted to understand. I've failed to make progress on things that I wanted to make progress on. But I've learned from all of it. I've learned that failure is just a part of the process. It's not the end of the world. It's just a step on the way to success.</p>

      <h2>What's next?</h2>

      <p>I think that I'm going to keep going. I like having the daily practice as part of my life. In a world which feels very out of control, it feels good to have something that I can directly impact. <a href="https://github.com/vewrite/vewrite/">Vewrite</a> is at v1.0.0 (as of this morning) and I'll be releasing it in the coming week or so. There are a lot of features that I'd like to add to it, and I'm excited to get started on them. I'm also excited to start building other things. I have a few ideas that I'd like to explore, and I'm excited to see where they go.</p>

      <p>Thanks for reading.</p>

    </section>
  </main>
  <ArticleAddendum />
  <TypesOfDesigns />
  <Footer />
</template>

<script setup>

useHead({
  title: () => ``
})

useSeoMeta({
  title: 'A Committed Year',
  ogTitle: 'A Committed Year',
  description: "A year ago, I committed to writing a bit of code every day. It's been a wild ride. Let's talk about what I've learned.",
  ogDescription: "A year ago, I committed to writing a bit of code every day. It's been a wild ride. Let's talk about what I've learned.",
  ogImage: "/articles/a-committed-year.png",
  url: 'https://www.ramijames.com/thoughts/a-committed-year',
  twitterTitle: 'A Committed Year',
  twitterDescription: "A year ago, I committed to writing a bit of code every day. It's been a wild ride. Let's talk about what I've learned.",
  twitterImage: "/articles/a-committed-year.png",
  twitterCard: 'summary_large_image',
})

</script>