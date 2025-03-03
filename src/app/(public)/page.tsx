import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mt-24 xl:mt-5 px-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome to HealthCare Hospital
          </h1>
          <p className="text-base md:text-lg font-semibold mt-4">
            We provide the best medical services for all our patients. We have
            the best doctors and nurses to take care of you. We are here to
            serve you. We provide the best medical services for all our
            patients. We are open 24/7 to take care of you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-6 justify-center md:justify-start">
            <Link href="/services">
              <Button className="w-full sm:w-auto">View Services</Button>
            </Link>

            <Link href="/appointment-confirmation">
              <Button className="w-full sm:w-auto">Download Appointment</Button>
            </Link>

            <Link href="/book-appointment">
              <Button type="primary" className="w-full sm:w-auto">
                Book an Appointment
              </Button>
            </Link>

           
          </div>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="/assets/carePulse.png"
            className="h-[500px] md:h-[800px] w-auto max-w-full"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
