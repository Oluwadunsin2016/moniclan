import { Button } from "@nextui-org/react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { SiTarget } from "react-icons/si";
import { BsCash } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { useShallow } from "zustand/react/shallow";
import { IconBase } from "react-icons/lib";
import useTransaction from "../../store/Global";
import countries from "../../lib/countries";

const Sections = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <EighthSection />
      <NinthSection />
    </>
  );
};

export default Sections;

const FirstSection = () => {
  return (
    <section className="bg-[#2C415A] flex flex-col-reverse gap-10 sm:gap-0  sm:grid rounded-xl sm:grid-cols-2 items-center justify-center p-4 sm:p-24">
    <main>
      <h2 className="text-white text-center text-4xl font-bold">
        Download the app:
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-10 mt-10">
        <img
          src="/images/apple_store.svg"
          width={200}
          height={60}
          alt="AppStore"
        />
        <img
          src="/images/play_store.png"
          width={200}
          height={60}
          alt="Google Play"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <p className="text-white text-xl">
          Scan the code with your phone to get the app
        </p>
        <img
          src="/images/qr_code.png"
          width={100}
          height={60}
          alt="QR Code"
        />
      </div>
    </main>
    <main className=" ">
      <h1 className="text-5xl text-center  text-white font-bold">
        FAST. EASY. <br /> RELIABLE
      </h1>
    </main>
  </section>
  );
};
const SecondSection = () => {
  return (
    <section className="p-3 sm:p-20 flex flex-col gap-10 items-center justify-center">
      <h1 className="font-semibold text-3xl text-center ">
        Find out why millions worldwide trust Moniclan
      </h1>
      <div className="grid sm:grid-cols-3 gap-10">
        {[1, 1, 3].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-full"
          >
            <div>
              <IconBase />
            </div>
            <strong className="text-xl">
              {index === 0
                ? "Peace of Mind"
                : index === 1
                ? "Great Value"
                : "Delivery Time Guaranteed"}
            </strong>
            <p className="text-center font-medium">
              {index === 0
                ? "You and your recipients can track your transfer every step of the way."
                : index === 1
                ? "Enjoy consistently great rates and no hidden fees. Whether using the app or online, you'll see all fees before sending."
                : "You can trust that transfers will be delivered on time or we’ll refund your fees."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ThirdSection = () => {
  const [to, from] = useTransaction(
    useShallow((state) => [state.data.to, state.data.from, state.updateData])
  );
  const fromCountry = countries[from];
  const toCountry = countries[to];
  return (
    <section className="bg-[#FBF8F2] p-10">
      <h2 className="text-center text-[#2C415A] text-4xl font-bold py-2">
        Transfer money home to {toCountry?.name} from the {fromCountry?.name}
      </h2>
      <p className="text-center text-xl">
        Worry-free transfers for you and your loved ones
      </p>
      <Button className="mx-auto block bg-[#2C415A] text-white my-4 p-3 h-[50px] rounded-2xl text-xl">
        Send Now
      </Button>
    </section>
  );
};
export const FourthSection = () => {
  return (
    <section className=" bg-white p-10 flex flex-col items-center ">
      <h2 className="text-center text-[#2C415A] text-4xl font-bold py-2">
        Where to send money in Nigeria with Moniclan
      </h2>
      <p className="text-center text-xl">
        Cash pickup and bank deposit with our trusted network in Nigeria. Click
        your preferred provider to learn more.
      </p>
      <div className="flex gap-4  m-6">
        {[1, 2].map((item, index) => (
          <div key={index} className="shadow p-2 rounded-md">
            <img
              src={
                index === 0 ? "/images/access_bank.svg" : "/images/gt_bank.svg"
              }
              width={150}
              height={60}
              alt="AppStore"
            />
            <p className="text-center text-base">
              {index === 0 ? "Access Bank" : "Guaranty Trust Bank"}
            </p>
          </div>
        ))}
      </div>
      <Button className=" bg-[#4487d8]  text-white my-4 p-3 w-48 h-[50px] rounded-2xl text-xl">
        More
      </Button>
      <p className="text-base mt-3">
        Trademarks, trade names and logos displayed are registered trademarks of
        their respective owners. No affiliation or endorsement of Moniclan should
        be implied.
      </p>
    </section>
  );
};
export const FifthSection = () => {
  return (
    <section className=" bg-[#FBF8F2] p-4 sm:p-10 flex flex-col items-center rounded-xl ">
      <h2 className="text-center text-[#2C415A] text-4xl font-bold py-2">
        Tips for sending money from the United States to Nigeria securely
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 justify-around mt-5 px-4 sm:px-20">
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className=" p-2 rounded-md  flex flex-col items-center"
          >
            <b className="py-2">
              {index === 0 ? (
                <>
                  <IoCalendarNumberOutline size={30} />
                </>
              ) : index === 1 ? (
                <>
                  <MdOutlineCurrencyExchange size={30} />
                </>
              ) : (
                <>
                  <SiTarget size={30} />
                </>
              )}
            </b>
            <p className="text-center text-lg">
              {index === 0
                ? "Always double-check your recipient's information to avoid delays."
                : index === 1
                ? "Be aware of the exchange rates, as this can impact the amount your recipient receives."
                : "Using a secure internet connection can help safeguard your information."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SixthSection = () => {
  return (
    <section className="bg-[#D3EAEC]  py-16 ">
      <h2 className="text-center text-[#2C415A]  text-4xl font-bold py-2">
        How to send money to Nigeria with Moniclan
      </h2>
      <main className="flex px-8 sm:px-24 gap-8 flex-col md:flex-row mt-5">
        <div className="gap-2 flex flex-col ">
          {Array(5)
            .fill(0)
            .map((val, index) => (
              <div
                className="flex  border-b-2 my-1 text-[#04829E] border-[#04829E]"
                key={index}
              >
                <span className="rounded-full text-[#04829E] border-[#04829E] h-12 w-12 px-4 py-2 border-2 mr-2">
                  {index + 1}
                </span>
                <span className="text-[#2C415A]  text-xl">
                  {index === 0
                    ? "Create an account using your email address through our website or our app on the App Store or Google Play."
                    : index === 1
                    ? "Select the currency, the amount you want to send, and the delivery speed."
                    : index == 2
                    ? "Choose how your money is delivered."
                    : index === 3
                    ? "Enter the name and information of the person who will receive the money."
                    : "Enter your payment information and select confirm transfer to send."}
                </span>
              </div>
            ))}
        </div>
        <div>
          <iframe
            className="h-[320px]  w-full sm:w-[560px] "
            src="https://www.youtube.com/embed/wLHrbnbQWUc?si=mdF0uM43Xbrr90eR"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </main>
    </section>
  );
};

const SeventhSection = () => {
  return (
    <section className=" p-5  md:p-28 ">
      <h2 className="text-center  text-4xl font-bold py-2 flex flex-col">
        {" "}
        <span>Choose your preferred delivery method when sending</span>{" "}
        <span>money to Nigeria</span>{" "}
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 justify-around mt-5 px-4 sm:px-20">
        {[1, 2].map((item, index) => (
          <div
            key={index}
            className=" p-5 shadow-lg  rounded-md  flex flex-col items-center"
          >
            <b className="py-2">
              {index === 0 ? (
                <>
                  <BsCash size={40} color="##04829E" />
                </>
              ) : (
                <>
                  <CiBank size={40} color="##04829E" />
                </>
              )}
            </b>
            <b className="text-center text-2xl">
              {index === 0 ? "Cash pickup" : "Bank deposit"}
            </b>
          </div>
        ))}
      </div>
    </section>
  );
};
const EighthSection = () => {
  return (
    <section className="bg-[#FBF8F2] p-10 flex flex-col items-center rounded-xl ">
      <h2 className="text-center text-[#2C415A] text-4xl font-bold py-2">
        See what our customers are saying
      </h2>
      <main className=" mt-10 gap-8 flex flex-col px-8 md:px-36">
        {Array(2)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`flex  flex-col gap-5 md:flex-row ${
                index === 0 ? "" : "flex-row-reverse"
              } gap-4`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={`/images/testimony_${index + 1}.webp`}
                  width={500}
                  height={600}
                  className={` ${
                    index === 0 ? "rounded-br-[4rem] " : "rounded-tl-[4rem] "
                  }`}
                  alt="AppStore"
                />
              </div>

              <div className="flex w-full md:w-1/2 flex-col items-center justify-center  gap-4">
                <p className="text-3xl font-light ">
                  Sending money is easy and fast. It’s a hassle free fast money
                  sending app.
                </p>
                <strong>Nilmini M.</strong>
                <p className="text-xl">
                  Sent money from Canada to Sri Lanka with Moniclan.
                </p>
              </div>
            </div>
          ))}
      </main>
    </section>
  );
};

const NinthSection = () => {
  return (
    <section className="bg-[#2C415A] p-10 flex flex-col items-center rounded-xl ">
      <h2 className="text-center text-white text-4xl font-bold py-2">
        Beyond Borders: The Official Moniclan Blog
      </h2>
      <main className=" mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-3 md:px-36">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 justify-center mt-10"
            >
              <img
                src={`/images/explore_${index + 1}.webp`}
                width={500}
                height={600}
                className={` !h-[280px] sm:!h-[350px] rounded-[4rem]`}
                alt={`AppStore + ${index + 1}`}
              />
              <div className="rounded-b-2xl border-2 border-[#ffff] py-14 px-2 ">
                <b className="text-2xl text-white  ">
                  {index === 0
                    ? "Today’s U.S. Dollar (USD) Exchange Rate with Moniclan: Dollar to Peso and More"
                    : index === 1
                    ? "5 Top Online Banks in the U.S. (and 2 Popular Alternatives)"
                    : index === 2
                    ? "How Do I Change the Address for My Green Card?"
                    : index === 3
                    ? "What Is Dual Citizenship, and How Does It Work?"
                    : ""}
                </b>
              </div>
            </div>
          ))}
      </main>
    </section>
  );
};