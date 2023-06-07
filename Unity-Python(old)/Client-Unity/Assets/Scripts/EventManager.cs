using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

public enum EventType
{
    JOIN_OR_CREATE_ROOM = 1,
    CREATE_ROOM,
    JOIN_ROOM,
    GET_ROOM_INFO,
    EXIT_ROOM,
    DEAL,
    CHANGE_BANKER_CARD,
    PLAY_CARDS,
    RESTART,

    ON_JOIN_ROOM,
    ON_ROOM_MEMBER_CHANGE,
    ON_DEAL,
    ON_BANKER_CARD_CHANGE,
    ON_ACT,

    CONNECT_TO_SERVER,
    INIT_ROOM,

    ON_CONNECTED,
    ON_CONNECT_FAILED,
    ON_DISCONNECTED
}


public static class EventManager
{
    private static readonly Dictionary<EventType, HashSet<Action<JObject>>> Listeners = new();

    public static void AddListener(EventType eventType, Action<JObject> handler)
    {
        if (!Listeners.ContainsKey(eventType))
            Listeners.Add(eventType, new HashSet<Action<JObject>>());
        Listeners[eventType].Add(handler);
    }

    public static void RemoveListener(EventType eventType, Action<JObject> handler)
    {
        HashSet<Action<JObject>> handlers;
        if (Listeners.TryGetValue(eventType, out handlers))
            handlers.Remove(handler);
    }

    public static void RemoveListener(EventType eventType)
    {
        Listeners.Remove(eventType);
    }

    public static void RemoveAllListeners()
    {
        Listeners.Clear();
    }

    public static void DispatchEvent(EventType eventType, JObject data = null)
    {
        HashSet<Action<JObject>> handlers;
        if (Listeners.TryGetValue(eventType, out handlers))
            foreach (var handler in handlers)
                handler(data);
    }
}