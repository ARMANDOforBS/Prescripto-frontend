import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
    const { speciality } = useParams();

    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const { doctors } = useContext(AppContext);

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(
                doctors.filter((doc) => doc.speciality === speciality)
            );
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div>
            <p className="text-gray-600">
                Explora a través de los médicos especialistas.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${
                        showFilter ? "bg-primary text-white" : ""
                    }`}
                >
                    Filtros
                </button>
                <div
                    className={`flex-col gap-4 text-sm text-gray-600 ${
                        showFilter ? "flex" : "hidden sm:flex"
                    }`}
                >
                    <p
                        onClick={() =>
                            speciality === "Médico general"
                                ? navigate("/doctors")
                                : navigate("/doctors/Médico general")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Médico general"
                                ? "bg-[#E2E5FF] text-black "
                                : ""
                        }`}
                    >
                        Médico general
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Ginecólogo"
                                ? navigate("/doctors")
                                : navigate("/doctors/Ginecólogo")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Ginecólogo"
                                ? "bg-[#E2E5FF] text-black "
                                : ""
                        }`}
                    >
                        Ginecólogo
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Dermatólogo"
                                ? navigate("/doctors")
                                : navigate("/doctors/Dermatólogo")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Dermatólogo"
                                ? "bg-[#E2E5FF] text-black "
                                : ""
                        }`}
                    >
                        Dermatólogo
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Pediatra"
                                ? navigate("/doctors")
                                : navigate("/doctors/Pediatra")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Pediatra"
                                ? "bg-[#E2E5FF] text-black "
                                : ""
                        }`}
                    >
                        Pediatras
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Neurólogo"
                                ? navigate("/doctors")
                                : navigate("/doctors/Neurólogo")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Neurólogo"
                                ? "bg-[#E2E5FF] text-black "
                                : ""
                        }`}
                    >
                        Neurólogo
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Gastroenterólogo"
                                ? navigate("/doctors")
                                : navigate("/doctors/Gastroenterólogo")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Gastroenterólogo"
                                ? "bg-[#E2E5FF] text-black "
                                : ""
                        }`}
                    >
                        Gastroenterólogo
                    </p>
                </div>
                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                scrollTo(0, 0);
                            }}
                            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                            key={index}
                        >
                            <div className="w-full aspect-square bg-[#EAEFFF]">
                                <img
                                    className="w-full h-full object-cover object-center"
                                    src={item.image}
                                    alt={item.name}
                                />
                            </div>
                            <div className="p-4">
                                <div
                                    className={`flex items-center gap-2 text-sm text-center ${
                                        item.available
                                            ? "text-green-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    <p
                                        className={`w-2 h-2 rounded-full ${
                                            item.available
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                        }`}
                                    ></p>
                                    <p>
                                        {item.available
                                            ? "Disponible"
                                            : "No disponible"}
                                    </p>
                                </div>
                                <p className="text-[#262626] text-lg font-medium">
                                    {item.name}
                                </p>
                                <p className="text-[#5C5C5C] text-sm">
                                    {item.speciality}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;