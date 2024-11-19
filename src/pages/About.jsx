import React, { useState } from "react";
import { assets } from "../assets/assets";



const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white w-11/12 md:w-3/5 lg:w-2/5 p-10 rounded-lg text-gray-800 shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl mr-2"
                >
                    ×
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Contáctanos
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Estamos aquí para ayudarte. Completa el formulario y
                        nuestro equipo se pondrá en contacto contigo.
                    </p>
                </div>

                <div className="flex justify-center mb-6">
                    <img
                        src= {assets.doctorContact}
                        alt="Contáctanos"
                        className="rounded-md w-full h-48 object-cover"
                    />
                </div>

                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Ingresa tu nombre"
                            className="border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Ingresa tu correo"
                            className="border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            placeholder="Escribe tu mensaje aquí..."
                            className="border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 mb-5"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-blue-600 transition"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

const About = () => {
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    return (
        <div className="px-4 md:px-20 lg:px-40 py-10">
            {/* Sección Título Principal */}
            <div className="text-center text-3xl font-semibold pt-10 text-gray-800">
                <p>
                    SOBRE <span className="text-primary">NOSOTROS</span>
                </p>
            </div>

            {/* Sección Descripción */}
            <section className="my-12 flex flex-col md:flex-row gap-12 items-center">
                <img
                    className="w-full md:max-w-[360px] rounded-lg shadow-lg"
                    src={assets.about_image}
                    alt="Sobre nosotros"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/3 text-base text-gray-700 leading-relaxed">
                    <p>
                        Bienvenido a <strong>Prescripto</strong>, tu socio de
                        confianza en la gestión de tus necesidades de salud de
                        manera conveniente y eficiente. En Prescripto,
                        entendemos los desafíos que enfrentan las personas al
                        programar citas médicas y gestionar sus registros de
                        salud.
                    </p>
                    <p>
                        Estamos comprometidos con la excelencia en la tecnología
                        de la salud. Nos esforzamos continuamente por mejorar
                        nuestra plataforma, integrando los últimos avances para
                        mejorar la experiencia del usuario y ofrecer un servicio
                        superior. Ya sea que estés reservando tu primera cita o
                        gestionando atención continua, Prescripto está aquí para
                        apoyarte en cada paso del camino.
                    </p>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">
                            Nuestra Visión
                        </h3>
                        <p>
                            Nuestra visión en Prescripto es crear una
                            experiencia de atención médica sin interrupciones
                            para cada usuario. Nuestro objetivo es cerrar la
                            brecha entre los pacientes y los proveedores de
                            atención médica, facilitando el acceso a la atención
                            que necesitas, cuando la necesitas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección "Por qué elegirnos" */}
            <div className="text-center text-2xl my-8 text-gray-800">
                <p>
                    ¿POR QUÉ{" "}
                    <span className="text-primary font-semibold">
                        ELEGIRNOS?
                    </span>
                </p>
            </div>

            {/* Sección de Características */}
            <section className="flex flex-col md:flex-row justify-between gap-6">
                <article className="border px-8 py-12 flex flex-col items-center text-center gap-4 text-gray-600 transition-all duration-300 hover:bg-primary hover:text-white rounded-lg shadow-md">
                    <h4 className="font-bold text-lg">EFICIENCIA</h4>
                    <p>
                        Programación de citas simplificada que se adapta a tu
                        estilo de vida ocupado.
                    </p>
                </article>
                <article className="border px-8 py-12 flex flex-col items-center text-center gap-4 text-gray-600 transition-all duration-300 hover:bg-primary hover:text-white rounded-lg shadow-md">
                    <h4 className="font-bold text-lg">CONVENIENCIA</h4>
                    <p>
                        Acceso a una red de profesionales de la salud de
                        confianza en tu área.
                    </p>
                </article>
                <article className="border px-8 py-12 flex flex-col items-center text-center gap-4 text-gray-600 transition-all duration-300 hover:bg-primary hover:text-white rounded-lg shadow-md">
                    <h4 className="font-bold text-lg">PERSONALIZACIÓN</h4>
                    <p>
                        Recomendaciones y recordatorios personalizados para
                        ayudarte a mantenerte al tanto de tu salud.
                    </p>
                </article>
            </section>

            <div className="flex justify-center mt-16">
                <button
                    onClick={() => setContactModalOpen(true)}
                    className="bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-3"
                >
                    <img
                        src= {assets.telefono}
                        alt="Teléfono"
                        className="w-5 h-5"
                    />
                    Contáctanos
                </button>
            </div>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setContactModalOpen(false)}
            />

        </div>
    );
};

export default About;
