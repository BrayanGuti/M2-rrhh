import { useChatStore } from "../../stores/useChatStore";

export default function InitialMenuButtons() {
  const { selectVacancy, selectAppointment, isProcessing } = useChatStore();
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={selectVacancy}
        disabled={isProcessing}
        className="w-full py-4 px-6 bg-[#44BBA4] hover:bg-[#3da590] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span className="text-xl">💼</span>
        <span>Aplicar a una vacante</span>
      </button>

      <button
        onClick={selectAppointment}
        disabled={isProcessing}
        className="w-full py-4 px-6 bg-[#15616D] hover:bg-[#124955] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span className="text-xl">📅</span>
        <span>Reagendar mi cita</span>
      </button>
    </div>
  );
}
