using System;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class TeamPlayResult : MonoBehaviour
{
    [SerializeField] private Image[] avatars;
    [SerializeField] private Text[] scores;
    [SerializeField] private Text[] orders;
    [SerializeField] private Text[] teamScores;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_ACT, OnAct);
    }

    private void Start()
    {
        gameObject.SetActive(false);
    }

    private void InitRoom()
    {
        gameObject.SetActive(false);
    }

    private void OnAct(JObject data)
    {
        JToken resultToken;
        if (!data.TryGetValue("result", out resultToken)) return;

        var result = resultToken.ToArray();
        for (var i = 0; i < 2; i++)
        {
            var teamResult = result[i].ToObject<TeamResult>();
            teamScores[i].text =
                $"{(teamResult.Addition == 0 ? string.Empty : teamResult.Addition.ToString("+#=;-#="))}{teamResult.TeamScore.ToString()}分";
            
            for (var j = 0; j < 2; j++)
            {
                var player = teamResult.Players[j];
                avatars[2 * i + j].overrideSprite = SpriteContainer.Instance.AvatarSprites[player.Seat];
                scores[2 * i + j].text = $"{player.Score.ToString()}分";
                orders[2 * i + j].text = player.Order switch
                {
                    0 => "头游",
                    1 => "二游",
                    2 => "三游",
                    3 => "尾游",
                    _ => "未出完"
                };
            }
        }

        gameObject.SetActive(true);
    }

    [Serializable]
    private class TeamResult
    {
        [JsonProperty("players")] public Player[] Players { get; set; }
        
        [JsonProperty("team_score")] public int TeamScore { get; set; }

        [JsonProperty("addition")] public int Addition { get; set; }
    }

    [Serializable]
    private struct Player
    {
        [JsonProperty("seat")] public int Seat { get; set; }

        [JsonProperty("score")] public int Score { get; set; }

        [JsonProperty("order")] public int Order { get; set; }
    }
}