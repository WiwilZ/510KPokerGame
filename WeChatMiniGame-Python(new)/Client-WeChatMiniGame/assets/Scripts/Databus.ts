import engine from "engine";


export const databus: {
    nickname: string,
    avatarUrl: string,
    openid: string,
    roomNo: string,
    mySeat: number,
    playerInfoList: {
        avatar: engine.SpriteFrame,
        nickname: string
    }[],
    bankerCard: number,
    cardSpriteFrames: engine.SpriteFrame[]
} = {
    nickname: '',
    avatarUrl: '',
    openid: '',
    roomNo: '',
    mySeat: -1,
    playerInfoList: [],
    bankerCard: -1,
    cardSpriteFrames: []
};