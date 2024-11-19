import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
        useContext(AppContext);
    const daysOfWeek = ["SÁB", "DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE"];

    const [docInfo, setDocInfo] = useState(false);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const navigate = useNavigate();

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSolts = async () => {
        setDocSlots([]);

        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTime = formattedTime;

                const isSlotAvailable =
                    docInfo.slots_booked[slotDate] &&
                    docInfo.slots_booked[slotDate].includes(slotTime)
                        ? false
                        : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots((prev) => [...prev, timeSlots]);
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning("Inicia sesión para reservar una cita");
            return navigate("/login");
        }

        if (!slotTime) {
            toast.warning("Por favor selecciona una hora para la cita");
            return;
        }

        const date = docSlots[slotIndex][0].datetime;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/book-appointment",
                { docId, slotDate, slotTime },
                { headers: { token } }
            );
            if (data.success) {
                toast.success(data.message);
                getDoctosData();
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts();
        }
    }, [docInfo]);

    return docInfo ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="sm:w-72">
                    <img
                        className="w-full h-auto object-cover rounded-xl shadow-lg bg-primary"
                        src={docInfo.image}
                        alt={`Dr. ${docInfo.name}`}
                    />
                </div>

                <div className="flex-1 bg-white rounded-xl shadow-md p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            {docInfo.name}
                        </h1>
                        <img
                            className="w-6 h-6"
                            src={assets.verified_icon}
                            alt="Verificado"
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-gray-700">{docInfo.degree}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-700">{docInfo.speciality}</span>
                        <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                            {docInfo.experience}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className="flex items-center gap-2 text-gray-800 font-medium mb-2">
                            Acerca del doctor
                            <img className="w-4" src={assets.info_icon} alt="" />
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {docInfo.about}
                        </p>
                    </div>

                    <div className="text-lg">
                        <span className="text-gray-600">Tarifa de consulta: </span>
                        <span className="font-semibold text-gray-900">
                            {currencySymbol}{docInfo.fees}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Seleccionar fecha y hora
                </h2>

                <div className="mb-8">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {docSlots.length &&
                            docSlots.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSlotIndex(index)}
                                    className={`flex flex-col items-center min-w-[100px] p-4 rounded-xl transition-all duration-200 ${
                                        slotIndex === index
                                            ? "bg-primary text-white shadow-lg transform scale-105"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <span className="text-sm font-medium mb-1">
                                        {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {item[0] && item[0].datetime.getDate()}
                                    </span>
                                </button>
                            ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-gray-700 font-medium mb-4 flex items-center gap-2">
                        Horarios disponibles
                        {!slotTime && (
                            <span className="text-sm text-red-500">
                                (Selecciona una hora)
                            </span>
                        )}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {docSlots.length &&
                            docSlots[slotIndex].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`py-3 px-4 rounded-lg text-center transition-all duration-200 
                                        ${item.time === slotTime
                                            ? "bg-primary text-white shadow-md transform scale-105"
                                            : "border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {item.time.toLowerCase()}
                                </button>
                            ))}
                    </div>
                </div>

                <button
                    onClick={bookAppointment}
                    disabled={!slotTime}
                    className={`w-full sm:w-auto px-8 py-4 font-medium rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2
                        ${slotTime 
                            ? 'bg-primary text-white hover:bg-primary/90' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    <span>
                        {slotTime ? 'Reservar cita' : 'Selecciona una hora'}
                    </span>
                    {slotTime && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </div>

            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
};

export default Appointment;
