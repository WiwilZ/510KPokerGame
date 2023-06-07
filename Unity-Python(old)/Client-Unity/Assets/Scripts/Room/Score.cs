using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour
{
    private int _score;
    private Text _scoreText;
    private int _seat;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_DEAL, OnDeal);
        EventManager.AddListener(EventType.ON_ACT, OnAct);
    }

    private void Start()
    {
        _scoreText = GetComponent<Text>();
        _scoreText.text = string.Empty;
    }

    private void InitRoom()
    {
        _scoreText.text = string.Empty;
    }

    private void OnDeal(JObject data)
    {
        _score = 0;
        _scoreText.text = "SCORE: 0分";
        _seat = (int) data["seat"];
    }

    private void OnAct(JObject data)
    {
        JToken scorer;
        if (data.TryGetValue("scorer", out scorer) && _seat == (int) scorer)
        {
            _score += (int) data["score"];
            _scoreText.text = $"SCORE: {_score.ToString()} 分";
        }
    }
}