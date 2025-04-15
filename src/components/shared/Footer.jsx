
export const Footer = () => {
  return (
    <section className="mt-5  bg-[#2C415A] p-10 rounded-t-xl ">
   <div className="lg:max-w-[80rem] mx-auto grid grid-cols-2 justify-center gap-10 md:grid-cols-3 lg:grid-cols-4">
   <div>
        <h2 className="text-white text-3xl">Moniclan</h2>
        <div className="flex flex-col">
          {[
            "User Agreement",
            "Privacy Help Center",
            "Privacy Policy",
            "Your Privacy Choices",
            "Licenses",
          ].map((item, index) => (
            <a key={index} href={`#`} className="text-white py-2 underline">
              {item}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-white text-3xl">Company</h2>
        <div className="flex flex-col">
          {"About-Blog-Newsroom-Press-Careers-Investors-Become an affiliate"
            .split("-")
            .map((item, index) => (
              <a key={index} href={`#`} className="text-white py-2 underline">
                {item}
              </a>
            ))}
        </div>
      </div>
      <div>
        <h2 className="text-white text-3xl">Product</h2>
        <div className="flex flex-col">
          {[
            "Rates & fees",
            "Security",
            "Reviews",
            "Partners",
            "Swift codes",
            "Refer friends",
            "Businesses",
            "Seafarers",
          ].map((item, index) => (
            <a key={index} href={`#`} className="text-white py-2 underline">
              {item}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-white text-3xl">Support</h2>
        <div className="flex flex-col">
          {["Help", "File a complaint"].map((item, index) => (
            <a key={index} href={`#`} className="text-white py-2 underline">
              {item}
            </a>
          ))}
        </div>
      </div>
   </div>
    </section>
  );
};