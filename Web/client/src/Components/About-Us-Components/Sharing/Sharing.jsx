import React from "react";
import { BsQrCode, BsShare, BsCodeSlash, BsLink45Deg } from "react-icons/bs";
import { AiOutlineMail, AiOutlineStar } from "react-icons/ai";

const Sharing = () => {
  return (
    <div>
      <div className="bg-black pt-20 pb-20">
        <div>
          <h1
            className="text-3xl font-bold md:text-4xl text-white mx-8 md:mx-20"
            style={{ fontFamily: "Dancing Script" }}
          >
            High Performing Portfolio Creation Starts Here
          </h1>
        </div>

        {/* Starting of the first  */}

        <div className="flex flex-col md:flex-row md:ml-20 mx-8 items-center md:mt-8">
          <div className="flex items-center">
            <BsLink45Deg className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Direct Link
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                The easiest Public Sharing Option. Send Your Portfolios as
                direct links and access them from any device. Share the link
                once, then update the links as many times you want.
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <BsQrCode className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                QR Code
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Allows your coustomers or your employers to to quickly access
                your potfolio on their mobile devices with just a scan. You can
                choose to share the QR code either digitally or physically.
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <BsShare className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Social Media
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Share an promote your interactive documents on social media
                immediately. Reach new level of engagement and grow your
                buisness with just a few clicks.
              </p>
            </div>
          </div>
        </div>

        {/* Ending of the first work */}

        {/* starting of the second work */}

        <div className="flex flex-col md:flex-row md:ml-20 mx-8 items-center md:mt-8">
          <div className="flex items-center">
            <BsCodeSlash className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Embeding
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Keep your customers and wmployers updated with the latest
                achievments or publications by embedding them directly into your
                website. No coding skills required, just copy and paste the
                embedded link.
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <AiOutlineMail className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Email
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Send your portfolio as perodical email newsletter & keep your
                customers and employers updated. Upload your contact list and
                customize your emails to your brand with portfolio.
              </p>
            </div>
          </div>
          <div className="flex items-center mt-8 md:mt-0 md:ml-11">
            <AiOutlineStar className="text-white text-5xl" />
            <div className="ml-4">
              <h1
                className="text-white mt-5 text-3xl"
                style={{ fontFamily: "Dancing Script" }}
              >
                Branded Link
              </h1>
              <p
                className="text-white text-xl mt-2"
                style={{
                  fontFamily: "Edu NSW ACT Foundation",
                  maxWidth: "20rem",
                }}
              >
                Connect your own domain or sub-domain to your portfolio and
                remove all the branding done by{" "}
                <span className="undreline">Aportfolio</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Enfing of the second work */}
      </div>
    </div>
  );
};

export default Sharing;
