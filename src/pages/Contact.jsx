import React, { useState } from "react";
import { assets } from "../assets/assets";
import JobApplicationModal from "../components/JobApplicationModal";

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="text-center text-2xl pt-10 text-[#707070]">
                <p>
                    {" "}
                    <span className="text-gray-700 font-semibold">
                        CONTACTANOS
                    </span>
                </p>
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
                <img
                    className="w-full md:max-w-[360px]"
                    src={assets.contact_image}
                    alt=""
                />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className=" font-semibold text-lg text-gray-600">
                        NUESTRA OFICINA
                    </p>
                    <p className=" text-gray-500">
                        Av. José Larco 1234 <br /> Miraflores, Lima, Perú.
                    </p>
                    <p className=" text-gray-500">
                        Tel: (01) 555-0132 <br /> Email: correopruebav@gmail.com
                    </p>
                    <p className=" font-semibold text-lg text-gray-600">
                        CARRERAS EN PRESCRIPTO
                    </p>
                    <p className=" text-gray-500">
                        Aprende más sobre nuestros equipos y ofertas de trabajo.
                    </p>
                    <button 
                        onClick={openModal}
                        className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
                    >
                        Sumate a nosotros.
                    </button>
                </div>
            </div>

            <JobApplicationModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />
        </div>
    );
};

export default Contact;
