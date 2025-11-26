import Cart from "../../model/CartModel.js";

export const getProducts = async (req, res) => {
	try {
		const userId = req.user._id;

		let cart = await Cart.findOne({ userId }).populate({
			path: "items.itemId",
			select: "title name description price image thumbnail author",
		});

		if (!cart) {
			cart = { items: [] }; // return empty cart structure
		} else {
			// Filter out items where the referenced product (itemId) no longer exists
			// This happens if an admin deletes a product that is in a user's cart
			const originalLength = cart.items.length;
			cart.items = cart.items.filter((item) => item.itemId !== null);

			if (cart.items.length !== originalLength) {
				await cart.save();
			}
		}

		res.status(200).json({
			status: true,
			code: 200,
			message: "Cart fetched successfully",
			data: cart,
		});
	} catch (err) {
		console.error("Error fetching cart:", err);
		res.status(500).json({
			status: false,
			code: 500,
			message: "Error fetching cart",
			error: err.message,
		});
	}
};
