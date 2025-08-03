import {PARTIES, STEPS} from "../types.ts";
import {WINNING_COMBINATIONS} from "../constants.ts";

export const handleBotStep = (cells: (STEPS | null)[], onSetBotStep: (cellInd: number) => void) => {
    // 1. Сначала пытаемся выиграть
    for (const comb of WINNING_COMBINATIONS) {
        const valuesByComb = comb.map((ind) => cells[ind])
        const botSteps = valuesByComb.filter((value) => value === STEPS[PARTIES.BOT])

        if (botSteps.length === 2 && !valuesByComb.some((value) => value === STEPS[PARTIES.USER])) {
            const cellValueIndToHandle = valuesByComb.findIndex((val) => !val)
            onSetBotStep(comb[cellValueIndToHandle])
            return
        }
    }

    // 2. Затем блокируем игрока
    for (const comb of WINNING_COMBINATIONS) {
        const valuesByComb = comb.map((ind) => cells[ind])
        const userSteps = valuesByComb.filter((value) => value === STEPS[PARTIES.USER])
        if (userSteps.length === 2 && !valuesByComb.some((value) => value === STEPS[PARTIES.BOT])) {
            const cellValueIndToHandle = valuesByComb.findIndex((val) => val !== STEPS[PARTIES.USER])
            onSetBotStep(comb[cellValueIndToHandle])
            return
        }
    }

    // 3. Случайный ход из свободных ячеек
    const freeCells = cells.map((_v, ind) => ind).filter((i) => cells[i] === null)
    if (freeCells.length > 0) {
        const randomInd = Math.floor(Math.random() * freeCells.length)
        onSetBotStep(freeCells[randomInd])
    }
}
