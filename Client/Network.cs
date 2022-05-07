using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;

public class Network : MonoBehaviour
{
    private const string Ip = "101.42.252.116";
    private const int Port = 11111;
    private readonly HMACSHA1 _hmac = new(Encoding.ASCII.GetBytes("wiwilz"));
    private readonly ConcurrentQueue<(EventType, JObject)> _eventQueue = new();
    private readonly TcpClient _tcpClient = new();
    private NetworkStream Stream => _tcpClient.GetStream();
    private bool Connected => _tcpClient.Connected;

    private void Awake()
    {
        EventManager.AddListener(EventType.CONNECT_TO_SERVER, _ => ConnectToServer());

        foreach (var eventType in new[]
                 {
                     EventType.JOIN_OR_CREATE_ROOM,
                     EventType.CREATE_ROOM,
                     EventType.JOIN_ROOM,
                     EventType.GET_ROOM_INFO,
                     EventType.EXIT_ROOM,
                     EventType.DEAL,
                     EventType.CHANGE_BANKER_CARD,
                     EventType.PLAY_CARDS,
                     EventType.RESTART
                 })
            EventManager.AddListener(eventType, data => SendRequest(eventType, data));
    }

    private void FixedUpdate()
    {
        (EventType eventType, JObject data) evt;
        if (_eventQueue.TryDequeue(out evt))
            EventManager.DispatchEvent(evt.eventType, evt.data);
    }

    private void OnDestroy()
    {
        EventManager.RemoveAllListeners();
        if (Connected)
        {
            Stream.Close();
            _tcpClient.Close();
        }
    }

    private void ConnectToServer()
    {
        Task.Run(() =>
        {
            if (TryConnect() && TryAuthenticate())
                ListenResponse();
        });
    }

    private bool TryConnect()
    {
        try
        {
            _tcpClient.Connect(Ip, Port);
            _tcpClient.NoDelay = true;
            print("[Client] TryConnect: Start connect");
            return true;
        }
        catch (Exception e) when (e is SocketException or ObjectDisposedException)
        {
            _eventQueue.Enqueue((EventType.ON_CONNECT_FAILED, null));
            Debug.LogError("[Client] TryConnect: Connect failed");
            Debug.LogException(e);
            return false;
        }
    }

    private bool TryAuthenticate()
    {
        try
        {
            Stream.Write(_hmac.ComputeHash(ReadData(ReadInt())));
            if (Stream.ReadByte() == 0)
            {
                _eventQueue.Enqueue((EventType.ON_CONNECTED, null));
                print("[Client] TryAuthenticate: Connected");
                return true;
            }
        }
        catch (Exception e) when (e is InvalidOperationException or IOException or ObjectDisposedException)
        {
            Debug.LogException(e);
        }

        _eventQueue.Enqueue((EventType.ON_CONNECT_FAILED, null));
        Debug.LogError("[Client] TryAuthenticate: Authenticate failed");
        return false;
    }

    private void ListenResponse()
    {
        try
        {
            while (true)
            {
                var eventType = (EventType) Stream.ReadByte();
                print($"[Client] ListenResponse: eventType = {eventType}");
                var dataLen = ReadInt();
                print($"[Client] ListenResponse: dataLen = {dataLen}");
                if (dataLen == 0)
                {
                    _eventQueue.Enqueue((eventType, null));
                }
                else
                {
                    var json = Encoding.UTF8.GetString(ReadData(dataLen));
                    print($"[Client] ListenResponse: json = {json}");
                    var data = JObject.Parse(json);
                    _eventQueue.Enqueue((eventType, data));
                }
            }
        }
        catch (Exception e) when (e is InvalidOperationException or IOException or ObjectDisposedException)
        {
            _eventQueue.Enqueue((EventType.ON_DISCONNECTED, null));
            Debug.LogError("[Client] ListenResponse: Disconnected");
            Debug.LogException(e);
        }
    }

    private void SendRequest(EventType eventType, JObject data)
    {
        Task.Run(() =>
        {
            try
            {
                Stream.WriteByte((byte) eventType);
                print($"[Client] SendRequest: eventType = {eventType}");
                if (data == null)
                {
                    Stream.Write(BitConverter.GetBytes(0));
                    print($"[Client] SendRequest: dataLen = 0");
                }
                else
                {
                    var request = Encoding.UTF8.GetBytes(data.ToString());
                    Stream.Write(BitConverter.GetBytes(IPAddress.HostToNetworkOrder(request.Length)));
                    print($"[Client] SendRequest: dataLen = {request.Length}");
                    Stream.Write(request);
                    print($"[Client] SendRequest: request = {request}");
                }
            }
            catch (Exception e) when (e is InvalidOperationException or IOException or ObjectDisposedException)
            {
                _eventQueue.Enqueue((EventType.ON_DISCONNECTED, null));
                Debug.LogError("[Client] SendRequest: Disconnected");
                Debug.LogException(e);
            }
        });
    }

    private int ReadInt()
    {
        return IPAddress.NetworkToHostOrder(BitConverter.ToInt32(ReadData(4)));
    }

    private byte[] ReadData(int length)
    {
        var buffer = new byte[length];
        var totalBytes = 0;
        do
        {
            var readBytes = Stream.Read(buffer, totalBytes, length - totalBytes);
            if (readBytes == 0)
                throw new IOException();
            totalBytes += readBytes;
        } while (totalBytes < length);

        return buffer;
    }
}