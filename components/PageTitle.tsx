const PageTitle = ({ children }: { children: string }) => {
  return (
    <div className="text-center text-white lg:text-4xl md:text-3xl text-2xl font-light my-10 tracking-[4.42px]">
      {children}
    </div>
  );
};

export default PageTitle;
