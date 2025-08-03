<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import {STEPS, type GAME_WINNER, PARTIES} from "./types.ts";
import {handleBotStep} from "./utils/handleBotStep.ts";
import {getWinner} from "./utils/getWinner.ts";
import { getDefaultGameState } from "./constants.ts";
import {getResultMessage} from "./utils/getResultMessage.ts";

const state = reactive<(STEPS | null)[]>(getDefaultGameState())

const gameWinner= ref<GAME_WINNER | null>(null)
const currentStep = ref<PARTIES>(PARTIES.USER)

watch([state], () => {
  if((state as any).every((item) => !item)) return

  const winner = getWinner(state)

  if(winner) {
    gameWinner.value = winner
    return
  }

  currentStep.value = currentStep.value === PARTIES.USER ? PARTIES.BOT : PARTIES.USER

  if (currentStep.value === PARTIES.BOT) {
    setTimeout(() => {
      handleBotStep(state, (cellIndex: number) => state[cellIndex] = STEPS[PARTIES.BOT])
    }, 500)
  }
}, { deep: true })

const handleClick = (cellInd: number) => {
  if (
      gameWinner.value ||
      state[cellInd] ||
      currentStep.value !== PARTIES.USER
  ) return

  state[cellInd] = STEPS[PARTIES.USER]
}

const resetGame = () => {
  state.forEach((_item, ind) => state[ind] = null)
  gameWinner.value = null
  currentStep.value = PARTIES.USER
}
</script>

<template>
  <div class="game-container">
    <h1>Крестики-нолики</h1>

    <div class="status">
      {{ getResultMessage(gameWinner, currentStep) }}
    </div>

    <div class="field">
      <div
          class="cell"
          :class="{
          'occupied': cell !== null,
          'clickable': cell === null && currentStep === PARTIES.USER && !gameWinner
        }"
          v-for="(cell, cellInd) in state"
          :key="cellInd"
          @click="() => handleClick(cellInd)"
      >
        {{ cell }}
      </div>
    </div>

    <button
        @click="resetGame"
        class="reset-button"
        :class="{
          'visible': gameWinner,
        }"
    >
      Новая игра
    </button>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  margin: 0;
  color: #333;
}

.status {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  min-height: 25px;
}

.field {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  background-color: #333;
  padding: 5px;
  border-radius: 8px;
}

.cell {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  cursor: default;
  transition: all 0.2s ease;
}

.cell.clickable {
  cursor: pointer;
  background-color: #f0f0f0;
}

.cell.clickable:hover {
  background-color: #e0e0e0;
  transform: scale(0.95);
}

.cell.occupied {
  background-color: #fff;
}

.reset-button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.visible {
  opacity: 1;
  pointer-events: auto;
}

.reset-button:hover {
  background-color: #45a049;
}
</style>
