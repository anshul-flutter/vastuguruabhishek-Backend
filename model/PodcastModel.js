import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		url: { type: String, required: true }, // YouTube URL
		thumbnail: { type: String }, // optional: auto-generate from YouTube
		description: { type: String },
		category: { type: String, default: "Astrology" },
		tags: [{ type: String }],
		type: {
			type: String,
			enum: ["podcast", "free_course"],
			default: "podcast",
		},
	},
	{ timestamps: true }
);

const Podcast = mongoose.model("Podcast", PodcastSchema);
export default Podcast;
