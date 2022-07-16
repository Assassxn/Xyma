const discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const { Client, Communicator, FriendStatus } = require("./node_modules/fortnite-basic-api/index");

const client = new discord.Client({
	messageCacheLifetime: 60,
	fetchAllMembers: false,
	messageCacheMaxSize: 10,
	restTimeOffset: 0,
	restWsBridgetimeout: 100,
	shards: "auto",
	allowedMentions: {
		parse: ["roles", "users", "everyone"],
		repliedUser: true,
	},
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	intents: 32767,
});

client.setMaxListeners(Infinity);

fnclient = new Client({
	email: process.env.FORTNITE_EMAIL,
	useDeviceAuth: true,
	removeOldDeviceAuths: true,
	deviceAuthPath: "./fbadeviceauths.json",
	launcherToken: "MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=",
	fortniteToken: "ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ=",
	autokill: true,
});
communicator = new Communicator(fnclient);

module.exports = { client, fnclient, communicator, FriendStatus };

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.categories = fs.readdirSync("./commands/");

client.ticketTranscript = mongoose.model(
	"Ticket Transcripts",
	new mongoose.Schema({
		Channel: String,
		Content: Array,
	})
);

["command"].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

mongoose
	.connect(process.env.MONGODB_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connected To database Successfully");
	})
	.catch((err) => {
		console.log(err);
	});

let botChan;

(async () => {
	await client.login(process.env.TOKEN);
	console.log(await fnclient.authenticator.login());
	console.log(await communicator.connect());
	// console.log(await fnclient.authenticator.accessToken);
	botChan = client.channels.cache.get("888762732696969253");
})();

// // Setup communicator events
communicator.events.on("session:started", async () => {
	console.log("Xyma Client is fully connected");
	// botChan.send("Xyma Client is fully connected");
});

communicator.events.on("friend:request", async (friendrequest) => {
	if (friendrequest.friendStatus === FriendStatus.INCOMING) {
		botChan.send(`new friend request from: \`${friendrequest.accountId}\``);
	}
});

communicator.events.on("reconnect", async (failure) => {
	if (failure) {
		botChan.send(failure);
	}
});

communicator.events.on("friend:added", async (friend) => {
	botChan.send(`friend added: ${friend.accountId}`);
});

communicator.events.on("friend:reject", async (friend) => {
	botChan.send(`friend request rejected: ${friend.accountId}`);
});

communicator.events.on("friend:removed", async (friend) => {
	botChan.send(`friend removed: ${friend.accountId}`);
});

communicator.events.on("friend:abort", async (friend) => {
	botChan.send(`Friendrequest aborted: ${friend.accountId}`);
});
process.on("unhandledRejection", (reason, p) => {
	console.log(" [antiCrash] :: Unhandled Rejection/Catch");
	console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
	console.log(" [antiCrash] :: Uncaught Exception/Catch");
	console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
	console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
	console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
	console.log(" [antiCrash] :: Multiple Resolves");
	console.log(type, promise, reason);
});
