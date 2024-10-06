const TextBlock = ({ text }: { text: string }) => {
  return (
    <div className="max-w-7xl font-light  text-center text-white mx-auto text-pretty text-sm lg:my-10 md:my-14 my-5 leading-[35px] tracking-widest">
      {text}
    </div>
  );
};

export default TextBlock;
