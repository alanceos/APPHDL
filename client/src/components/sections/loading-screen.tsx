import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5 
          }}
        >
          <i className="fas fa-book-open text-6xl text-wine-red"></i>
        </motion.div>
        <h2 className="font-serif text-2xl text-wine-red">Hacienda de Letras</h2>
      </div>
    </motion.div>
  );
}
