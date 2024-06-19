<template>
  <main class="general-main page-top">
    <section class="article-extras">
      <SectionTitle title="On Ethical Pricing" subtitle="by Rami James" />
      <AllPosts />
    </section>
    <section class="content">
      <h3>TLDR Solution</h3>
      <p>Create a sorting algorithm that incentivizes nurses to be better workers by providing them higher pay for being reliable and consistent. Unreliable and inconsistent staff are penalized by being paid less, which can be used to increase Clipboard Health’s profit margin.</p>

      <p>There are some ethical concerns with this approach, which I have outlined at the end.</p>
      
      <h3>Introduction</h3>
      
      <p>For a potential job at Clipboard Health, I’ve been asked to write a solution to the question “how do we maximize profit for a healthcare-related marketplace company.” </p>

      <p>Clipboard Health is providing an easy to use marketplace of professionals that facilities can rely upon for staffing. They solve for attendance, staffing, nurse location tracking, and other problems related to staffing medical facilities.</p>

      <p>My typical thought process is to have a well-defined problem, build arguments for and against the litany of solutions, and select one based on a compromise that allows for a solution while taking into consideration some of those negative effects that can be associated with it.</p>

      <h3>The Problem</h3>

      <p>Let’s start by defining the unit economics and their incentivization structures. There are three parties involved.</p>

      <p>Nurses provide the workforce value within the ecosystem. There is a limited supply of them, and likely a high cost of acquisition. They want to fill shifts that are as close to their home as possible, while getting the highest pay possible.</p>

      <p>Facilities are where nurses have shifts. For facilities it is critical that they fill shifts as they can not run their enterprises without nurses. They would like to fill those shifts at the lowest rate which can guarantee a contractor that shows up consistently.</p>

      <p>Clipboard Health runs the marketplace which connects nurses to facilities. Their aim is to provide nurses to facilities. CBH extracts the highest profit by charging the highest rate to facilities which don't turn them off, and the lowest rate to nurses which will consistently incentivize them to show up and get the work done.</p>

      <p>This can be best described with two bell curves, showing acceptable cost and pay ranges for facilities and nurses respectively. The intersecting region between is the profit for Clipboard Health.</p>

      <p>The breakdown goes like this:</p>

      <h4>Acceptable cost for facilities</h4>

      <ul>
      <li>Too high and they can’t break even</li>
      <li>Too low and they can’t source staff</li>
      </ul>

      <h4>Acceptable pay for nurses</h4>

      <ul>
      <li>Too high and facilities won’t hire them</li>
      <li>Too low and they won’t work</li>
      </ul>

      [ diagram of two bell curves ]

      <p>The goal of Clipboard Health is to increase profits. This can be done by widening the gap between those two peaks, but the further you push one peak or the other, the worse the impact will be on either churn or acquisition.</p>

      <p>If you pay nurses less, you’ll have unhappy nurses and eventually no nurses. If you charge facilities too much, you’ll have less facilities willing to use your marketplace.</p>

      <h3>The Proposed Solution</h3>
      <p>I think that there is an opportunity to find a way to extract more value from inside the gap by adding a weighting mechanism to how nurses are paid. This means that the gap shifts to be wider for some nurses and decreases for others. We can use this mechanism to incentivize better staffing compliance by providing a carrot in higher pay while also paying unreliable nurses less. </p>

      <p>Instead of an across the board cut in pay to nurses to increase profits, I propose that Clipboard Health sort nurses by:</p>

      <ul>
      <li>Number of shifts completed</li>
      <li>Number of shifts not completed</li>
      <li>Number of upcoming shifts</li>
      </ul>

      [ diagram showing weighting ]

      <p>This acts as an incentivization mechanism that promotes the behavior that you want such as getting nurses to show up on-time, successfully completing shifts, and scheduling more shifts.</p>

      <p>The sort function requirements would be:</p>

      <ul>
      <li>Shifts completed is most important and is highest weighted</li>
      <li>Shifts not completed should not be a permanent mark against a nurse, but should be weighted with a time-function to decay to ensure that unreliable nurses are pushed out of the system</li>
      <li>Number of upcoming shifts should add to your current value, but not highly as we don’t want to incentivize nurses to try to game the system by taking on a large number of shifts</li>
      </ul>

      <p>Then we can set a payment curve that determines who to pay more and who to pay less.</p>

      <p>Importantly, this will have some variables which can be tweaked to ensure that profits do not go down in the event that all nurses have excellent compliance. The floor will always be the status quo today plus a critical incentivization mechanism which ensures higher-quality service for the facilities. Even in the unlikely scenario that profits don’t increase, the service you provide will be better.</p>

      <h3>Ethical Considerations</h3>

      <p>From a strictly mathematical perspective we can make cold, calculated decisions as to how much profit can be extracted from a marketplace and those that depend on it. We can simply lower salaries for nurses across the market and get rich that way. The truth is that this is a fine short-term solution, but long-term it will negatively impact the entire market (and the company’s objectives!) because nurses will make the rational decision to stop being nurses if they are overworked and underpaid.</p>

      <ul>
      <li>If you want to incentivize companies to use the marketplace, you want to drive prices down so that for them it is most profitable.</li>
      <li>If you want to incentivize CBH to continue to develop the marketplace, you want to maximize the profits extracted.</li>
      <li>If you want nurses to participate, you must provide both profit and incentivization. </li>
      </ul>

      <p>The core issue here is that the power structure between these three sets of entities is not equal, and therefore the weakest set, the nurses, will always end up with the short end of the stick, squeezed by the market they are forced to work in. They should be protected from value extraction because without them, the economic system they participate in collapses and everyone loses.</p>

      <p>Boards, and the companies that they run, have an ethical obligation to maximize profits for their company. But, they must do so in a way that maintains a long term perspective on what promotes growth of their ecosystem, and quality of life for those who participate in it. Short term gains must not trump longevity and viability of a market as a whole.</p>

    </section>
  </main>
  <Footer />
</template>