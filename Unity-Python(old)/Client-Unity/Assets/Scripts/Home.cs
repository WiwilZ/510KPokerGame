using DG.Tweening;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Home : MonoBehaviour
{
    [SerializeField] private InputField joinRoomInput;
    [SerializeField] private CanvasGroup tipsCanvasGroup;
    [SerializeField] private Text tipsText;

    private void Awake()
    {
        joinRoomInput.onEndEdit.AddListener(JoinRoom);
        EventManager.AddListener(EventType.ON_JOIN_ROOM, OnJoinRoom);
    }

    private void Start()
    {
        tipsCanvasGroup.alpha = 0f;
    }

    private void OnDestroy()
    {
        EventManager.RemoveListener(EventType.ON_JOIN_ROOM);
    }

    public void QuickStart()
    {
        EventManager.DispatchEvent(EventType.JOIN_OR_CREATE_ROOM);
        SceneManager.LoadScene(2);
    }

    public void CreateRoom()
    {
        EventManager.DispatchEvent(EventType.CREATE_ROOM);
        SceneManager.LoadScene(2);
    }

    private static void JoinRoom(string roomNo)
    {
        if (!string.IsNullOrEmpty(roomNo))
            EventManager.DispatchEvent(EventType.JOIN_ROOM, JObject.FromObject(new {room_no = roomNo}));
    }

    private void OnJoinRoom(JObject data)
    {
        switch ((int) data["return_code"])
        {
            case 0:
                SceneManager.LoadScene(2);
                return;
            case 1:
                tipsText.text = "房间号不合法！";
                break;
            case 2:
                tipsText.text = "房间号不存在！";
                break;
            case 3:
                tipsText.text = "该房间已满员！";
                break;
        }

        tipsCanvasGroup.alpha = 1f;
        tipsCanvasGroup.DOFade(0f, 2.5f);
    }
}