export enum PARTIES {
    USER = 'USER',
    BOT = 'BOT'
}

export type GAME_WINNER = PARTIES.BOT | PARTIES.USER | 'DRAW'

export enum STEPS {
    'USER' = 'X',
    'BOT' = 'O'
}


