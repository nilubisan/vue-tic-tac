import {PARTIES, STEPS} from "../types.ts";
import {WINNING_COMBINATIONS} from "../constants.ts";

export const getWinner = (cells: Array<STEPS | null>) => {
    // Проверяем победные комбинации
    let winner = null

    for (const combination of WINNING_COMBINATIONS) {
        if(winner) break

        const values = combination.map((ind) => cells[ind])

        if(values.some((v) => !v)) {
            continue
        }

        if(values.every((v) => v === STEPS[PARTIES.USER])) {
            winner = PARTIES.USER
        }

        if(values.every((v) => v === STEPS[PARTIES.BOT])) {
            winner = PARTIES.BOT
        }
    }

    // Проверяем ничью (все ячейки заполнены, но нет победителя)
    if ((cells).every((item) => item !== null)) {
        winner = 'DRAW'
    }

    return winner
}
