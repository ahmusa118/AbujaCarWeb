import Navbar from "./Navbar";
import { bck } from "../../constants";
import { SectionWrapper } from "../hoc";
import { Carousel } from 'antd';
import Footer from "./Footer";
const isHdrSupported = async () => {
  if ('mediaCapabilities' in navigator) {
    try {
      const hdrSupport = await navigator.mediaCapabilities.decodingInfo({
        type: 'media',
        video: {
          contentType: 'video/mov',
          // You can add more video features here if needed
        },
      });

      return hdrSupport.supported && hdrSupport.hdr; // Check for HDR support
    } catch (error) {
      console.error('Error checking HDR support:', error);
      return false;
    }
  }

  // Fallback to assuming HDR is supported
  return true;
}

const Gallery= () => {
  const hdrSupported = isHdrSupported();

  return (
    <div className="bg-black text-[#faf9f6] outline-none h-screen">
     <Navbar navLinks={bck}/>
     <div className='p-[70px] md:p-[85px] bg-[#faf9f6]'></div>

     <Carousel dotPosition="top">
<div>
    <video controls className="w-1/2 h-[600px] mx-auto">
      <source src="../../assets/glehdr.MOV" type="video/quicktime" />
    </video>
    </div>
  <div>
    <video controls className="w-1/2 h-[600px] mx-auto mt-2">
      <source src="../../assets/gwagonhdr.MOV" type="video/quicktime" />
    </video>
    </div>
</Carousel>
<hr />

<h1 className='pl-4 font-thin font-roboto'>©️ 2024 AbujaCar. All rights reserved. Terms . Privacy Policy</h1> 
    </div>
  );
};
export default SectionWrapper(Gallery,'gallery')