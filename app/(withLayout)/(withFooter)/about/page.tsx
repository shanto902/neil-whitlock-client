import PaddingContainer from "@/components/layout/PaddingContainer";
import PageTitle from "@/components/PageTitle";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Neill Whitlock",
  description: "Biography of Neill Whitlock",
};
const page = () => {
  return (
    <PaddingContainer className="mt-20 w-full">
      <PageTitle>ABOUT</PageTitle>
      <Image
        src={"/assets/images/about/1.png"}
        alt=""
        width={1520}
        height={400}
        className="md:object-contain object-cover h-full"
      />

      <div className="max-w-7xl text-center text-white mx-auto text-pretty text-sm font-semibold lg:my-20 md:my-14 my-10 leading-[35px] tracking-widest">
        For over 50 years, Neill roadtripped throughout North America, most
        especially in the Rockies. His yearly trips brought him through Texas,
        New Mexico, Idaho, Montana, Wyoming and Canada. His favorite was
        Colorado; driving along the old mining roads where he wouldn’t see a
        soul for days, and camping under the stars. Always in search of
        sprawling vistas, perfect clouds, mind-blowing rock formations and the
        best light, Neill often revisited his favorite spots throughout his
        life. “The United States is absolutely gorgeous.” 
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
        <Image
          src={"/assets/images/about/2.png"}
          width={500}
          height={500}
          alt=""
        />
        <Image
          src={"/assets/images/about/3.png"}
          width={500}
          height={500}
          alt=""
        />
        <Image
          src={"/assets/images/about/4.png"}
          width={500}
          height={500}
          alt=""
        />
      </div>

      <div className="max-w-7xl text-center text-white mx-auto text-pretty text-sm font-semibold lg:my-20 md:my-14 my-10 leading-[35px] tracking-widest">
        With his first photo essay under his belt, he moved to Los Angeles.
        There he studied at the prestigious Art Center College of Design and
        worked with some of L.A.’s most successful photographers, and then
        launched his first photography studio in North Hollywood. 
      </div>

      <div className="grid lg:grid-cols-4 gap-6  md:grid-cols-2 grid-cols-1 justify-items-center">
        <Image
          src={"/assets/images/about/5.png"}
          width={362}
          height={400}
          alt=""
        />
        <Image
          src={"/assets/images/about/6.png"}
          width={362}
          height={400}
          alt=""
        />
        <Image
          src={"/assets/images/about/7.png"}
          width={362}
          height={400}
          alt=""
        />
        <Image
          src={"/assets/images/about/8.png"}
          width={362}
          height={400}
          alt=""
        />
      </div>

      <div className="max-w-7xl text-center text-white mx-auto text-pretty text-sm font-semibold lg:my-20 md:my-14 my-10 leading-[35px] tracking-widest">
        Neill’s growing success in his L.A. studio put him in the professional
        spotlight. He was recruited to join the renowned commercial studio, The
        Photographers Inc. in Dallas, Texas. There he began a life-long career
        creating beautiful images for both advertising and editorial projects.
        He shot for high profile clients such as Neiman Marcus, American
        Airlines, Harpers Bazaar, Zales and American Express. Before long, he
        once again launched a studio of his own in the historic “El Sibil”
        building near downtown Dallas, carrying forward the artistic torch of
        Frank Reaugh, who had built the studio in 1928 and was among Dallas’
        most notable artists. Throughout his successful rise in the industry,
        Neill always made time to give back, mentoring many creative talents
        along the way. 
      </div>

      <div className="grid lg:grid-cols-4 gap-6  md:grid-cols-2 grid-cols-1 justify-items-center">
        <Image
          src={"/assets/images/about/9.png"}
          width={362}
          height={400}
          alt=""
        />
        <Image
          src={"/assets/images/about/10.png"}
          width={362}
          height={400}
          alt=""
        />
        <Image
          src={"/assets/images/about/11.png"}
          width={362}
          height={400}
          alt=""
        />
        <Image
          src={"/assets/images/about/12.png"}
          width={362}
          height={400}
          alt=""
        />
      </div>
      <div className="max-w-7xl text-center text-white mx-auto text-pretty text-sm font-semibold lg:my-20 md:my-14 my-10 leading-[35px] tracking-widest">
        Neill resisted the temptation to become a workaholic, however. His love
        of travel and adventure remained a mainspring of his vitality. He
        somehow found time to hike all of the Collegiate Peaks of Colorado,
        climb Mount Elbrus in Russia, and ascend to the First Base Camp on Mount
        Everest. He traveled to Mexico, Chile, Nepal, Prague, Antarctica, raced
        stock cars, climbed mountains, and was a true outdoorsman who relished
        sleeping alone on the ground under the stars. 
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={"/assets/images/about/13.png"}
          width={491}
          height={400}
          alt=""
        />
      </div>
    </PaddingContainer>
  );
};

export default page;
