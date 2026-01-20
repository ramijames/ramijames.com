<template>
  <PageHeader title="Package dependency hell" />
  <main class="w-content page-top">
    <section class="content">

      <p>Intentionally or otherwise, I&#39;ve been blowing up my life since last summer. <strong>It’s been less than ideal</strong>. We&#39;ll get to why in a second, but first, let&#39;s talk about everyone&#39;s favorite awful programming language and the impact of package managers, their packages, and the endless toil they create.</p>
      <p>In truth, I like Javascript just fine. It&#39;s clean, clear, and sensible. It has a lot of valuable built-in features. I like JSON. It&#39;s neat that you can use the same language to build everywhere, from backend services to web and mobile applications. Its portability is crazy and admirable. There is, however, a lot to dislike about the broader ecosystem that enables that incredible flexibility. </p>
      <p>Package managers like npm give you quick and easy access to their ecosystem of functionality. Unfortunately, the ease with which you can quickly add packages to a project inflates the complexity you inherit. You save some time by using someone else’s code, but you pay an unknown price in the future. It’s up to the upstream package maintainer. If they update and break something in your stack, it’s on you to update it. Your code may work today, but the likelihood that it will work as-is in five years is fairly low. With enough packages imported, you will spend a lot of energy trying to stay up-to-date. It’s a nightmare. The energy you spend doing maintenance is instead of creating new functionality. A pretty high price, I would argue.</p>
      <p>As with everything in software development, it&#39;s a trade-off you can pose with a question: do you spend time building something someone else has already built, or do you build something new? </p>
      <p>You, of course, don’t have to use external packages. You can build everything on your own. Let’s face it, though: building everything from the ground up is incredibly hard and beyond the reach of most developers. If you just want to get some project up and running, you bite the bullet and accept that for its lifetime, you will be trading your time for your lack of deep expertise. You&#39;re now trapped in dependency hell. Better get comfortable because you&#39;re going to be here a while.</p>
      <p>This maps to many real-world issues I&#39;m working through on a much more personal level.</p>
      <p>When you&#39;re growing up, there is this story you&#39;re told that gives you a roadmap to your life that you&#39;re expected to follow. Today, I believe this roadmap is largely not for your benefit but is a way to produce competent indentured servants for the market economy. You learn, you work, you breed, and you die. You don’t do it for you; you do it for the “greater good.” You do it to be useful.</p>
      <p>I hate this structure of the world. It reminds me too much of the javascript ecosystem’s dependency hell I described above. </p>
      <p>Starting a new life? “Let’s take a shortcut and add all the necessary packages! Don’t worry about the future over-head; it will be fine!”</p>
      <br><br>
      <p>npm add education </p>
      <p>npm add student-loans</p>
      <p>npm add degree</p>
      <p>npm add kids</p>
      <p>npm add partner</p>
      <p>npm add career</p>
      <p>npm add mortgage</p>
      <p>npm add house</p>
      <p>npm add car</p>
      <p>npm add white-picket-fence</p>
      <br><br>
      <p>Most of us get some good things out of adding these dependencies, but the price we collectively pay in exchange is a society full of constant, mindless toil. Every package we add is another layer of complexity and maintenance. We are trapped in this dependency cycle because we are too poor, disinterested, timid, scared, or exhausted to acquire the skills that allow us to be fully independent. We don&#39;t need all those packages, but we added them because we were told that is how things are done. Most people aren’t very thoughtful about what dependencies they add to their lives. Once you have them, you have to deal with them. </p>
      <p>It took me a long time to understand that my depression and anxiety weren’t arbitrary. I didn&#39;t understand that adding packages is optional. I added too many and couldn’t handle the stress of maintaining so much. I just did what the roadmap told me to do. It all felt wrong, but I played along until I couldn’t handle it all anymore.</p>
      <p>When I was young, I wasn&#39;t ever ok with getting up and going to school to be force-fed whatever knowledge someone else decided was appropriate. I did it because I was told to until I realized I could say “no.”</p>
      <p>As an adult, I wasn&#39;t ok with working endless, brutal hours. I&#39;ve been doing it since I was 15 and am still barely scraping by. Almost 30 years of my life are gone. </p>
      <p>The way society is designed is that, if you&#39;re lucky, you earn a bit more than you spend every month. You&#39;re supposed to slowly accrue value over your lifetime and retire close to 70. I don’t think my generation (and those who came after) believe we will retire. We’re all getting screwed. It was true for my parents. My mom died at 54, so she got screwed one way. My dad is still working at 82, so he got screwed in another way. It doesn&#39;t add up for me. I want to avoid ending up like them. </p>
      <p>My ability to keep going is gone. I&#39;m at that “no” stage with work. I can&#39;t do it anymore. Every job that I take, I quit. I&#39;m burned out and feel like I&#39;ve got nothing left. I want to refrain from participating in a system that falsely promises security in exchange for our energy, creativity, and happiness. My very essence has been siphoned off. It’s all gone to maintaining packages that other people keep updating.</p>
      <p>I feel like I gave it everything I had, and now I’m just stuck. I’m no longer building anything that fulfills me. I’m a slave to dependency hell. </p>
      <p>The question is, how do you slim things down when you are already drowning? How do you remove the right dependencies without sowing chaos?</p>
      <p>I’m not sure what the answer to this is. I have some ideas, but they are half-formed, and I’m not ready to write about them publicly. I’d love to hear your thoughts if you have any.</p>
      <ArticleAddendum />
    </section>
  </main>
  
  <Footer />
</template>

<script setup>

useHead({
  title: () => "Package dependency hell"
})

useSeoMeta({
  title: "Package dependency hell",
  ogTitle: "Package dependency hell",
  description: "Intentionally or otherwise, I've been blowing up my life since last summer. It’s been less than ideal. We'll get to why in a second, but first, let's talk about everyone's favorite awful programming language and the impact of package managers, their packages, and the endless toil they create.",
  ogDescription: "Intentionally or otherwise, I've been blowing up my life since last summer. It’s been less than ideal. We'll get to why in a second, but first, let's talk about everyone's favorite awful programming language and the impact of package managers, their packages, and the endless toil they create.",
  ogImage: "/articles/package-dependency-hell.png",
  url: 'https://www.ramijames.com/thoughts/package-dependency-hell',
  twitterTitle: "Package dependency hell",
  twitterDescription: "Intentionally or otherwise, I've been blowing up my life since last summer. It’s been less than ideal. We'll get to why in a second, but first, let's talk about everyone's favorite awful programming language and the impact of package managers, their packages, and the endless toil they create.",
  twitterImage: "/articles/package-dependency-hell.png",
  twitterCard: 'summary_large_image',
})

</script>