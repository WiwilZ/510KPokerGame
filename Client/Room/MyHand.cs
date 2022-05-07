using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class MyHand : MonoBehaviour
{
    [SerializeField] private GameObject modal;
    [SerializeField] private Button confirmButton;
    [SerializeField] private GameObject buttons;
    [SerializeField] private GameObject passButton;
    [SerializeField] private Button playCardsButton;

    private readonly Image[] _images = new Image[26];
    private readonly MyHandCard[] _scripts = new MyHandCard[26];

    private readonly SortedList<int, int> _selectedCardCounts = new();
    private readonly Dictionary<Transform, int> _selectedCards = new();
    private Func<bool> _checkActionValid;

    private ActionType _curAction;

    private bool _isBanker;
    private ActionType _lastAction;
    private int _seat;
    private (MyHandCard Script, int Card)? _selectedBankerCard;

    private Action _setCardsCallback1;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_DEAL, OnDeal);
        EventManager.AddListener(EventType.ON_ACT, OnAct);
    }

    private void Start()
    {
        for (var i = 0; i < transform.childCount; i++)
        {
            var child = transform.GetChild(i);
            _images[i] = child.GetComponent<Image>();
            _scripts[i] = child.GetComponent<MyHandCard>();
        }

        InitRoom();
    }

    private void InitRoom()
    {
        modal.SetActive(false);
        buttons.SetActive(false);

        foreach (Transform child in transform)
            child.gameObject.SetActive(false);
    }

    private void OnDeal(JObject data)
    {
        _selectedCards.Clear();
        _selectedCardCounts.Clear();

        _seat = (int) data["seat"];
        _isBanker = _seat == (int) data["banker_seat"];
        var handCards = data["hand_cards"].Select(e => (int) e).ToArray();

        for (var i = 0; i < handCards.Length; i++)
        {
            _images[i].overrideSprite = SpriteContainer.Instance.CardSprites[handCards[i]];

            var script = _scripts[i];
            script.ResetStatus();
            script.OnClickCallback1 = null;
            script.OnClickCallback2 = null;

            transform.GetChild(i).gameObject.SetActive(true);
        }

        _setCardsCallback1 = () =>
        {
            for (var i = 0; i < handCards.Length; i++)
            {
                var card = handCards[i];
                var weight = card / 4;

                var trans = transform.GetChild(i);

                _scripts[i].OnClickCallback1 = selected =>
                {
                    if (selected)
                    {
                        _selectedCards.Remove(trans);

                        if (_selectedCardCounts[weight] == 1)
                            _selectedCardCounts.Remove(weight);
                        else
                            _selectedCardCounts[weight] -= 1;
                    }
                    else
                    {
                        _selectedCards.Add(trans, card);

                        if (_selectedCardCounts.ContainsKey(weight))
                            _selectedCardCounts[weight] += 1;
                        else
                            _selectedCardCounts.Add(weight, 1);
                    }
                };
            }
        };

        if (_isBanker)
        {
            for (var i = 0; i < handCards.Length; i++)
            {
                var card = handCards[i];
                var script = _scripts[i];
                script.OnClickCallback1 = selected =>
                {
                    if (selected)
                    {
                        _selectedBankerCard = null;
                        confirmButton.interactable = false;
                    }
                    else
                    {
                        _selectedBankerCard?.Script.ResetStatus();
                        _selectedBankerCard = (script, card);
                        confirmButton.interactable = true;
                    }
                };
            }

            confirmButton.interactable = false;
            modal.SetActive(true);
            _selectedBankerCard = null;
        }
        else
        {
            _setCardsCallback1();
        }
    }

    public void ConfirmChangeBankerCard()
    {
        EventManager.DispatchEvent(EventType.CHANGE_BANKER_CARD,
            JObject.FromObject(new {banker_card = _selectedBankerCard?.Card}));

        CancelChangeBankerCard();
    }

    public void CancelChangeBankerCard()
    {
        modal.SetActive(false);

        _setCardsCallback1();
        _checkActionValid = CheckActionValid0;
        foreach (var script in _scripts)
            script.OnClickCallback2 = CheckPlayCardsButton;

        passButton.SetActive(false);
        playCardsButton.interactable = false;
        buttons.SetActive(true);
        _selectedBankerCard?.Script.ResetStatus();
    }

    private void OnAct(JObject data)
    {
        JToken scorer;
        if (data.TryGetValue("scorer", out scorer))
        {
            _lastAction = new ActionType {Type = ActionEnum.NONE};
        }
        else
        {
            var action = data["action_type"].ToObject<ActionType>();
            if (action.Type != ActionEnum.NONE)
                _lastAction = action;
        }

        JToken nextSeat;
        if (data.TryGetValue("next_seat", out nextSeat) && _seat == (int) nextSeat)
        {
            _checkActionValid = _lastAction.Type switch
            {
                ActionEnum.NONE => CheckActionValid0,
                ActionEnum.SINGLE or ActionEnum.PAIR or ActionEnum.THREE => CheckActionValid1,
                ActionEnum.PAIR_STRAIGHT or ActionEnum.THREE_STRAIGHT => CheckActionValid2,
                ActionEnum._510K => CheckActionValid3,
                _ => CheckActionValid4
            };

            foreach (var script in _scripts)
                script.OnClickCallback2 = CheckPlayCardsButton;

            CheckPlayCardsButton();

            passButton.SetActive(scorer == null);
            buttons.SetActive(true);
        }
    }

    public void Pass()
    {
        buttons.SetActive(false);

        _curAction = new ActionType {Type = ActionEnum.NONE};
        EventManager.DispatchEvent(EventType.PLAY_CARDS, JObject.FromObject(new
        {
            action_type = _curAction,
            action_cards = Array.Empty<int>()
        }));

        foreach (var script in _scripts)
        {
            script.ResetStatus();
            script.OnClickCallback2 = null;
        }

        _selectedCards.Clear();
        _selectedCardCounts.Clear();
    }

    public void PlayCards()
    {
        buttons.SetActive(false);

        var actionCards = _selectedCards.Values.ToArray();
        Array.Sort(actionCards);
        EventManager.DispatchEvent(EventType.PLAY_CARDS, JObject.FromObject(new
        {
            action_type = _curAction,
            action_cards = actionCards
        }));

        foreach (var child in _selectedCards.Keys)
            child.gameObject.SetActive(false);

        foreach (var script in _scripts)
            script.OnClickCallback2 = null;

        _selectedCards.Clear();
        _selectedCardCounts.Clear();
    }

    private void CheckPlayCardsButton()
    {
        playCardsButton.interactable = _checkActionValid();
    }

    private bool CheckActionValid0() //None
    {
        if (_selectedCards.Count == 0) return false;
        return CheckBomb() || Check510K() || Check123() || CheckStraight();
    }

    private bool CheckActionValid1() //123
    {
        if (_selectedCards.Count == 0) return false;
        return CheckBomb() || Check510K() || (
            Check123() && _curAction.Type == _lastAction.Type && _curAction.Weight > _lastAction.Weight
        );
    }

    private bool CheckActionValid2() //straight
    {
        if (_selectedCards.Count == 0) return false;
        return CheckBomb() || Check510K() || (
            CheckStraight() && _curAction.Type == _lastAction.Type &&
            _curAction.Length == _lastAction.Length && _curAction.Weight > _lastAction.Weight
        );
    }

    private bool CheckActionValid3() //510K
    {
        if (_selectedCards.Count == 0) return false;
        return CheckBomb() || (Check510K() && _curAction.Weight > _lastAction.Weight);
    }

    private bool CheckActionValid4() //bomb
    {
        if (_selectedCards.Count == 0) return false;
        return CheckBomb() && (_curAction.Length > _lastAction.Length ||
                               (_curAction.Length == _lastAction.Length && _curAction.Weight > _lastAction.Weight));
    }

    private bool CheckBomb()
    {
        if (_selectedCardCounts.Count != 1) return false;

        var (weight, cnt) = _selectedCardCounts.First();
        if (cnt < 4) return false;

        _curAction = new ActionType
        {
            Type = ActionEnum.BOMB,
            Weight = weight,
            Length = cnt
        };
        return true;
    }

    private bool Check510K()
    {
        if (_selectedCardCounts.Count != 3 ||
            _selectedCardCounts.GetValueOrDefault(2, 0) != 1 ||
            _selectedCardCounts.GetValueOrDefault(7, 0) != 1 ||
            _selectedCardCounts.GetValueOrDefault(10, 0) != 1)
            return false;

        _curAction = new ActionType
        {
            Type = ActionEnum._510K,
            Weight = Convert.ToInt32(_selectedCards.Values.Select(e => e % 4).ToHashSet().Count == 1)
        };
        return true;
    }

    private bool Check123()
    {
        if (_selectedCardCounts.Count != 1) return false;

        var (weight, cnt) = _selectedCardCounts.First();
        if (cnt >= 4) return false;

        _curAction = new ActionType
        {
            Type = (ActionEnum) cnt,
            Weight = weight,
            Length = cnt
        };
        return true;
    }

    private bool CheckStraight()
    {
        if (_selectedCardCounts.Count < 2 || _selectedCardCounts.Last().Key == 12) return false;

        var (weight, cnt) = _selectedCardCounts.First();
        if (cnt is < 2 or > 3) return false;

        var length = 0;
        foreach (var (k, v) in _selectedCardCounts)
        {
            if (k != weight + length || v != cnt) return false;
            length++;
        }

        _curAction = new ActionType
        {
            Type = (ActionEnum) (cnt + 2),
            Weight = weight,
            Length = length
        };
        return true;
    }

    private enum ActionEnum
    {
        NONE,
        SINGLE,
        PAIR,
        THREE,
        PAIR_STRAIGHT,
        THREE_STRAIGHT,
        _510K,
        BOMB
    }

    [Serializable]
    private struct ActionType
    {
        [JsonProperty("type")] public ActionEnum Type { get; set; }

        [JsonProperty(PropertyName = "weight", NullValueHandling = NullValueHandling.Ignore)]
        public int? Weight { get; set; }

        [JsonProperty(PropertyName = "length", NullValueHandling = NullValueHandling.Ignore)]
        public int? Length { get; set; }
    }
}