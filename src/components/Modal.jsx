import React, { useState } from "react";
import imgModal1 from "../assets/img-modal1.jpg";
import imgModal2 from "../assets/img-modal2.jpg";
import imgModal3 from "../assets/img-modal3.jpg";
import imgModal4 from "../assets/img-modal4.jpg";

const Modal = ({ title, content, image, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white w-11/12 md:w-3/5 lg:w-2/5 p-12 rounded-lg text-gray-800 shadow-xl relative">
                {/* Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl pr-2"
                >
                    ×
                </button>

                {/* Imagen */}
                {image && (
                    <div className="mb-6 shadow-xl">
                        <img
                            src={image}
                            alt="Imagen relacionada"
                            className="w-full h-48 object-cover rounded-md"
                        />
                    </div>
                )}

                {/* Título */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {title}
                    </h2>
                </div>

                {/* Contenido */}
                <div className="text-base text-gray-600 space-y-4">{content}</div>

                {/* Botón de cerrar */}
                <div className="mt-8 text-right">
                    <button
                        onClick={onClose}
                        className="bg-primary text-white px-6 py-3 rounded-full text-sm hover:bg-blue-600 transition"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmpresaModals = () => {
    const [activeModal, setActiveModal] = useState(null);

    const modalContent = {
        inicio: {
            title: "Inicio",
            content: (
                <>
                    <p>
                        Nuestro hospital está comprometido con brindar
                        accesibilidad y comodidad en cada aspecto de la atención
                        médica. Desde una plataforma en línea amigable hasta
                        servicios presenciales con tiempos de espera reducidos.
                    </p>
                    <p>
                        Disfruta de nuestras herramientas digitales para agendar
                        citas, consultar resultados y recibir recordatorios,
                        garantizando un servicio continuo y eficiente.
                    </p>
                </>
            ),
            image: imgModal1,
        },
        sobreNosotros: {
            title: "Sobre Nosotros",
            content: (
                <>
                    <p>
                        Somos un hospital con más de 25 años de experiencia,
                        enfocados en la innovación tecnológica y la atención
                        personalizada. Nuestra meta es convertirnos en líderes
                        en salud y bienestar.
                    </p>
                    <p>
                        Nuestro equipo multidisciplinario trabaja incansablemente
                        para garantizar una experiencia única para cada paciente,
                        desde diagnósticos precisos hasta tratamientos efectivos.
                    </p>
                </>
            ),
            image: imgModal2
        },
        entrega: {
            title: "Entrega",
            content: (
                <>
                    <p>
                        Con nuestro sistema de entrega, puedes recibir tus
                        medicamentos, recetas y resultados de manera rápida y
                        segura, directamente en la puerta de tu casa.
                    </p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Entrega en menos de 48 horas para pedidos locales.</li>
                        <li>Rastreo en tiempo real de tus envíos.</li>
                        <li>Embalaje seguro y confidencial.</li>
                    </ul>
                </>
            ),
            image: imgModal3,
        },
        privacidad: {
            title: "Política de Privacidad",
            content: (
                <>
                    <p>
                        Respetamos y protegemos tu información personal. Nuestro
                        hospital utiliza las mejores prácticas de seguridad para
                        garantizar la confidencialidad y el manejo ético de tus
                        datos médicos.
                    </p>
                    <ul className="list-disc list-inside mt-4">
                        <li>Encriptación avanzada de información.</li>
                        <li>Acceso limitado a personal autorizado.</li>
                        <li>Compromiso con regulaciones de privacidad.</li>
                    </ul>
                </>
            ),
            image: imgModal4,
        },
    };

    return (
        <div>
            <ul className="flex flex-col gap-3 text-gray-600">
                {Object.keys(modalContent).map((key) => (
                    <li
                        key={key}
                        onClick={() => setActiveModal(key)}
                        className="hover:text-blue-500 cursor-pointer text-sm"
                    >
                        {modalContent[key].title}
                    </li>
                ))}
            </ul>

            {Object.entries(modalContent).map(([key, { title, content, image }]) => (
                <Modal
                    key={key}
                    title={title}
                    content={content}
                    image={image}
                    isOpen={activeModal === key}
                    onClose={() => setActiveModal(null)}
                />
            ))}
        </div>
    );
};

export default EmpresaModals;
