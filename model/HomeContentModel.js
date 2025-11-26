import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
	{
		title: { type: String, default: "" },
		subtitle: { type: String, default: "" },
		items: [
			{
				label: { type: String, required: true },
				description: { type: String, default: "" },
				icon: { type: String, default: "" },
			},
		],
	},
	{ _id: false }
);

const homeContentSchema = new mongoose.Schema(
	{
		services: sectionSchema,
		premiumServices: sectionSchema,
		freeServices: sectionSchema,
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const HomeContent = mongoose.model("HomeContent", homeContentSchema);
export default HomeContent;
