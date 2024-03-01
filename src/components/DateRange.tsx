import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import ru from 'date-fns/locale/ru'
import { DateRangePicker, RangeKeyDict } from 'react-date-range'
import { defaultStaticRanges } from '../pages/finance/helpers/defaultDateRange'
import { Input, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import dayjs from 'dayjs'

interface DateRangeProps {
    setSelectionRange: (range: { startDate: Date; endDate: Date }) => void
    selectionRange: {
        startDate: Date
        endDate: Date
    }
}

const DateRange = ({ setSelectionRange, selectionRange }: DateRangeProps) => {
    const handleSelectDate = (ranges: RangeKeyDict) => {
        console.log('test')
        console.log(ranges)
        if (ranges.range1.startDate && ranges.range1.endDate) {
            setSelectionRange({
                startDate: ranges.range1.startDate,
                endDate: ranges.range1.endDate,
            })
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Input
                    textAlign={'center'}
                    value={
                        dayjs(selectionRange.startDate).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(selectionRange.endDate).format('DD.MM.YYYY')
                    }
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <DateRangePicker
                        className="dateRangePicker"
                        onChange={handleSelectDate}
                        ranges={[selectionRange]}
                        months={2}
                        direction="horizontal"
                        showMonthAndYearPickers={false}
                        monthDisplayFormat="LLLL"
                        weekdayDisplayFormat="EEEEE"
                        locale={ru}
                        rangeColors={['#92D3D6']}
                        showDateDisplay={false}
                        editableDateInputs={false}
                        inputRanges={[]}
                        staticRanges={defaultStaticRanges}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default DateRange
