
// context for chart
import {createContext, useContext} from "react";
import dayjs from "dayjs";

export interface IChartContext {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedWindow: string;
    setSelectedWindow: (window: string) => void;
    queryRange: { to: dayjs.Dayjs, from: dayjs.Dayjs }
    setQueryRange: (range: { to: dayjs.Dayjs, from: dayjs.Dayjs }) => void;
}
export const ChartContext = createContext<IChartContext>({
    selectedDate: dayjs().format('YYYY-MM-DD'),
    setSelectedDate: () => {},
    selectedWindow: '30m',
    setSelectedWindow: () => {},
    queryRange: {
        to: dayjs().add(1, 'day'),
        from: dayjs()
    },
    setQueryRange: () => {}

})

export const useChart = () => {
    const context = useContext(ChartContext);
    if (context === undefined) {
        throw new Error('useChart must be used within a ChartProvider');
    }
    return context;
}