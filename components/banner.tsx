import * as motion from "motion/react-client"
import StudentCouncilSVG from "./svg/student-council-svg";
import StudentCouncilSVG2 from "./svg/student-council-svg2";

export const Banner = () => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        <div className="w-full h-auto">
            <StudentCouncilSVG />
        </div>
     <div className="w-full h-auto">
            <StudentCouncilSVG2 />
        </div>
    </motion.div>
);