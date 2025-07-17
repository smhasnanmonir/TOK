import { motion } from "motion/react";
import { ReactNode } from "react";

const SlideMotion = (children: ReactNode) => {
  return <motion.div>{children}</motion.div>;
};

export default SlideMotion;
