const TextBlock = ({ text }: { text: string }) => {
  return (
    <div className="max-w-7xl text-center text-white mx-auto text-pretty text-sm font-semibold lg:my-10 md:my-14 my-5 leading-[35px] tracking-widest">
      {text}
    </div>
  );
};

export default TextBlock;
