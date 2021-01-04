"use strict";

const Helper = require("../../helper");
const Msg = require("../../models/msg");

exports.commands = ["join"];

exports.input = function ({irc}, chan, cmd, args) {
	if (Helper.config.lockChannels.enable) {
		if (Helper.config.lockChannels.channels.indexOf(args[0]) === -1) {
			chan.pushMessage(
				this,
				new Msg({
					type: Msg.Type.ERROR,
					text: "Error: not allowed to join that channel.",
				})
			);
			return false;
		}
	}

	irc.raw(`${cmd} ${args.join(" ")}`);
	return true;
};
