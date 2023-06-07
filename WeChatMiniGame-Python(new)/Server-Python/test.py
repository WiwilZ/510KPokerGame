import asyncio
import time

gg = {}


async def timer():
    future = asyncio.ensure_future(asyncio.sleep(5))
    gg[1] = future
    await future
    future.add_done_callback(f1)


async def mm():
    if input() == '0':
        gg[1].cancel()


def f1(future):
    print(time.perf_counter() - begin)


async def main():
    await asyncio.wait({asyncio.create_task(timer()), asyncio.create_task(mm())})


begin = time.perf_counter()
asyncio.run(main())
