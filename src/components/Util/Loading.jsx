const Loading = () => {
  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-red-300 to-red-600 animate-spin">
          <div className="h-10 w-10 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
