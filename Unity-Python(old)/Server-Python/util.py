import json


def send_response(request, event_type, data=None):
    request.sendall(bytes([event_type]))
    if data is None:
        request.sendall((0).to_bytes(4, byteorder='big'))
    else:
        res = json.dumps(data, separators=(',', ':')).encode()
        request.sendall((len(res).to_bytes(4, byteorder='big')))
        request.sendall(res)
