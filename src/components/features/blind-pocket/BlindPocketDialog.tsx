// import { memo } from 'react'
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription
// } from "../../shared/Dialog"
// import { images } from '~/assets'

// const BlindPocketDialog = memo(() => {

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className="hidden" id="open-blind-pocket-dialog"></button>
//       </DialogTrigger>

//       <DialogContent
//         className="w-[674px] h-[610px] rounded-[20px] text-center shadow-2xl p-6 flex flex-col items-center bg-cover bg-center border border-gray-300 bg-white/100"
//         style={{
//           backgroundImage: `url(${images.bg_texture})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center"
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle
//             className="text-[38px] font-normal leading-[48px] tracking-[-1.1%]"
//             style={{ fontFamily: "DFVN Bagel Fat One", color: "#5DAEFF" }}
//           >
//             Chúc mừng bạn đã hoàn thành mốc
//           </DialogTitle>
//         </DialogHeader>

//         <DialogDescription className="text-pink-500 text-[24px] font-medium mt-4">
//           Món quà của bạn là?
//         </DialogDescription>

//         {/* Card quà */}
//         <div className="w-[626px] h-[187px] rounded-[16px] border border-pink-300 flex justify-center items-center mt-6 p-4 overflow-hidden">
//           <img
//             src={images.questionmark}
//             alt="Quà túi mù"
//             className="w-[500px] h-[140px] object-cover rounded-lg"
//           />
//         </div>


//         <button
//           className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-[22px] mt-6"
//         >
//           Xé túi mù ngay
//         </button>
//       </DialogContent>
//     </Dialog>
//   )
// })

// export default BlindPocketDialog

// import { memo, useState } from "react";
// import { motion } from "framer-motion"; // Import Framer Motion
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle
// } from "../../shared/Dialog";
// import { images } from "~/assets";
// import { gifts } from "~/mocks/data"; // Import danh sách quà

// const BlindPocketDialog = memo(() => {
//   const [selectedGift, setSelectedGift] = useState<{ id: number; name: string; image: string } | null>(null);
//   const [isOpening, setIsOpening] = useState(false); // Flag for animation state
//   const [isGiftRevealed, setIsGiftRevealed] = useState(false); // Flag to check if gift is revealed
//   const [isCollected, setIsCollected] = useState(false); // Flag for collecting the gift

//   // Hàm xử lý mở quà
//   const handleOpenGift = () => {
//     setIsOpening(true); // Start animation
//     setTimeout(() => {
//       const randomGift = gifts[Math.floor(Math.random() * gifts.length)]; // Random gift selection
//       setSelectedGift(randomGift);
//       setIsGiftRevealed(true); // Reveal the gift after animation
//       setIsOpening(false); // End animation
//     }, 1200); // Thời gian hiệu ứng thu nhỏ
//   };

//   // Hàm xử lý thu nhỏ khi nhấn "Bỏ vào túi ngay"
//   const handleCollectGift = () => {
//     setIsCollected(true); // When gift is collected, shrink the card
//     setTimeout(() => {
//       setSelectedGift(null); // Reset after the shrink animation
//       setIsCollected(false); // Reset collected state
//       setIsGiftRevealed(false); // Hide the gift
//     }, 800); // Reset time after shrink
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className="hidden" id="open-blind-pocket-dialog"></button>
//       </DialogTrigger>

//       <DialogContent
//         className="w-[674px] h-[610px] rounded-[20px] text-center shadow-2xl p-6 flex flex-col items-center bg-cover bg-center border border-gray-300 bg-white/100"
//         style={{
//           backgroundImage: `url(${images.bg_texture})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center"
//         }}
//       >
//         {/* Tiêu đề */}
//         <DialogHeader>
//           <DialogTitle className="text-[38px] font-normal leading-[48px] tracking-[-1.1%] text-[#5DAEFF]">
//             Chúc mừng bạn đã hoàn thành mốc
//           </DialogTitle>
//         </DialogHeader>

//         {/* Mô tả chỉ hiển thị trước khi ấn "Xé túi mù ngay" */}
//         {!isOpening && !isGiftRevealed && (
//           <p className="text-pink-500 text-[24px] font-medium mt-4">
//             Món quà của bạn là?
//           </p>
//         )}

//         <motion.div
//           initial={{ width: 626, height: 187, borderRadius: 16, padding: 14 }}
//           animate={
//             isOpening
//               ? { width: 200.67, height: 187, borderRadius: 20, padding: "12px 20px" }
//               : isCollected
//                 ? { width: 200.67, height: 187, borderRadius: 20, padding: "12px 20px" }
//                 : { width: 626, height: 187, borderRadius: 16, padding: 14 }
//           }
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//           className="border border-pink-300 flex flex-col justify-center items-center mt-6 overflow-hidden"
//         >
//           <motion.img
//             src={isGiftRevealed ? selectedGift?.image : images.questionmark}
//             alt="Quà túi mù"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             className="w-full h-full object-contain"
//           />
//           {isGiftRevealed && selectedGift && (
//             <p className="text-lg font-semibold text-gray-700 mt-2">{selectedGift.name}</p>
//           )}
//         </motion.div>

//         {/* Nút mở quà / thu quà */}
//         {isGiftRevealed ? (
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-[22px] mt-6"
//             onClick={handleCollectGift}
//           >
//             Bỏ vào túi ngay
//           </button>
//         ) : (
//           <button
//             className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-[22px] mt-6"
//             onClick={handleOpenGift}
//           >
//             Xé túi mù ngay
//           </button>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// });

// export default BlindPocketDialog;

import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../shared/Dialog";
import { images } from "~/assets";
import { gifts } from "~/mocks/data"; // Import danh sách quà

const BlindPocketDialog = memo(() => {
  const [selectedGift, setSelectedGift] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isGiftRevealed, setIsGiftRevealed] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [collectedGifts, setCollectedGifts] = useState<{ id: number; name: string; image: string }[]>([]); // Lưu lại các món quà đã thu

  const handleOpenGift = () => {
    setIsOpening(true);
    setTimeout(() => {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      setSelectedGift(randomGift);
      setIsGiftRevealed(true);
      setIsOpening(false);
    }, 1200);
  };

  const handleCollectGift = () => {
    setCollectedGifts([...collectedGifts, selectedGift!]); // Thêm món quà vào danh sách đã thu
    setIsCollected(true); // Chuyển giao diện sang màn hình "Thu quà"
    setIsGiftRevealed(false); // Ẩn quà khi đã thu
    setTimeout(() => {
      setSelectedGift(null);
    }, 800);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hidden" id="open-blind-pocket-dialog"></button>
      </DialogTrigger>

      <DialogContent
        className="w-[674px] h-[610px] rounded-[20px] text-center shadow-2xl p-6 flex flex-col items-center bg-cover bg-center border border-gray-300 bg-white/100"
        style={{
          backgroundImage: `url(${images.bg_texture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Nếu đã thu quà, hiển thị thông tin cá nhân và các món quà đã thu */}
        {isCollected ? (
          <div className="flex flex-col items-center w-full relative pb-[80px]">
            {/* Thông tin cá nhân */}
            <div
              className="w-[227px] h-[46px] bg-[#FF92CB] rounded-[20px] flex justify-center items-center gap-[10px] p-[8px 16px] mb-4"
            >
              <p className="text-white text-[16px] font-medium">
                Xem thông tin cá nhân
              </p>
            </div>

            {/* Thông tin nhân vật */}
            <div
              className="w-[626px] h-[81px] bg-pink-500 rounded-[12px] flex justify-center items-center mt-4"
            >
              <img src={images.characters} alt="Character" className="w-[60px] h-[60px]" />
            </div>

            {/* Thông tin món quà đã thu */}
            <div className="w-[626px] h-[22px] bg-[#FCD700] rounded-[20px] flex justify-center items-center gap-[10px] p-[4px 8px 2px 8px] mt-4">
              <p className="text-[16px] font-medium text-black">
                [Tên Nhân Vật] - Đang có {collectedGifts.length} món quà
              </p>
            </div>

            <div className="w-full flex flex-wrap justify-center gap-10 mt-4">
              <div className="grid grid-cols-3 gap-6">
                {collectedGifts.map((gift, index) => (
                  <div key={index} className="w-[200.67px] h-[187px] border-[1px] border-[#FF92CB] rounded-[20px] p-[12px 20px] gap-[14px]">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-full object-cover rounded-[20px]"
                    />
                    <p className="text-center mt-2">{gift.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="w-[626px] h-[56px] bg-[#F08A4A] rounded-[16px] p-[16px] flex justify-center items-center gap-[13px] fixed bottom-5"
            >
              <p className="text-white text-[18px] font-medium">
                Những món quà này sẽ được gửi đến các bé
              </p>
            </div>
          </div>
        ) : (
          // Hiển thị UI mở quà
          <>
            <DialogHeader>
              <DialogTitle className="text-[38px] font-normal leading-[48px] tracking-[-1.1%] text-[#5DAEFF]">
                Chúc mừng bạn đã hoàn thành mốc
              </DialogTitle>
            </DialogHeader>
            <p className="text-pink-500 text-[24px] font-medium mt-4">
              Món quà của bạn là?
            </p>

            <motion.div
              initial={{ width: 626, height: 187, borderRadius: 16, padding: 14 }}
              animate={
                isOpening
                  ? { width: 200.67, height: 187, borderRadius: 20, padding: "12px 20px" }
                  : { width: 626, height: 187, borderRadius: 16, padding: 14 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="border border-pink-300 flex flex-col justify-center items-center mt-6 overflow-hidden"
            >
              <motion.img
                src={isGiftRevealed ? selectedGift?.image : images.questionmark}
                alt="Quà túi mù"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-contain"
              />
              {isGiftRevealed && selectedGift && (
                <p className="text-lg font-semibold text-gray-700 mt-2">
                  {selectedGift.name}
                </p>
              )}
            </motion.div>

            {isGiftRevealed ? (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-[22px] mt-6"
                onClick={handleCollectGift}
              >
                Bỏ vào túi ngay
              </button>
            ) : (
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-[22px] mt-6"
                onClick={handleOpenGift}
              >
                Xé túi mù ngay
              </button>
            )}
          </>
        )}


        {/* Hiển thị phần thông báo "Những món quà này sẽ được gửi đến các bé" */}
      </DialogContent>
    </Dialog>
  );
});

export default BlindPocketDialog;
