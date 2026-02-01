<template>
  <PageHeader title="How to Make Product Decisions based on Business Needs" tagline="On putting ethical concerns at the center of your design process." />
  <main class="w-content page-top">
    <section class="content">

      <section class="summary">
        <h3>TLDR Summary</h3>
        <p>A company must be careful when their primary goal is to squeeze profits out of the staff who provide the core value proposition of their product.</p>
        <p>My solution is to create a sorting algorithm that incentivizes nurses by providing them higher pay for being reliable and consistent. Unreliable and inconsistent staff are penalized by being paid less, which can be used to increase Clipboard Health’s profit margin.</p>
        <p>There are some ethical concerns with this approach, which I have <a href="#ethical-considerations">outlined at the end</a>.</p>
      </section>

      <h3>Introduction</h3>      
      <p>For a potential job at Clipboard Health, I’ve been asked to write a solution to the question “how do we maximize profit for a healthcare-related marketplace company without raising costs for facilities.”</p>
      <p>This, on its face, means lowering pay for the nurses who provide the staffing solutions which their marketplace fulfills. I thought that this would be a great way for me to outline how my Product-first mentality takes into account business desires, and weighs them against how it changes the product that a company produces.</p>
      <h4>Product Process</h4>
      
      <ol>
        <li>Have a well-defined problem with clear stakeholders</li> 
        <li>Build arguments for and against the possible solutions</li>
        <li>Define negative effects</li>
        <li>Select one solution that minimizes negative effects</li>
        <li>Try to implement a prototype and see if my assumptions are correct</li>
      </ol>

      <h3>The Problem</h3>

      <p>Let’s start by defining the unit economics and their incentivization structures. There are three parties involved.</p>
      <p><strong>Nurses</strong> provide the workforce value within the ecosystem. There is a limited supply of them, and likely a high cost of acquisition. They want to fill shifts while getting the highest pay possible.</p>
      <p><strong>Facilities</strong> are where nurses have shifts. For facilities it is critical that they fill shifts as they can not run their enterprises without nurses. They would like to fill those shifts at the lowest rate which can guarantee a nurse will show up consistently.</p>
      <p><strong>Clipboard Health</strong> runs the marketplace which connects nurses to facilities. Their aim is to provide nurses to facilities and to extract the highest profit from the ecosystem.</p>
      <p>From a Product-first perspective, it's my responsibility to take all three party's needs into account. The product solution which solves for the business need should not harm the integrity of the core product being produced, or the users who are using it.</p>
      <p>I think that we can best illustrate the economics involved with two bell curves, showing acceptable cost and pay ranges for facilities and nurses respectively. The intersecting region between is the profit for Clipboard Health. The breakdown goes like this:</p>
      <h4>Acceptable cost range for facilities</h4>

      <ul>
      <li>If nurse pay is too high, they can’t break even</li>
      <li>If nurse pay is too low, they can’t source staff</li>
      </ul>

      <h4>Acceptable pay range for nurses</h4>

      <ul>
      <li>If nurse pay is too high, facilities won’t hire them</li>
      <li>If nurse pay is too low, they won’t work</li>
      </ul>

      <p>An <a href="https://www.indeed.com/career/nurse/salaries/New-York--NY">acceptable average range for nurses as an hourly wage</a> seems to be between $35 and $95. Let's map that and add 10% on top as the cost that facilities will have to pay via the marketplace. I don't actually know what Clipboard Health's margins are, but that isn't super relevant for the argument that I make in this article. Ten percent is easy to calculate with, so let's go with that.</p>

      <section class="highcharts-wrapper">
        <highchart :options="bellCurvesOptions" />
      </section>

      <p>The goal of Clipboard Health is to increase profits. This can be done by widening the gap between those two peaks, but the further you push one peak or the other, the worse the impact will be on either churn or acquisition for nurses and facilities.</p>
      <p>If you pay nurses less, you’ll have unhappy nurses and eventually no nurses. If you charge facilities too much, you’ll have less facilities willing to use your marketplace.</p>
      <h3>The Proposed Solution</h3>
      <p>I do not think that shifting the global nurse pay to be lower is acceptable. I also do not think that shifting the costs for facilities is a good solution.</p>
      <p>I think that there is an opportunity to find a way to extract more value from inside the gap by adding a weighting mechanism to how nurses are paid. We can use this mechanism to incentivize better staffing compliance by providing a carrot of higher pay to reliable staff, while paying unreliable nurses less.</p>
      <p>I propose that Clipboard Health sort nurses by:</p>

      <ul>
        <li>Number of shifts completed</li>
        <li>Number of shifts not completed</li>
        <li>Number of upcoming shifts</li>
      </ul>

      <NurseCalculator />

      <p>This acts as an incentivization mechanism that promotes the behavior that you want such as getting nurses to show up on-time, successfully completing shifts, and scheduling more shifts.</p>

      <p>The sort function requirements would be:</p>

      <ul>
        <li>If you have no completed shifts, your quotient is 0</li>
        <li>For every X completed shifts, your quotient goes up proportionally from 0 to 1</li>
        <li>incomplete shifts reduce your quotient by 10%, and decay over time</li>
        <li>number of upcoming shifts adds to your quotient by 2.5%, up to 10%</li>
      </ul>

      <p>For completeness, you can see the prototype code for generating the Nurse Quality Quotient here:</p>

      <pre class="code"><div class="type">Javascript</div>
        <code v-pre>
    nurseQuotient() {
      const X = 100; // Define the number of completed shifts needed to reach a quotient of 1
      if (this.completedShifts === 0) return 0;
      let quotient = this.completedShifts / X;
      quotient -= Math.min(this.uncompletedShifts * 0.025);
      quotient += Math.min(0.1, this.upcomingShifts * 0.025);
      return Math.max(0, Math.min(quotient, 1));
    }

    recommendedPay() {
      const minPay = 35;
      const maxPay = 95;
      return Math.sqrt(this.nurseQuotient) * (maxPay - minPay) + minPay;
    }
        </code>
      </pre>

      <p>Then we can set an optimized threshold that determines who to pay more and who to pay less based on this new Nurse Quality Quotient.</p>

      <section class="highcharts-wrapper">
        <highchart :options="nursesWeightingOptions" />
      </section>

      <p>Importantly, this will have some variables which can be tweaked to ensure that profits do not go down in the event that all nurses have excellent compliance. The floor will always be the status quo today plus a critical incentivization mechanism that ensures higher-quality service for the facilities. Even in the unlikely scenario that profits don’t increase, the service you provide them will be better than it is today because of the incentivized workforce.</p>

      <a name="ethical-considerations"></a>
      <h3>Ethical Considerations</h3>

      <p>From a strictly mathematical perspective we can make cold, calculated decisions as to how much profit can be extracted from a marketplace and those that depend on it. We can simply lower salaries for nurses across the market and get rich that way. The truth is that this is a fine short-term solution if profit is your only motive.</p>
        
      <p>But, <strong>from a Product-first perspective</strong>, long-term it will negatively impact the entire market (and the company’s objectives!) because nurses will make the rational decision to stop being nurses if they are overworked and underpaid.</p>

      <ul>
      <li>If you want to incentivize companies to use the marketplace, you want to drive prices down so that for them it is most profitable.</li>
      <li>If you want to incentivize CBH to continue to develop the marketplace, you want to maximize the profits extracted.</li>
      <li>If you want nurses to participate, you must provide both profit and incentivization. </li>
      </ul>

      <p>The core issue here is that the power structure between these three sets of entities is not equal, and therefore the weakest set, the nurses, will always end up with the short end of the stick, squeezed by the market they are forced to work in. They should be protected from value extraction because without them, the economic system they participate in collapses and everyone loses.</p>

      <p>Boards, and the companies that they run, have an ethical obligation to maximize profits for their company. But, they must do so in a way that maintains a long term perspective on what promotes growth of their ecosystem, and quality of life for those who participate in it. <strong>Short term gains must not trump longevity and viability of a market as a whole.</strong></p>

      <ArticleAddendum />
    </section>
  </main>
  
  <PostsExtras />
  <Footer />
</template>

<script>

export default {
  data() {
    return {
      accessibility: { enabled: false }, // disable accessibility warning
      nursesWeightingOptions: {
        chart: {
          type: 'scatter'
        },
        title: {
          text: 'Higher Nurse Quotient = Higher Pay'
        },
        xAxis: {
          title: {
            text: 'Nurse Quotient'
          }
        },
        yAxis: {
          title: {
            text: 'Pay'
          },
          gridLineWidth: 0,
          plotBands: [
          {
            from: 0,
            to: 65, // Adjust this to the maximum pay rate
            color: 'rgba(255, 0, 0, 0.1)', // Color of the plot band
            label: {
              text: 'Profitable for CBH',
              style: {
                color: '#606060'
              }
            }
          },
          {
            from: 65, // Start of the plot band
            to: 100, // End of the plot band
            color: 'rgba(0, 255, 0, 0.1)', // Color of the plot band
            label: {
              text: 'Not Profitable for CBH',
              style: {
                color: '#606060'
              }
            }
          },
          
        ]
        },
        series: [
        {
          name: 'Nurses',
          data: [
            // calculated quotient, pay in usd, completed shifts, not completed shifts, scheduled shifts
            [5.4, 54, 0, 0, 0], 
            [4.0, 40, 0, 0, 0],
            [3.9, 39, 0, 0, 0],
            [7.0, 70, 0, 0, 0],
            [7.1, 71, 0, 0, 0],
            [6.2, 62, 0, 0, 0],
            [3.8, 38, 0, 0, 0],
            [5.2, 52, 0, 0, 0],
            [5.9, 59, 0, 0, 0],
            [9.1, 90, 0, 0, 0],
          ]
        }
      ]
      },
      bellCurvesOptions: {
        chart: {
          type: 'areaspline'
        },
        title: {
          text: 'The Profit Spread'
        },
        xAxis: {
          categories: Array.from({length: 11}, (_, i) => i),
          plotBands: [{
            from: 65, // best case pay for nurses
            to: 71.5, // best case cost for facilities
            color: '#006AB422',
            label: {
              text: 'CBH Profit Zone',
              style: {
                color: '#006AB4',
                fontWeight: 'bold',
                fontSize: '18px',
                top: '10px'
              }
            }
          }]
        },
        yAxis: {
          title: {
            text: 'Likelihood a nurse works at this rate'
          }
        },
        series: [
          {
            name: 'Acceptable pay for nurses',
            data: Array.from({length: 101}, // total length of the line
                  (_, i) => Math.exp(-Math.pow(i - 65, 2) / 200)), // Average wages between $35 and $95
            fillColor: 'rgba(172, 227, 245, 0.4)'
          }, 
          {
            name: 'Acceptable cost for facilities',
            data: Array.from({length: 101}, // total length of the line
                  (_, i) => Math.exp(-Math.pow(i - 71.5, 2) / 200)), // Average wages between $35 and $95
            fillColor: 'rgba(254, 190, 112, 0.4)'
          }
        ]
      }
    }
  },
  computed: {
    nurseQuotient() {
      const X = 100; // Define the number of completed shifts needed to reach a quotient of 1
      if (this.completedShifts === 0) return 0;
      let quotient = this.completedShifts / X;
      quotient -= Math.min(this.uncompletedShifts * 0.025);
      quotient += Math.min(0.1, this.upcomingShifts * 0.025);
      return Math.max(0, Math.min(quotient, 1));
    },
    recommendedPay() {
      const minPay = 35;
      const maxPay = 95;
      return Math.sqrt(this.nurseQuotient) * (maxPay - minPay) + minPay;
    },
  },
}
</script>