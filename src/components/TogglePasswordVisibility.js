import React, { useState } from "react";

export const TogglePasswordVisibility = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [icon, setIcon] = useState("eye");

	const handlePasswordVisibility = () => {
		if (icon === "eye") {
			setIcon("eye-off");
			setPasswordVisibility(!passwordVisibility);
		} else if (icon === "eye-off") {
			setIcon("eye");
			setPasswordVisibility(!passwordVisibility);
		}
	};

	return { passwordVisibility, icon, handlePasswordVisibility };
};
