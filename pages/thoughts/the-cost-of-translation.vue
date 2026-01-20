<template>
  <PageHeader title="The Cost of Translation" tagline="How Product teams assist in product failure" />
  <main class="w-content page-top">
    <section class="content">

      <img src="/articles/the-cost-of-translation.png" alt="The Cost of Translation" />

      <h2>Introduction</h2>

      <p>
        For those of us who have been working in tech for a long time (1996 for me), there are often common themes that show up from organization to organization. Companies are, afterall, just made up of people, and people will be people.
      </p>

      <p>
        Today I wanted to talk a little bit about inefficiency in product development. I’ve seen a lot of companies try to make software. Lots of failures, a few successes. Some of those failures came about at the market level. Just a bad fit or wrong timing. You know the drill. 
      </p>

      <p>
        Other times, those failures happen before the product even hits the public. Doomed from the start, you could say.
      </p>

      <p>
        I think that most of these latter instances of failure do not come from poor execution, but rather from the act of translation. Translation between intent and requirements, between insight and roadmap, between user need and business constraint.
      </p>

      <p>
        Any way that an organization can reduce translation in their processes, there will be a resulting improvement in business needs achievement, speed of development, and reduced time to market so that critical user feedback can be acquired.
      </p>

      <p><strong>You have to cut out the fat if you want a tasty product.</strong></p>
      
      <p>Let’s talk about that fat.</p>

      <h2>The cost of translation</h2>

      <h3>Every handoff introduces loss, delay, and distortion</h3>

      <p>
        I think that we can frame this as a basic organizational physics problem. Every step along the way requires some interpretation, re-framing, and justification. These things all have an inherent risk of introducing loops in a group of people where nobody wants to take ownership and the end effect is a grueling, endless process that doesn’t end up with a satisfying decision that moves the project forward.
      </p>

      <p>
        Modern Agile groups tend to have many layers of translation because there are many different people that are involved. There’s a kind of insane set of meetings that tends to happen where each set of people, according to their position in the company’s hierarchy, gets together and tries to define what will be in the product, how it will work, how it will be implemented, etc.
      </p>

      <img src="/articles/typical.png" alt="The typical agile nonsense" />

      <p>
        As you can imagine (or have unfortunately experienced), this doesn’t work very well in practice. Each step through the chain is basically playing the children’s game of telephone. Misunderstanding, reinterpretation, and incompetence lead to the original intent of the stakeholder being diluted and/or mangled along the way. The structure of meetings that is required to make this “work” is a type of inflicted insanity: too many of them that have to run on a regular basis as a way to keep a team in sync. It's a huge waste of manpower and screams inefficiency.
      </p>

      <h2>Solving the right problems</h2>

      <p>
        The core issue with how information flows through an organization has to do with where it is siloed and who has access to it. BizDev teams know one set of information, designers another, and engineers yet one more. For each group, you have a discrete set of information that, if implemented on its own, would likely create a different product entirely.
      </p>

      <p>
        A company needs to find an effective way to meld all of these siloes into one, meaningful set that can be released to the market.
      </p>

      <p>I’ve put together a table that defines some of the core actions that a company needs to be able to do to create a coherent product. In the following columns I’ve defined four units (business, product, design, and engineering) that are generally simplified versions of what would really be in any given company. For example, business would include things like marketing, sales, bizdev, finance, etc. It’s just a model for us to be able to continue our discussion and isn’t really a one-to-one for any given company’s real structure.</p>

      <div style="overflow-x:auto;">
        <table border="1" cellspacing="0" cellpadding="8">
          <thead>
            <tr>
              <th>Action</th>
              <th>Business</th>
              <th>Product</th>
              <th>Design</th>
              <th>Engineering</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="highlight-cell">Identifies</td>
              <td>Opportunities</td>
              <td>Problems</td>
              <td>User Needs</td>
              <td>Technical Constraints</td>
            </tr>
            <tr>
              <td class="highlight-cell">Prioritizes</td>
              <td>Outcomes</td>
              <td>Scenarios</td>
              <td>Visual</td>
              <td>Technical Trade-offs</td>
            </tr>
            <tr>
              <td class="highlight-cell">Focus</td>
              <td>Profit</td>
              <td>Value</td>
              <td>Usability</td>
              <td>Implementation</td>
            </tr>
            <tr>
              <td class="highlight-cell">Validates</td>
              <td>Direction</td>
              <td>Product-market fit</td>
              <td>User success</td>
              <td>Technical feasibility</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        What I think that this table really highlights is that Product is a column that stands out as an odd duck. They don’t really fit with the business unit, nor do they fit with the design or engineering unit.
      </p>

      <p>They are the translation layer, and I think that organizations would do better if they were eliminated entirely.</p>

      <h3>Updating roles to fit modern needs</h3>

      <p>What I’m going to propose is a bit unorthodox, but if you’ve followed my logic above you’ll probably find it a reasonable solution.</p>

      <p>Instead of a set of PMs/POs dictating feature sets, I think that they should be cut out entirely. In their stead, I think we should be creating a working team of Product Designer and Product Engineer who directly interface with the stakeholders to be the negotiating group who gets the specs, interprets them, creates a plan, creates a product proposal, and finally actually does the implementation (either themselves or with their respective teams). In effect, what I’m proposing is for those who are actually doing the work to be the real owners of the product instead of just being the tools of the layer above them in the organization’s hierarchy.</p>

      <img src="/articles/product-focus.png" alt="The new hotness" />

      <p>Let’s rework the table from above with this new construct in mind.</p>

      <div style="overflow-x:auto;">
        <table border="1" cellspacing="0" cellpadding="8">
          <thead>
            <tr>
              <th>Action</th>
              <th>Business</th>
              <th>Product Design</th>
              <th>Product Engineering</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="highlight-cell">Identifies</td>
              <td>Opportunities</td>
              <td>User Problems</td>
              <td>Technical Problems</td>
            </tr>
            <tr>
              <td class="highlight-cell">Prioritizes</td>
              <td>Outcomes</td>
              <td>Visual Clarity</td>
              <td>Technical Clarity</td>
            </tr>
            <tr>
              <td class="highlight-cell">Focus</td>
              <td>Profit</td>
              <td>Usability</td>
              <td>Implementation</td>
            </tr>
            <tr>
              <td class="highlight-cell">Validates</td>
              <td>Direction</td>
              <td>Product-market fit</td>
              <td>Technical feasibility</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>This simpler mapping, which collapses product into the worlds of design and engineering loses little and gains a lot. Having the onus of ownership fall within their purview shifts not just the responsibility to them, but also the opportunity to build the best things according to their experience and expertise.</p>

      <p>Simply put: instead of being told what to do by a translation layer, they can do what they know is right without hindrance.</p>

      <p>This is not really about making designers and engineers “do PM work”. What I’m really arguing here is that they already do it! But, instead of having autonomy and ownership, their hands are tied by a process that is something akin to:</p>

      <ol>
        <li>The stakeholder has a meeting with a PM, and some goals are set.</li>
        <li>PM briefs the POs, who will create some rough roadmap with milestones.</li>
        <li>POs will run this by the design and technical teams who give feedback and reasons why things will or won’t work, etc..</li>
        <li>That feedback is run back up the chain, and new roadmaps with milestones are created. </li>
        <li>Rinse and repeat until everyone is exhausted.</li>
        <li>Stakeholders are filled in, but usually barely understand why the goals they set can’t be met.</li>
        <li>Implementation and review.</li>
      </ol>

      <p>I wish that I could say that I’ve only seen this in one company, but that would be lying. It’s all too common, and tends to be worse the bigger the company gets.</p>

      <p>A much more reasonable flow, based on just Product Design and Product Engineering roles:</p>

      <ol>
        <li>The stakeholder has a meeting directly with Product Design and Product Engineering.</li>
        <li>A roadmap is developed directly with the stakeholder while addressing why things will or won’t work.</li>
        <li>Implementation and review.</li>
      </ol>

      <p>With less translation you allow critical information to migrate directly from the source to where it is needed. You also mitigate the frustration that is commonly associated with the definition process.</p>

      <p>But, wait. If this is such a good way to work, why do we have Product teams at all?</p>

      <p>Mistrust.</p>


      <h3>Translation as a symptom of mistrust</h3>

      <p>Organizations do not separate roles because the work demands it. They separate roles because they do not trust individuals with end-to-end ownership.</p>
      <p>I’m arguing here that Product roles emerged largely as a compensatory mechanism. At some point, stakeholders had poor experiences (missed targets, misunderstood priorities, features that were elegant but commercially irrelevant) and concluded that designers and engineers could not be trusted to internalize business context. Rather than fixing how ownership and accountability were established, and taking the initiative to teach designers and engineers to integrate business context into their work, organizations introduced intermediaries whose job was to translate intent into artifacts.</p>
      <p>That translation layer feels like control to stakeholders, but it is actually an admission of failure. It signals that the organization does not know how to create conditions where people can be trusted with decisions, so it substitutes process for judgment. </p>
      <p>⁠Roadmaps, PRDs, prioritization frameworks, and review ceremonies proliferate not because they add clarity, but because they allow for superiors to closely track work.</p>
      <p>Unfortunately, over time, these processes harden into structure. What began as a safeguard becomes a role, and what became a role becomes unquestionable. The organization stops asking whether translation is necessary and instead optimizes how efficiently it can be performed. The result is a system where accountability is fragmented, intent is diluted, and decision-making slows under the weight of alignment rituals.</p>
      <p>At its core, this is not a product problem or a design problem. It is a cultural one. The negative impacts of this system of management are burn out, turnover, and product failure.</p>
      <p>Healthy organizations confront ownership directly by investing in senior talent capable of holding business, user, and technical constraints simultaneously. </p>
      <p>They make accountability explicit and tolerate the discomfort that comes with fewer handoffs and clearer responsibility. Most importantly, they recognize that trust cannot be manufactured through process. Trust must be designed into the system.</p>
      <p>Until that cultural issue is addressed head on, no amount of refinement to product process will eliminate the inefficiency. Translation will continue to be mistaken for progress, and roles will continue to multiply in place of trust.</p>

      <h2>The organization you get when you stop translating</h2>

      <p>When organizations stop translating, they do not become more chaotic. They become more efficient because the centers of decision making are closer to the work. The people responsible for shaping and implementing a solution are the same people who are held accountable for its impact. Iteration becomes second-nature because the context is already present and no longer has to be distilled down to those who will be doing it.</p>

      <p>Some of the best impacts of this change in work structure are:</p>

      <ul>
        <li><strong>Less meetings</strong> - things like status updates disappear because ownership is clear. Reviews become conversations that happen directly with the stakeholder rather than a series of approvals that go up and down the chain. </li>
        <li><strong>Better historical documentation</strong> - because your docs shift from being a set of defensive artifacts that you retain to cover your ass, and instead become records of intent that reflect why things changed and what their impact was.</li>
        <li><strong>Teams move faster</strong> - because they hesitate less. There’s less of a fog of political war and more of a sense of trust and understanding. You’re building this together with the stakeholder rather than for his or her report. </li>
        <li><strong>Accountability sharpens</strong> - because the project now belongs in the hands of those who are actually building it. There is a more personal connection to the work you are doing when you’re deeply involved in the decision-making process and you have the full context for it.</li>
      </ul>

      <p>The organizations that benefit the most from collapsing translation layers are not the ones who are just seeking efficiency for efficiency’s sake. They are the ones seeking a way to better understand what they are building and why, by those who are doing the nitty gritty daily work. </p>

      <p>Understanding that speed, quality, and trust are not separate goals but consequences of giving capable individuals full ownership of outcomes is how you cut out the fat and build the best product possible.</p>


      <ArticleAddendum />
    </section>
  </main>
  <Footer />
</template>

<script setup>

useHead({
  title: () => ``
})

useSeoMeta({
  title: 'The Cost of Translation',
  ogTitle: 'The Cost of Translation',
  description: "How Product teams assist in product failure, and how your organization can retool to improve ownership.",
  ogDescription: "How Product teams assist in product failure, and how your organization can retool to improve ownership.",
  ogImage: "/articles/the-cost-of-translation.png",
  url: 'https://www.ramijames.com/thoughts/the-cost-of-translation',
  twitterTitle: 'The Cost of Translation',
  twitterDescription: "How Product teams assist in product failure, and how your organization can retool to improve ownership.",
  twitterImage: "/articles/the-cost-of-translation.png",
  twitterCard: 'summary_large_image',
})

</script>

<PageHeader title="The Cost of Translation" tagline="How Product teams assist in product failure" />