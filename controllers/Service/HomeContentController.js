import HomeContent from "../../model/HomeContentModel.js";

const toClientShape = (doc) => {
	if (!doc) return {};
	const {
		services,
		premiumServices,
		freeServices,
		updatedBy,
		createdAt,
		updatedAt,
		_id,
		__v,
	} = doc;
	return {
		servicesSection: services ?? {},
		premiumSection: premiumServices ?? {},
		freeSection: freeServices ?? {},
		updatedBy,
		createdAt,
		updatedAt,
		_id,
		__v,
	};
};

const toModelShape = (payload) => {
	const out = {};
	if (payload?.servicesSection) out.services = payload.servicesSection;
	if (payload?.premiumSection) out.premiumServices = payload.premiumSection;
	if (payload?.freeSection) out.freeServices = payload.freeSection;
	return out;
};

export const getHomeContent = async (req, res) => {
	try {
		const doc = await HomeContent.findOne({}).lean();
		res.status(200).json({ success: true, data: toClientShape(doc) });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "Failed to fetch home content",
			error: e.message,
		});
	}
};

export const upsertHomeContent = async (req, res) => {
	try {
		const payload = req.body || {};
		const modelUpdate = toModelShape(payload);
		const updated = await HomeContent.findOneAndUpdate(
			{},
			{ $set: { ...modelUpdate, updatedBy: req.user?._id } },
			{ new: true, upsert: true }
		).lean();
		res.status(200).json({
			success: true,
			message: "Home content updated",
			data: toClientShape(updated),
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "Failed to update home content",
			error: e.message,
		});
	}
};
