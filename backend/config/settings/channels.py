import os

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.environ["REDIS_LOCATION"]],
        },
    },
}

CHANNELS_WS_PROTOCOLS = [
    "websocket",
]
