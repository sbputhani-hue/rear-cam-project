// import { useEffect, useRef, useState } from "react";

// function Camera() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [photo, setPhoto] = useState(null);

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

//   const takePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (video && canvas) {
//       const ctx = canvas.getContext("2d");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Save image as data URL
//       const dataUrl = canvas.toDataURL("image/png");
//       setPhoto(dataUrl);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         style={{ width: "100%", maxWidth: "400px" }}
//       />
//       <br />
//       <button onClick={takePhoto} style={{ marginTop: "10px" }}>
//         📸 Take Photo
//       </button>
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       {photo && (
//         <div style={{ marginTop: "15px" }}>
//           <h3>Captured Photo:</h3>
//           <img src={photo} alt="Captured" style={{ width: "100%", maxWidth: "400px" }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Camera;

import { useEffect, useRef, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } }, // ✅ better than exact
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    initCamera();
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setPhoto(canvas.toDataURL("image/png"));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "100%", height: "auto" }}
      />
      <button
        onClick={takePhoto}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      >
        Take Photo
      </button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {photo && (
        <div style={{ marginTop: "20px" }}>
          <h4>Captured Photo:</h4>
          <img src={photo} alt="Captured" style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default Camera;
