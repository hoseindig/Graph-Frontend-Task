export function calculateFlightDuration(
    departureTime: Date,
    arrivalTime: Date,
): string {
    const durationMs = arrivalTime.getTime() - departureTime.getTime();
    const totalMinutes = Math.floor(durationMs / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
}

export function formatFlightTimeRange(
    departureTime: Date,
    arrivalTime: Date,
): string {
    const depHours = String(departureTime.getHours()).padStart(2, "0");
    const depMinutes = String(departureTime.getMinutes()).padStart(2, "0");
    const arrHours = String(arrivalTime.getHours()).padStart(2, "0");
    const arrMinutes = String(arrivalTime.getMinutes()).padStart(2, "0");
    return `${depHours}:${depMinutes} - ${arrHours}:${arrMinutes}`;
}
