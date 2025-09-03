// import { useEffect, useRef } from "react";

// function Camera() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     async function initCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: { exact: "environment" } }, // rear camera
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         // fallback to any camera if rear is not available
//         try {
//           const fallbackStream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//           });
//           if (videoRef.current) {
//             videoRef.current.srcObject = fallbackStream;
//           }
//         } catch (fallbackErr) {
//           console.error("Error accessing fallback camera:", fallbackErr);
//         }
//       }
//     }
//     initCamera();
//   }, []);

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         style={{ width: "100%", height: "auto" }}
//       />
//     </div>
//   );
// }

// export default Camera;

import { useRef } from "react";
import { Camera } from "react-camera-pro";

function CameraComponent() {
  const camera = useRef(null);

  return (
    <div>
      <Camera
        ref={camera}
        facingMode="environment" // rear camera
      />
      <button onClick={() => {
        const photo = camera.current.takePhoto();
        console.log(photo); // base64 image
      }}>
        Capture
      </button>
    </div>
  );
}

export default CameraComponent;
