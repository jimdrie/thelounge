"use strict";

const Helper = require("../../helper");
const Msg = require("../../models/msg");

exports.commands = ["raw", "send", "quote"];

exports.input = function ({irc}, chan, cmd, args) {
	if (Helper.config.lockChannels.enable) {
		chan.pushMessage(
			this,
			new Msg({
				type: Msg.Type.ERROR,
				text: "Error: channels are locked, so raw commands are disabled.",
			})
		);
		return false;
	}

	if (args.length !== 0) {
		irc.connection.write(args.join(" "));
	}

	return true;
};
