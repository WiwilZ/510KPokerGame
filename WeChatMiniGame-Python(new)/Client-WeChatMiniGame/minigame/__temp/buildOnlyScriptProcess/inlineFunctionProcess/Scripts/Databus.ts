import engine from "engine";


export const databus: {
    nickname: string,
    avatarUrl: string,
    openid: string,
    roomNo: string,
    mySeat: number,
    bankerSeat: number,
    cardSpriteframes: engine.SpriteFrame[]
} = {
    nickname: '',
    avatarUrl: '',
    openid: '',
    roomNo: '',
    mySeat: -1,
    bankerSeat: -1,
    cardSpriteframes: []
};