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

global starttime
starttime = time.time()

intents = discord.Intents.all()
intents.members = True
intents.presences = True
intents.guilds = True

client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)


@client.event
async def on_ready():
    await tree.sync(guild=discord.Object(id=1048367362098872360))
    print("Bot connecté en %s secondes" % (time.time() - starttime))
    await client.change_presence(activity=discord.Game(name="Profal Poile"))


@tree.command(name="quoi", description="Quoi?", guild=discord.Object(id=1048367362098872360))
async def first_command(interaction):
    await interaction.response.send_message("feur lol")


@tree.command(name="getchanid", description="Test to get the channel id", guild=discord.Object(id=1048367362098872360))
async def first_command(interaction):
    channel = interaction.channel
    await interaction.response.send_message(f"The channel ID is {channel.id}")


client.run(bot_credentials.gettoken())
