import { ArrowUp } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "../lib/utils";
import { useState } from "react";

const GoTopButton = () => {
	const { scrollY } = useScroll();
	const [showButton, setShowButton] = useState(false);

	useMotionValueEvent(scrollY, "change", (current) => {
		const previous = scrollY.getPrevious() ?? current;
		const diff = current - previous;
		setShowButton(diff > 0 ? true : false);
	});
	return (
		<button
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			className={cn(
				"fixed bottom-8 right-12 bg-gray-900 text-white p-2 rounded-full cursor-pointer transition-opacity duration-300",
				showButton ? "opacity-100" : "opacity-0 pointer-events-none"
			)}
		>
			<ArrowUp className="w-10 h-10" aria-label="Scroll to top" />
		</button>
	);
};

export default GoTopButton;
