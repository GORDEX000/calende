// Organizes dynamic classNames
export const cn = (...classes) => {
	return classes.filter(Boolean).join(" ");
};
