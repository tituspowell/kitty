import { motion } from 'framer-motion';

const BouncyButton = ({
  isSubmitType,
  text,
  className,
  onClick,
}: {
  isSubmitType: boolean;
  text: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500 }}
      type={isSubmitType ? 'submit' : 'button'}
      className={className}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default BouncyButton;
