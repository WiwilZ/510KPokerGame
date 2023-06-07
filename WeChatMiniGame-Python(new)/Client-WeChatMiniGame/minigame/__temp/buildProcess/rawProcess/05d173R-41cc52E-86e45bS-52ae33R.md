```javascript
c —> s: 'ping'
s —> c: 'ping'
```

```javascript
c —> s: {
	type: 'match_room'
}
s —> c: {
    type: 'match_room_result',
    data: {
    	room_no: '0'
    }
}
s —> others: {
    type: 'player_enter',
    data: {
    	seat: 2,
        info: {
            'nickname': nickname,
            'avatar_url': avatar_url,
            'is_ready': False
        }
    }
}
```

```javascript
c —> s: {
	type: 'create_room'
}
s —> c: {
    type: 'create_room_result',
    data: {
    	room_no: '0'
    }
}
```

```javascript
c —> s: {
	type: 'join_room',
    data: {
    	room_no: '0'
    }
}
s —> c: {
    type: 'join_room_result',
    data: {
		'code': 0 | 1 | 2,
        'msg': '' | '房间不存在' | '房间已满',
    }
}
s —> others: {
    type: 'player_enter',
    data: {
    	seat: 2,
        info: {
            'nickname': nickname,
            'avatar_url': avatar_url,
            'is_ready': False
        }
    }
}
```

```javascript
c —> s: {
	type: 'exit_room'
}
s —> others: {
    type: 'player_exit',
    data: {
    	seat: 2
    }
}
```

```javascript
c —> s: {
	type: 'get_player_info'
}
s —> c: {
    type: 'get_player_info_result',
    data: {
		'player_info': [
            {
                'nickname': nickname,
                'avatar_url': avatar_url,
                'is_ready': False
        	},
            null,
            {
                'nickname': nickname,
                'avatar_url': avatar_url,
                'is_ready': False
        	},
            null
        ],
        'player_count': 2,
        'my_seat': 2
    }
}
```

```javascript
c —> s: {
	type: 'update_ready_status',
	data: {
		is_ready: true
	}
}
s —> others: {
    type: 'player_update_ready_status',
    data: {
    	seat: 2,
    	is_ready: true
    }
}

when all are rady
s —> all: {
    type: 'deal',
    data: {
    	banker_seat: 2,
    	banker_card: 20,
    	my_hand: []
    }
}
```

```javascript

```



>服务端20s内未收到包会主动断开连接
>
>客户端20s内未发送成功包则认为已断开连接
>
>
>
>
