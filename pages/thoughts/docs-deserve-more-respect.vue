<template>
  <main class="general-main page-top">
    <section class="article-extras">
      <SectionTitle title="Docs Deserve More Respect" subtitle="by Rami James" />
      <AllPosts />
    </section>
    <section class="content">
      <p>I've been doing technical writing of one sort or another since 1999, when I was doing QA for Altec Lansing's R&amp;D branch in Kfar Saba in Israel. Back then we would put out innovative, new audio related devices like (gasp) USB audio devices that worked on Windows ME and 2000. They were buggy and setting them up wasn't the straightforward thing that it is today.</p>
      <p>We needed docs.</p>
      <p>We had some hoops that users had to jump through, and we needed a way to document what they were, what the edge cases were, and how to diagnose and fix all of that stuff. It needed to be nicely packaged, cleanly formatted, and accessible to users who installed our helper application. I found the Robohelp application, which is used for creating standard help applications on Windows, and added a help file to our install.</p>
      <p>During our QA process we would identify the issues, document what we thought was salient, and organize it into the help file that was bundled with the device. I was 19 at the time, and I had zero experience with this stuff, and it was an immensely naive process. But, it just felt like the right thing to do for our users, and my manager didn't explicitly tell me not to.</p>
      <p><img src="/articles/docs-deserve-respect.png" alt="Docs deserve more respect"></p>
      <p>It's been 24 years, and since then I've done documentation for a bunch of projects. The scale has grown, and the way that I look at those types of projects has substantially changed.</p>
      <p>I have some thoughts about what makes for good docs and I'd love to share them with you if you're interested.</p>
      <h3 id="core-concepts">Core Concepts</h3>
      <p>I'd like to start with a set of more concrete rules that I believe are critical to a documentation product's success.</p>
      <p><strong>Docs should use small words to describe big ideas</strong> - so don't use flourishy words or complex sentences to describe what can be said in simpler terms. You will lose users along the way and it isn't worth your writer's ego.</p>
      <p><strong>Docs should tell a story when you can</strong> - because a personal, relatable set of tasks that tell a tale will be more engaging and memorable for your user than an abstract set of instructions.</p>
      <p><strong>Docs should be searchable</strong> - because seriously: this is a no-brainer. If your docs are not easy to find stuff in, your users won't find what they need.</p>
      <p><strong>Docs are almost always part of a larger strategy</strong> - and this is especially true when it comes to software products. This touches on the larger topic of developer advocacy, but in short: your docs should be supported by video tutorials, real use examples, and live technical support.</p>
      <p><strong>Docs should be tested</strong> - because you may be sure that everything is right, but without real users, like with any other product, you won't know for certain. Test it and test it again.</p>
      <h3 id="holistic-docs-are-well-designed-products">Holistic docs are well-designed Products</h3>
      <p>When you learn a new programming language, concepts and ideas from that language flow into your bag of problem solving tricks. It makes you into a better software developer and at the end of the day, you make better software because you are more aware and capable.</p>
      <p>My career has been a complicated one, and included a lot of software product design, software development, technical support, and developer advocacy. Each discipline has influenced how I think and approach the others.</p>
      <p>When I approach a Technical Writing project, it's with this broad view of what it is that a user is going to need. I think that's the right way to think about docs: holistically. Docs aren't a well-defined thing and to make good ones you have to be flexible.</p>
      <p>To me, that means you have to think about your users from as many angles as possible. You can't take anything for granted or you're going to let some group of users down in a way that will negatively impact your brand, your product, or your business in a way that is hard to come back from.</p>
      <p>Your docs are very often a make-it-or-break-it experience for your users.</p>
      <p>If you did a good job, your users will use your product successfully, and become champions of your brand. If you don't, they will likely never use your product again because your docs left a bad taste in their minds. They will also let others know. Good marketing starts here, so keep that in mind.</p>
      <h3 id="making-good-docs">Making good docs</h3>
      <p>Making good docs simply means that you must approach your docs creation as you would any other product process.</p>
      <p>You need to:</p>
      <ul>
      <li>Know why you are creating your docs</li>
      <li>Know who your target audience is</li>
      <li>Know what their pain points are</li>
      <li>Improve your docs over time</li>
      </ul>
      <p>Knowing the why of your docs is often a really straightforward question and answer set on its surface. You are creating docs because if you don't, users will fall through the cracks and fail to use your product. At a deeper level there is a specific answer for your use-case. Have a developer tool? That's one answer set. Have a retail design tool? Have an Accounting SaaS product? Have an automatic coffee maker? These are all separate answer sets.</p>
      <p>The form of your docs is described by who will use it. Is it online? Is it bundled with an app? Is it printed? Every user base will need something else and you have to be clear from the get-go who they are.</p>
      <p>Your job is to figure out what is hard for each of your users, and craft your docs around funneling them through informative content that solves for their specific problem.</p>
      <p>Most importantly, you have know that you probably aren't going to get it right the first time. That means that your docs need to be maintained and updated as your products grow and change over time. Hopefully, this is done within some framework which allows easy communication with those users you are trying to help. You have to talk to your users, listen to their needs, and try to use your docs to make their experience using your product a better one.</p>
      <h3 id="your-docs-are-an-integral-part-of-your-success">Your docs are an integral part of your success</h3>
      <p>I'll sum up by simply underscoring how critically important docs are. Without them, your users are on their own and must fend for themselves.</p>
      <p>This will always mean fewer success cases, poorer views of your product within your ecosystem, more unhappy developers or users, and a negative impact on your brand or company.</p>
      <p>Docs are a serious sub-product in their own right, are an investment, and must be part of your wider product strategy.</p>
    </section>
  </main>
  <Footer />
</template>
