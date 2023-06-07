import engine from "engine";
import { databus } from "./Databus";


@engine.decorators.serialize("Player")
export class Player {
    @engine.decorators.property({
        type: engine.TypeNames.UISprite
    })
    public avatarSprite: engine.UISprite;

    @engine.decorators.property({
        type: engine.TypeNames.UILabel
    })
    public nicknameLabel: engine.UILabel;

    @engine.decorators.property({
        type: engine.TypeNames.UILabel
    })
    public orderLabel: engine.UILabel;

    @engine.decorators.property({
        type: engine.TypeNames.UILabel
    })
    public scoreLabel: engine.UILabel;
}

@engine.decorators.serialize("Team")
export class Team {
    @engine.decorators.property({
        type: [Player]
    })
    public playerList: Player[] = [];

    @engine.decorators.property({
        type: engine.TypeNames.UILabel
    })
    public finalScoreLabel: engine.UILabel;
}


@engine.decorators.serialize("TeamPlayResult")
export default class TeamPlayResult extends engine.Script {
    @engine.decorators.property({
        type: [Team]
    })
    public teamList: Team[] = [];

    private playerExitHandler;
    private playerPlayHandler;


    public onAwake() {
        this.init();

        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.on('player_play', this.playerPlayHandler);

        this.reset();
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    }

    private init() {
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.entity.transform2D.children[0].entity.active = false;
    }

    private onPlayerExit() {
        this.reset();
    }

    private onPlayerPlay({ team_play_result }) {
        if (team_play_result !== undefined) {
            this.teamList.forEach((team, i) => {
                const { players, team_score, addition } = team_play_result[i];
                team.playerList.forEach((player, j) => {
                    const { seat, score, order } = players[j];
                    const { avatar, nickname } = databus.playerInfoList[seat];
                    player.avatarSprite.spriteFrame = avatar;
                    player.nicknameLabel.text = nickname;
                    switch (order) {
                        case 0:
                            player.orderLabel.text = '头游';
                            break;
                        case 1:
                            player.orderLabel.text = '二游';
                            break;
                        case 2:
                            player.orderLabel.text = '三游';
                            break;
                        case 3:
                            player.orderLabel.text = '尾游';
                            break;
                        default:
                            player.orderLabel.text = '';
                            break;
                    }
                    player.scoreLabel.text = `${score}分`;
                });
                team.finalScoreLabel.text = `${addition === 0 ? '' : addition > 0 ? `+<style|color=#FFFF00>${addition}</style> = ` : `-<style|color=#FFFF00>${-addition}</style> = `}<style|color=#FF0000>${team_score}</style>分`;
            });

            this.entity.transform2D.children[0].entity.active = true;
        }
    }
}
