<template>
  <div class="nurse-calculator">
    <div class="nurse-calc-row">
      <label>
        Completed Shifts:
      </label>
      <input type="number" v-model.number="completedShifts" min="0">
    </div>
    <div class="nurse-calc-row">
      <label>
        Uncompleted Shifts:
      </label>
      <input type="number" v-model.number="uncompletedShifts" min="0">
    </div>
    <div class="nurse-calc-row">
      <label>
        Upcoming Shifts:
      </label>
      <input type="number" v-model.number="upcomingShifts" min="0">
    </div>
    <section class="quotient-output">
      <p>Nurse Quotient: {{ nurseQuotient }}</p>
      <p><strong>Recommended Pay: ${{ recommendedPay.toFixed(2) }}</strong></p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const completedShifts = ref(0)
const uncompletedShifts = ref(0)
const upcomingShifts = ref(0)

const nurseQuotient = computed(() => {
  const X = 100
  if (completedShifts.value === 0) return 0
  let quotient = completedShifts.value / X
  quotient -= Math.min(uncompletedShifts.value * 0.025)
  quotient += Math.min(0.1, upcomingShifts.value * 0.025)
  return Math.max(0, Math.min(quotient, 1))
})

const recommendedPay = computed(() => {
  const minPay = 35
  const maxPay = 95
  return Math.sqrt(nurseQuotient.value) * (maxPay - minPay) + minPay
})
</script>

<style lang="scss" scoped>
.nurse-calculator {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  background: rgba($blue, 0.1);
  padding: $spacing-md;
  margin:$spacing-md 0;
  border-radius: $br-sm;
  width: 100%;

  .nurse-calc-row {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    align-items: center;
    width: 100%;

    label {
      font-weight: bold;
      width: 50%;
    }

    input {
      width: 50%;
      padding: $spacing-sm;
      border: $border;
      border-radius: $br-sm;
      color: white;
    }
  }

  .quotient-output {
    width: 100%;
    padding: $spacing-sm;
    background-color: rgba($blue, 0.1);
    border-radius: $br-sm;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
    }
  }
}

</style>