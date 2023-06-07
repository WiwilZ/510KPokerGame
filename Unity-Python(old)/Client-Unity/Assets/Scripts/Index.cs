using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEditor;

public class Index : MonoBehaviour
{
    [SerializeField] private GameObject loading;
    [SerializeField] private GameObject modal;

    private void Awake()
    {
        EventManager.AddListener(EventType.ON_CONNECT_FAILED, OnConnectFailed);
        EventManager.AddListener(EventType.ON_CONNECTED, OnConnected);
    }

    private void Start()
    {
        modal.SetActive(false);
        loading.SetActive(true);

        EventManager.DispatchEvent(EventType.CONNECT_TO_SERVER);
    }

    private void OnDestroy()
    {
        EventManager.RemoveListener(EventType.ON_CONNECT_FAILED);
        EventManager.RemoveListener(EventType.ON_CONNECTED);
    }

    public void Reconnect()
    {
        modal.SetActive(false);
        loading.SetActive(true);
        EventManager.DispatchEvent(EventType.CONNECT_TO_SERVER);
    }

    public void Exit()
    {
#if UNITY_EDITOR
        EditorApplication.isPlaying = false;
#else
        Application.Quit();
#endif
    }

    private void OnConnectFailed(JObject data)
    {
        loading.SetActive(false);
        modal.SetActive(true);
    }

    private static void OnConnected(JObject data)
    {
        SceneManager.LoadScene(1);
    }
}