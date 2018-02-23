# Hi
# I'm RazrBot.

I'm an open source bot who can do things like my friend Teamspeak.
## I can
- log movements on voice channels into a specific text chan.
- poke users.
I mean. When you send `!poke @YDrogen` on your favorite `#memes` chan, I personnaly write a message to `@YDrogen` telling him to join you on that chan because you requested him. Yes. I'm that kind.
___
# Install me
You have to follow a few steps.
- You need to own a Discord server
- You need to turn on your computer.
- ##### IF IT DOESN'T WORK: please.contact.your.local.dealership.and.beg.him.for.help.because.i.can.t.do.anything.for.you.i.m.truely.sorry

#### Then you can follow these steps:
1. Go to [Discord](https://discordapp.com/developers/applications/me)
2. Create a new app
3. Create me (the bot user)
4. Generate the OAuth URL by clicking on the fancy purple button
5. You can check Administrator to be quick. Or if you're paranoid you can check what I can do
6. Copy the URL and paste it in your browser to invite me to your server
7. [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/YDrogen/RazrBot)
9. Please look the Heroku env variables below to configure me with your server
10. Go to Overview (on Heroku still)
11. Configure Dynos
12. Edit `web` and turn it off
13. Edit `bot` and turn in on!
14. I'M ONLINE!
___
# Heroku env variables
-  To access them go into your Heroku app settings and click on `Reveal Config Vars`

| KEY | VALUE |
| --- | ----- |
| token | Your Discord bot token. Not the client secret. The app will stop if not set. |
| lang | Can be: `fr` or `en` for now. Default to `en`. |
| guildName | Your server name. Might sound weird. But required. Default to `RazrNet` |
| logsChannelName | The name of the channel that will contain logs |
___
# Keeping me up to date
- If you're using the above method to install me, you'll have to do it again when I will update myself.
- I'll be working with my creator to provide a better way to do so.
- You can fork me on Github and turn on Automatic Deploys on Heroky by linking your Github account. Then on each update I'll have you'll be able to make a pull request to your own repository and trigger an update on Heroku.
