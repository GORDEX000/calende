import dayjs from "dayjs";

export const useGenerateDate = () => {
	const arrayOfDays = ["S", "M", "T", "W", "T", "F", "S"];
	const arrayOfMonths = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const generateDates = (month = dayjs().month(), year = dayjs().year()) => {
		const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
		const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

		const arrayOfDates = [];

		// Prefix (Previous month) Dates
		for (let i = 0; i < firstDateOfMonth.date(); i++) {
			arrayOfDates.push({
				currentMonth: false,
				date: firstDateOfMonth.date(i),
				currentDay: false,
			});
		}

		// Generate (Current Month) Dates
		for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
			arrayOfDates.push({
				currentMonth: true,
				date: firstDateOfMonth.date(i),
				today: firstDateOfMonth.date(i).isSame(dayjs(), "date"),
			});
		}

		// Suffix (Next month) Dates
		const remaining = 42 - arrayOfDates.length;

		for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
			arrayOfDates.push({
				currentMonth: false,
				date: lastDateOfMonth.date(i),
				currentDay: false,
			});
		}

		return arrayOfDates;
	};

	return { arrayOfDays, arrayOfMonths, generateDates };
};
