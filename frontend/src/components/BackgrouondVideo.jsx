const BackgroundVideo = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="/bank.mp4"
      >
        {/* <source src="/public/bank.mp4" type="video/mp4" /> */}
      </video>
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-100">
        <h1 className="text-white text-4xl font-bold">Welcome to My App</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
