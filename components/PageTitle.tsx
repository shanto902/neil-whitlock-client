const PageTitle = ({ children }: { children: string }) => {
  return (
    <div className="text-center text-white lg:text-4xl md:text-3xl text-2xl font-light mt-10 mb-5  tracking-[4.42px]">
      {children}
    </div>
  );
};

export default PageTitle;
