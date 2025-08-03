import {type GAME_WINNER, PARTIES} from "../types.ts";

export const getResultMessage = (gameWinner: GAME_WINNER | null, currentStep: PARTIES) => {
    switch (gameWinner) {
        case PARTIES.USER:
            return 'Вы победили! 🎉'
        case PARTIES.BOT:
            return 'Победил компьютер 🤖'
        case 'DRAW':
            return 'Ничья! 🤝'
        default:
            return `Ход: ${currentStep === PARTIES.USER ? 'Игрок (X)' : 'Компьютер (O)'}`
    }
}
