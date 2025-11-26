import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		buttonText: { type: String, default: "Learn More" },
		link: { type: String },
		image: { type: String, required: true }, // Cloudinary URL
		cloudinary_id: { type: String }, // For updating/deleting
		background: { type: String, default: "#bb1401" }, // hex or gradient string
		isFullImageBanner: { type: Boolean, default: true }, // Show only image as full banner
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
