import discord
from discord.ext import tasks
from discord import app_commands
import sqlite3
import time

try:
    import bot_credentials
except ImportError:
    print("Please make sure the functions.py file is in the same directory.")
    exit()

sqliteConnection = sqlite3.connect('../database/TurboTracker.db')
cur = sqliteConnection.cursor()

global starttime
starttime = time.time()

global tracked_channel_id
cur.execute("SELECT tracked_chan FROM storage")
result = cur.fetchone()
if result != None:
    tracked_channel_id = result[0]

intents = discord.Intents.all()
intents.members = True
intents.presences = True
intents.guilds = True

client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

global message_per_hour
message_per_hour = -1


@client.event
async def on_ready():
    await tree.sync(guild=discord.Object(id=1048367362098872360))
    print("Bot connecté en %s secondes" % (time.time() - starttime))
    await client.change_presence(activity=discord.Game(name="Profal Poile"))
    messageperhour.start()
    await getmessagesintrackedchan()
    gettotalmembers.start()
    gettotalconnected.start()


@tree.command(name="quoi", description="Quoi?", guild=discord.Object(id=1048367362098872360))
async def first_command(interaction):
    await interaction.response.send_message("feur lol")


@tree.command(name="track", description="Track the number of messages in this channel (only one per server)",
              guild=discord.Object(id=1048367362098872360))
async def chantracking(interaction):
    global tracked_channel_id
    channel = interaction.channel
    if channel.id == tracked_channel_id:
        await interaction.response.send_message(f"This channel is already beeing tracked")
    else:
        cur.execute("SELECT COUNT(*) FROM storage")
        count = cur.fetchone()[0]
        if count == 0:
            # if table is empty, insert a new row
            cur.execute("INSERT INTO storage (tracked_chan) VALUES (?)", (channel.id,))
        else:
            # if table is not empty, update the existing row
            cur.execute("UPDATE storage SET tracked_chan = ?", (channel.id,))
        sqliteConnection.commit()
        tracked_channel_id = channel.id
        await interaction.response.send_message(f"The number of messages in this channel is now tracked")


@tree.command(name="logs", description="Show your log table", guild=discord.Object(id=1048367362098872360))
async def showlogs(interaction):
    embed = discord.Embed(title="Logs",
                          url="https://tinyurl.com/3wefxbbr",
                          description="This is what's in your log table",
                          color=0x1c1c1c, )  # Creating the embed
    embed.set_thumbnail(url="https://i.imgur.com/iBnZox7.png")
    cur.execute("SELECT * FROM logs")
    row = cur.fetchone()  # assuming there is only one row

    embed.add_field(name="Total Members", value=row[0], inline=False)
    embed.add_field(name="Total Connected", value=row[1], inline=False)
    embed.add_field(name="Messages in Channel", value=row[2], inline=False)
    embed.add_field(name="Messages per Hour", value=row[3], inline=False)
    await interaction.response.send_message(embed=embed)


@tasks.loop(hours=1)
async def messageperhour():
    global message_per_hour
    if message_per_hour == -1:
        return
    cur.execute("SELECT COUNT(*) FROM logs")
    count = cur.fetchone()[0]
    if count == 0:
        # if table is empty, insert a new row
        cur.execute("INSERT INTO logs (msg_per_hour) VALUES (?)", (message_per_hour,))
    else:
        # if table is not empty, update the existing row
        cur.execute("UPDATE logs SET msg_per_hour = ?", (message_per_hour,))
    message_per_hour = 0


@tasks.loop(hours=24)
async def getmessagesintrackedchan():
    starttime = time.time()
    print("Started to count messages in the tracked channel")
    tracked_channel = client.get_channel(tracked_channel_id)
    message_count = 0
    async for message in tracked_channel.history(limit=None):
        message_count += 1
    print("Messages counted in %s seconds" % (time.time() - starttime))
    cur.execute("SELECT COUNT(*) FROM logs")
    count = cur.fetchone()[0]
    if count == 0:
        # if table is empty, insert a new row
        cur.execute("INSERT INTO logs (messages_in_channel) VALUES (?)", (message_count,))
    else:
        # if table is not empty, update the existing row
        cur.execute("UPDATE logs SET messages_in_channel = ?", (message_count,))


@tasks.loop(minutes=1)
async def gettotalmembers():
    guild = client.get_guild(1048367362098872360)
    cur.execute("SELECT COUNT(*) FROM logs")
    count = cur.fetchone()[0]
    if count == 0:
        # if table is empty, insert a new row
        cur.execute("INSERT INTO logs (total_members) VALUES (?)", (guild.member_count,))
    else:
        # if table is not empty, update the existing row
        cur.execute("UPDATE logs SET total_members = ?", (guild.member_count,))


@tasks.loop(minutes=1)
async def gettotalconnected():
    guild = client.get_guild(1048367362098872360)
    total_connected = 0
    for member in guild.members:
        if (member.status != discord.Status.offline):
            total_connected += 1
    cur.execute("SELECT COUNT(*) FROM logs")
    count = cur.fetchone()[0]
    if count == 0:
        # if table is empty, insert a new row
        cur.execute("INSERT INTO logs (total_connected) VALUES (?)", (total_connected,))
    else:
        # if table is not empty, update the existing row
        cur.execute("UPDATE logs SET total_connected = ?", (total_connected,))


@client.event
async def on_message(message):
    global  message_per_hour
    if message.guild.id == 1048367362098872360:
        message_per_hour += 1


client.run(bot_credentials.gettoken())
