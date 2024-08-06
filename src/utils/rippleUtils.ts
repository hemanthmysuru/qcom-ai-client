export const calculateRipplePosition = (
    event: React.MouseEvent<HTMLElement>,
    element: HTMLElement
): { x: number; y: number; size: number } => {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    return { x, y, size };
};
