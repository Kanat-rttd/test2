import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import ru from 'date-fns/locale/ru'
import { useState } from 'react'
import { DateRangePicker, RangeKeyDict } from 'react-date-range'
import {
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Button,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { defaultStaticRanges } from '../pages/finance/helpers/defaultDateRange'

interface DateRangeProps {
    setSelectionRange: (range: { startDate: Date; endDate: Date }) => void
    selectionRange: {
        startDate: Date
        endDate: Date
    }
}

const DateRange = ({ setSelectionRange, selectionRange }: DateRangeProps) => {
    const [tempSelectionRange, setTempSelectionRange] = useState(selectionRange)
    const [isOpen, setIsOpen] = useState(false)

    const handleSelectDate = (ranges: RangeKeyDict) => {
        console.log('test')
        console.log(ranges)
        if (ranges.range1.startDate && ranges.range1.endDate) {
            setTempSelectionRange({
                startDate: ranges.range1.startDate,
                endDate: ranges.range1.endDate,
            })
        }
    }

    const handleConfirmDate = () => {
        setSelectionRange(tempSelectionRange)
        setIsOpen(false)
    }

    const handleCancelDate = () => {
        setTempSelectionRange(selectionRange)
        setIsOpen(false)
    }

    return (
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <PopoverTrigger>
                <Input
                    width={'25%'}
                    textAlign={'center'}
                    value={
                        dayjs(tempSelectionRange.startDate).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(tempSelectionRange.endDate).format('DD.MM.YYYY')
                    }
                    onClick={() => setIsOpen(true)}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <DateRangePicker
                        className="dateRangePicker"
                        onChange={handleSelectDate}
                        ranges={[tempSelectionRange]}
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
                    <Button onClick={handleConfirmDate}>Принять</Button>
                    <Button onClick={handleCancelDate}>Отмена</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default DateRange
